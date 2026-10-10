import { sql } from 'drizzle-orm';
import {
  pgTable, pgEnum, uuid, text, boolean, integer, numeric, timestamp, jsonb,
  check, index, uniqueIndex, unique, foreignKey, primaryKey, type AnyPgColumn,
} from 'drizzle-orm/pg-core';

export const propertyType = pgEnum('property_type', ['condo', 'house', 'townhouse', 'land', 'hotel', 'commercial', 'pool_villa']);
export const intent = pgEnum('listing_intent', ['sale', 'rent']);
export const listingStatus = pgEnum('listing_status', ['draft', 'active', 'reserved', 'sold', 'rented']);
export const publishState = pgEnum('publish_state', ['draft', 'published', 'archived']);
export const priceVisibility = pgEnum('price_visibility', ['public', 'contact_gated']);
export const pricePeriod = pgEnum('price_period', ['month', 'year']);
export const locationLevel = pgEnum('location_level', ['province', 'district', 'area']);
export const stationLine = pgEnum('station_line', ['BTS', 'MRT', 'ARL', 'SRT']);
export const projectStatus = pgEnum('project_status', ['coming_soon', 'selling', 'ready', 'sold_out']);
export const plotStatus = pgEnum('plot_status', ['available', 'reserved', 'sold']);
export const mediaKind = pgEnum('media_kind', ['photo', 'floorplan', 'video', 'tour360']);
export const enquiryType = pgEnum('enquiry_type', ['listing', 'brochure', 'site_visit', 'home_value', 'service', 'contact']);
export const enquiryStatus = pgEnum('enquiry_status', ['new', 'assigned', 'contacted', 'closed']);
export const chatChannel = pgEnum('chat_channel', ['line', 'whatsapp']);
export const locale = pgEnum('locale', ['th', 'en']);
export const userRole = pgEnum('user_role', ['customer', 'agent', 'admin']);
export const userStatus = pgEnum('user_status', ['active', 'disabled']);
export const alertFrequency = pgEnum('alert_frequency', ['instant', 'daily', 'off']);
export const filterKind = pgEnum('filter_kind', ['single', 'multi', 'number', 'boolean']);

const id = () => uuid('id').defaultRandom().primaryKey();
const audit = () => ({ createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(), updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull() });
const names = () => ({ nameTh: text('name_th').notNull(), nameEn: text('name_en').notNull() });
const demo = () => boolean('is_demo').default(false).notNull();
const amount = (name: string) => numeric(name, { precision: 16, scale: 2 });
const coordinate = () => ({ lat: numeric('lat', { precision: 10, scale: 7 }), lng: numeric('lng', { precision: 10, scale: 7 }) });
const coordinates = (name: string, t: { lat: AnyPgColumn; lng: AnyPgColumn }) => check(name, sql`(${t.lat} IS NULL AND ${t.lng} IS NULL) OR (${t.lat} IS NOT NULL AND ${t.lng} IS NOT NULL AND ${t.lat} BETWEEN -90 AND 90 AND ${t.lng} BETWEEN -180 AND 180)`);
const nonemptyNames = (name: string, t: { nameTh: AnyPgColumn; nameEn: AnyPgColumn }) => check(name, sql`length(trim(${t.nameTh})) > 0 AND length(trim(${t.nameEn})) > 0`);

export const agents = pgTable('agents', {
  id: id(), ...names(), photoUrl: text('photo_url'), email: text('email'), phone: text('phone'),
  lineId: text('line_id'), whatsapp: text('whatsapp'), active: boolean('active').default(true).notNull(), isDemo: demo(), ...audit(),
}, t => [nonemptyNames('agents_names', t), check('agents_demo_label', sql`NOT ${t.isDemo} OR ${t.nameEn} LIKE '[FICTIONAL DEMO]%'`)]);

