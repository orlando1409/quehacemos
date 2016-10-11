// Instantiate CORS whitelist
const whitelist = [];
let enableAll = false;

if (process.env.FEBL_CORS_WHITELIST) {
	if (process.env.FEBL_CORS_WHITELIST.indexOf(",") > -1) {
		// Add custom whitelisted domains
		whitelist = whitelist.concat(process.env.FEBL_CORS_WHITELIST.split(","))
	} else {
		whitelist.push(process.env.FEBL_CORS_WHITELIST);
	}
	// Log CORS whitelist
	console.log("Using CORS whitelist of " + whitelist);
	// Otherwise enable all origins
} else {
	enableAll = true;
}

// CORS middleware handler
const corsOptions = {
	origin: function( origin, callback ){
		if ( whitelist.length > 0 ) {
			const originIsWhitelisted = whitelist.indexOf( origin ) !== -1;
			callback(null, originIsWhitelisted);
		} else if ( enableAll ) {
			callback( null, true );
		} else {
			callback( null, false );
		}
	}
};

module.exports = {
	corsOptions: corsOptions
}
