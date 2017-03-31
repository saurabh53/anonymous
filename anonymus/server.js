var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('JS', __dirname + '/public/JS');
app.set('js');

app.use(cors());

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname + '/public/test.html'));
});

app.listen(8080);
