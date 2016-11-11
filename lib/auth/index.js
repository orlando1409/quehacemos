/* lib/framework/auth/index.js */
/* authorization (not authentication) */
'use strict';

const JWT = require('jwt-simple');

class Auth {

	constructor ( secret ) {
		this.JWT_SECRET = secret || false;
		if (!this.JWT_SECRET) {
			let err = new ERROR.ServerError(null,"JWT_SECRET not supplied.");
			Logger.error(err);
			throw err;
		}
	}

	static decodeJWT ( jwt, secret ) {
		return JWT.decode( jwt, secret );
	}

	static encodeJWT ( payload, secret ) {
		return JWT.encode( payload, secret );
	}

	static hasRequiredRoles ( uroles, rroles ) {
		let filtered = ( uroles & rroles );
		return !( filtered ^ rroles );
	}

	// NOTE: returns false when a role in uroles is matched in rroles
	static hasNoDeniedRoles ( uroles, rroles ) {
		return !( uroles & rroles );
	}

}

module.exports = Auth;