export const locations = pgTable('locations', {
  id: id(), parentId: uuid('parent_id').references((): AnyPgColumn => locations.id, { onDelete: 'restrict' }),
  level: locationLevel('level').notNull(), slug: text('slug').notNull().unique(), ...names(), ...coordinate(), isDemo: demo(), ...audit(),
}, t => [nonemptyNames('locations_names', t), coordinates('locations_coordinates', t), index('locations_parent_idx').on(t.parentId),
  check('locations_parent_shape', sql`(${t.level} = 'province' AND ${t.parentId} IS NULL) OR (${t.level} <> 'province' AND ${t.parentId} IS NOT NULL)`),
  check('locations_not_own_parent', sql`${t.parentId} IS NULL OR ${t.parentId} <> ${t.id}`)]);

export const stations = pgTable('stations', {
  id: id(), slug: text('slug').notNull().unique().default(sql`'station-' || gen_random_uuid()`), line: stationLine('line').notNull(), ...names(), ...coordinate(), isDemo: demo(), ...audit(),
}, t => [nonemptyNames('stations_names', t), coordinates('stations_coordinates', t), unique('stations_line_name_unique').on(t.line, t.nameEn)]);

export const projects = pgTable('projects', {
  id: id(), slug: text('slug').notNull().unique(), status: projectStatus('status').default('coming_soon').notNull(),
  publishState: publishState('publish_state').default('draft').notNull(), ...names(), descriptionTh: text('description_th'), descriptionEn: text('description_en'),
  locationId: uuid('location_id').notNull().references(() => locations.id, { onDelete: 'restrict' }),
  priceFrom: amount('price_from'), priceVisibility: priceVisibility('price_visibility').notNull(),
  totalUnits: integer('total_units'), completionYear: integer('completion_year'), heroMediaUrl: text('hero_media_url'), brochureUrl: text('brochure_url'),
  progressStage: text('progress_stage'), progressPct: integer('progress_pct'), progressUpdatedAt: timestamp('progress_updated_at', { withTimezone: true }),
  facilities: jsonb('facilities').$type<string[]>().default([]).notNull(), isMstar: boolean('is_mstar').default(false).notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }), isDemo: demo(), ...audit(),
}, t => [nonemptyNames('projects_names', t), index('projects_location_idx').on(t.locationId), index('projects_publish_idx').on(t.publishState, t.status),
  check('projects_numeric_bounds', sql`(${t.priceFrom} IS NULL OR ${t.priceFrom} > 0) AND (${t.totalUnits} IS NULL OR ${t.totalUnits} >= 0) AND (${t.completionYear} IS NULL OR ${t.completionYear} BETWEEN 1900 AND 2200) AND (${t.progressPct} IS NULL OR ${t.progressPct} BETWEEN 0 AND 100)`),
  check('projects_publish_required', sql`${t.publishState} <> 'published' OR (${t.publishedAt} IS NOT NULL AND ${t.descriptionTh} IS NOT NULL AND ${t.descriptionEn} IS NOT NULL)`),
  check('projects_demo_label', sql`NOT ${t.isDemo} OR ${t.nameEn} LIKE '[FICTIONAL DEMO]%'`),
  check('projects_facilities_array', sql`jsonb_typeof(${t.facilities}) = 'array'`)]);

export const unitTypes = pgTable('unit_types', {
  id: id(), projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'restrict' }), ...names(),
  beds: integer('beds').notNull(), baths: integer('baths').notNull(), sizeSqm: amount('size_sqm').notNull(), priceFrom: amount('price_from'),
  total: integer('total').notNull(), available: integer('available').notNull(), planImageUrl: text('plan_image_url'), isDemo: demo(), ...audit(),
}, t => [unique('unit_types_id_project_unique').on(t.id, t.projectId), index('unit_types_project_idx').on(t.projectId), nonemptyNames('unit_types_names', t),
  check('unit_types_bounds', sql`${t.beds} >= 0 AND ${t.baths} > 0 AND ${t.sizeSqm} > 0 AND (${t.priceFrom} IS NULL OR ${t.priceFrom} > 0) AND ${t.total} >= 0 AND ${t.available} BETWEEN 0 AND ${t.total}`)]);

