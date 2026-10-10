'use client';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useEffect,useRef,useState} from 'react';
import * as maplibregl from 'maplibre-gl';
import type {Language} from '@/lib/i18n';
import type {MapPin} from '@/lib/listing-types';
import {compactPrice} from '@/lib/listing-format';
import {areaRadiusM,mapStyleUrl,thailandView} from '@/lib/map-config';
import {animateSurface} from '@/lib/motion';

type Labels={map:string;area:string;failed:string};
type Props={pins:MapPin[];language:Language;bbox?:string;highlighted:string|null;searchAsMove:boolean;labels:Labels;onHighlight:(id:string|null)=>void;onSelect:(pin:MapPin)=>void;onMove:(bbox:string)=>void};
const AREAS='mstar-areas';

// Approximate circle polygon (metres) around a rounded area centre.
function circle(lng:number,lat:number,radius:number):number[][]{
 const ring:number[][]=[],dLat=radius/111320,dLng=radius/(111320*Math.cos(lat*Math.PI/180));
 for(let i=0;i<=48;i++){const a=i/48*2*Math.PI;ring.push([lng+dLng*Math.cos(a),lat+dLat*Math.sin(a)]);}
 return ring;
}
function areas(pins:MapPin[]){return {type:'FeatureCollection' as const,features:pins.filter(p=>p.area).map(p=>({type:'Feature' as const,id:p.id,properties:{id:p.id},geometry:{type:'Polygon' as const,coordinates:[circle(p.lng,p.lat,areaRadiusM)]}}))};}
// Show one language: Thai names on /th, English (then Latin) names on /en.
function localize(map:maplibregl.Map,language:Language){
 const field=language==='th'?['coalesce',['get','name:th'],['get','name']]:['coalesce',['get','name:en'],['get','name:latin'],['get','name']];
 for(const layer of map.getStyle().layers){
  if(layer.type!=='symbol')continue;
  const current=map.getLayoutProperty(layer.id,'text-field');
  if(current&&JSON.stringify(current).includes('name'))map.setLayoutProperty(layer.id,'text-field',field as maplibregl.ExpressionSpecification);
 }
}
const token=(name:string)=>getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const round=(n:number)=>Math.round(n*1e5)/1e5;

