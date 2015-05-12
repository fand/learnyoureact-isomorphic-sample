var React = require('react');
var express = require('express');
var app = express();

var browserify = require('browserify');

app.set('port', (process.argv[2] || 3000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);

// TodoBoxはjsxなのでnode-jsxが必要
require('node-jsx').install();
var TodoBox = require('./components/TodoBox.jsx');

// 初期データ
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
  var initialData = JSON.stringify(data);

  // サーバ側でレンダリングしたHTML
  var markup = React.renderToString(React.createElement(TodoBox, {data: data}));

  res.render('index.ejs', {
    initialData: innitialData,
    markup: markup
  });
});


app.listen(app.get('port'), function() {});
