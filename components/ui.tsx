'use client';

import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import {animateSurface} from '@/lib/motion';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'acc' | 'out' | 'line' | 'wa' };
export function Button({ variant='out', className='', ...props }: ButtonProps) {
  return <button type="button" {...props} className={`btn ${variant} ${className}`} />;
}
export function Input({ label, className='', ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const generated = useId();
  const id=props.id ?? generated;
  return <label className={`field ${className}`} htmlFor={id}><span>{label}</span><input {...props} id={id} autoFocus={false} data-initial-focus={props.autoFocus?'true':undefined} /></label>;
}
export function Chip({ active=false, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button type="button" {...props} aria-pressed={active} className={`chip${active?' on':''}`} />;
}
export function Skeleton({ label, className='' }: { label: string; className?: string }) {
  return <div role="status" className={`skeleton ${className}`} aria-label={label} />;
}
export function Tabs({ items, value, onChange, label }: { items: {value:string;label:string}[]; value:string; onChange:(value:string)=>void; label:string }) {
  const ref=useRef<HTMLDivElement>(null);
  return <div className="tabs" role="tablist" aria-label={label} ref={ref}>
    {items.map((item,index)=><button key={item.value} type="button" role="tab" aria-selected={value===item.value} tabIndex={value===item.value?0:-1}
      onClick={()=>onChange(item.value)} onKeyDown={event=>{
        const movement=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
        if(!movement && event.key!=='Home' && event.key!=='End')return;
        event.preventDefault();
        const next=event.key==='Home'?0:event.key==='End'?items.length-1:(index+movement+items.length)%items.length;
        onChange(items[next].value);
        ref.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next].focus();
      }}>{item.label}</button>)}
  </div>;
}
export function Modal({ open, title, closeLabel, onClose, children, sheet=false, className='', style }: {open:boolean;title:string;closeLabel:string;onClose:()=>void;children:ReactNode;sheet?:boolean;className?:string;style?:CSSProperties}) {
  const ref=useRef<HTMLDialogElement>(null);
  const titleId=useId();
  const content=useRef({title,children});
  if(open)content.current={title,children};
  const [present,setPresent]=useState(open);
  useEffect(()=>{if(open)setPresent(true);},[open]);
  useEffect(()=>{
    if(!present)return;
    const dialog=ref.current;
    if(!dialog)return;
    const previous=document.activeElement as HTMLElement | null;
    const overflow=document.body.style.overflow;
    const padding=document.body.style.paddingRight;
    const scrollbar=window.innerWidth-document.documentElement.clientWidth;
    if(scrollbar)document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+scrollbar}px`;
    dialog.showModal(); document.body.style.overflow='hidden';
    dialog.querySelector<HTMLElement>('[data-initial-focus]')?.focus();
    return ()=>{dialog.close();document.body.style.overflow=overflow;document.body.style.paddingRight=padding;previous?.focus();};
  },[present]);
  useEffect(()=>{
    const dialog=ref.current;if(!present||!dialog)return;
    dialog.inert=!open;
    const phoneSheet=sheet&&window.matchMedia('(max-width: 720px)').matches;
    const shifted=phoneSheet?'translateY(100%)':'translateY(8px)';
    const frames=open?[{opacity:0,transform:shifted},{opacity:1,transform:'translateY(0)'}]:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:shifted}];
    const motion=animateSurface(dialog,frames,phoneSheet?'med':'overlay');
    let cancelled=false;void motion.finished.then(()=>{if(!cancelled&&!open)setPresent(false);});
    return()=>{cancelled=true;motion.cancel();};
  },[open,present,sheet]);
  if(!present)return null;
  return <dialog ref={ref} className={`modal${sheet?' sheet':''} ${className}`} style={style} aria-labelledby={titleId} data-closing={!open?'true':undefined}
    onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const focusable=event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]');
      const first=focusable[0], last=focusable[focusable.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
    }}
    onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}}>
    <div className="modal-content"><div className="modal-head"><h2 id={titleId}>{open?title:content.current.title}</h2><button type="button" aria-label={closeLabel} className="icon-button" onClick={onClose}>×</button></div>{open?children:content.current.children}</div>
  </dialog>;
}
