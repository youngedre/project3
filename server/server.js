// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const cron = require('node-cron');
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
require('./db');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	// console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../supershopper/build/static')));
}

// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

cron.schedule("43 20 * * *",function() {
	console.log("~~~~~~~~~~~~~~~~~~~~");
	console.log("It is currently 8:30PM");
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
