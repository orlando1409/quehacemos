'use strict';
/* routes/meetup.route.js
 * Router defintion for meetup api interaction endpoints
 *
 * */

const controller = require('../controllers/meetup');

const express = require('express');

const router = express.Router();

router.get( '/events/v1/:group_urlname', controller.getEventsByUrlGroupName );

router.get( '/events/v2/:group_urlname', controller.getEventsByUrlGroupNameV2 );

router.get( '/events', controller.getEvents );

router.get( '/self/events', controller.getMyEvents );

module.exports = router;
