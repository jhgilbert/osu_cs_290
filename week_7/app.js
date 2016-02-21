var express = require('express');
var app = express();

// Handlebars templating

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Port and static handling

app.set('port', 3000);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Add parsing for POST requests

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Routes

app.get('/', function(req,res) {
  res.render('request-report', buildContext(req));
});

app.post('/', function(req,res) {
  res.render('request-report', buildContext(req));
});

// Error Handling

app.use(function(req,res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

// Helpers

function buildContext(req) {
  context = {requestType: req.method};
  if (Object.keys(req.query).length) {
    context.queryParams = req.query;
  }
  if (Object.keys(req.body).length) {
    context.bodyParams = req.body;
  }
  return context;
}


// Listen on designated port

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});