export const plots = pgTable('plots', {
  id: id(), projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'restrict' }),
  unitTypeId: uuid('unit_type_id'), code: text('code').notNull(), landSqwah: amount('land_sqwah').notNull(), price: amount('price'),
  status: plotStatus('status').default('available').notNull(), polygon: jsonb('polygon').$type<{ type: 'Polygon'; coordinates: number[][][] }>(), isDemo: demo(), ...audit(),
}, t => [unique('plots_project_code_unique').on(t.projectId, t.code), unique('plots_id_project_unique').on(t.id, t.projectId),
  foreignKey({ name: 'plots_unit_project_fk', columns: [t.unitTypeId, t.projectId], foreignColumns: [unitTypes.id, unitTypes.projectId] }).onDelete('restrict'),
  index('plots_unit_idx').on(t.unitTypeId), check('plots_positive', sql`${t.landSqwah} > 0 AND (${t.price} IS NULL OR ${t.price} > 0)`),
  check('plots_polygon_shape', sql`${t.polygon} IS NULL OR (${t.polygon}->>'type' = 'Polygon' AND jsonb_typeof(${t.polygon}->'coordinates') = 'array')`)]);

export const listings = pgTable('listings', {
  id: id(), code: text('code').notNull().unique(), slug: text('slug').notNull().unique(), intent: intent('intent').notNull(), type: propertyType('type').notNull(),
  status: listingStatus('status').default('draft').notNull(), publishState: publishState('publish_state').default('draft').notNull(),
  price: amount('price'), previousPrice: amount('previous_price'), pricePeriod: pricePeriod('price_period'), priceVisibility: priceVisibility('price_visibility').notNull(),
  titleTh: text('title_th').notNull(), titleEn: text('title_en').notNull(), descriptionTh: text('description_th'), descriptionEn: text('description_en'),
  addressTh: text('address_th'), addressEn: text('address_en'), locationId: uuid('location_id').notNull().references(() => locations.id, { onDelete: 'restrict' }),
  ...coordinate(), hideExact: boolean('hide_exact').default(true).notNull(), projectId: uuid('project_id').references(() => projects.id, { onDelete: 'restrict' }),
  agentId: uuid('agent_id').notNull().references(() => agents.id, { onDelete: 'restrict' }),
  beds: integer('beds'), baths: integer('baths'), sizeSqm: amount('size_sqm'), landSqwah: amount('land_sqwah'), floor: integer('floor'), buildingFloors: integer('building_floors'), builtYear: integer('built_year'),
  furnished: boolean('furnished'), ownership: text('ownership'), foreignQuota: boolean('foreign_quota'), petFriendly: boolean('pet_friendly'),
  commonFeePerSqm: amount('common_fee_per_sqm'), parking: integer('parking'),
  landZoning: text('land_zoning'), roadFrontageM: amount('road_frontage_m'), titleDeed: text('title_deed'),
  hotelRooms: integer('hotel_rooms'), hotelOccupancy: numeric('hotel_occupancy', { precision: 5, scale: 2 }), hotelAnnualRevenue: amount('hotel_annual_revenue'), hotelLicense: text('hotel_license'),
  typeFields: jsonb('type_fields').$type<Record<string, unknown>>().default({}).notNull(), featured: boolean('featured').default(false).notNull(),
  badges: jsonb('badges').$type<string[]>().default([]).notNull(), publishedAt: timestamp('published_at', { withTimezone: true }), isDemo: demo(), ...audit(),
}, t => [
  index('listings_search_idx').on(t.intent, t.type, t.status, t.price), index('listings_location_idx').on(t.locationId, t.status),
  index('listings_bbox_idx').on(t.lat, t.lng), index('listings_project_idx').on(t.projectId), index('listings_agent_idx').on(t.agentId),
  // Map bounds use built-in PostgreSQL point/box GiST indexes. Hidden listings are indexed only by their rounded area centre.
  index('listings_point_gist_idx').using('gist', sql`point(${t.lng}::float8, ${t.lat}::float8)`).where(sql`${t.lat} IS NOT NULL AND NOT ${t.hideExact}`),
  index('listings_area_gist_idx').using('gist', sql`point(round(${t.lng}, 2)::float8, round(${t.lat}, 2)::float8)`).where(sql`${t.lat} IS NOT NULL AND ${t.hideExact}`),
  index('listings_feed_idx').on(t.publishState, t.isDemo, t.featured, t.publishedAt),
  index('listings_text_idx').using('gin', sql`to_tsvector('simple', coalesce(${t.titleTh}, '') || ' ' || coalesce(${t.titleEn}, '') || ' ' || coalesce(${t.addressTh}, '') || ' ' || coalesce(${t.addressEn}, ''))`),
  coordinates('listings_coordinates', t),
  check('listings_titles', sql`length(trim(${t.titleTh})) > 0 AND length(trim(${t.titleEn})) > 0`),
  check('listings_prices', sql`(${t.price} IS NULL OR ${t.price} > 0) AND (${t.previousPrice} IS NULL OR ${t.previousPrice} > 0)`),
  check('listings_price_intent', sql`(${t.intent} = 'sale' AND ${t.pricePeriod} IS NULL) OR (${t.intent} = 'rent' AND ${t.pricePeriod} IS NOT NULL)`),
  check('listings_status_intent', sql`(${t.status} <> 'sold' OR ${t.intent} = 'sale') AND (${t.status} <> 'rented' OR ${t.intent} = 'rent')`),
  check('listings_publish_required', sql`${t.publishState} <> 'published' OR (${t.status} <> 'draft' AND ${t.publishedAt} IS NOT NULL AND ${t.descriptionTh} IS NOT NULL AND ${t.descriptionEn} IS NOT NULL AND (${t.priceVisibility} = 'contact_gated' OR ${t.price} IS NOT NULL))`),
  check('listings_nonnegative', sql`(${t.beds} IS NULL OR ${t.beds} >= 0) AND (${t.baths} IS NULL OR ${t.baths} > 0) AND (${t.sizeSqm} IS NULL OR ${t.sizeSqm} > 0) AND (${t.landSqwah} IS NULL OR ${t.landSqwah} > 0) AND (${t.parking} IS NULL OR ${t.parking} >= 0) AND (${t.commonFeePerSqm} IS NULL OR ${t.commonFeePerSqm} >= 0) AND (${t.builtYear} IS NULL OR ${t.builtYear} BETWEEN 1800 AND 2200)`),
  check('listings_residential_fields', sql`${t.type} NOT IN ('condo','house','townhouse','pool_villa') OR (${t.beds} IS NOT NULL AND ${t.baths} IS NOT NULL AND ${t.sizeSqm} IS NOT NULL)`),
  check('listings_house_land', sql`${t.type} NOT IN ('house','townhouse','pool_villa') OR ${t.landSqwah} IS NOT NULL`),
  check('listings_land_fields', sql`${t.type} <> 'land' OR (${t.landSqwah} IS NOT NULL AND ${t.beds} IS NULL AND ${t.baths} IS NULL AND ${t.sizeSqm} IS NULL)`),
  check('listings_condo_fields', sql`${t.type} = 'condo' OR (${t.foreignQuota} IS NULL AND ${t.commonFeePerSqm} IS NULL AND ${t.floor} IS NULL)`),
  check('listings_building_floors', sql`${t.buildingFloors} IS NULL OR (${t.buildingFloors} > 0 AND ${t.type} IN ('house','townhouse','pool_villa','hotel','commercial'))`),
  check('listings_land_details', sql`${t.type} = 'land' OR (${t.landZoning} IS NULL AND ${t.roadFrontageM} IS NULL AND ${t.titleDeed} IS NULL)`),
  check('listings_hotel_fields', sql`(${t.type} = 'hotel' AND ${t.hotelRooms} IS NOT NULL AND ${t.hotelRooms} > 0 AND (${t.hotelOccupancy} IS NULL OR ${t.hotelOccupancy} BETWEEN 0 AND 100) AND (${t.hotelAnnualRevenue} IS NULL OR ${t.hotelAnnualRevenue} >= 0)) OR (${t.type} <> 'hotel' AND ${t.hotelRooms} IS NULL AND ${t.hotelOccupancy} IS NULL AND ${t.hotelAnnualRevenue} IS NULL AND ${t.hotelLicense} IS NULL)`),
  check('listings_commercial_area', sql`${t.type} <> 'commercial' OR ${t.sizeSqm} IS NOT NULL`),
  check('listings_frontage_positive', sql`${t.roadFrontageM} IS NULL OR ${t.roadFrontageM} > 0`),
  check('listings_json_shape', sql`jsonb_typeof(${t.typeFields}) = 'object' AND jsonb_typeof(${t.badges}) = 'array'`),
  check('listings_demo_label', sql`NOT ${t.isDemo} OR ${t.titleEn} LIKE '[FICTIONAL DEMO]%'`),
]);

