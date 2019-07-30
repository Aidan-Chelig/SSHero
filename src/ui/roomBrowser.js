const blessed = require('blessed');
let controller;

module.exports = {
  injectController: (c) => {
    controller = c;
  },
  show: (user) => {
    let stream = user.stream;
    let screen = user.screen;
    
    let box = blessed.box({
      screen: screen,
      parent: screen,
      left: 'center',
      top: 'center',
      height: '30%',
      content: 'USER CREATION SECTION',
      style: {
        bg: 'lightblue'
      },
      border: 'line'
    });

    let list = blessed.list({
      screen,
      parent: screen,
      left: 'center',
      top: 'center',
      height: '30%',

    });

    screen.render();
  }
};
