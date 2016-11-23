'use strict';
/*
* controllers/meetup/index.js
* Controller definitions for meetup integration
*
*/

const _getEventsByUrlGroupName = require('./getEventsByUrlGroupName');

const _getEventsByUrlGroupName2 = require('./getEventsByUrlGroupName2');

module.exports = {

	getEventsByUrlGroupName: _getEventsByUrlGroupName,

	getEventsByUrlGroupNameV2: _getEventsByUrlGroupName2,

}
