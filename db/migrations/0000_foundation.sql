CREATE TYPE "public"."alert_frequency" AS ENUM('instant', 'daily', 'off');--> statement-breakpoint
CREATE TYPE "public"."chat_channel" AS ENUM('line', 'whatsapp');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'assigned', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."enquiry_type" AS ENUM('listing', 'brochure', 'site_visit', 'home_value', 'service', 'contact');--> statement-breakpoint
CREATE TYPE "public"."filter_kind" AS ENUM('single', 'multi', 'number', 'boolean');--> statement-breakpoint
CREATE TYPE "public"."listing_intent" AS ENUM('sale', 'rent');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('draft', 'active', 'reserved', 'sold', 'rented');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('th', 'en');--> statement-breakpoint
CREATE TYPE "public"."location_level" AS ENUM('province', 'district', 'area');--> statement-breakpoint
CREATE TYPE "public"."media_kind" AS ENUM('photo', 'floorplan', 'video', 'tour360');--> statement-breakpoint
CREATE TYPE "public"."plot_status" AS ENUM('available', 'reserved', 'sold');--> statement-breakpoint
CREATE TYPE "public"."price_period" AS ENUM('month', 'year');--> statement-breakpoint
CREATE TYPE "public"."price_visibility" AS ENUM('public', 'contact_gated');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('coming_soon', 'selling', 'ready', 'sold_out');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('condo', 'house', 'townhouse', 'land', 'hotel', 'commercial', 'pool_villa');--> statement-breakpoint
CREATE TYPE "public"."publish_state" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."station_line" AS ENUM('BTS', 'MRT', 'ARL', 'SRT');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'agent', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'disabled');--> statement-breakpoint
CREATE TABLE "agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"photo_url" text,
	"email" text,
	"phone" text,
	"line_id" text,
	"whatsapp" text,
	"active" boolean DEFAULT true NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agents_names" CHECK (length(trim("agents"."name_th")) > 0 AND length(trim("agents"."name_en")) > 0),
	CONSTRAINT "agents_demo_label" CHECK (NOT "agents"."is_demo" OR "agents"."name_en" LIKE '[FICTIONAL DEMO]%')
);
--> statement-breakpoint
CREATE TABLE "chat_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"channel" "chat_channel" NOT NULL,
	"lang" "locale" NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "enquiry_type" NOT NULL,
	"listing_id" uuid,
	"project_id" uuid,
	"plot_id" uuid,
	"agent_id" uuid,
	"user_id" uuid,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"line_id" text,
	"message" text,
	"loan_help" boolean DEFAULT false NOT NULL,
	"preferred_at" timestamp with time zone,
	"consent_version" text NOT NULL,
	"consent_at" timestamp with time zone NOT NULL,
	"source_url" text NOT NULL,
	"utm" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"lang" "locale" NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enquiries_plot_parent_required" CHECK ("enquiries"."plot_id" IS NULL OR "enquiries"."project_id" IS NOT NULL),
	CONSTRAINT "enquiries_contact_consent" CHECK (length(trim("enquiries"."name")) > 0 AND length(trim("enquiries"."consent_version")) > 0 AND (nullif(trim("enquiries"."email"), '') IS NOT NULL OR nullif(trim("enquiries"."phone"), '') IS NOT NULL OR nullif(trim("enquiries"."line_id"), '') IS NOT NULL)),
	CONSTRAINT "enquiries_target" CHECK (("enquiries"."type" <> 'listing' OR ("enquiries"."listing_id" IS NOT NULL AND nullif(trim("enquiries"."email"), '') IS NOT NULL AND nullif(trim("enquiries"."phone"), '') IS NOT NULL)) AND ("enquiries"."type" NOT IN ('brochure','site_visit') OR "enquiries"."project_id" IS NOT NULL) AND ("enquiries"."type" <> 'site_visit' OR ("enquiries"."preferred_at" IS NOT NULL AND nullif(trim("enquiries"."phone"), '') IS NOT NULL))),
	CONSTRAINT "enquiries_utm_object" CHECK (jsonb_typeof("enquiries"."utm") = 'object')
);
--> statement-breakpoint
CREATE TABLE "filter_definitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"kind" "filter_kind" NOT NULL,
	"property_types" "property_type"[] NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "filter_definitions_key_unique" UNIQUE("key"),
	CONSTRAINT "filter_definitions_names" CHECK (length(trim("filter_definitions"."name_th")) > 0 AND length(trim("filter_definitions"."name_en")) > 0),
	CONSTRAINT "filter_definitions_key" CHECK ("filter_definitions"."key" ~ '^[a-z][a-z0-9_]{0,63}$'),
	CONSTRAINT "filter_definitions_types" CHECK (cardinality("filter_definitions"."property_types") > 0 AND array_position("filter_definitions"."property_types", NULL) IS NULL AND "filter_definitions"."sort" >= 0)
);
--> statement-breakpoint
CREATE TABLE "filter_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"definition_id" uuid NOT NULL,
	"value" text NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "filter_options_definition_value_unique" UNIQUE("definition_id","value"),
	CONSTRAINT "filter_options_id_definition_unique" UNIQUE("id","definition_id"),
	CONSTRAINT "filter_options_names" CHECK (length(trim("filter_options"."name_th")) > 0 AND length(trim("filter_options"."name_en")) > 0),
	CONSTRAINT "filter_options_value" CHECK (length(trim("filter_options"."value")) > 0 AND "filter_options"."sort" >= 0)
);
--> statement-breakpoint
CREATE TABLE "listing_filter_values" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"definition_id" uuid NOT NULL,
	"option_id" uuid,
	"number_value" numeric(16, 2),
	"boolean_value" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listing_filter_one_value" CHECK (num_nonnulls("listing_filter_values"."option_id", "listing_filter_values"."number_value", "listing_filter_values"."boolean_value") = 1)
);
--> statement-breakpoint
CREATE TABLE "listing_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"kind" "media_kind" NOT NULL,
	"url" text NOT NULL,
	"caption_th" text,
	"caption_en" text,
	"alt_th" text,
	"alt_en" text,
	"sort" integer DEFAULT 0 NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listing_media_order_unique" UNIQUE("listing_id","sort"),
	CONSTRAINT "listing_media_sort" CHECK ("listing_media"."sort" >= 0),
	CONSTRAINT "listing_media_url" CHECK ("listing_media"."url" ~ '^https://' OR ("listing_media"."url" LIKE '/%' AND "listing_media"."url" NOT LIKE '//%')),
	CONSTRAINT "listing_media_photo_alt" CHECK ("listing_media"."kind" <> 'photo' OR (length(trim("listing_media"."alt_th")) > 0 AND length(trim("listing_media"."alt_en")) > 0 AND "listing_media"."alt_th" IS NOT NULL AND "listing_media"."alt_en" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "listing_nearby" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"category" text NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"distance_m" integer NOT NULL,
	"source" text NOT NULL,
	"fetched_at" timestamp with time zone NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listing_nearby_place_unique" UNIQUE("listing_id","category","name_en"),
	CONSTRAINT "listing_nearby_names" CHECK (length(trim("listing_nearby"."name_th")) > 0 AND length(trim("listing_nearby"."name_en")) > 0),
	CONSTRAINT "listing_nearby_distance" CHECK ("listing_nearby"."distance_m" >= 0 AND length(trim("listing_nearby"."source")) > 0)
);
--> statement-breakpoint
CREATE TABLE "listing_stations" (
	"listing_id" uuid NOT NULL,
	"station_id" uuid NOT NULL,
	"distance_m" integer NOT NULL,
	"source" text NOT NULL,
	"fetched_at" timestamp with time zone NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	CONSTRAINT "listing_stations_listing_id_station_id_pk" PRIMARY KEY("listing_id","station_id"),
	CONSTRAINT "listing_stations_distance" CHECK ("listing_stations"."distance_m" >= 0 AND length(trim("listing_stations"."source")) > 0)
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"slug" text NOT NULL,
	"intent" "listing_intent" NOT NULL,
	"type" "property_type" NOT NULL,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"publish_state" "publish_state" DEFAULT 'draft' NOT NULL,
	"price" numeric(16, 2),
	"previous_price" numeric(16, 2),
	"price_period" "price_period",
	"price_visibility" "price_visibility" NOT NULL,
	"title_th" text NOT NULL,
	"title_en" text NOT NULL,
	"description_th" text,
	"description_en" text,
	"address_th" text,
	"address_en" text,
	"location_id" uuid NOT NULL,
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"hide_exact" boolean DEFAULT true NOT NULL,
	"project_id" uuid,
	"agent_id" uuid NOT NULL,
	"beds" integer,
	"baths" integer,
	"size_sqm" numeric(16, 2),
	"land_sqwah" numeric(16, 2),
	"floor" integer,
	"built_year" integer,
	"furnished" boolean,
	"ownership" text,
	"foreign_quota" boolean,
	"pet_friendly" boolean,
	"common_fee_per_sqm" numeric(16, 2),
	"parking" integer,
	"land_zoning" text,
	"road_frontage_m" numeric(16, 2),
	"title_deed" text,
	"hotel_rooms" integer,
	"hotel_occupancy" numeric(5, 2),
	"hotel_annual_revenue" numeric(16, 2),
	"hotel_license" text,
	"type_fields" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"badges" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"published_at" timestamp with time zone,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listings_code_unique" UNIQUE("code"),
	CONSTRAINT "listings_slug_unique" UNIQUE("slug"),
	CONSTRAINT "listings_coordinates" CHECK (("listings"."lat" IS NULL AND "listings"."lng" IS NULL) OR ("listings"."lat" IS NOT NULL AND "listings"."lng" IS NOT NULL AND "listings"."lat" BETWEEN -90 AND 90 AND "listings"."lng" BETWEEN -180 AND 180)),
	CONSTRAINT "listings_titles" CHECK (length(trim("listings"."title_th")) > 0 AND length(trim("listings"."title_en")) > 0),
	CONSTRAINT "listings_prices" CHECK (("listings"."price" IS NULL OR "listings"."price" > 0) AND ("listings"."previous_price" IS NULL OR "listings"."previous_price" > 0)),
	CONSTRAINT "listings_price_intent" CHECK (("listings"."intent" = 'sale' AND "listings"."price_period" IS NULL) OR ("listings"."intent" = 'rent' AND "listings"."price_period" IS NOT NULL)),
	CONSTRAINT "listings_status_intent" CHECK (("listings"."status" <> 'sold' OR "listings"."intent" = 'sale') AND ("listings"."status" <> 'rented' OR "listings"."intent" = 'rent')),
	CONSTRAINT "listings_publish_required" CHECK ("listings"."publish_state" <> 'published' OR ("listings"."status" <> 'draft' AND "listings"."published_at" IS NOT NULL AND "listings"."description_th" IS NOT NULL AND "listings"."description_en" IS NOT NULL AND ("listings"."price_visibility" = 'contact_gated' OR "listings"."price" IS NOT NULL))),
	CONSTRAINT "listings_nonnegative" CHECK (("listings"."beds" IS NULL OR "listings"."beds" >= 0) AND ("listings"."baths" IS NULL OR "listings"."baths" > 0) AND ("listings"."size_sqm" IS NULL OR "listings"."size_sqm" > 0) AND ("listings"."land_sqwah" IS NULL OR "listings"."land_sqwah" > 0) AND ("listings"."parking" IS NULL OR "listings"."parking" >= 0) AND ("listings"."common_fee_per_sqm" IS NULL OR "listings"."common_fee_per_sqm" >= 0) AND ("listings"."built_year" IS NULL OR "listings"."built_year" BETWEEN 1800 AND 2200)),
	CONSTRAINT "listings_residential_fields" CHECK ("listings"."type" NOT IN ('condo','house','townhouse','pool_villa') OR ("listings"."beds" IS NOT NULL AND "listings"."baths" IS NOT NULL AND "listings"."size_sqm" IS NOT NULL)),
	CONSTRAINT "listings_house_land" CHECK ("listings"."type" NOT IN ('house','townhouse','pool_villa') OR "listings"."land_sqwah" IS NOT NULL),
	CONSTRAINT "listings_land_fields" CHECK ("listings"."type" <> 'land' OR ("listings"."land_sqwah" IS NOT NULL AND "listings"."beds" IS NULL AND "listings"."baths" IS NULL AND "listings"."size_sqm" IS NULL)),
	CONSTRAINT "listings_condo_fields" CHECK ("listings"."type" = 'condo' OR ("listings"."foreign_quota" IS NULL AND "listings"."common_fee_per_sqm" IS NULL AND "listings"."floor" IS NULL)),
	CONSTRAINT "listings_land_details" CHECK ("listings"."type" = 'land' OR ("listings"."land_zoning" IS NULL AND "listings"."road_frontage_m" IS NULL AND "listings"."title_deed" IS NULL)),
	CONSTRAINT "listings_hotel_fields" CHECK (("listings"."type" = 'hotel' AND "listings"."hotel_rooms" IS NOT NULL AND "listings"."hotel_rooms" > 0 AND ("listings"."hotel_occupancy" IS NULL OR "listings"."hotel_occupancy" BETWEEN 0 AND 100) AND ("listings"."hotel_annual_revenue" IS NULL OR "listings"."hotel_annual_revenue" >= 0)) OR ("listings"."type" <> 'hotel' AND "listings"."hotel_rooms" IS NULL AND "listings"."hotel_occupancy" IS NULL AND "listings"."hotel_annual_revenue" IS NULL AND "listings"."hotel_license" IS NULL)),
	CONSTRAINT "listings_commercial_area" CHECK ("listings"."type" <> 'commercial' OR "listings"."size_sqm" IS NOT NULL),
	CONSTRAINT "listings_frontage_positive" CHECK ("listings"."road_frontage_m" IS NULL OR "listings"."road_frontage_m" > 0),
	CONSTRAINT "listings_json_shape" CHECK (jsonb_typeof("listings"."type_fields") = 'object' AND jsonb_typeof("listings"."badges") = 'array'),
	CONSTRAINT "listings_demo_label" CHECK (NOT "listings"."is_demo" OR "listings"."title_en" LIKE '[FICTIONAL DEMO]%')
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"level" "location_level" NOT NULL,
	"slug" text NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "locations_slug_unique" UNIQUE("slug"),
	CONSTRAINT "locations_names" CHECK (length(trim("locations"."name_th")) > 0 AND length(trim("locations"."name_en")) > 0),
	CONSTRAINT "locations_coordinates" CHECK (("locations"."lat" IS NULL AND "locations"."lng" IS NULL) OR ("locations"."lat" IS NOT NULL AND "locations"."lng" IS NOT NULL AND "locations"."lat" BETWEEN -90 AND 90 AND "locations"."lng" BETWEEN -180 AND 180)),
	CONSTRAINT "locations_parent_shape" CHECK (("locations"."level" = 'province' AND "locations"."parent_id" IS NULL) OR ("locations"."level" <> 'province' AND "locations"."parent_id" IS NOT NULL)),
	CONSTRAINT "locations_not_own_parent" CHECK ("locations"."parent_id" IS NULL OR "locations"."parent_id" <> "locations"."id")
);
--> statement-breakpoint
CREATE TABLE "plots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"unit_type_id" uuid,
	"code" text NOT NULL,
	"land_sqwah" numeric(16, 2) NOT NULL,
	"price" numeric(16, 2),
	"status" "plot_status" DEFAULT 'available' NOT NULL,
	"polygon" jsonb,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "plots_project_code_unique" UNIQUE("project_id","code"),
	CONSTRAINT "plots_id_project_unique" UNIQUE("id","project_id"),
	CONSTRAINT "plots_positive" CHECK ("plots"."land_sqwah" > 0 AND ("plots"."price" IS NULL OR "plots"."price" > 0)),
	CONSTRAINT "plots_polygon_shape" CHECK ("plots"."polygon" IS NULL OR ("plots"."polygon"->>'type' = 'Polygon' AND jsonb_typeof("plots"."polygon"->'coordinates') = 'array'))
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"status" "project_status" DEFAULT 'coming_soon' NOT NULL,
	"publish_state" "publish_state" DEFAULT 'draft' NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"description_th" text,
	"description_en" text,
	"location_id" uuid NOT NULL,
	"price_from" numeric(16, 2),
	"price_visibility" "price_visibility" NOT NULL,
	"total_units" integer,
	"completion_year" integer,
	"hero_media_url" text,
	"brochure_url" text,
	"progress_stage" text,
	"progress_pct" integer,
	"progress_updated_at" timestamp with time zone,
	"facilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_mstar" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug"),
	CONSTRAINT "projects_names" CHECK (length(trim("projects"."name_th")) > 0 AND length(trim("projects"."name_en")) > 0),
	CONSTRAINT "projects_numeric_bounds" CHECK (("projects"."price_from" IS NULL OR "projects"."price_from" > 0) AND ("projects"."total_units" IS NULL OR "projects"."total_units" >= 0) AND ("projects"."completion_year" IS NULL OR "projects"."completion_year" BETWEEN 1900 AND 2200) AND ("projects"."progress_pct" IS NULL OR "projects"."progress_pct" BETWEEN 0 AND 100)),
	CONSTRAINT "projects_publish_required" CHECK ("projects"."publish_state" <> 'published' OR ("projects"."published_at" IS NOT NULL AND "projects"."description_th" IS NOT NULL AND "projects"."description_en" IS NOT NULL)),
	CONSTRAINT "projects_demo_label" CHECK (NOT "projects"."is_demo" OR "projects"."name_en" LIKE '[FICTIONAL DEMO]%'),
	CONSTRAINT "projects_facilities_array" CHECK (jsonb_typeof("projects"."facilities") = 'array')
);
--> statement-breakpoint
CREATE TABLE "saved_listings" (
	"user_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_listings_user_id_listing_id_pk" PRIMARY KEY("user_id","listing_id")
);
--> statement-breakpoint
CREATE TABLE "saved_searches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"query" jsonb NOT NULL,
	"alert" "alert_frequency" DEFAULT 'off' NOT NULL,
	"lang" "locale" NOT NULL,
	"last_notified_at" timestamp with time zone,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_searches_object" CHECK (jsonb_typeof("saved_searches"."query") = 'object' AND length(trim("saved_searches"."name")) > 0)
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"line" "station_line" NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"lat" numeric(10, 7),
	"lng" numeric(10, 7),
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "stations_line_name_unique" UNIQUE("line","name_en"),
	CONSTRAINT "stations_names" CHECK (length(trim("stations"."name_th")) > 0 AND length(trim("stations"."name_en")) > 0),
	CONSTRAINT "stations_coordinates" CHECK (("stations"."lat" IS NULL AND "stations"."lng" IS NULL) OR ("stations"."lat" IS NOT NULL AND "stations"."lng" IS NOT NULL AND "stations"."lat" BETWEEN -90 AND 90 AND "stations"."lng" BETWEEN -180 AND 180))
);
--> statement-breakpoint
CREATE TABLE "unit_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"name_th" text NOT NULL,
	"name_en" text NOT NULL,
	"beds" integer NOT NULL,
	"baths" integer NOT NULL,
	"size_sqm" numeric(16, 2) NOT NULL,
	"price_from" numeric(16, 2),
	"total" integer NOT NULL,
	"available" integer NOT NULL,
	"plan_image_url" text,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unit_types_id_project_unique" UNIQUE("id","project_id"),
	CONSTRAINT "unit_types_names" CHECK (length(trim("unit_types"."name_th")) > 0 AND length(trim("unit_types"."name_en")) > 0),
	CONSTRAINT "unit_types_bounds" CHECK ("unit_types"."beds" >= 0 AND "unit_types"."baths" > 0 AND "unit_types"."size_sqm" > 0 AND ("unit_types"."price_from" IS NULL OR "unit_types"."price_from" > 0) AND "unit_types"."total" >= 0 AND "unit_types"."available" BETWEEN 0 AND "unit_types"."total")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"display_name" text NOT NULL,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"auth_provider" text NOT NULL,
	"provider_subject" text NOT NULL,
	"locale" "locale" DEFAULT 'th' NOT NULL,
	"is_demo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_provider_subject_unique" UNIQUE("auth_provider","provider_subject"),
	CONSTRAINT "users_identity_nonempty" CHECK (length(trim("users"."auth_provider")) > 0 AND length(trim("users"."provider_subject")) > 0 AND length(trim("users"."display_name")) > 0)
);
--> statement-breakpoint
ALTER TABLE "chat_clicks" ADD CONSTRAINT "chat_clicks_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_plot_project_fk" FOREIGN KEY ("plot_id","project_id") REFERENCES "public"."plots"("id","project_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "filter_options" ADD CONSTRAINT "filter_options_definition_id_filter_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "public"."filter_definitions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_filter_values" ADD CONSTRAINT "listing_filter_values_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_filter_values" ADD CONSTRAINT "listing_filter_values_definition_id_filter_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "public"."filter_definitions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_filter_values" ADD CONSTRAINT "listing_filter_option_definition_fk" FOREIGN KEY ("option_id","definition_id") REFERENCES "public"."filter_options"("id","definition_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_media" ADD CONSTRAINT "listing_media_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_nearby" ADD CONSTRAINT "listing_nearby_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_stations" ADD CONSTRAINT "listing_stations_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_stations" ADD CONSTRAINT "listing_stations_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plots" ADD CONSTRAINT "plots_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plots" ADD CONSTRAINT "plots_unit_project_fk" FOREIGN KEY ("unit_type_id","project_id") REFERENCES "public"."unit_types"("id","project_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_listings" ADD CONSTRAINT "saved_listings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_listings" ADD CONSTRAINT "saved_listings_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unit_types" ADD CONSTRAINT "unit_types_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chat_clicks_listing_channel_idx" ON "chat_clicks" USING btree ("listing_id","channel","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_agent_status_idx" ON "enquiries" USING btree ("agent_id","status","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_listing_idx" ON "enquiries" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "enquiries_project_idx" ON "enquiries" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "enquiries_user_idx" ON "enquiries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "enquiries_plot_idx" ON "enquiries" USING btree ("plot_id");--> statement-breakpoint
CREATE UNIQUE INDEX "listing_filter_option_unique" ON "listing_filter_values" USING btree ("listing_id","definition_id","option_id") WHERE "listing_filter_values"."option_id" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "listing_filter_scalar_unique" ON "listing_filter_values" USING btree ("listing_id","definition_id") WHERE "listing_filter_values"."option_id" IS NULL;--> statement-breakpoint
CREATE INDEX "listing_filter_definition_idx" ON "listing_filter_values" USING btree ("definition_id","option_id","number_value","boolean_value");--> statement-breakpoint
CREATE INDEX "listing_stations_station_idx" ON "listing_stations" USING btree ("station_id","distance_m");--> statement-breakpoint
CREATE INDEX "listings_search_idx" ON "listings" USING btree ("intent","type","status","price");--> statement-breakpoint
CREATE INDEX "listings_location_idx" ON "listings" USING btree ("location_id","status");--> statement-breakpoint
CREATE INDEX "listings_bbox_idx" ON "listings" USING btree ("lat","lng");--> statement-breakpoint
CREATE INDEX "listings_project_idx" ON "listings" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "listings_agent_idx" ON "listings" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "listings_feed_idx" ON "listings" USING btree ("publish_state","is_demo","featured","published_at");--> statement-breakpoint
CREATE INDEX "listings_text_idx" ON "listings" USING gin (to_tsvector('simple', coalesce("title_th", '') || ' ' || coalesce("title_en", '') || ' ' || coalesce("address_th", '') || ' ' || coalesce("address_en", '')));--> statement-breakpoint
CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "plots_unit_idx" ON "plots" USING btree ("unit_type_id");--> statement-breakpoint
CREATE INDEX "projects_location_idx" ON "projects" USING btree ("location_id");--> statement-breakpoint
CREATE INDEX "projects_publish_idx" ON "projects" USING btree ("publish_state","status");--> statement-breakpoint
CREATE INDEX "saved_listings_listing_idx" ON "saved_listings" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "saved_searches_user_idx" ON "saved_searches" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "saved_searches_user_query_unique" ON "saved_searches" USING btree ("user_id","query");--> statement-breakpoint
CREATE INDEX "saved_searches_alert_idx" ON "saved_searches" USING btree ("alert","last_notified_at");--> statement-breakpoint
CREATE INDEX "unit_types_project_idx" ON "unit_types" USING btree ("project_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree (lower("email")) WHERE "users"."email" IS NOT NULL;