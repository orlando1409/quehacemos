/* fn_get_event_by_id.sql */

CREATE OR REPLACE FUNCTION fn_get_event_by_id (
	P_eid   integer
) RETURNS json AS $$

DECLARE result RECORD;

BEGIN

	SELECT p.id, p.extended, p.tags, p.created, p.modified
	INTO result FROM events AS e
	WHERE e.id = P_eid

	IF NOT FOUND THEN
		RAISE EXCEPTION 'event id:% does not exist', P_eid
		USING ERRCODE = 'Q1QA1';
	ELSE
		RETURN row_to_json(result);
	END IF;

END;
$$ LANGUAGE 'plpgsql';
