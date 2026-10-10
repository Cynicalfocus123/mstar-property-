'use client';
import {useEffect,useState} from 'react';
const storageKey='mstar-saved-homes';
function readSaved():string[]{try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value.filter(v=>typeof v==='string').slice(0,500):[];}catch{return [];}}
export function useSavedHome(id:string){
 const [saved,setSaved]=useState(false),[storageError,setStorageError]=useState(false);
 useEffect(()=>{const sync=()=>setSaved(readSaved().includes(id));sync();window.addEventListener('storage',sync);window.addEventListener(storageKey,sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener(storageKey,sync);};},[id]);
 function toggle(){try{const ids=readSaved();localStorage.setItem(storageKey,JSON.stringify(ids.includes(id)?ids.filter(value=>value!==id):[...new Set([...ids,id])].slice(-500)));setStorageError(false);window.dispatchEvent(new Event(storageKey));}catch{setStorageError(true);}}
 return {saved,storageError,toggle};
}
