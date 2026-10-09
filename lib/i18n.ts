export const languages = ['th', 'en'] as const;
export type Language = typeof languages[number];
export const isLanguage = (value: string): value is Language => languages.includes(value as Language);

export function preferredLanguage(header: string | null): Language {
  const choices = (header ?? '').split(',').map((item, index) => {
    const [tag, ...parameters] = item.trim().toLowerCase().split(';');
    const q = parameters.find(parameter => parameter.trim().startsWith('q='));
    return { language: tag.split('-')[0], weight: q ? Number(q.trim().slice(2)) : 1, index };
  }).filter(choice => isLanguage(choice.language) && choice.weight > 0 && choice.weight <= 1)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return (choices[0]?.language as Language | undefined) ?? 'th';
}

export const copy = {
  en: {
    buy: 'Buy', rent: 'Rent', projects: 'New projects', invest: 'Investment', services: 'Services',
    saved: 'Saved', list: 'List your property', signin: 'Sign in', explore: 'Explore', search: 'Search',
    account: 'Account', line: 'LINE chat', preferences: 'Language and currency', language: 'Language',
    currency: 'Currency', apply: 'Apply', close: 'Close', skip: 'Skip to content',
    hero: 'Find your place in Thailand', lead: 'Condos, houses, land and hotels in Bangkok, Pattaya, Phuket and Rayong.',
    location: 'Location', where: 'Where?', locationHint: 'Area, BTS/MRT, project', type: 'Type', price: 'Price', budget: 'Budget', beds: 'Beds',
    anyType: 'Any type', anyPrice: 'Any price', anyBeds: 'Any', sale: 'Homes for sale', renting: 'Homes for rent',
    investing: 'Investment properties', company: 'Company', help: 'Help', about: 'About', contact: 'Contact', privacy: 'Privacy (PDPA)',
    guide: 'Buying guide', valuation: 'What is my home worth?', hours: 'Open every day 09:00–18:00',
    coming: 'Coming soon', pending: 'We’re preparing this page. Please check back soon.',
    chatPending: 'Chat contacts will be added soon.', chatLine: 'Chat on LINE', chatWhatsApp: 'Chat on WhatsApp',
    authPending: 'Sign in will be available soon.', contactUs: 'Contact us', unavailable: 'Unavailable',
  },
  th: {
    buy: 'ซื้อ', rent: 'เช่า', projects: 'โครงการใหม่', invest: 'การลงทุน', services: 'บริการ',
    saved: 'รายการที่บันทึก', list: 'ฝากขายทรัพย์', signin: 'เข้าสู่ระบบ', explore: 'สำรวจ', search: 'ค้นหา',
    account: 'บัญชี', line: 'แชท LINE', preferences: 'ภาษาและสกุลเงิน', language: 'ภาษา',
    currency: 'สกุลเงิน', apply: 'ยืนยัน', close: 'ปิด', skip: 'ข้ามไปยังเนื้อหา',
    hero: 'ค้นหาบ้านที่ใช่ในประเทศไทย', lead: 'คอนโด บ้าน ที่ดิน และโรงแรมในกรุงเทพฯ พัทยา ภูเก็ต และระยอง',
    location: 'ทำเล', where: 'ค้นหาทำเล', locationHint: 'ย่าน สถานี BTS/MRT โครงการ', type: 'ประเภท', price: 'ราคา', budget: 'งบประมาณ', beds: 'ห้องนอน',
    anyType: 'ทุกประเภท', anyPrice: 'ทุกราคา', anyBeds: 'ไม่จำกัด', sale: 'บ้านและคอนโดสำหรับขาย', renting: 'บ้านและคอนโดให้เช่า',
    investing: 'อสังหาริมทรัพย์เพื่อการลงทุน', company: 'บริษัท', help: 'ช่วยเหลือ', about: 'เกี่ยวกับเรา', contact: 'ติดต่อเรา', privacy: 'ความเป็นส่วนตัว (PDPA)',
    guide: 'คู่มือการซื้อ', valuation: 'ประเมินราคาทรัพย์ของฉัน', hours: 'เปิดทุกวัน 09:00–18:00 น.',
    coming: 'เร็ว ๆ นี้', pending: 'เรากำลังเตรียมหน้านี้ กรุณากลับมาเยี่ยมชมอีกครั้ง',
    chatPending: 'เราจะเพิ่มช่องทางแชทเร็ว ๆ นี้', chatLine: 'แชททาง LINE', chatWhatsApp: 'แชททาง WhatsApp',
    authPending: 'ระบบเข้าสู่ระบบจะเปิดให้บริการเร็ว ๆ นี้', contactUs: 'ติดต่อเรา', unavailable: 'ยังไม่พร้อมใช้งาน',
  },
};
