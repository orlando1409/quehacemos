/* lib/appcache/index.js */
'use strict';

const zlib = require('zlib');
/* zlib.[Z_NO_COMPRESSION,Z_BEST_SPEED,Z_BEST_COMPRESSION,Z_DEFAULT_COMPRESSION] */

const util = require('util');

class AppCache {

	constructor ( options ) {
		options = options || {};
		options.gzip_threshold = options.gzip || 256;
		options.compression = options.compressions || zlib.Z_BEST_COMPRESSION;
		options.memsafe = options.memsafe || true;
		options.redline_sample = options.redline_sample || 0.1;
		options.default_ttl = options.expire_ttl || 10 * 60 * 1000;
		options.memory_redline = options.memory_redline || 0.5;
		options.ttl_min = 1 * 60 * 1000;
		this._options = options;
		this._store = {};
	}

	getMemoryUsage () {
		let mu = process.memoryUsage();
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
		let o = this._options;
		let redline = this.getMemoryUsage() - o.memory_redline;
		if ( redline > 0 ) {
			let factor = redline / o.memory_redline;
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

	_setpath ( path, etag, payload, ttl, gzipped ) {
		let o = this._options;
		let val = { etag:etag, payload:payload };
		if ( gzipped ) {
			val.gzipped = true;
		}
		if ( typeof ttl == 'undefined' || ttl === true ) {
			ttl = o.default_ttl;
			if ( o.memsafe ) {
				ttl = this.getAdjustedTTL(ttl);
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

	setpath ( path, etag, payload, ttl, next ) {
		let o = this._options;
		let self = this;
		if ( o.compression ) {
			if ( JSON.stringify(payload).length > o.gzip_threshold ) {
				zlib.gzip( payload, { level:o.compression }, function ( error, data ) {
					if ( error ) {
						next ( error );
					} else {
						let sp = self._setpath ( path, etag, data, ttl, true );
						if ( sp ) {
							next ( null, sp );
						} else {
							next ( sp );
						}
					}
				});
			} else {
				return this._setpath ( path, etag, payload, ttl );
			}
		} else {
			return this._setpath ( path, etag, payload, ttl );
		}
	}

}

module.exports = AppCache;
