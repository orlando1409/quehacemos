/* controllers/events/index.js */
'use strict';

const _get = function ( req, res, next ) {
	let path = req.path;
	let cached = ACACHE.get(path);
	if ( cached ) {
		if ( cached.gzipped ) {

		} else {

		}
	} else {
		let id = req.params.id;
	}
}


const _getTagged = function ( req, res, next ) {
	let path = req.path;
	let cached = ACACHE.get(path);
	if ( cached ) {
		if ( cached.gzipped ) {

		} else {

		}
	} else {
		let tags = req.params.tags.split("|");
	}
}

const _post = function ( req, res, next ) {

}

const _put = function ( req, res, next ) {

}

const _delete = function ( req, res, next ) {

}

exports.get = _get;
exports.getTagged = _getTagged;
exports.post = _post;
exports.put = _put;
exports.delete = _delete;
