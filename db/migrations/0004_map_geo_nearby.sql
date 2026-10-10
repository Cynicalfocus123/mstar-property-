CREATE TABLE "osm_places" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"kind" text NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"lat" numeric(10, 7) NOT NULL,
	"lng" numeric(10, 7) NOT NULL,
	"data_date" timestamp with time zone,
	"imported_at" timestamp with time zone NOT NULL,
	CONSTRAINT "osm_places_names" CHECK (length(trim("osm_places"."name_th")) > 0 AND length(trim("osm_places"."name_en")) > 0),
	CONSTRAINT "osm_places_coordinates" CHECK (("osm_places"."lat" IS NULL AND "osm_places"."lng" IS NULL) OR ("osm_places"."lat" IS NOT NULL AND "osm_places"."lng" IS NOT NULL AND "osm_places"."lat" BETWEEN -90 AND 90 AND "osm_places"."lng" BETWEEN -180 AND 180)),
	CONSTRAINT "osm_places_category" CHECK ("osm_places"."category" IN ('transit','school','shopping','hospital')),
	CONSTRAINT "osm_places_id" CHECK ("osm_places"."id" ~ '^(node|way)/[0-9]+$')
);
--> statement-breakpoint
CREATE INDEX "osm_places_point_gist_idx" ON "osm_places" USING gist (point("lng"::float8, "lat"::float8));--> statement-breakpoint
CREATE INDEX "osm_places_category_idx" ON "osm_places" USING btree ("category");--> statement-breakpoint
CREATE INDEX "listings_point_gist_idx" ON "listings" USING gist (point("lng"::float8, "lat"::float8)) WHERE "listings"."lat" IS NOT NULL AND NOT "listings"."hide_exact";--> statement-breakpoint
CREATE INDEX "listings_area_gist_idx" ON "listings" USING gist (point(round("lng", 2)::float8, round("lat", 2)::float8)) WHERE "listings"."lat" IS NOT NULL AND "listings"."hide_exact";