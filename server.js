// Internal modules

// NPM modules
const express = require("express");
const morgan = require("morgan");
// Own modules
const Facebook = require("services/facebook");

const app = express();

// Use morgan for logging
app.use(morgan("combined"));

app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);
app.set("x-powered-by", false);
app.set("etag", false);

//Register routes
require('./routes')(app);

// Health check route
app.get("/health", function(req, res) {
	res.send("OK");
});

// Start Express.js server
const server = app.listen(app.get("port"), app.get("host"), function() {
	console.log("Express server listening on port " + server.address().port + " on " + server.address().address);
});
