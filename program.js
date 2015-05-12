var React = require('react');
var express = require('express');
var app = express();

var browserify = require('browserify');

app.set('port', (process.argv[2] || 3000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);

require('node-jsx').install();
var TodoBox = require('./components/TodoBox.jsx');

var data = [{
  title: 'Shopping',
  detail: process.argv[3]
}, {
  title: 'Hair cut',
  detail: process.argv[4]
}];

app.use('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./components/app.js')
    .transform('reactify')
    .bundle()
    .pipe(res);
});

app.use('/', function(req, res) {
  res.render('index.ejs', {
    initialData: JSON.stringify(data),
    markup: React.renderToString(React.createElement(TodoBox, {data: data}))
  });
});


app.listen(app.get('port'), function() {});
