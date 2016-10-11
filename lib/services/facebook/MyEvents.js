'use strict'
/*
* A class for requesting an authenticated users own events from the
* facebook graph api. Requires the list_pages and user_events permissions.
*
*/

module.exports = class myEvents {

	constructor( options ){
		const self = this,

		self.accessToken = options.accessToken;
		self.version = options.version ? options.version : "v2.8";
		self.eventsFields = [
			"id",
			"type",
			"name",
			"cover.fields(id,source)",
			"picture.type(large)",
			"description",
			"start_time",
			"end_time",
			"attending_count",
			"declined_count",
			"maybe_count",
			"noreply_count"
		];
		self.fields = [
			"id",
			"name",
			"about",
			"emails",
			"cover.fields(id,source)",
			"picture.type(large)",
			"location",
			"events.fields(" + self.eventsFields.join(",") + ")"
		]
		//self.schema = schema;
	}

	get(){
		const myPageEventsUrl = "https://graph.facebook.com/" + self.version + "/me/accounts" +
		"?access_token=" + self.accessToken +
		"&fields=events.fields(" + self.eventsFields.join(",") + ")";

	}

	getAttending(){
		const myEventsUrl = "https://graph.facebook.com/" + self.version + "/me" +
		"?access_token=" + self.accessToken +
		"&fields=" + self.fields.join(",");

	}

}
