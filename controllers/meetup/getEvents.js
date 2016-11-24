'use strict';

const Client = require('node-rest-client').Client;

const client = new Client();

module.exports = function getEvents( req, res ) {
	const group_urlname = req.params.group_urlname;
	let url = 'https://api.meetup.com/find/events?&sign=true&photo-host=public&page=20&key=a683897869356c4b811644c56a6'


	client.get(url, function (data, response) {
		// console.log('API repsonse -->', response);
		res.status( 200 ).send( data );
	});

	client.on('error', function (err) {
		return res.status( 500 ).send( err );
	});

}
