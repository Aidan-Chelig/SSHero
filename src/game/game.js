//from master server

const eventHandler = require('../shared/event-handler');
const config = require('../config');
const net = require('net');
const {StreamFilter, Prefixer} = require('../shared/streamParser')

function message(socket, prefix, type, data) {
  socket.write(JSON.stringify([prefix, type, data]));
}

function getPrefix(s, user) {
  //include identity data like name and UUID
  message(s, -1, 'prefix', user.username);
}

module.exports = class Game {
  constructor(owner, name, pass, socket, uuid) {
    this.owner = owner;
    this.name = name;
    this.pass = pass;
    this.socket = socket;
    this.uuid = uuid;
    this.users = [];
    this.prefix = [];
    this.msgHandler = eventHandler(this.socket);
  }

  joinGame(user) {
    this.users.push(user);
    this.msgHandler.once("prefix", (data) => {
      user.game = this;
      user.prefix = data;
      this.prefix[data] = user;
      let affixprefix = new Prefixer(data);
      let filterPrefix = new StreamFilter(data);
      user.stream.pipe(affixprefix).pipe(this.socket).pipe(filterPrefix).pipe(user.stream);
    });
    let prefix = getPrefix(this.socket, user);
      //user.stream.pipe(this.socket).pipe(user.stream);
    //make it so each users iostream is specific to them VVVVVVVVVVVVVVV
    //get a prefix and prefix all data sent from user with it with a transform
    //make an event listener to transform all ondata events with their message
    //set the transform inbetween those so that its asif there is no prefix to begin with
  }

};
