const blessed = require('blessed');
const mainScreen = require('./mainScreen');
const characterCreation = require('./characterCreation');
const registration = require('./registration');
let controller;

function init(stream, term) {
  let screen = new blessed.screen({
    autoPadding: true,
    smartCSR: true,
    program: new blessed.program({
      input: stream,
      output: stream
    }),
    terminal: term || "ansi"
  });
  screen._listenedMouse = true;

  screen.title = 'SSHero';

  return screen;
}

function clearChildren(user) {
  let temp = Object.keys(user.screen.children);
  for (let i = 0; i < temp.length; i++) {
    user.screen.remove(user.screen.children[0]);
  }
}

module.exports = {
  injectController: (c) => {
    controller = c;
    mainScreen.injectController(c);
    characterCreation.injectController(c);
    registration.injectController(c);
  },
  init,
  clearChildren,
  mainScreen,
  characterCreation,
  registration
};
