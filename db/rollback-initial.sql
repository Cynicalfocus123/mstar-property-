-- TEST DATABASE ONLY. Destructive initial rollback; preserve a pg_dump first.
-- No CASCADE: unexpected dependencies cause the transaction to fail safely.
DROP VIEW public_listings;
DROP TABLE listing_filter_values, filter_options, filter_definitions, saved_listings, saved_searches, chat_clicks, enquiries, listing_stations, listing_nearby, listing_media;
DROP TABLE listings, plots, unit_types, projects, stations;
DROP TABLE locations, agents, users;
DROP FUNCTION mstar_touch_updated_at(), mstar_location_parent(), mstar_validate_filter(), mstar_filter_definition_change(), mstar_filter_option_kind(), mstar_listing_filter_scope();
DROP TYPE alert_frequency, chat_channel, enquiry_status, enquiry_type, filter_kind, listing_intent, listing_status, locale, location_level, media_kind, plot_status, price_period, price_visibility, project_status, property_type, publish_state, station_line, user_role, user_status;
DROP TABLE drizzle.__drizzle_migrations;
DROP SCHEMA drizzle;
