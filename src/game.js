const ui = require('./ui');
const User = require('./user')

let users = [];

function registerUser(name, stream, term) {
  //pass deregister to ui.setup
  //figure out a better way to do ui and game engine stuff
  let temp = {name: name, stream: stream, screen: ui.setup(stream, term)};
  users.push(temp);
  temp.screen.render();
}

module.exports = {
  registerUser
};