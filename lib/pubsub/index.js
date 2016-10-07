/* lib/pubsub/index.js */
'use strict';

const pgFormat = require('pg-format');

const EventEmitter = require('events').EventEmitter;
const Retry = require('promised-retry');
const util = require('util');

const pg = require('pg');

const PGPubsub = function (options) {
	EventEmitter.call(this);
	const self = this;

	this.setMaxListeners(0);

	this.conString = conString;
	this.channels = [];
	this.conFails = 0;

	options = options || {};

	this.retry = new Retry({
		name: 'pubsub',
		try: function () {
			let db = new pg.Client( options );
			db.on( 'error', function () {
				self.retry.reset();
				if (self.channels.length) {
					self.retry.try();
				}
			});
			return new Promise(function (resolve, reject) {
				db.connect(function (err) {
					if (err) {
						reject(err);
					} else {
						resolve(db);
					}
				});
			});
		},
		success: function ( db ) {
			db.on('notification', self._processNotification.bind(self));

			self.channels.forEach(function (channel) {
				db.query('LISTEN "' + channel + '"');
			});
		},
		end: function ( db ) {
			db.end();
		},
		log: options.log || console.log.bind( console ),
	});
};

util.inherits(PGPubsub, EventEmitter);

PGPubsub.prototype._getDB = function (callback, noNewConnections) {
	return this.retry.try(!noNewConnections).then(callback);
};

PGPubsub.prototype._processNotification = function ( msg ) {
	var payload = msg.payload;
	try {
		payload = JSON.parse( payload );
	} catch ( error ) {}
	this.emit( msg.channel, payload );
};

PGPubsub.prototype.addChannel = function ( channel, callback ) {
	if (this.channels.indexOf( channel ) === -1) {
		this.channels.push( channel );

		this._getDB(function ( db ) {
			db.query('LISTEN "' + channel + '"');
		});
	}

	if ( callback ) {
		this.on( channel, callback );
	}

	return this;
};

PGPubsub.prototype.removeChannel = function ( channel, callback ) {
	let pos = this.channels.indexOf( channel );
	if ( pos === -1 ) {
		return;
	}
	if ( callback ) {
		this.removeListener( channel, callback );
	} else {
		this.removeAllListeners( channel );
	}
	if ( this.listeners( channel ).length === 0 ) {
		this.channels.splice( pos, 1 );
		this._getDB(function ( db ) {
			db.query('UNLISTEN "' + channel + '"');
		}, true);
	}
	return this;
};

PGPubsub.prototype.publish = function ( channel, data ) {
	return this._getDB( function ( db ) {
		return new Promise(function ( resolve, reject ) {
			db.query('NOTIFY "' + channel +	'", ' + pgFormat.literal( JSON.stringify( data ) ), function ( error ) {
				return error ? reject( error ) : resolve();
			});
		});
	});
};

PGPubsub.prototype.close = function () {
	this.retry.end();
	this.removeAllListeners();
	this.channels = [];
};

module.exports = PGPubsub;
