/* tbl_widgets.sql */

CREATE TABLE IF NOT EXISTS widgets (
	id			serial NOT NULL,
	name		varchar(24) NOT NULL,
	extended	json,
	created		double precision NOT NULL,
	modified	double precision NOT NULL,
	CONSTRAINT pk_widgets_id PRIMARY KEY ( id )
);

DROP INDEX IF EXISTS idx_widgets_audit;
CREATE INDEX idx_widgets_audit ON widgets USING btree (created, modified);

DROP TRIGGER IF EXISTS tr_widgets_ins0 ON widgets;
CREATE TRIGGER tr_widgets_ins0
	BEFORE INSERT ON widgets
	FOR EACH ROW EXECUTE PROCEDURE insert_created_timestamp();

DROP TRIGGER IF EXISTS tr_widgets_upd1 ON widgets;
CREATE TRIGGER tr_widgets_upd1
	AFTER UPDATE ON widgets
	-- WHEN (OLD.* IS DISTINCT FROM NEW.*)
	FOR EACH ROW EXECUTE PROCEDURE update_modified_timestamp();


CREATE OR REPLACE FUNCTION widget_created_notify()
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

DROP TRIGGER IF EXISTS tr_widgets_ins1 ON widgets;
CREATE TRIGGER tr_widgets_ins0
	AFTER INSERT ON widgets
	FOR EACH ROW EXECUTE PROCEDURE widget_created_notify();


DROP TRIGGER IF EXISTS tr_widgets_upd2 ON widgets;
CREATE TRIGGER tr_widgets_upd2
	AFTER UPDATE ON widgets
	FOR EACH ROW EXECUTE PROCEDURE widget_updated_notify();


DROP TRIGGER IF EXISTS tr_widgets_del1 ON widgets;
CREATE TRIGGER tr_widgets_del1
	AFTER DELETE ON widgets
	FOR EACH ROW EXECUTE PROCEDURE widget_deleted_notify();
