/* scripts/global_functions.sql */

/* returns double precision emulating javascript number */
CREATE OR REPLACE FUNCTION get_timestamp()
RETURNS double precision AS $$
	SELECT (  FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000 )  :: double precision );
$$ LANGUAGE SQL VOLATILE;


CREATE OR REPLACE FUNCTION update_modified_timestamp()
RETURNS TRIGGER AS $$
	BEGIN
		NEW.modified = get_timestamp();
		RETURN NEW;
	END;
$$ language 'plpgsql';


CREATE OR REPLACE FUNCTION insert_created_timestamp()
RETURNS TRIGGER AS $$
	DECLARE timestmp integer;
	BEGIN
		timestmp = get_timestamp();
		NEW.created = timestmp;
		NEW.modified = timestmp;
		RETURN NEW;
	END;
$$ language 'plpgsql';
