'use strict';

const fbAPI = require('services/facebook');

module.exports = function getMyEvents( req, res ) {
	//const accessToken = params.token;

	const options = {};

	if ( req.query.access_token ) {
		options.access_token = req.query.access_token;
	}
	if ( req.query.version ) {
		options.version = req.query.version;
	}

	const MyEvents = new fbAPI.MyEvents( options );
	MyEvents.get( function( err, results ){
		if( err ){
			console.log( `problem with request: ${e.message}` );
			res.status( 500 ).send( err );
		} else {
			res.status( 200 ).send( results )
		}
	});

}
