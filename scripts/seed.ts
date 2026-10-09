import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import { requiredUrl } from './db-env';

export const demoId = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const label = '[FICTIONAL DEMO]';
const names = (en: string) => ({ nameEn: `${label} ${en}`, nameTh: `ข้อมูลสมมติ — ${en}` });
const now = new Date('2026-10-09T00:00:00Z');

export async function seedDemo(url: string) {
  const target = new URL(url);
  if (!['127.0.0.1','localhost','[::1]'].includes(target.hostname) || !['/mstar_property_dev','/mstar_property_step2_test'].includes(target.pathname)) {
    throw new Error('Demo seed is restricted to named local development/test databases.');
  }
  const client = postgres(url, { max: 1, onnotice: () => {} });
  const db = drizzle(client, { schema });
  try {
    await db.transaction(async tx => {
      // Reserved deterministic UUIDs must never attach demonstration data to genuine rows.
      for (const table of ['agents','locations','stations','projects','unit_types','plots','listings','listing_media','listing_nearby','enquiries','chat_clicks','users','saved_searches','filter_definitions','filter_options']) {
        const rows = await tx.execute(`SELECT 1 FROM "${table}" WHERE id::text LIKE '00000000-0000-4000-8000-%' AND NOT is_demo LIMIT 1`);
        if (rows.length) throw new Error(`Reserved demonstration ID occupied by genuine data in ${table}.`);
      }
      await tx.insert(schema.agents).values({ id: demoId(1), ...names('Example agent, not a real person'), email: 'fictional-agent@example.invalid', active: false, isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.locations).values({ id: demoId(10), ...names('Example province'), level: 'province', slug: 'fictional-demo-province', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.locations).values({ id: demoId(11), ...names('Example district'), level: 'district', parentId: demoId(10), slug: 'fictional-demo-district', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.locations).values({ id: demoId(12), ...names('Example area'), level: 'area', parentId: demoId(11), slug: 'fictional-demo-area', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.stations).values({ id: demoId(20), ...names('Example station'), line: 'BTS', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.projects).values({ id: demoId(30), ...names('Example development, not a real project'), slug: 'fictional-demo-project', locationId: demoId(12),
        descriptionEn: 'Entirely fictional test project. Prices and availability are invented for software testing.', descriptionTh: 'โครงการและราคาสมมติสำหรับทดสอบระบบเท่านั้น',
        status: 'selling', publishState: 'draft', priceVisibility: 'contact_gated', totalUnits: 3, progressPct: 0, isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.unitTypes).values({ id: demoId(40), projectId: demoId(30), ...names('Example home type'), beds: 3, baths: 2, sizeSqm: '120', priceFrom: '111111', total: 3, available: 1, isDemo: true }).onConflictDoNothing();
      for (const [i, status] of ['available','reserved','sold'].entries()) {
        await tx.insert(schema.plots).values({ id: demoId(50 + i), projectId: demoId(30), unitTypeId: demoId(40), code: `FICTIONAL-${i + 1}`, landSqwah: '50', price: '111111', status: status as 'available'|'reserved'|'sold', isDemo: true }).onConflictDoNothing();
      }
      for (const [i, type] of schema.propertyType.enumValues.entries()) {
        for (const [j, intent] of schema.intent.enumValues.entries()) {
          const n = i * 2 + j, residential = ['condo','house','townhouse','pool_villa'].includes(type);
          await tx.insert(schema.listings).values({
            id: demoId(100 + n), code: `FICTIONAL-${type.toUpperCase()}-${intent.toUpperCase()}`, slug: `fictional-demo-${type}-${intent}`,
            intent, type, status: 'active', publishState: 'published', publishedAt: now,
            titleEn: `${label} ${type} for ${intent} — not a real property`, titleTh: `ข้อมูลสมมติ — ${type} ${intent}`, descriptionEn: 'FICTIONAL test stock. All prices, sizes and availability are invented. Never advertise as genuine inventory.', descriptionTh: 'ข้อมูลและราคาสมมติสำหรับทดสอบเท่านั้น ไม่ใช่อสังหาริมทรัพย์จริง',
            addressEn: `${label} Example address`, addressTh: 'ที่อยู่สมมติ', locationId: demoId(12), agentId: demoId(1), projectId: type === 'house' ? demoId(30) : null,
            price: String(10000 + n * 11111), previousPrice: n === 0 ? '22222' : null, pricePeriod: intent === 'rent' ? 'month' : null,
            priceVisibility: n % 2 ? 'contact_gated' : 'public', beds: residential ? 2 : null, baths: residential ? 2 : null,
            sizeSqm: type === 'land' ? null : '100', landSqwah: type === 'condo' || type === 'commercial' ? null : '50',
            hotelRooms: type === 'hotel' ? 20 : null, hotelOccupancy: type === 'hotel' ? '50' : null,
            landZoning: type === 'land' ? 'FICTIONAL TEST ZONE' : null, roadFrontageM: type === 'land' ? '10' : null,
            foreignQuota: type === 'condo' ? true : null, petFriendly: residential ? true : null, featured: n === 0,
            badges: ['FICTIONAL DEMO'], isDemo: true,
          }).onConflictDoNothing();
        }
      }
      await tx.insert(schema.listingMedia).values({ id: demoId(200), listingId: demoId(100), kind: 'photo', url: 'https://example.invalid/fictional-demo.jpg', captionEn: `${label} Image not available`, captionTh: 'ภาพสมมติ', altEn: `${label} Placeholder, not a real property`, altTh: 'ภาพตัวอย่างสมมติ', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.listingNearby).values({ id: demoId(210), listingId: demoId(100), category: 'school', ...names('Example school'), distanceM: 123, source: 'fictional-demo:invented-distance-not-provider-data', fetchedAt: now, isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.listingStations).values({ listingId: demoId(100), stationId: demoId(20), distanceM: 456, source: 'fictional-demo:invented-distance-not-provider-data', fetchedAt: now, isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.users).values({ id: demoId(300), displayName: `${label} Example customer`, email: 'fictional-customer@example.invalid', authProvider: 'fictional-demo-no-login', providerSubject: 'fictional-test-subject', status: 'disabled', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.savedHomes).values({ userId: demoId(300), listingId: demoId(100) }).onConflictDoNothing();
      await tx.insert(schema.savedSearches).values({ id: demoId(310), userId: demoId(300), name: `${label} Saved search`, query: { intent: 'sale', type: 'condo', demo: true }, lang: 'en', alert: 'off', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.enquiries).values({ id: demoId(320), type: 'listing', listingId: demoId(100), agentId: demoId(1), userId: demoId(300), name: `${label} Test enquiry`, email: 'fictional-enquiry@example.invalid', phone: 'FICTIONAL-NO-PHONE', message: `${label} Do not send notifications`, consentVersion: 'fictional-demo-v1', consentAt: now, sourceUrl: '/fictional-demo-only', lang: 'en', status: 'closed', isDemo: true }).onConflictDoNothing();
      await tx.insert(schema.chatClicks).values({ id: demoId(330), listingId: demoId(100), channel: 'line', lang: 'en', isDemo: true }).onConflictDoNothing();
      const kinds = ['multi','single','number','boolean'] as const;
      for (const [i, kind] of kinds.entries()) {
        await tx.insert(schema.filterDefinitions).values({ id: demoId(400 + i), key: `fictional_${kind}`, ...names(`Example ${kind} filter`), kind, propertyTypes: ['condo'], active: false, isDemo: true }).onConflictDoNothing();
      }
      for (const i of [0, 1]) {
        await tx.insert(schema.filterOptions).values({ id: demoId(410 + i), definitionId: demoId(400 + i), value: `fictional_option_${i}`, ...names('Example option'), active: false, isDemo: true }).onConflictDoNothing();
      }
      for (const i of [0, 1, 2, 3]) {
        await tx.insert(schema.listingFilterValues).values({ id: demoId(420 + i), listingId: demoId(100), definitionId: demoId(400 + i), optionId: i < 2 ? demoId(410 + i) : null, numberValue: i === 2 ? '123' : null, booleanValue: i === 3 ? true : null }).onConflictDoNothing();
      }
    });
  } finally { await client.end(); }
}
if (process.argv[1]?.endsWith('seed.ts')) {
  await seedDemo(requiredUrl('DATABASE_MIGRATION_URL'));
  console.log('Fictional seed applied: 14 demo listings covering seven types and both intents. Public view excludes all demo stock.');
}
