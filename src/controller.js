const User = require('./user');
let ui;
let users = [];

function quit(user){
  //splice that muhfucker
  user.destroy();
}

function changeScene(sceneName, user){ 
  ui.clearChildren(user);
  ui[sceneName].show(user);
}

module.exports = {
  injectUI: (u) => { //the ui module uses the controller and the controller uses the ui
    ui = u;
  },
  registerUser: (name, stream, term) => {
    temp = new User(name, stream, ui.init(stream, term));
    users.push(temp);
    ui.mainScreen.show(temp);
    temp.screen.render();
  },
  changeScene,
  quit
};
