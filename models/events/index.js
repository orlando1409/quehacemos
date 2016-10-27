/* models/events/index.js */
'use strict';

const _deleteEvent = function _deleteEvent ( eid, next ) {
	let params = [ eid ];
	let stmt = "select fn_delete_event( $1 )";
	DB.query( stmt, params, function ( error, result ) {
		if ( error ) {
			next ( error );
		} else {
			next ( null, result.rows[0].fn_delete_event );
		}
	});
};

const _getEvent = function _getEvent ( eid, next ) {
	let params = [ eid ];
	let stmt = "select fn_get_event_by_id( $1 )";
	DB.query( stmt, params, function ( error, result ) {
		if ( error ) {
			next ( error );
		} else {
			next ( null, result.rows[0].fn_get_event_by_id );
		}
	});
};

const _getFilteredEvents = function _getFilteredEvents ( filterObj, next ) {
	let params = [ filterObj ];
	let stmt = "select fn_get_event( $1::jsonb )";
	DB.query( stmt, params, function ( error, result ) {
		if ( error ) {
			next ( error );
		} else {
			next ( null, result.rows[0].fn_get_filtered_events );
		}
	});
};

const _patchEvent = function _postEvent ( eid, eventObj, next ) {
	let params = [ eid, eventObj ];
	let stmt = "select fn_patch_event( $1, $2::jsonb )";
	DB.query( stmt, params, function ( error, result ) {
		if ( error ) {
			next ( error );
		} else {
			next ( null, result.rows[0].fn_patch_event );
		}
	});
};

const _postEvent = function _postEvent ( eventObj, next ) {
	let params = [ eventObj ];
	let stmt = "select fn_post_event( $1::jsonb )";
	DB.query( stmt, params, function ( error, result ) {
		if ( error ) {
			next ( error );
		} else {
			next ( null, result.rows[0].fn_post_event );
		}
	});
};

exports.deleteEvent = _deleteEvent;
exports.getEvent = _getEvent;
exports.getFilteredEvents = _getFilteredEvents;
exports.patchEvent = _patchEvent;
exports.postEvent = _postEvent;
