// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const cron = require('node-cron');
const passport = require('./passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
const db = require('./db');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// If its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	// console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, '../supershopper/build/static')));
}

app.use(session({
	secret: 'ThisTest',
	store: new MongoStore({ mongooseConnection: db}),
	resave: false,
	saveUninitialized: false
}))
//Adds passport

app.use(passport.initialize())
app.use(passport.session())
// Add routes, both API and view
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
});

cron.schedule("43 10 * * *",function() {
	console.log("~~~~~~~~~~~~~~~~~~~~");
	console.log("It is currently 10:43AM");
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