export const listingMedia = pgTable('listing_media', {
  id: id(), listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }), kind: mediaKind('kind').notNull(),
  url: text('url').notNull(), captionTh: text('caption_th'), captionEn: text('caption_en'), altTh: text('alt_th'), altEn: text('alt_en'),
  sort: integer('sort').default(0).notNull(), isDemo: demo(), ...audit(),
}, t => [unique('listing_media_order_unique').on(t.listingId, t.sort), check('listing_media_sort', sql`${t.sort} >= 0`), check('listing_media_url', sql`${t.url} ~ '^https://' OR (${t.url} LIKE '/%' AND ${t.url} NOT LIKE '//%')`),
  check('listing_media_photo_alt', sql`${t.kind} <> 'photo' OR (length(trim(${t.altTh})) > 0 AND length(trim(${t.altEn})) > 0 AND ${t.altTh} IS NOT NULL AND ${t.altEn} IS NOT NULL)`)]);

export const listingStations = pgTable('listing_stations', {
  listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
  stationId: uuid('station_id').notNull().references(() => stations.id, { onDelete: 'restrict' }),
  distanceM: integer('distance_m').notNull(), source: text('source').notNull(), fetchedAt: timestamp('fetched_at', { withTimezone: true }).notNull(), isDemo: demo(),
}, t => [primaryKey({ columns: [t.listingId, t.stationId] }), index('listing_stations_station_idx').on(t.stationId, t.distanceM), check('listing_stations_distance', sql`${t.distanceM} >= 0 AND length(trim(${t.source})) > 0`)]);

