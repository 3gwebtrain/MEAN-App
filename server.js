var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var config = require('./config');
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


app.get('*', function(req, res) {
 res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);