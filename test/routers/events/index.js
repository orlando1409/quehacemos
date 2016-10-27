/* test/routers/events/index.js */
'use strict';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

const pg = require('pg');
const EventsRouter = require('routers/events');

/* istanbul ignore next */
const MockRequest = require('lib/mock/express/request.js');
/* istanbul ignore next */
const MockResponse = require('lib/mock/express/response.js');

describe("EventsRouter", function(){
	before(function(){
		mockEventsModel = sinon.mock(require('models/events'));
	});
});
