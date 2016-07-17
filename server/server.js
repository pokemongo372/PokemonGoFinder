var express = require('express'),
	 http = require('http'),
       	 mongoose = require('mongoose'),
         bodyParser = require('body-parser');

var app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 8080);
mongoose.connect('mongodb://localhost:27017/pokemon');



var logger = require('morgan');
app.use(logger('dev'));

app.use(express.static(__dirname + '/web'));


var fs = require('fs');
var path = require('path');

console.log("path:",__dirname);
var rootPath = path.normalize(__dirname);

var modelPath = rootPath + '/models';
var configPath = rootPath + '/configs';
var routePath = rootPath + '/routes';

var modelPathFiles = fs.readdirSync(modelPath);
console.log(modelPathFiles);

modelPathFiles.forEach(function(file) {
	require(modelPath + '/' + file);
});

        fs.readdirSync(routePath).forEach(function(file) {
	console.log(file);
	require(routePath + '/' + file)(app,io);
});
       

app.get('/ping', function(req, res) {
	res.json({'pong':'frcf'});
});

/*
app.listen(8080, function() {
	console.log("server is running on port 8080");
});
*/