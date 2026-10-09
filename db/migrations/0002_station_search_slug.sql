ALTER TABLE "stations" ADD COLUMN "slug" text DEFAULT 'station-' || gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "stations" ADD CONSTRAINT "stations_slug_unique" UNIQUE("slug");