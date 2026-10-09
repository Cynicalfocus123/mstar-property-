'use client';

import { useEffect, useId, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type CSSProperties } from 'react';

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
  useEffect(()=>{
    if(!open)return;
    const dialog=ref.current;
    if(!dialog)return;
    const previous=document.activeElement as HTMLElement | null;
    const overflow=document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow='hidden';
    dialog.querySelector<HTMLElement>('[data-initial-focus]')?.focus();
    return ()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus();};
  },[open]);
  if(!open)return null;
  return <dialog ref={ref} className={`modal${sheet?' sheet':''} ${className}`} style={style} aria-labelledby={titleId}
    onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const focusable=event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]');
      const first=focusable[0], last=focusable[focusable.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
    }}
    onCancel={event=>{event.preventDefault();onClose();}} onClick={event=>{if(event.target===event.currentTarget)onClose();}}>
    <div className="modal-content"><div className="modal-head"><h2 id={titleId}>{title}</h2><button type="button" aria-label={closeLabel} className="icon-button" onClick={onClose}>×</button></div>{children}</div>
  </dialog>;
}
