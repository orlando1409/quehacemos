/* lib/appcache/index.js */
'use strict';

class AppCache {

	constructor ( options ) {
		options = options || {};
		options.memsafe = options.memsafe || true;
		options.redline_sample = options.redline_sample || 0.1;
		options.default_ttl = options.expire_ttl || 10 * 60 * 1000;
		options.memory_redline = options.memory_redline || 0.5;
		options.ttl_min = 1 * 60 * 1000;
		this._options = options;
		this._store = {};
	}

	getMemoryUsage () {
		let mu = util.inspect(process.memoryUsage());
		// returns: { rss: 4935680, heapTotal: 1826816, heapUsed: 650472 }
		let usage = mu.heapUsed / mu.heapTotal;
		let o = this._options;
		if ( usage > o.memory_redline && o.redline_sample ) {
			if ( o.redline_sample > Math.random() ) {
				mu.usage = usage;
				let msg = { memory_redline:mu };
				console.info(msg); // TODO: use a proper logger!
			}
		}
		return mu.heapUsed / mu.heapTotal;
	}

	getAdjustedTTL ( ttl ) {
		let redline = this.getMemoryUsage() - this.options.memory_redline;
		if ( redline > 0 ) {
			let factor = redline / this._options.memory_redline;
			return ttl - ( ttl * factor );
		} else return ttl;
	}

	setExpire ( path, ttl ) {
		if ( this._store[path] ) {
			let _self = this;
			setTimeout( function() { _self.expire(path); }, ttl );
		}
	}

	expire ( path ) {
		delete this._store[path];
	}

	getpath ( path ) {
		return this._store[path];
	}

	setpath ( path, etag, payload, ttl ) {
		let o = this._options;
		let val = { etag:etag, payload:payload };
		if ( typeof ttl == 'undefined' || ttl === true ) {
			ttl = o.default_ttl;
			if ( o.memsafe ) {
				ttl = getAdjustedTTL(ttl);
			}
		}
		if ( ttl ) {
			if ( ttl > o.ttl_min ) {
				val.ttl = ttl;
				val.cached = Date.now();
				this._store[path] = val;
				this.setExpire ( path, ttl );
				return ttl;
			} else {
				return false;
			}
		} else {
			this._store[path] = val;
			return true;
		}
	}

}
