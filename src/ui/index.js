const blessed = require('blessed');
const mainScreen = require('./mainScreen');
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

module.exports = {
  injectController: (c) => {
    controller = c;
    mainScreen.injectController(c);
  },
  init,
  mainScreen
};