export const listingNearby = pgTable('listing_nearby', {
  id: id(), listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }), category: text('category').notNull(), ...names(),
  distanceM: integer('distance_m').notNull(), source: text('source').notNull(), fetchedAt: timestamp('fetched_at', { withTimezone: true }).notNull(), isDemo: demo(), ...audit(),
}, t => [unique('listing_nearby_place_unique').on(t.listingId, t.category, t.nameEn), nonemptyNames('listing_nearby_names', t), check('listing_nearby_distance', sql`${t.distanceM} >= 0 AND length(trim(${t.source})) > 0`)]);

// Imported OpenStreetMap places (Geofabrik Thailand extract). Genuine provider data, never typed by hand.
export const osmPlaces = pgTable('osm_places', {
  id: text('id').primaryKey(), category: text('category').notNull(), kind: text('kind').notNull(), ...names(),
  lat: numeric('lat', { precision: 10, scale: 7 }).notNull(), lng: numeric('lng', { precision: 10, scale: 7 }).notNull(),
  dataDate: timestamp('data_date', { withTimezone: true }), importedAt: timestamp('imported_at', { withTimezone: true }).notNull(),
}, t => [nonemptyNames('osm_places_names', t), coordinates('osm_places_coordinates', t),
  check('osm_places_category', sql`${t.category} IN ('transit','school','shopping','hospital')`),
  check('osm_places_id', sql`${t.id} ~ '^(node|way)/[0-9]+$'`),
  index('osm_places_point_gist_idx').using('gist', sql`point(${t.lng}::float8, ${t.lat}::float8)`),
  index('osm_places_category_idx').on(t.category)]);

