var express = require('express')
,mustache = require('mustache')
,fs = require('fs')
,page = {}
,question = {}
,app = express.createServer()
,has = function(variable){
  fs.readFile( __dirname+'/templates/'+variable+'.html', function (err, data) {
    if (err) page[variable]="There was an error";
    else page[variable] = data.toString();
  });
  fs.readFile( __dirname+'/questions/'+variable+'.json', function (err, data) {
    if (err) page[variable]="There was an error";
    else question[variable] = JSON.parse(data);
  });
},f={
  count: function() {
    return function (text, render) {
      // note that counter is in the enclosing scope
      
      return counter;
    }
  },countq: function() {
    return function (text, render) {
      // note that counter is in the enclosing scope
      
      return q;
    }
  },reset: function(){
    counter = 1;
  },resetq: function(){
    q = 1;
  },first: function(){
    return function (text, render) {
      // note that counter is in the enclosing scope
      
      return (counter == 1)? text: "";;
    }
  },next: function(){
    counter++;
  },nextq: function(){
    q++;
  }
},counter=1
,q=1;

has('one');
has('two');
has('three');

app.use("/goodies", express.static(__dirname + '/goodies'));

app.get('/', function(request, response) {
  response.send('Check out one of the questionaires instead.');
});

app.get('/:page', function(request, response) {
  var stash = page[request.params.page] || "Looks like there was a problem, or questionaire not found."
  ,variable = question[request.params.page] || "Looks like there was a problem, or questionaire not found.";
  variable.f = f;
  response.send(mustache.render(stash,variable));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});