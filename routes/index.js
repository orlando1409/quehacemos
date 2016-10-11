'use strict';
/* routes/index.js
 * Index file for importing the router definitions
 * */

const cors = require('cors');

const corsOptions = require('utils/routerUtils').corsOptions;


module.exports = function registerRouters( app ) {

	return app.use('/facebook', cors( corsOptions ), require('./facebook.router'));

}
