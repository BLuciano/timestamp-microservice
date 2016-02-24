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
  } else {
    date = new Date(date);
    unix = date.setTime(date.getTime());
  }
  
  if(unix){
    date = new Date(date);
    var month = months[date.getMonth()];
    natural = month + " " + date.getDate() + ", " + date.getFullYear();
  }
  
  res.send({
    "unix" : unix,
    "natural" : natural
  });
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Chat server listening at port 3000");
});
