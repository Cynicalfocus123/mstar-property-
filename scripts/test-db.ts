import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import postgres from 'postgres';
import { requiredUrl } from './db-env';
import { applyMigrations } from './migrate';
import { seedDemo, demoId } from './seed';

const url = requiredUrl('DATABASE_TEST_URL');
const target = new URL(url);
if (!['localhost','127.0.0.1','[::1]'].includes(target.hostname) || target.pathname !== '/mstar_property_step2_test') {
  throw new Error('DB tests only operate on the named local mstar_property_step2_test database.');
}
const bin = process.env.MSTAR_PG_BIN;
if (!bin) throw new Error('Set MSTAR_PG_BIN for real pg_dump/pg_restore rollback verification.');
const client = postgres(url, { max: 1, onnotice: () => {} });
const passed: string[] = [];
const migrationCount = JSON.parse(await readFile('db/migrations/meta/_journal.json','utf8')).entries.length;
async function test(name: string, work: () => Promise<unknown>) {
  await work(); passed.push(name); console.log(`PASS ${name}`);
}
async function reject(query: () => Promise<unknown>, code: string) {
  await assert.rejects(query, (error: unknown) => (error as { code?: string }).code === code);
}
try {
  await test('real PostgreSQL connection and non-superuser migration role', async () => {
    const [role] = await client`select rolsuper,rolcreatedb,rolcreaterole from pg_roles where rolname=current_user`;
    assert.deepEqual(role, { rolsuper: false, rolcreatedb: false, rolcreaterole: false });
    const [version] = await client`select version() as version`;
    assert.match(version.version, /^PostgreSQL /);
  });
  await test('migrations apply and rerun without duplication', async () => {
    await applyMigrations(url); await applyMigrations(url);
    const [result] = await client`select count(*)::int as count from drizzle.__drizzle_migrations`;
    assert.equal(result.count, migrationCount);
    const [tables] = await client`select count(*)::int as count from information_schema.tables where table_schema='public' and table_type='BASE TABLE'`;
    assert.equal(tables.count, 19); // 18 core tables + osm_places (Step 4)
  });
  await test('fictional seed is repeatable and public stock remains empty', async () => {
    await seedDemo(url); await seedDemo(url);
    const [rows] = await client`select count(*)::int as count, bool_and(is_demo AND title_en LIKE '[FICTIONAL DEMO]%') as fictional, count(distinct type)::int as types, count(distinct intent)::int as intents from listings`;
    assert.deepEqual(rows, { count: 14, fictional: true, types: 7, intents: 2 });
    assert.equal((await client`select count(*)::int as count from public_listings`)[0].count, 0);
    assert.equal((await client`select count(*)::int as count from listing_filter_values`)[0].count, 4);
    assert.equal((await client`select count(*)::int as count from enquiries where is_demo and consent_version='fictional-demo-v1' and status='closed'`)[0].count, 1);
  });
  await test('joins cover projects/plots/units, agents, places, saved data and enquiries', async () => {
    const [row] = await client`select l.id,a.name_en,p.name_en as project_name,u.name_en as unit_name,pl.code,loc.name_en as area
      from listings l join agents a on a.id=l.agent_id join projects p on p.id=l.project_id
      join plots pl on pl.project_id=p.id join unit_types u on u.id=pl.unit_type_id join locations loc on loc.id=l.location_id
      where l.type='house' and l.intent='sale' and pl.status='available'`;
    assert.equal(row.id, demoId(102)); assert.equal(row.code, 'FICTIONAL-1'); assert.match(row.name_en, /FICTIONAL DEMO/);
    assert.equal((await client`select count(*)::int as count from saved_listings s join users u on u.id=s.user_id join listings l on l.id=s.listing_id join enquiries e on e.listing_id=l.id join listing_nearby n on n.listing_id=l.id join listing_stations ls on ls.listing_id=l.id join stations st on st.id=ls.station_id`)[0].count, 1);
  });
  await test('type-specific bounds, statuses, bilingual content, FK and unique keys reject invalid writes', async () => {
    const id = demoId(100);
    for (const update of [
      client`update listings set beds=null where id=${id}`, client`update listings set price=-1 where id=${id}`,
      client`update listings set price_period='month' where id=${id}`, client`update listings set status='rented' where id=${id}`,
      client`update listings set title_en='' where id=${id}`, client`update listings set published_at=null where id=${id}`,
      client`update listings set hotel_rooms=1 where id=${id}`, client`update listings set lat=91,lng=0 where id=${id}`,
      client`update listings set type_fields='[]' where id=${id}`, client`update listings set title_en='Real property' where id=${id}`,
      client`update listings set road_frontage_m=1 where id=${id}`,
    ]) await reject(() => update, '23514');
    await reject(() => client`update listings set agent_id=${demoId(99999)} where id=${id}`, '23503');
    await reject(() => client`update listings set code='FICTIONAL-CONDO-RENT' where id=${id}`, '23505');
    await reject(() => client`update listings set land_sqwah=null where type='land'`, '23514');
    await reject(() => client`update listings set hotel_occupancy=101 where type='hotel'`, '23514');
    await reject(() => client`update unit_types set available=4 where id=${demoId(40)}`, '23514');
    await reject(() => client`update listing_media set url='javascript:alert(1)'`, '23514');
    await reject(() => client`update listing_media set alt_en=null`, '23514');
    await reject(() => client`update enquiries set consent_version=''`, '23514');
    await reject(() => client`update enquiries set email=null where type='listing'`, '23514');
  });
  await test('location hierarchy and plot/project relationships are enforced', async () => {
    await reject(() => client`update locations set parent_id=${demoId(10)} where id=${demoId(12)}`, '23514');
    await reject(() => client`update locations set parent_id=${demoId(12)} where id=${demoId(11)}`, '23514');
    await reject(() => client`update plots set project_id=${demoId(999)} where id=${demoId(50)}`, '23503');
    await reject(() => client`update enquiries set plot_id=${demoId(50)},project_id=null`, '23514');
  });
  await test('admin filter kinds, scope, composite keys and single selection are enforced', async () => {
    await reject(() => client`update listing_filter_values set definition_id=${demoId(403)} where id=${demoId(420)}`, '23514');
    await reject(() => client`update listing_filter_values set listing_id=${demoId(106)} where id=${demoId(420)}`, '23514');
    await reject(() => client`update listing_filter_values set option_id=${demoId(411)} where id=${demoId(420)}`, '23503');
    await reject(() => client`update filter_definitions set kind='number' where id=${demoId(400)}`, '23514');
    await reject(() => client`insert into filter_options (definition_id,value,name_th,name_en) values (${demoId(402)},'invalid','ทดสอบ','test')`, '23514');
    await reject(() => client`insert into listing_filter_values (listing_id,definition_id,option_id) values (${demoId(100)},${demoId(401)},${demoId(411)})`, '23514');
    await reject(() => client`update listing_filter_values set number_value=12 where id=${demoId(420)}`, '23514');
  });
  await test('parameterized inserts persist consent and joins; rollback leaves no fixture data', async () => {
    class FixtureRollback extends Error {}
    await assert.rejects(() => client.begin(async tx => {
      const [record] = await tx`insert into enquiries (type,listing_id,agent_id,name,email,phone,message,consent_version,consent_at,source_url,lang,is_demo)
        values ('listing',${demoId(100)},${demoId(1)},'[FICTIONAL DEMO] insert test','insert@example.invalid','FICTIONAL',${"'); DROP TABLE listings; --"},'test-consent-v1',now(),'/db-test','th',true) returning id`;
      const [stored] = await tx`select e.consent_version,e.lang,e.message,l.code from enquiries e join listings l on l.id=e.listing_id where e.id=${record.id}`;
      assert.equal(stored.consent_version, 'test-consent-v1'); assert.equal(stored.lang, 'th'); assert.match(stored.message, /DROP TABLE/);
      const [before] = await tx`select updated_at from agents where id=${demoId(1)}`;
      await tx`update agents set active=false where id=${demoId(1)}`;
      const [after] = await tx`select updated_at from agents where id=${demoId(1)}`;
      assert.ok(after.updated_at > before.updated_at);
      throw new FixtureRollback();
    }), FixtureRollback);
    assert.equal((await client`select count(*)::int as count from enquiries`)[0].count, 1);
  });
  await test('public projection hides demo stock, gated price, exact address and coordinates', async () => {
    class FixtureRollback extends Error {}
    await assert.rejects(() => client.begin(async tx => {
      await tx`update locations set is_demo=false where id=${demoId(12)}`;
      await tx`update listings set is_demo=false,lat=10,lng=100,hide_exact=true,price_visibility='contact_gated' where id=${demoId(100)}`;
      const [publicRow] = await tx`select price,previous_price,lat,lng,address_en,address_th from public_listings where id=${demoId(100)}`;
      assert.deepEqual(publicRow, { price: null, previous_price: null, lat: null, lng: null, address_en: null, address_th: null });
      await tx`update listings set publish_state='draft' where id=${demoId(100)}`;
      assert.equal((await tx`select count(*)::int as count from public_listings`)[0].count, 0);
      throw new FixtureRollback();
    }), FixtureRollback);
  });
  await test('search, bounds and bilingual text indexes exist and query plans use them', async () => {
    const indexes = await client`select indexname from pg_indexes where schemaname='public' and tablename='listings'`;
    for (const name of ['listings_search_idx','listings_location_idx','listings_bbox_idx','listings_text_idx','listings_feed_idx']) assert.ok(indexes.some(i => i.indexname === name));
    await client.begin(async tx => {
      await tx`set local enable_seqscan=off`;
      for (const [query, name] of [
        ["select * from listings where intent='sale' and type='condo' and status='active' and price between 1 and 20000", 'listings_search_idx'],
        ["select * from listings where lat between 0 and 90 and lng between 0 and 180", 'listings_bbox_idx'],
        ["select * from listings where to_tsvector('simple',coalesce(title_th,'')||' '||coalesce(title_en,'')||' '||coalesce(address_th,'')||' '||coalesce(address_en,'')) @@ plainto_tsquery('simple','fictional')", 'listings_text_idx'],
      ]) {
        const plan = await tx.unsafe(`EXPLAIN (FORMAT JSON) ${query}`); assert.ok(JSON.stringify(plan).includes(name));
      }
    });
  });
  await test('runtime role can read health/public projection but cannot write or create schema', async () => {
    const app = postgres(requiredUrl('DATABASE_TEST_APP_URL'), { max: 1, onnotice: () => {} });
    try {
      await app`select id from public_listings limit 0`;
      await reject(() => app`update listings set price=1`, '42501');
      await reject(() => app`create table forbidden (id int)`, '42501');
      await reject(() => app`select * from drizzle.__drizzle_migrations`, '42501');
    } finally { await app.end(); }
  });
  await test('real pg_dump backup, committed rollback, restore and migration rerun preserve seed', async () => {
    for (const table of ['agents','locations','stations','projects','unit_types','plots','listings','listing_media','listing_nearby','listing_stations','enquiries','chat_clicks','users','saved_searches','filter_definitions','filter_options']) {
      const [result] = await client.unsafe(`SELECT count(*)::int AS count FROM "${table}" WHERE NOT is_demo`);
      assert.equal(result.count, 0, `Genuine records in ${table}; destructive test rollback refused.`);
    }
    await mkdir('.local/backups', { recursive: true });
    const file = '.local/backups/step2-test.dump';
    const args = ['-h', target.hostname, '-p', target.port || '5432', '-U', decodeURIComponent(target.username), '-d', target.pathname.slice(1)];
    const options = { env: { ...process.env, PGPASSWORD: decodeURIComponent(target.password) }, windowsHide: true, stdio: 'pipe' as const };
    execFileSync(join(bin, 'pg_dump.exe'), [...args, '-Fc', '-f', file], options);
    const rollback = await readFile('db/rollback-initial.sql', 'utf8');
    await client.begin(async tx => { await tx.unsafe(rollback); });
    assert.equal((await client`select to_regclass('public.listings') as table`)[0].table, null);
    execFileSync(join(bin, 'pg_restore.exe'), [...args, '--exit-on-error', '--no-owner', '--no-privileges', file], options);
    await applyMigrations(url); await seedDemo(url);
    assert.equal((await client`select count(*)::int as count from listings`)[0].count, 14);
    assert.equal((await client`select count(*)::int as count from drizzle.__drizzle_migrations`)[0].count, migrationCount);
  });
  await writeFile('.local/step2-db-results.json', JSON.stringify({ date: new Date().toISOString(), passed, database: 'mstar_property_step2_test', demoListings: 14, appTables: 19 }, null, 2));
  console.log(`${passed.length}/${passed.length} PostgreSQL groups passed. Evidence: .local/step2-db-results.json`);
} finally { await client.end(); }