export const users = pgTable('users', {
  id: id(), email: text('email'), displayName: text('display_name').notNull(), role: userRole('role').default('customer').notNull(), status: userStatus('status').default('active').notNull(),
  authProvider: text('auth_provider').notNull(), providerSubject: text('provider_subject').notNull(), locale: locale('locale').default('th').notNull(), isDemo: demo(), ...audit(),
}, t => [unique('users_provider_subject_unique').on(t.authProvider, t.providerSubject), uniqueIndex('users_email_unique').on(sql`lower(${t.email})`).where(sql`${t.email} IS NOT NULL`),
  check('users_identity_nonempty', sql`length(trim(${t.authProvider})) > 0 AND length(trim(${t.providerSubject})) > 0 AND length(trim(${t.displayName})) > 0`)]);

export const enquiries = pgTable('enquiries', {
  id: id(), type: enquiryType('type').notNull(), listingId: uuid('listing_id').references(() => listings.id, { onDelete: 'restrict' }),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'restrict' }), plotId: uuid('plot_id'),
  agentId: uuid('agent_id').references(() => agents.id, { onDelete: 'restrict' }), userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: text('name').notNull(), email: text('email'), phone: text('phone'), lineId: text('line_id'), message: text('message'), loanHelp: boolean('loan_help').default(false).notNull(),
  preferredAt: timestamp('preferred_at', { withTimezone: true }), consentVersion: text('consent_version').notNull(), consentAt: timestamp('consent_at', { withTimezone: true }).notNull(),
  sourceUrl: text('source_url').notNull(), utm: jsonb('utm').$type<Record<string, string>>().default({}).notNull(), lang: locale('lang').notNull(),
  status: enquiryStatus('status').default('new').notNull(), isDemo: demo(), ...audit(),
}, t => [index('enquiries_agent_status_idx').on(t.agentId, t.status, t.createdAt), index('enquiries_listing_idx').on(t.listingId), index('enquiries_project_idx').on(t.projectId), index('enquiries_user_idx').on(t.userId), index('enquiries_plot_idx').on(t.plotId),
  foreignKey({ name: 'enquiries_plot_project_fk', columns: [t.plotId, t.projectId], foreignColumns: [plots.id, plots.projectId] }).onDelete('restrict'),
  check('enquiries_plot_parent_required', sql`${t.plotId} IS NULL OR ${t.projectId} IS NOT NULL`),
  check('enquiries_contact_consent', sql`length(trim(${t.name})) > 0 AND length(trim(${t.consentVersion})) > 0 AND (nullif(trim(${t.email}), '') IS NOT NULL OR nullif(trim(${t.phone}), '') IS NOT NULL OR nullif(trim(${t.lineId}), '') IS NOT NULL)`),
  check('enquiries_target', sql`(${t.type} <> 'listing' OR (${t.listingId} IS NOT NULL AND nullif(trim(${t.email}), '') IS NOT NULL AND nullif(trim(${t.phone}), '') IS NOT NULL)) AND (${t.type} NOT IN ('brochure','site_visit') OR ${t.projectId} IS NOT NULL) AND (${t.type} <> 'site_visit' OR (${t.preferredAt} IS NOT NULL AND nullif(trim(${t.phone}), '') IS NOT NULL))`),
  check('enquiries_utm_object', sql`jsonb_typeof(${t.utm}) = 'object'`)]);

