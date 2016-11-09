'use strict';

const _meetup = require('meetup-api')({key:'a683897869356c4b811644c56a6'});

module.exports = function getEventsByUrlGroupName( req, res ) {
	const group_urlname = req.params.group_urlname;

	_meetup.getEvents({group_urlname: group_urlname}, function (err, results) {
		if( err ) {
			return res.status( 500 ).send( err );
		} else {
			res.status( 200 ).send( results );
		}
	});

}