export default function ResultsMap(props:Props){
 const holder=useRef<HTMLDivElement>(null),canvas=useRef<HTMLDivElement>(null),map=useRef<maplibregl.Map|null>(null);
 const markers=useRef(new Map<string,{marker:maplibregl.Marker;element:HTMLButtonElement}>()),latest=useRef(props);
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{latest.current=props;});
 useEffect(()=>{
  const element=canvas.current!;
  let instance:maplibregl.Map;
  try {
   maplibregl.setWorkerUrl(`/vendor/maplibre/${maplibregl.getVersion()}/maplibre-gl-worker.mjs`);
   instance=new maplibregl.Map({container:element,style:mapStyleUrl,attributionControl:{compact:false},center:thailandView.center,zoom:thailandView.zoom,dragRotate:false,pitchWithRotate:false,touchPitch:false});
  }catch{setFailed(true);return;}
  instance.touchZoomRotate.disableRotation();instance.keyboard.disableRotation();
  instance.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
  map.current=instance;
  const {bbox,pins}=latest.current;
  if(bbox){const [w,s,e,n]=bbox.split(',').map(Number);instance.fitBounds([[w,s],[e,n]],{animate:false,padding:0});}
  else if(pins.length){const bounds=new maplibregl.LngLatBounds();for(const p of pins)bounds.extend([p.lng,p.lat]);instance.fitBounds(bounds,{animate:false,padding:56,maxZoom:14});}
  let loaded=false;
  instance.on('error',()=>{if(!loaded)setFailed(true);});
  instance.on('load',()=>{
   loaded=true;setFailed(false);localize(instance,latest.current.language);element.dataset.labels=latest.current.language;
   const ink=token('--ink');
   instance.addSource(AREAS,{type:'geojson',data:areas(latest.current.pins),promoteId:'id'});
   instance.addLayer({id:'mstar-area-fill',type:'fill',source:AREAS,paint:{'fill-color':ink,'fill-opacity':['case',['boolean',['feature-state','hl'],false],.2,.08]}});
   instance.addLayer({id:'mstar-area-line',type:'line',source:AREAS,paint:{'line-color':ink,'line-width':1.5,'line-dasharray':[2,2]}});
   setReady(true);
  });
  // Only user gestures (drag, wheel, keyboard, zoom buttons) search; programmatic fits never do.
  instance.on('moveend',event=>{
   if(!('originalEvent' in event)||!event.originalEvent||!latest.current.searchAsMove)return;
   const b=instance.getBounds(),west=Math.max(-180,round(b.getWest())),east=Math.min(180,round(b.getEast()));
   const south=Math.max(-90,round(b.getSouth())),north=Math.min(90,round(b.getNorth()));
   if(west<east&&south<north)latest.current.onMove([west,south,east,north].join(','));
  });
  const phone=matchMedia('(max-width:720px)').matches;
  animateSurface(holder.current!,phone?[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}]:[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],phone?'med':'overlay');
  const registry=markers.current;
  return()=>{instance.remove();map.current=null;registry.clear();};
 },[]);
 // Keep price pins (and area labels) in step with the current search results.
 useEffect(()=>{
  const instance=map.current;if(!instance)return;
  const seen=new Set<string>();
  for(const pin of props.pins){
   seen.add(pin.id);
   const price=compactPrice(pin.price,pin.period,props.language),label=`${pin.title}, ${price}${pin.area?`. ${props.labels.area}`:''}`;
   const existing=markers.current.get(pin.id);
   if(existing){existing.element.textContent=price;existing.element.setAttribute('aria-label',label);existing.marker.setLngLat([pin.lng,pin.lat]);continue;}
   const element=document.createElement('button');
   element.type='button';element.className=`map-pin${pin.area?' area':''}`;element.dataset.pinId=pin.id;element.textContent=price;
   element.addEventListener('mouseenter',()=>latest.current.onHighlight(pin.id));element.addEventListener('mouseleave',()=>latest.current.onHighlight(null));
   element.addEventListener('focus',()=>latest.current.onHighlight(pin.id));element.addEventListener('blur',()=>latest.current.onHighlight(null));
   element.addEventListener('click',event=>{event.stopPropagation();const current=latest.current.pins.find(p=>p.id===pin.id);if(current)latest.current.onSelect(current);});
   const marker=new maplibregl.Marker({element,anchor:'center'}).setLngLat([pin.lng,pin.lat]).addTo(instance);
   element.setAttribute('aria-label',label);
   markers.current.set(pin.id,{marker,element});
  }
  for(const [id,{marker}] of markers.current)if(!seen.has(id)){marker.remove();markers.current.delete(id);}
  if(ready)(instance.getSource(AREAS) as maplibregl.GeoJSONSource|undefined)?.setData(areas(props.pins));
 },[props.pins,props.language,props.labels.area,ready]);
 // Card ↔ pin highlight.
 useEffect(()=>{
  const instance=map.current;
  for(const [id,{element}] of markers.current){const on=id===props.highlighted;element.classList.toggle('is-highlighted',on);element.style.zIndex=on?'3':'';}
  if(!instance||!ready)return;
  for(const pin of props.pins)if(pin.area)instance.setFeatureState({source:AREAS,id:pin.id},{hl:pin.id===props.highlighted});
 },[props.highlighted,props.pins,ready]);
 return <div ref={holder} className="results-map-surface">
  <div ref={canvas} className="results-map-canvas" role="region" aria-label={props.labels.map}/>
  {failed?<p className="map-note" role="alert">{props.labels.failed}</p>:null}
 </div>;
}
