const blessed = require('blessed');

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

  let output = stream.output = new blessed.image({
    screen: screen,
    parent: screen,
    type: 'ansi',
    height: '100%',
    file: './test.apng'
  });
  screen.append(output);

  let closePrompt = new blessed.question({
    top: 'center',
    left: 'center',
    border: {
      type: 'line'
    },
    style: {
      shadow: true
    },
    parent: screen,
    width: '40%',
    height: '30%'
  });
  return screen;
}

function main(user) {
  let screen = user.screen;

}


module.exports = {
    init
}