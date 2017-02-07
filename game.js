//var io = require('socket.io');

var {cikar} = require('./server.js');

const {Players} = require('./players');

var suits = ['clubs', 'diamonds', 'spades', 'hearts'];
var ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var cards = [];


StartGame = (players, room, io) => {

  console.log('El Başladı');

  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      cards.push( ranks[j] + suits[i] );
    }
  };

  var newCards = shuffle(cards);

  players[0].cards = [newCards[0], newCards[1]];
  io.to(room).emit('starGame', JSON.stringify(players[0].cards));
  console.log('1. Oyuncunun eli ' + JSON.stringify(players[0].cards));
}


var shuffle = function(cards) {
  var currentIndex = cards.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
      return cards;
  };



module.exports = {
  StartGame
}
