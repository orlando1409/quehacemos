'use strict';
/* routes/meetup.route.js
 * Router defintion for meetup api interaction endpoints
 *
 * */

const controller = require('../controllers/meetup');

const express = require('express');

const router = express.Router();

router.get( '/events/:group_urlname', controller.getEventsByUrlGroupName );

module.exports = router;
