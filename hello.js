var express = require('express')
,fs = require('fs')
,page = {}
,app = express.createServer()
,has = function(variable){
  fs.readFile( __dirname+'/template/'+variable+'.html', function (err, data) {
    if (err) page[variable]="There was an error";
    else page[variable] = data.toString();
  });
}

has('one');
has('two');
has('three');

app.use("/goodies", express.static(__dirname + '/goodies'));

app.get('/', function(request, response) {
  response.send('Check out one of the questionaires instead.');
});

app.get('/:page', function(request, response) {
    render = page[request.params.page] || "Looks like there was a problem, or questionaire not found.";
    response.send(render);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});