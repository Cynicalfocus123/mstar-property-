'use client';
import Image from 'next/image';
import {useLayoutEffect,useRef,useState} from 'react';
import type {ListingPhoto} from '@/lib/listing-types';
import {animateSurface} from '@/lib/motion';

function Photo({photo,unavailable}:{photo:ListingPhoto;unavailable:string}){
 const [error,setError]=useState(false);
 return error?<span className="photo-unavailable">{unavailable}</span>:<Image src={photo.url} alt={photo.alt} fill sizes="(max-width:720px) calc(100vw - 32px), (max-width:1000px) calc((100vw - 72px)/2), calc((100vw - 88px)/3)" unoptimized={photo.url.endsWith('.svg')} onError={()=>setError(true)}/>;
}
export function ListingPhotos({photos,index,direction,unavailable}:{photos:ListingPhoto[];index:number;direction:number;unavailable:string}){
 const current=useRef<HTMLDivElement>(null),previous=useRef<HTMLDivElement>(null),last=useRef(index),[outgoing,setOutgoing]=useState<number|null>(null);
 // Retain only the outgoing and current image, rather than downloading every gallery photo.
 useLayoutEffect(()=>{if(last.current!==index){setOutgoing(last.current);last.current=index;}},[index]);
 useLayoutEffect(()=>{
  if(outgoing===null||!current.current||!previous.current)return;
  const enter=animateSurface(current.current,[{transform:`translateX(${direction*100}%)`},{transform:'translateX(0)'}],'photo');
  const exit=animateSurface(previous.current,[{transform:'translateX(0)'},{transform:`translateX(${-direction*100}%)`}],'photo');
  let cancelled=false;void enter.finished.then(()=>{if(!cancelled)setOutgoing(null);});
  return()=>{cancelled=true;enter.cancel();exit.cancel();};
 },[index,outgoing,direction]);
 return <div className="photo-slider">
  {outgoing!==null&&photos[outgoing]?<div className="photo-layer photo-previous" ref={previous} aria-hidden="true"><Photo key={outgoing} photo={photos[outgoing]} unavailable={unavailable}/></div>:null}
  <div className="photo-layer photo-current" ref={current}>{photos[index]?<Photo key={index} photo={photos[index]} unavailable={unavailable}/>:<span className="photo-unavailable">{unavailable}</span>}</div>
 </div>;
}
