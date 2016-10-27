/* test/index.js */
'use strict';

require('app-module-path').addPath(process.cwd());

const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);


describe("lib/appcache", function(){

	before(function(){
		const AppCache = require('lib/appcache');
	});

	describe("#constructor", function(){
		before(function(){
			let ACACHE = new AppCache();
		});
		it("should have default options even when otherwise not supplied", function(){
			expect(ACACHE.getOptions()).to.have.all.keys('gzip_threshold','compression','memsafe','redline_sample','default_ttl','ttl_min');
		});
		it("should be an instance of AppCache", function(){
			expect(ACACHE).to.be.instanceof(AppCache);
		});
		after(function(){
			// delete ACACHE; //???
		});
	});

	describe("#getMemoryUsage", function(){
		before(function(){
			let ACACHE = new AppCache( { memory_redline:0.000001, redline_sample:1 } );
		});
		it("should return a percentage (number)", function(){
			expect(ACACHE.getMemoryUsage()).to.be.a('number');
			// TODO: add expect return value < 1
		});
		it("should emit to logger when memory usage passes redline and sampling matches random", function(){
			expect(ACACHE.getMemoryUsage()).to.be.a('number');
			/* TODO: build a mock for Logger when implemented
			let mockLogger = sinon.mock(require('lib/logger'));
			mockLogger.expects('info').withArgs();
			*/
		});
	});

	describe("#getAdjustedTTL", function(){
		before(function(){
			let ACACHE = new AppCache( { memory_redline:1, redline_sample:0 } );
		});
		it("should return a same ttl when not redlining", function(){
			let result = ACACHE.getAdjustedTTL(10);
			expect(result).to.be.a('number');
			expect(result).to.equal(10);
		});
		it("should adjust ttl when memory is redlining", function(){
			/* TODO: build a mock for #getMemoryUsage otherwise this can't be tested */
		});
	});

	describe("#setpath and #getpath", function(){
		before(function(){
			let ACACHE = new AppCache( { memory_redline:1, redline_sample:0, gzip_threshold:1 } );
		});
		it("should setpath synchronously when not supplied callback", function(){}
			let path = "/test";
			let etag = "1234";
			let payload = { data:{ test:"test" } };
			let ttl = 10;
			let result = ACACHE.setpath ( path, etag, payload, ttl);
			expect(result).to.be.a('number');
			expect(result).to.equal(10);
		});
		it("should setpath synchronously (no compression) when not supplied callback", function(){}
			let path = "/test";
			let etag = "1234";
			let payload = { data:{ test:"test" } };
			let ttl = 10;
			let result = ACACHE.setpath ( path, etag, payload, ttl);
			expect(result).to.be.a('number');
			expect(result).to.equal(10);
			let cached = ACACHE.getpath ( path );
			expect(cached).to.be.an('object');
			expect(cached.payload).to.be.an('object');
			expect(cached.gzipped).to.not.equal(true);
		});


		it("should return a same ttl when not redlining", function( done ) {
			ACACHE.setpath ( path, etag, payload, ttl, function(error, data){
				let result = ACACHE.getAdjustedTTL(10);
				expect(result).to.be.a('number');
				expect(result).to.equal(10);
			});

		});
		it("should adjust ttl when memory is redlining", function(){
			/* TODO: build a mock for #getMemoryUsage otherwise this can't be tested */
		});
	});



});

const testEventsRouter = require('test/routers/events/index.js');