export const chatClicks = pgTable('chat_clicks', {
  id: id(), listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }), channel: chatChannel('channel').notNull(),
  lang: locale('lang').notNull(), isDemo: demo(), createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, t => [index('chat_clicks_listing_channel_idx').on(t.listingId, t.channel, t.createdAt)]);

export const savedHomes = pgTable('saved_listings', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }), listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, t => [primaryKey({ columns: [t.userId, t.listingId] }), index('saved_listings_listing_idx').on(t.listingId)]);

export const savedSearches = pgTable('saved_searches', {
  id: id(), userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }), name: text('name').notNull(),
  query: jsonb('query').$type<Record<string, unknown>>().notNull(), alert: alertFrequency('alert').default('off').notNull(),
  lang: locale('lang').notNull(), lastNotifiedAt: timestamp('last_notified_at', { withTimezone: true }), isDemo: demo(), ...audit(),
}, t => [index('saved_searches_user_idx').on(t.userId), uniqueIndex('saved_searches_user_query_unique').on(t.userId, t.query),
  index('saved_searches_alert_idx').on(t.alert, t.lastNotifiedAt), check('saved_searches_object', sql`jsonb_typeof(${t.query}) = 'object' AND length(trim(${t.name})) > 0`)]);

// Admin definitions are data, never SQL identifiers or executable expressions.
export const filterDefinitions = pgTable('filter_definitions', {
  id: id(), key: text('key').notNull().unique(), ...names(), kind: filterKind('kind').notNull(),
  propertyTypes: propertyType('property_types').array().notNull(), active: boolean('active').default(false).notNull(), sort: integer('sort').default(0).notNull(), isDemo: demo(), ...audit(),
}, t => [nonemptyNames('filter_definitions_names', t), check('filter_definitions_key', sql`${t.key} ~ '^[a-z][a-z0-9_]{0,63}$'`),
  check('filter_definitions_types', sql`cardinality(${t.propertyTypes}) > 0 AND array_position(${t.propertyTypes}, NULL) IS NULL AND ${t.sort} >= 0`)]);

export const filterOptions = pgTable('filter_options', {
  id: id(), definitionId: uuid('definition_id').notNull().references(() => filterDefinitions.id, { onDelete: 'restrict' }),
  value: text('value').notNull(), ...names(), active: boolean('active').default(false).notNull(), sort: integer('sort').default(0).notNull(), isDemo: demo(), ...audit(),
}, t => [unique('filter_options_definition_value_unique').on(t.definitionId, t.value), unique('filter_options_id_definition_unique').on(t.id, t.definitionId),
  nonemptyNames('filter_options_names', t), check('filter_options_value', sql`length(trim(${t.value})) > 0 AND ${t.sort} >= 0`)]);

export const listingFilterValues = pgTable('listing_filter_values', {
  id: id(), listingId: uuid('listing_id').notNull().references(() => listings.id, { onDelete: 'cascade' }),
  definitionId: uuid('definition_id').notNull().references(() => filterDefinitions.id, { onDelete: 'restrict' }), optionId: uuid('option_id'),
  numberValue: amount('number_value'), booleanValue: boolean('boolean_value'), ...audit(),
}, t => [foreignKey({ name: 'listing_filter_option_definition_fk', columns: [t.optionId, t.definitionId], foreignColumns: [filterOptions.id, filterOptions.definitionId] }).onDelete('restrict'),
  uniqueIndex('listing_filter_option_unique').on(t.listingId, t.definitionId, t.optionId).where(sql`${t.optionId} IS NOT NULL`),
  uniqueIndex('listing_filter_scalar_unique').on(t.listingId, t.definitionId).where(sql`${t.optionId} IS NULL`),
  index('listing_filter_definition_idx').on(t.definitionId, t.optionId, t.numberValue, t.booleanValue),
  check('listing_filter_one_value', sql`num_nonnulls(${t.optionId}, ${t.numberValue}, ${t.booleanValue}) = 1`)]);
