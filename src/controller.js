const User = require('./user');
const Game = require('./game/game');
let ui;
let gmi;
let users = [];
let games = {};

function quit(user){
  //splice that muhfucker
  user.destroy();
}

function changeScene(sceneName, user){ 
  ui.clearChildren(user);
  ui[sceneName].show(user);
}

function registerUser(name, stream, term)  {
    temp = new User(name, stream, ui.init(stream, term));
    users.push(temp);
    ui.mainScreen.show(temp);
    temp.screen.render();
  }

function createGame(name, pass, user) {
  gmi.createLobby( user, name, pass, (game) => {
    ui.tearDown(user.screen);
    joinGame(user, game);
  });
}

function joinGame(user, game){
  game.joinGame(user);
}

module.exports = {
  injectUI: (u) => { //the ui module uses the controller and the controller uses the ui
    ui = u;
  },
  injectGMI: (g) => {
    gmi = g;
  },
  registerUser,
  changeScene,
  createGame,
  quit
};
