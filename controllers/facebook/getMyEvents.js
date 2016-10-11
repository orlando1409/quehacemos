'use strict';

const fbAPI = require('services/facebook');

module.exports = function getMyEvents( req, res ) {
	const accessToken = params.token;

	const options = {};

	if ( req.query.accessToken ) {
		options.accessToken = req.query.accessToken;
	}
	if ( req.query.sort ) {
		options.sort = req.query.sort;
	}
	if ( req.query.version ) {
		options.version = req.query.version;
	}

	fbAPI.getMyEvents( options, function( err, results ){
		if( err ){
			res.status( 500 ).send( err );
		} else {
			res.status( 200 ).send( { events : results } )
		}
	});

}
