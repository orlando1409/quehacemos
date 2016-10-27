/* scripts/db/0/0/1/fn_delete_event.sql */

CREATE OR REPLACE FUNCTION fn_delete_event(
	P_eid	integer
) RETURNS VOID AS $$

BEGIN

	CASE
		WHEN P_eid IS NULL THEN RAISE not_null_violation USING MESSAGE = 'P_eid parameter is required.';
		ELSE

			DELETE FROM events
			WHERE id = P_eid;

			IF NOT FOUND THEN
				RAISE EXCEPTION 'event id: % does not exist', P_pid
					USING ERRCODE = 'Q1QA1';
			END IF;

	END CASE;

END;
$$ LANGUAGE 'plpgsql';
