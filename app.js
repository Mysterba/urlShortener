var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var validUrl = require('valid-url');
var handlebars  = require('express-handlebars'), hbs;

var mongoUtil = require( './mongoUtil' );


var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(expressValidator());

// send app to router
require('./router')(app);


app.set( 'port', process.env.PORT || 3001 );
app.set('views', path.join(__dirname, 'views'));


hbs = handlebars.create({
    defaultLayout: 'Main'
})

app.use(express.static(path.join(__dirname, 'static')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


mongoUtil.connectToServer( function( err ) {
    if (err) throw err;
    console.log('DB initiated')
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening');
  })
});

