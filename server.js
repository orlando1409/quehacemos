/* server.js */
'use strict';

require('dotenv').config();
require('app-module-path').addPath(__dirname);
const path = require('path');

const express = require('express');
const nunjucks = require ('nunjucks');
const compression = require('compression');

global.appcache = {};

global.app = express();

app.enable('trust proxy');
app.use( require('cors')() );
//app.disable('etag');
app.disable('x-powered-by');
app.use( compression( { threshold: 256 } ) ); // gzip deflate compression over http

// TRUST_PROXY
let tp = process.env.TRUST_PROXY || false;
if ( !( tp === false || tp == 'false' || tp == '0' ) ) {
	app.enable('trust proxy');
}

/* NOTE: this should be handled by NGINX: Node just receives HTTP */
if ( process.env.NODE_ENV === 'production' ) {
	let forceSsl = function(req, res, next) {
		let proto = req.protocol;
		if ( proto !== 'https') {
			return res.redirect( 301, 'https://' + req.hostname + req.url );
		}
		return next();
	};
	app.use(forceSsl);
}


app.set('strict routing', true);

app.set('case sensitive routing', true);

global.Template_Env = nunjucks.configure( 'views',{ autoescape:true, express:app } );
app.engine( 'nunj', nunjucks.render );
app.set('view engine', 'nunj');

// STATIC_DIR
let staticDir = process.env.STATIC_DIR || null;
if ( staticDir ) {
	staticDir = path.resolve( __dirname, staticDir );
	let staticRUrl = process.env.STATIC_RURL || "/static";
	app.use( staticRUrl, express.static(staticDir) );
	console.info ("Static directory: " + staticDir + " exposed at: " + staticRUrl );
}

// routers
app.use( '/gallery', require('routers/gallery') );
app.use( '/admin',   require('routers/admin')   );
app.use( '/',        require('routers/home')    );

app.set('port', ( process.env.PORT || 8888 ));
app.listen( app.get('port'), function() {
	console.info(`Node app is running on port ${ app.get('port') }`);
});
