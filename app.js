var React = require('react');
var TodoBox = require('./components/TodoBox.jsx');

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<TodoBox data={data} />, document.getElementById("app"));
