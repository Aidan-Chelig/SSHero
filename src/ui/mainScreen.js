/* jshint esversion: 6 */
//create blessed modules for setup of the main game screen and key binds for main game screen

const blessed = require('blessed');
let controller;

module.exports = {

  injectController: (c) => {
    controller = c;
  },
  show: (user) => {
    let stream = user.stream;
    let screen = user.screen;
    /*
                let output = user.stream.output = new blessed.image({
                    screen: user.screen,
                    parent: user.screen,
                    type: 'ansi',
                    height: '100%',
                  file: '../test.apng'
               });
               */

    listbar = blessed.listbar({
      screen: screen,
      parent: screen,
      bottom: 0,
      left: 'center',
      height: 1,
      //width: 'shrink',
      keys: true,
      vi: true,
      style: {
        bg: 'green',
        item: {
          bg: 'red',
          hover: {
            bg: 'blue'
          },
          //focus: {
          //  bg: 'blue'
          //}
        },
        selected: {
          bg: 'blue'
        }
      },
      commands: {
        'Play': () => {
          console.log('play');
        },
        'New Character': () => {
          controller.changeScene('characterCreation', user);
        },
        'Options': () => {
          console.log('opts');
        },
        'quit': () => {
          controller.quit(user);
        }
      }
    });
    listbar.focus();
    screen.render();
  }
};
