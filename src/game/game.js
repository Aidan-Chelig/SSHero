const eventHandler = require('./event-handler');
const config = require('../config');
const net = require('net');
const { Transform } = require('stream');

function message(socket, type, data) {
  socket.write(JSON.stringify([type, data]));
}

function getPrefix(s, callback) {
  message(s, 'prefix', '');
}

module.exports = class Game {
  constructor(owner, name, pass, socket, uuid) {
    this.owner = owner;
    this.name = name;
    this.pass = pass;
    this.socket = socket;
    this.uuid = uuid;
    this.users = [];
    this.msgHandler = eventHandler(this.socket);
  }

  joinGame(user) {
    console.log("test");
    this.users.push(user);
    this.msgHandler.once("prefix", (data) => {
      console.log(data);
    });
    let prefix = getPrefix(this.socket);
    //user.stream.pipe(this.socket).pipe(user.stream);
    //make it so each users iostream is specific to them VVVVVVVVVVVVVVV
    //get a prefix and prefix all data sent from user with it with a transform
    //make an event listener to transform all ondata events with their message
    //set the transform inbetween those so that its asif there is no prefix to begin with
  }

};