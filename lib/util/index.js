/* lib/util/index.js */
'use strict';

exports.registerRoutes = function registerRoutes ( app, arrRouters ) {
	for ( let router of arrRouters ) {
		var rtr = require(router);
		let rtrInstance = new rtr();
		app.use('/', rtrInstance.expressRouter);
	}
};

const epoch = parseInt( new Date("2016-01-01T00:00:00.000Z").valueOf() / 100 );

exports.getRLabsTimeStamp = function getRLabsTimeStamp ( date ) {
	if ( date ) return parseInt( date.valueOf() / 100 ) - epoch;
	else return parseInt( Date.now() / 100 ) - epoch;
};

exports.toBitwiseArray = function toBitwiseArray ( intmask ) {
	let bwarr = [];
	for ( let x=31; x >= 0; x--) {
		if ( intmask >> x == 0 ) continue;
		else bwarr.push(Math.pow(2,x));
	}
	return bwarr.reverse();
}

exports.parseHeader = function parseHeader ( header, value ) {
	switch ( header ) {
		case 'forwarded': // RFC 7239
			// for=192.0.2.60, for=198.51.100.17;proto=http;by=203.0.113.43
			let retval = {};
			let arr1 = value.split(";");
			for ( let e of arr1 ) {
				let arr2 = e.split(/ *, */);
				for ( let e of arr2 ) {
					let arr3 = e.split("=");
					if ( retval[ arr3[0] ] ) retval[ arr3[0] ].push( arr3[1] );
					else {
						retval[ arr3[0] ] = [];
						retval[ arr3[0] ].push( arr3[1] );
					}
				}
			}
			return retval;

		case 'x-forwarded-for': // replaced by RFC 7239
			// X-Forwarded-For: client, proxy1, proxy2
			return value.split(/ *, */).filter(Boolean);

		case 'x-forwarded-proto': // replaced by RFC 7239
			return value.trim();

		default: throw new Error("header not handled:" + header);
	}
};

exports.getJSON = function getJSON (parsedUrl, next) {
	var url = require('url');
	var http = require('https');
	var strUrl = url.format(parsedUrl);
	http.get(strUrl, function (res) {
		var strData = '';
		res.on('data', function (chunk) {
			strData += chunk;
		});
		res.on('error', function (error) {
			return next(error, strData);
		});
		res.on('end', function () {
			try {
				return next(null,JSON.parse(strData));
			}
			catch (e) {
				return next(e,"Could not parse JSON from server response.");
			}
		});
	});
};

exports.FB = {};

exports.FB.genAccessToken = function genFBAccessToken ( fbappid, fbappsecret ) {
	return encodeURIComponent(fbappid + "|" + fbappsecret);
}
