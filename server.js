var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname + '/client'));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'jade');

var months = ["January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"];

app.get('/', function(req, res) {
  res.render("index");
});

app.get('/:date', function(req, res) {
  var unix; 
  var natural = null;
  var date = req.params.date;
  
  if(!isNaN(date)){
    date = Math.floor(date);
    unix = date;
    date = new Date(date * 1000);
  } else {
    date = new Date(date);
    unix = date.setTime(date.getTime());
  }
  
  if(unix){
    var month = months[date.getMonth()];
    natural = month + " " + date.getDate() + ", " + date.getFullYear();
  }
  
  res.send({
    "unix" : unix,
    "natural" : natural
  });
});

app.listen(process.env.PORT || 8080, process.env.IP, function(){
  console.log("Chat server listening at port 3000");
});
