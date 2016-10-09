/* server.js */
'use strict';

require('dotenv').config();
require('app-module-path').addPath(__dirname);

const path = require('path');

const express = require('express');
const compression = require('compression');

const AppCache = require('lib/appcache');
global.ACACHE = new AppCache();

console.info("ACACHE.getMemoryUsage():",JSON.stringify(ACACHE.getMemoryUsage()));

ACACHE.setpath ( "/123", 123, {"test":123}, true, function ( error, data ) {
	if ( error ) {
		console.error("ACACHE.setpath() error:", JSON.stringify(error));
	} else {
		console.info("ACACHE.setpath() data:", JSON.stringify(data));
	}
});

let testcache = ACACHE.getpath ( "/123" );
console.log("testcache:",JSON.stringify(testcache)); 



global.app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

// TODO: let's compress this shit in the cache!
app.use( compression( { threshold: 256 } ) ); // gzip deflate compression over http

app.use ( function ( req, res, next ) {
	let acceptEncoding = req.headers['accept-encoding'];
	if ( !acceptEncoding ) {
		// TODO: error response Accept-Encoding must be gzip
	} else {
		if (acceptEncoding.match(/\bgzip\b/)) {
			res.writeHead(200, { 'Content-Encoding': 'gzip' });
		} else {
			// TODO: error response Accept-Encoding must be gzip
		}
	}
});


app.set('strict routing', true);

app.set('case sensitive routing', true);

// routers
app.use( '/pubsub', require('routers/pubsubtest') );

app.set('port', ( process.env.PORT || 8888 ));
app.listen( app.get('port'), function() {
	console.info(`Node app is running on port ${ app.get('port') }`);
});
