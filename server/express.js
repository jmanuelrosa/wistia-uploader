'use strict';

var express = require('express');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');

console.log(path.join(__dirname, '../app'));
console.log(path.join(__dirname, '../node_modules/'));

app.use(express.static(path.join(__dirname, '../app')));
app.use('/', express.static(path.join(__dirname, '../node_modules/')));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(process.env.PORT || 3000);
