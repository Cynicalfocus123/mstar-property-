import { copy, type Language } from '@/lib/i18n';

export function ChatButtons({ language }: {language:Language}) {
  const t=copy[language];
  const line=process.env.NEXT_PUBLIC_LINE_ID?.replace(/^@/,'');
  const whatsapp=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[+\s-]/g,'');
  return <div><div className="chat-buttons">
    {line && /^[A-Za-z0-9._-]+$/.test(line)?<a className="btn line" href={`https://line.me/R/ti/p/@${line}`}>{t.chatLine}</a>:<button className="btn line" disabled title={t.chatPending}>{t.chatLine}</button>}
    {whatsapp && /^\d{7,15}$/.test(whatsapp)?<a className="btn wa" href={`https://wa.me/${whatsapp}`}>{t.chatWhatsApp}</a>:<button className="btn wa" disabled title={t.chatPending}>{t.chatWhatsApp}</button>}
  </div>{!line || !whatsapp?<p className="muted small">{t.chatPending}</p>:null}</div>;
}
