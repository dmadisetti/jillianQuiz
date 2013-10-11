var express = require('express')
,fs = require('fs')
,mustache = require('mustache')
,stash
,render = function(response,page,variable){
  var page = page || 'index',
  variable= variable || {'index':1};
  fs.readFile( __dirname+'/templates/'+page+'.html', function (err, data) {
    if (err){
      response.status(404);
      response.send("4 oh 4");
      return;
    }
    variable['code'] = data.toString();
    response.send(mustache.render(stash,variable));
  });
}
,app = express.createServer();

fs.readFile( __dirname+'/stash.html', function (err, data) {
  if (err) stash="There was an error";
  else stash = data.toString();
});

app.use("/goodies", express.static(__dirname + '/goodies'));

app.get('/', function(request, response) {
  render(response);
});

app.get('/:page', function(request, response) {
  page = request.params.page;
  variable = {};
  variable[page] = 1;
  render(response,page,variable);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});