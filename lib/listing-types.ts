import type {PropertyType,SearchState} from './search-state';
export type Choice={value:string;nameTh:string;nameEn:string};
export type FilterDefinition=Choice & {kind:'single'|'multi'|'number'|'boolean';types:PropertyType[];options:Choice[]};
export type SearchMetadata={locations:Choice[];stations:Choice[];projects:Choice[];filters:FilterDefinition[]};
export type ListingPhoto={url:string;alt:string};
export type ListingCardData={id:string;code:string;slug:string;type:PropertyType;intent:'sale'|'rent';title:string;address:string;area:string;price:number|null;previousPrice:number|null;period:'month'|'year'|null;beds:number|null;baths:number|null;floor:number|null;buildingFloors:number|null;size:number|null;land:number|null;frontage:number|null;rooms:number|null;occupancy:number|null;stationDistance:number|null;stationLine:string|null;featured:boolean;video:boolean;mstar:boolean;isNew:boolean;demo:boolean;photos:ListingPhoto[]};
export type HistogramBin={min:number;max:number;count:number};
// area=true: hidden exact location. lat/lng are then a rounded area centre (0.01°), never the exact point.
export type MapPin={id:string;code:string;slug:string;title:string;intent:'sale'|'rent';price:number|null;period:'month'|'year'|null;area:boolean;lat:number;lng:number};
export type SearchResults={state:SearchState;items:ListingCardData[];total:number;hasMore:boolean;histogram:HistogramBin[];metadata:SearchMetadata;demo:boolean;locationName:string|null;pins?:MapPin[];error?:string};
