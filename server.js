var express 	 = require('express') ;
var app      	 = express() ;
var nodemailer   = require("nodemailer");
var morgan       = require('morgan') ;
var cookieParser = require('cookie-parser') ;
var bodyParser   = require('body-parser') ;
var session      = require('express-session') ;
var flash   	 = require('connect-flash') ;
var port  	     = process.env.PORT || 3000 ;
var smtpTransport = require('nodemailer-smtp-transport');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + './views/'));

var transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    auth: {
        user: 'Add your gmail id here', // my mail
        pass: 'add your gmail password here'
    },
}));

require('./app/routes.js')(app, transport) ;

app.listen(port,function(){
console.log("localhost:3000");
});