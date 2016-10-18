'use strict'
/*
* A class for requesting an authenticated users own events from the
* facebook graph api. Requires the list_pages and user_events permissions.
*
*/

const https = require( 'https' );

const parseFBResponse = function parseFBResponse( responseJson ){
	const resultObj = JSON.parse( responseJson );
	delete resultObj.paging;
	if( resultObj.data && resultObj.data.length ){
		resultObj.data.forEach( ( page ) => {
			if( page.events ) delete page.events.paging;
		});
	}

	return resultObj;
}

module.exports = class myEvents {

	constructor( options ){
		const self = this;

		self.access_token = options.access_token;

		self.version = options.version ? options.version : "v2.8";

		self.eventLimit = options.eventLimit ? options.eventLimit : 500;

		self.pageLimit = options.pageLimit ? options.pageLimit : 50;

		self.eventFields = options.eventFields
			?	options.eventFields
			: [
				"id",
				"type",
				"name",
				"category",
				"cover.fields(id,source)",
				"picture.type(large)",
				"description",
				"place",
				"start_time",
				"end_time",
				"attending_count",
				"attending",
				"declined_count",
				"maybe_count",
				"noreply_count",
				"ticket_uri"
			];

		self.pageFields = options.pageFields
			? options.pageFields
			: [
				"id",
				"about",
				"link",
				"cover.fields(id,source)",
				"verification_status",
				"website",
				"events.limit(" + self.eventLimit + ").fields(" + self.eventFields.join(",") + ")"
			]
		//self.schema = schema;
	}

	get( getOptions, next ){
		if ( !next && typeof getOptions === 'function' ){
			next = getOptions;
		}else {

		}
		const self = this;

		const myPageEventsPath = "/" + self.version + "/me/accounts" +
		"?access_token=" + self.access_token +
		"&fields=" + self.pageFields.join(",") +
		".limit(" + self.pageLimit + ")";


		const reqOptions = {
			hostname: 'graph.facebook.com',
			path: myPageEventsPath,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};

		const req = https.request( reqOptions, (res) => {
			console.log( `STATUS: ${res.statusCode}` );
			console.log( `HEADERS: ${JSON.stringify(res.headers)}` );
			res.setEncoding( 'utf8' );
			let result = '';
			res.on('data', ( chunk ) => {
				console.log( `BODY: ${chunk}` );
				result += chunk;
			});
			res.on( 'end', () => {
				console.log( 'No more data in response.' );
				next( null, parseFBResponse( result ) );
			})
		});

		req.on( 'error', ( e ) => {
			next( `problem with request: ${e.message}` );
		});

		// write data to request body
		//req.write();
		req.end();

	}

	getAttending(){
		const myEventsUrl = "https://graph.facebook.com/" + self.version + "/me" +
		"?access_token=" + self.access_token +
		"&fields=" + self.fields.join(",");

	}

}
