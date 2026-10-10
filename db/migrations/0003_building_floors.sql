ALTER TABLE "listings" ADD COLUMN "building_floors" integer;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_building_floors" CHECK ("listings"."building_floors" IS NULL OR ("listings"."building_floors" > 0 AND "listings"."type" IN ('house','townhouse','pool_villa','hotel','commercial')));
--> statement-breakpoint
-- Append one safe fact without changing existing column order or publication/privacy predicates.
CREATE OR REPLACE VIEW public_listings AS
SELECT l.id, l.code, l.slug, l.intent, l.type, l.status, l.title_th, l.title_en,
  l.description_th, l.description_en, l.location_id, loc.name_th AS location_name_th, loc.name_en AS location_name_en,
  CASE WHEN l.price_visibility = 'public' THEN l.price END AS price,
  CASE WHEN l.price_visibility = 'public' THEN l.previous_price END AS previous_price,
  l.price_visibility, l.price_period,
  CASE WHEN NOT l.hide_exact THEN l.lat END AS lat, CASE WHEN NOT l.hide_exact THEN l.lng END AS lng,
  CASE WHEN NOT l.hide_exact THEN l.address_th END AS address_th, CASE WHEN NOT l.hide_exact THEN l.address_en END AS address_en,
  l.hide_exact, l.project_id, l.agent_id, l.beds, l.baths, l.size_sqm, l.land_sqwah, l.floor, l.built_year,
  l.furnished, l.ownership, l.foreign_quota, l.pet_friendly, l.common_fee_per_sqm, l.parking,
  l.land_zoning, l.road_frontage_m, l.title_deed, l.hotel_rooms, l.hotel_occupancy,
  l.featured, l.badges, l.published_at, l.updated_at, l.building_floors
FROM listings l JOIN locations loc ON loc.id = l.location_id
WHERE l.publish_state = 'published' AND l.status IN ('active','reserved') AND NOT l.is_demo AND NOT loc.is_demo;
