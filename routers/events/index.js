/* routers/pubsubtest/index.js */
'use strict';

const express = require('express');

const pstRouter = express.Router();

const c = require('controllers/pubsubtest');

pstRouter.get( '/:id', c.get );

pstRouter.get( '/tagged/:tags', c.getTagged );

pstRouter.post( '/', c.post );

pstRouter.put( '/:id', c.put );

pstRouter.delete( '/:id', c.delete );

module.exports = pstRouter;
