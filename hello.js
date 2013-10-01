var express = require('express'),
fs = require('fs'),
mustache = require('mustache');

var app = express.createServer();

app.use("/goodies", express.static(__dirname + '/goodies'));

app.get('/', function(request, response) {
  fs.readFile( __dirname+'/index.html', function (err, data) {
    if (err) response.send(err);
    var code = data.toString();
    response.send(mustache.render(code));
  });
});

app.get('/:page', function(request, response) {
  fs.readFile( __dirname+'/'+request.params.page+'.html', function (err, data) {
    if (err){
    	response.status(404);
    	response.send("4 oh 4")
    }
    var code = data.toString();
    response.send(mustache.render(code));
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});