var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var members = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(data){
    io.emit('chat message', data);
  });
  socket.on('chat member', function(id){
    if (id) {
      if (members.indexOf(id) === -1) {
        members.push(id);
      }
      io.emit('chat member', `${id} is typing...`);
    } else {
      io.emit('chat member', '');
    }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
