-- Cross-table invariants require triggers; CHECK constraints cannot query other rows.
CREATE FUNCTION mstar_touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = clock_timestamp(); RETURN NEW; END;
$$;
--> statement-breakpoint
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['agents','enquiries','filter_definitions','filter_options','listing_filter_values','listing_media','listing_nearby','listings','locations','plots','projects','saved_searches','stations','unit_types','users'] LOOP
    EXECUTE format('CREATE TRIGGER touch_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION mstar_touch_updated_at()', t);
  END LOOP;
END $$;
--> statement-breakpoint
CREATE FUNCTION mstar_location_parent() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE parent_level location_level; BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    SELECT level INTO parent_level FROM locations WHERE id = NEW.parent_id FOR UPDATE;
    IF (NEW.level = 'district' AND parent_level IS DISTINCT FROM 'province') OR
       (NEW.level = 'area' AND parent_level IS DISTINCT FROM 'district') THEN
      RAISE EXCEPTION 'Invalid location hierarchy' USING ERRCODE = '23514';
    END IF;
  END IF;
  IF TG_OP = 'UPDATE' AND NEW.level <> OLD.level AND EXISTS (SELECT 1 FROM locations WHERE parent_id = NEW.id) THEN
    RAISE EXCEPTION 'Location level has dependent children' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER location_parent BEFORE INSERT OR UPDATE OF parent_id, level ON locations FOR EACH ROW EXECUTE FUNCTION mstar_location_parent();
--> statement-breakpoint
CREATE FUNCTION mstar_validate_filter() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE definition filter_definitions; listing_type property_type; BEGIN
  SELECT * INTO definition FROM filter_definitions WHERE id = NEW.definition_id FOR UPDATE;
  SELECT type INTO listing_type FROM listings WHERE id = NEW.listing_id FOR UPDATE;
  IF NOT listing_type = ANY(definition.property_types) OR
     (definition.kind IN ('single','multi') AND NEW.option_id IS NULL) OR
     (definition.kind = 'number' AND NEW.number_value IS NULL) OR
     (definition.kind = 'boolean' AND NEW.boolean_value IS NULL) THEN
    RAISE EXCEPTION 'Filter value does not match definition or property type' USING ERRCODE = '23514';
  END IF;
  IF definition.kind = 'single' AND EXISTS (
    SELECT 1 FROM listing_filter_values WHERE listing_id = NEW.listing_id AND definition_id = NEW.definition_id AND id <> NEW.id
  ) THEN RAISE EXCEPTION 'Single filter already has a value' USING ERRCODE = '23514'; END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER validate_filter BEFORE INSERT OR UPDATE ON listing_filter_values FOR EACH ROW EXECUTE FUNCTION mstar_validate_filter();
--> statement-breakpoint
CREATE FUNCTION mstar_filter_definition_change() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF (NEW.kind <> OLD.kind OR NEW.property_types <> OLD.property_types) AND
    (EXISTS (SELECT 1 FROM listing_filter_values WHERE definition_id = NEW.id) OR EXISTS (SELECT 1 FROM filter_options WHERE definition_id = NEW.id)) THEN
    RAISE EXCEPTION 'Remove dependent filter values/options before changing kind or scope' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER filter_definition_change BEFORE UPDATE ON filter_definitions FOR EACH ROW EXECUTE FUNCTION mstar_filter_definition_change();
--> statement-breakpoint
CREATE FUNCTION mstar_filter_option_kind() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE k filter_kind; BEGIN
  SELECT kind INTO k FROM filter_definitions WHERE id = NEW.definition_id FOR UPDATE;
  IF k NOT IN ('single','multi') THEN RAISE EXCEPTION 'Scalar filter cannot have options' USING ERRCODE = '23514'; END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER filter_option_kind BEFORE INSERT OR UPDATE ON filter_options FOR EACH ROW EXECUTE FUNCTION mstar_filter_option_kind();
--> statement-breakpoint
CREATE FUNCTION mstar_listing_filter_scope() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM listing_filter_values v JOIN filter_definitions d ON d.id = v.definition_id WHERE v.listing_id = NEW.id AND NOT NEW.type = ANY(d.property_types)) THEN
    RAISE EXCEPTION 'New listing type conflicts with existing filters' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END $$;
--> statement-breakpoint
CREATE TRIGGER listing_filter_scope BEFORE UPDATE OF type ON listings FOR EACH ROW EXECUTE FUNCTION mstar_listing_filter_scope();
--> statement-breakpoint
-- Public projection excludes demonstration stock, PII, hidden coordinates and gated prices.
CREATE VIEW public_listings AS
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
  l.featured, l.badges, l.published_at, l.updated_at
FROM listings l JOIN locations loc ON loc.id = l.location_id
WHERE l.publish_state = 'published' AND l.status IN ('active','reserved') AND NOT l.is_demo AND NOT loc.is_demo;
--> statement-breakpoint
REVOKE ALL ON FUNCTION mstar_touch_updated_at(), mstar_location_parent(), mstar_validate_filter(), mstar_filter_definition_change(), mstar_filter_option_kind(), mstar_listing_filter_scope() FROM PUBLIC;
