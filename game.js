const {Players} = require('./players');
const {timer} = require('./utils/timer');
const {shuffle} = require('./utils/shuffle');


var suits = ['clubs', 'diamonds', 'spades', 'hearts'];
var ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A' ];
var cards = [];


JoinGame = (players, room, io) => {
  var playersInTheRoom = players;

  //console.log(playersInTheRoom[0].name);
  if(players.length > 1){
    console.log('Player sayısı' + players.length);
    io.to(room).emit('roomMessage', JSON.stringify({'message': 'Waiting for other players'}));
  } else {
    timer(5, io, 'timerToStartGame', room, () => {
      StartGame(players);
    });
  }

  var StartGame = () => {
    console.log('El Başladı');
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < ranks.length; j++) {
        cards.push( ranks[j] + suits[i] );
      }
    }
      var newCards = shuffle(cards);
      console.log('cart sayısı: ' + newCards.length);
      console.log('Kartlar: ' + newCards);

      for (var i = 0; i < 2; i++) {
        for (var j = 0; j < players.length; j++) {
              players[j].cards.push(newCards[0]);
              newCards.splice(0, 1);
        }
      }

      for (var i = 0; i < players.length; i++) {
        console.log(`${i}. Oyuncunun eli ${JSON.stringify(players[i].cards)}`);
      }
        console.log('Kalan kart sayısı' + newCards.length);
        console.log('Kalan kartlar ' + newCards);
    }
  //io.to(room).emit('starGame', JSON.stringify(players[0].cards));
}


module.exports = {
  JoinGame
}
