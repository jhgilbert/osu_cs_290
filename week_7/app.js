var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 3000);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res) {
  context = {requestType: 'GET'};
  if (Object.keys(req.query).length) {
    context.queryParams = req.query;
  }
  if (Object.keys(req.body).length) {
    context.bodyParams = req.body;
  }
  res.render('request-report', context);
});

app.post('/', function(req,res) {
  context = {requestType: 'POST'};
  if (Object.keys(req.query).length) {
    context.queryParams = req.query;
  }
  if (Object.keys(req.body).length) {
    context.bodyParams = req.body;
  }
  res.render('request-report', context);
});

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

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});