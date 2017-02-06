
require('./config/config');
const port = process.env.PORT;
const io = require('socket.io')(process.env.PORT || 3000);
const shortId = require('shortid');
var {Players} = require('./players');


let players = new Players();


io.on('connection', (socket) => {

  players.addPlayer(null, null, socket.id);
  let roomID = shortId.generate();

  socket.on('join', (name, OnJoinCallback) => {

    players.getPlayer(socket.id).name = name;
    players.getPlayer(socket.id).room = roomID;

    OnJoinCallback(JSON.stringify(players.getAllPlayers()));
    socket.emit('thisPlayer', JSON.stringify(players.getPlayer(socket.id)));
    socket.broadcast.emit('updateUserList', JSON.stringify(players.getAllPlayers()));
    console.log('Birisi bağlandığı zaman Genele gönderilen liste: ' + JSON.stringify(players.getAllPlayers()));
  });

  socket.on('enterRoom', (room) => {
    socket.join(room);
    players.getPlayer(socket.id).room = room;
    console.log(players.getPlayer(socket.id).name + ' \'in girdiği oda: ' + players.getPlayer(socket.id).room);
    socket.broadcast.emit('updateUserList', JSON.stringify(players.getAllPlayers()));
  });

  socket.on('newMessage', (data) => {
    console.log('Oda ismi: ' + players.getRoomName(socket.id));
    io.to(players.getRoomName(socket.id)).emit('newMessage', data);
  });


  socket.on('disconnect', () => {
    console.log('Player Disconnect');
    players.removePlayer(socket.id);
    socket.broadcast.emit('updateUserList', JSON.stringify(players.getAllPlayers()));
  });

});
