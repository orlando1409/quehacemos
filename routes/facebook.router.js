'use strict';
/* routes/facebook.route.js
 * Router defintion for facebook api interaction endpoints
 *
 * */

const controller = require('../controllers/facebook');

const express = require('express');

const router = express.Router();

router.get( '/myEvents', controller.getMyEvents );

module.exports = router;
