'use client';

// The only imperative motion boundary. Durations/easing come from the shared CSS tokens.
export type MotionKind='fast'|'med'|'slide'|'photo'|'overlay';
export function reducedMotion(){return window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
export function motionDuration(kind:MotionKind,element:Element=document.documentElement){
 const value=getComputedStyle(element).getPropertyValue(`--dur-${kind}`).trim();
 return reducedMotion()?0:parseFloat(value)*(value.endsWith('ms')?1:1000);
}
export function animateSurface(element:HTMLElement,frames:Keyframe[],kind:MotionKind){
 const duration=motionDuration(kind,element);
 if(!duration)return {finished:Promise.resolve(),cancel:()=>{}};
 const animation=element.animate(frames,{duration,easing:getComputedStyle(element).getPropertyValue('--ease-out').trim()});
 const media=window.matchMedia('(prefers-reduced-motion: reduce)'),finish=()=>{if(media.matches)animation.finish();};
 media.addEventListener('change',finish);
 const finished=animation.finished.catch(()=>{}).finally(()=>media.removeEventListener('change',finish));
 return {finished,cancel:()=>animation.cancel()};
}
// Invert the approved cubic-bezier x coordinate; use the same curve as CSS/WAAPI.
function easeOut(progress:number){
 let low=0,high=1,t=progress;
 for(let n=0;n<14;n++){t=(low+high)/2;const x=3*(1-t)**2*t*.22+3*(1-t)*t*t*.36+t**3;if(x<progress)low=t;else high=t;}
 return 3*(1-t)**2*t*.61+3*(1-t)*t*t+t**3;
}
type RailMotion={target:number;cancel:()=>void};
const rails=new WeakMap<HTMLElement,RailMotion>();
export function cancelRailMotion(element:HTMLElement){rails.get(element)?.cancel();}
export function settleRail(element:HTMLElement){
 if(rails.has(element)||element.children.length<2)return;
 const cards=Array.from(element.children) as HTMLElement[],stride=cards[1].offsetLeft-cards[0].offsetLeft;
 const maximum=element.scrollWidth-element.clientWidth;
 // Native touch keeps its clamped physical end; correct interrupted gestures between edges.
 if(stride>0&&element.scrollLeft<maximum-1&&Math.abs(element.scrollLeft-Math.round(element.scrollLeft/stride)*stride)>1)moveRail(element,0);
}
export function moveRail(element:HTMLElement,direction:number){
 const cards=Array.from(element.children) as HTMLElement[];
 if(cards.length<2)return;
 const stride=cards[1].offsetLeft-cards[0].offsetLeft,gap=parseFloat(getComputedStyle(element).columnGap)||0;
 if(stride<=0)return;
 const visible=Math.max(1,Math.floor((element.clientWidth+gap+1)/stride));
 const maximum=element.scrollWidth-element.clientWidth;
 const from=element.scrollLeft,previous=rails.get(element),base=previous?.target??from;
 const last=Math.floor((maximum+1)/stride);
 const target=Math.min(maximum,Math.max(0,Math.min(last,Math.round(base/stride)+direction*visible)*stride));
 previous?.cancel();
 const snap=element.style.scrollSnapType;
 element.style.scrollSnapType='none';element.dataset.motion='scrolling';
 const duration=motionDuration('slide',element),media=window.matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,start:number|undefined,ended=false;
 const cleanup=()=>{cancelAnimationFrame(frame);element.style.scrollSnapType=snap;delete element.dataset.motion;media.removeEventListener('change',finish);rails.delete(element);};
 const finish=()=>{if(ended)return;ended=true;element.scrollLeft=target;cleanup();};
 const cancel=()=>{if(ended)return;ended=true;cleanup();};
 rails.set(element,{target,cancel});media.addEventListener('change',finish);
 if(!duration||Math.abs(target-from)<1){finish();return;}
 const tick=(time:number)=>{start??=time;const progress=Math.min(1,(time-start)/duration);element.scrollLeft=from+(target-from)*easeOut(progress);if(progress===1)finish();else frame=requestAnimationFrame(tick);};
 frame=requestAnimationFrame(tick);
}
