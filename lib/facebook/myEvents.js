'use strict'
/*
*
*
*
*/

export default class myEvents {

	constructor( options ){
		const self = this,
		allowedSorts = [ "time", "venue", "popularity" ];

		self.accessToken = options.accessToken;

		self.sort = options.sort
		? (allowedSorts.indexOf(options.sort.toLowerCase()) > -1
		? options.sort.toLowerCase()
		: null )
		: null;
		self.version = options.version ? options.version : "v2.7";
		self.since = options.since || (new Date().getTime()/1000).toFixed();
		self.until = options.until || null;
		//self.schema = schema;
	}

	get(){
		const eventsFields = [
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
		const fields = [
			"id",
			"name",
			"about",
			"emails",
			"cover.fields(id,source)",
			"picture.type(large)",
			"location",
			"events.fields(" + eventsFields.join(",") + ")"
		]
		const eventsUrl = "https://graph.facebook.com/" + self.version + "/" +
		"?access_token=" + self.accessToken +
		"&fields=" + fields.join(",") +
		".since(" + self.since + ")";
		if (self.until) {
			eventsUrl += ".until(" + self.until + ")";
		}
	}

}
