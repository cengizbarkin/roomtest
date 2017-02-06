
class Players {
  constructor() {
    this.players = [];
  }

  addPlayer (name, room, id) {
    let player = {name, room, id};
    this.players.push(player);
    return player;
  }

  removePlayer(id) {
    let player = this.players.filter((player) => player.id === id)[0]

    if(player) {
      this.players = this.players.filter((player) => player.id !== id);
    }
    return player;
  }

  getPlayer(id){
    return this.players.filter((player) => player.id === id)[0]
  }

  getPlayerList(room) {
    let players = this.players.filter((player) => player.room === room);
    let namesArray = players.map((player) => player.name);

    return namesArray;
  }

  getAllPlayers() {
    let players = this.players;
    return players;
  }

  getRoomName(id) {
    let player = this.players.filter((player) => player.id === id)[0]
    return player.room;
  }
}

module.exports = {
   Players
 }
