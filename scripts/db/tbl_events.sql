/* tbl_events.sql */

CREATE TABLE IF NOT EXISTS events (
	id			bigserial NOT NULL,
	extd		jsonb,
	tags		integer,
	strt		double precision,
	term		double precision,
	pric		numeric(8,2),
	created		double precision NOT NULL,
	modified	double precision NOT NULL,
	CONSTRAINT pk_events_id PRIMARY KEY ( id )
);

DROP INDEX IF EXISTS idx_events_audit;
CREATE INDEX idx_events_audit ON events USING btree (created, modified);

DROP TRIGGER IF EXISTS tr_events_ins0 ON events;
CREATE TRIGGER tr_events_ins0
	BEFORE INSERT ON events
	FOR EACH ROW EXECUTE PROCEDURE insert_created_timestamp();

DROP TRIGGER IF EXISTS tr_events_upd1 ON events;
CREATE TRIGGER tr_events_upd1
	AFTER UPDATE ON events
	-- WHEN (OLD.* IS DISTINCT FROM NEW.*)
	FOR EACH ROW EXECUTE PROCEDURE update_modified_timestamp();


CREATE OR REPLACE FUNCTION event_created_notify()
RETURNS TRIGGER AS $$
	DECLARE p_newjson json;
	BEGIN
		--NEW.modified = get_timestamp();
		p_newjson := json_build_object(
			'etag',NEW.created,
			'data',row_to_json( NEW )
		);
		select pg_notify( 'NEW', p_newjson );
		RETURN NEW;
	END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_events_ins1 ON events;
CREATE TRIGGER tr_events_ins0
	AFTER INSERT ON events
	FOR EACH ROW EXECUTE PROCEDURE event_created_notify();


CREATE OR REPLACE FUNCTION event_updated_notify()
RETURNS TRIGGER AS $$
	DECLARE p_newjson json;
	BEGIN
		--NEW.modified = get_timestamp();
		p_newjson := json_build_object(
			'etag',NEW.modified,
			'data',row_to_json( NEW )
		);
		select pg_notify( 'UPD', p_newjson );
		RETURN NEW;
	END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_events_upd2 ON events;
CREATE TRIGGER tr_events_upd2
	AFTER UPDATE ON events
	FOR EACH ROW EXECUTE PROCEDURE event_updated_notify();


CREATE OR REPLACE FUNCTION event_deleted_notify()
RETURNS TRIGGER AS $$
	DECLARE p_newjson json;
	BEGIN
		p_newjson := json_build_object(
			'data',row_to_json( OLD )
		);
		select pg_notify( 'DEL', p_newjson );
		RETURN NEW;
	END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_events_del1 ON events;
CREATE TRIGGER tr_events_del1
	AFTER DELETE ON events
	FOR EACH ROW EXECUTE PROCEDURE event_deleted_notify();
