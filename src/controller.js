const User = require('./user');
let ui;
let users = [];

function quit(user){
  //splice that muhfucker
  user.destroy();
}

module.exports = {
  injectUI: (u) => {
    ui = u;
  },
  registerUser: (name, stream, term) => {
    temp = new User(name, stream, ui.init(stream, term));
    users.push(temp);
    ui.mainScreen.show(temp);
    temp.screen.render();
  }
};
