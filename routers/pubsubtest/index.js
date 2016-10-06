/* routers/pubsubtest/index.js */
'use strict';

const express = require('express');

const pstRouter = express.Router();

const c = require('controllers/pubsubtest');

pstRouter.get( '/', c.get );

pstRouter.post( '/', c.post );

pstRouter.put( '/', c.put );

pstRouter.delete( '/', c.delete );

module.exports = pstRouter;
