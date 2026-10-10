// Minimal streaming reader for OpenStreetMap .osm.pbf files (fileformat.proto / osmformat.proto).
// Reads nodes (plain and dense) and ways with tags; relations are skipped. zlib and raw blobs only (what Geofabrik publishes).
import {closeSync,fstatSync,openSync,readSync} from 'node:fs';
import {inflateSync} from 'node:zlib';

class Reader {
 pos=0;
 constructor(readonly buf:Uint8Array,readonly end=buf.length){}
 varint():number{let result=0,shift=0,byte:number;do{byte=this.buf[this.pos++];result+=(byte&0x7f)*2**shift;shift+=7;}while(byte&0x80);return result;}
 svarint(){const n=this.varint();return n%2===1?-(n+1)/2:n/2;}
 bytes(){const length=this.varint(),start=this.pos;this.pos+=length;return this.buf.subarray(start,this.pos);}
 skip(wire:number){if(wire===0)this.varint();else if(wire===1)this.pos+=8;else if(wire===2){const length=this.varint();this.pos+=length;}else if(wire===5)this.pos+=4;else throw new Error(`Unsupported protobuf wire type ${wire}.`);}
 each(visit:(field:number,wire:number)=>void){while(this.pos<this.end){const key=this.varint();visit(Math.floor(key/8),key&7);}}
}
const packed=(bytes:Uint8Array,signed:boolean)=>{const r=new Reader(bytes),out:number[]=[];while(r.pos<r.end)out.push(signed?r.svarint():r.varint());return out;};
const text=new TextDecoder();

export type Tags=Record<string,string>;
export type PbfVisitor={header?:(replicationTimestamp:number|null)=>void;node?:(id:number,lat:number,lng:number,tags:Tags|null)=>void;way?:(id:number,refs:number[],tags:Tags)=>void};

function primitiveBlock(data:Uint8Array,visit:PbfVisitor){
 const strings:Uint8Array[]=[],groups:Uint8Array[]=[];let granularity=100,latOffset=0,lonOffset=0;
 const block=new Reader(data);
 block.each((field,wire)=>{
  if(field===1){const table=new Reader(block.bytes());table.each((f,w)=>{if(f===1)strings.push(table.bytes());else table.skip(w);});}
  else if(field===2)groups.push(block.bytes());
  else if(field===17)granularity=block.varint();else if(field===19)latOffset=block.svarint();else if(field===20)lonOffset=block.svarint();
  else block.skip(wire);
 });
 const str=(i:number)=>text.decode(strings[i]),lat=(v:number)=>1e-9*(latOffset+granularity*v),lng=(v:number)=>1e-9*(lonOffset+granularity*v);
 const tagsOf=(keys:number[],values:number[]):Tags|null=>{if(!keys.length)return null;const tags:Tags={};keys.forEach((k,i)=>{tags[str(k)]=str(values[i]);});return tags;};
 for(const bytes of groups){
  const group=new Reader(bytes);
  group.each((field,wire)=>{
   if(field===1&&visit.node){
    const node=new Reader(group.bytes());let id=0,la=0,lo=0,keys:number[]=[],values:number[]=[];
    node.each((f,w)=>{if(f===1)id=node.svarint();else if(f===2)keys=packed(node.bytes(),false);else if(f===3)values=packed(node.bytes(),false);else if(f===8)la=node.svarint();else if(f===9)lo=node.svarint();else node.skip(w);});
    visit.node(id,lat(la),lng(lo),tagsOf(keys,values));
   }else if(field===2&&visit.node){
    const dense=new Reader(group.bytes());let ids:number[]=[],lats:number[]=[],lons:number[]=[],kv:number[]=[];
    dense.each((f,w)=>{if(f===1)ids=packed(dense.bytes(),true);else if(f===8)lats=packed(dense.bytes(),true);else if(f===9)lons=packed(dense.bytes(),true);else if(f===10)kv=packed(dense.bytes(),false);else dense.skip(w);});
    let id=0,la=0,lo=0,k=0;
    for(let i=0;i<ids.length;i++){
     id+=ids[i];la+=lats[i];lo+=lons[i];
     let tags:Tags|null=null;
     if(kv.length){while(kv[k]!==0){tags??={};tags[str(kv[k])]=str(kv[k+1]);k+=2;}k++;}
     visit.node(id,lat(la),lng(lo),tags);
    }
   }else if(field===3&&visit.way){
    const way=new Reader(group.bytes());let id=0,keys:number[]=[],values:number[]=[],refs:number[]=[];
    way.each((f,w)=>{if(f===1)id=way.varint();else if(f===2)keys=packed(way.bytes(),false);else if(f===3)values=packed(way.bytes(),false);else if(f===8)refs=packed(way.bytes(),true);else way.skip(w);});
    const tags=tagsOf(keys,values);
    if(tags){let ref=0;visit.way(id,refs.map(delta=>ref+=delta),tags);}
   }else group.skip(wire);
  });
 }
}

export function readPbf(path:string,visit:PbfVisitor){
 const fd=openSync(path,'r'),size=fstatSync(fd).size;let offset=0;
 const read=(length:number)=>{const buffer=Buffer.allocUnsafe(length);if(readSync(fd,buffer,0,length,offset)!==length)throw new Error('Truncated .osm.pbf file.');offset+=length;return buffer;};
 try {
  while(offset<size){
   const headerLength=read(4).readUInt32BE(0),header=new Reader(read(headerLength));let type='',dataSize=0;
   header.each((f,w)=>{if(f===1)type=text.decode(header.bytes());else if(f===3)dataSize=header.varint();else header.skip(w);});
   const blob=new Reader(read(dataSize)),found:{data?:Uint8Array;timestamp?:number}={};
   blob.each((f,w)=>{if(f===1)found.data=blob.bytes();else if(f===3)found.data=inflateSync(blob.bytes());else if(f>=4&&f<=7)throw new Error('Only zlib or raw .osm.pbf blobs are supported.');else blob.skip(w);});
   const data=found.data;if(!data)throw new Error('Empty .osm.pbf blob.');
   if(type==='OSMHeader'){const h=new Reader(data);h.each((f,w)=>{if(f===32)found.timestamp=h.varint();else h.skip(w);});visit.header?.(found.timestamp??null);}
   else if(type==='OSMData')primitiveBlock(data,visit);
  }
 }finally{closeSync(fd);}
}
