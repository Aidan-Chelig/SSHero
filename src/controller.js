const User = require('./user');
let users = [];

module.exports = (ui) => ({
  registerUser: (name, stream, term) => {
    temp = new User(name, stream, ui.init(stream, term));
    users.push(temp);
    ui.mainScreen.show(temp);
    temp.screen.render();
  }
});
