/* scripts/db/0/0/1/fn_post_event.sql */

// TODO: not done! finish!

CREATE OR REPLACE FUNCTION fn_post_event (
	P_data	jsonb
) RETURNS json AS $$

DECLARE e RECORD;

DECLARE p_extended jsonb;
DECLARE p_tags integer;


BEGIN

	CASE
		WHEN P_data IS NULL THEN RAISE not_null_violation USING MESSAGE = 'P_data parameter is required.';
		ELSE
			p_extended := COALESCE( ( P_data#>>'{extended}' ), null );
			p_tags := COALESCE( (P_data#>'{tags}'), null );

			IF P_pid IS NULL THEN
				INSERT INTO packages ( name, colors, createdBy, pub, pend )
				VALUES ( p_name, p_colors, P_cBy, p_pub, p_pend )
				RETURNING id,ver,created INTO pd;
			ELSE
				INSERT INTO packages ( id, name, colors, createdBy, pub, pend )
				VALUES ( P_pid, p_name, p_colors, P_cBy, p_pub, p_pend )
				RETURNING id,ver,created INTO pd;
			END IF;

			IF p_tier IS NOT NULL THEN
				INSERT INTO tiers_packages ( tid,pid,pver,createdby ) VALUES ( p_tier,pd.id,pd.ver,P_cBy )
				ON CONFLICT (pid,pver) DO UPDATE SET
							tid = p_tier,
					modifiedBy = P_cBy,
					  modified = get_timestamp();
			ELSE
			END IF;

			cnt := 1;

			FOR jpz IN SELECT id, t, s, ss FROM json_to_recordset(P_pkg#>'{puzzles}')
			 AS x (id int, t int, s float, ss json) LOOP
				IF jpz.id IS NULL THEN
					-- INSERT AND ASSOCIATE
					INSERT INTO puzzles ( type,size,shapes,createdBy )
					VALUES ( jpz.t, jpz.s, jpz.ss, P_cBy ) RETURNING id, created, modified INTO pz;
					INSERT INTO package_versions ( pid,pver,zid,ord,createdBy )
					VALUES ( pd.id, pd.ver, pz.id, cnt, P_cBy );
					-- TODO: add puzzle json (id,created,modified) to array
					-- NOTE: this works: select array_append(ARRAY['{"id":1}'::json,'{"id":2}'::json], json_build_object( 'id',3 ));
					njpz := array_append(njpz, json_build_object( 'id',pz.id,  'created',pz.created,  'modified',pz.modified ));
				ELSE
					-- ASSOCIATE
					INSERT INTO package_versions ( pid,pver,zid,ord,createdBy )
					VALUES ( pd.id, pd.ver, jpz.id, cnt, P_cBy );
					-- TODO: add puzzle json (id) to array
					njpz := array_append(njpz, json_build_object( 'id',jpz.id ));
				END IF;
				cnt := cnt + 1;
			END LOOP;

	END CASE;

	RETURN json_build_object (
		'id',pd.id,
		'ver',pd.ver,
		'created',pd.created,
		'puzzles',array_to_json(njpz)
	);

END;
$$ LANGUAGE 'plpgsql';
