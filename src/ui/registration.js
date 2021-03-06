const blessed = require('blessed');
let controller;

module.exports = {
  injectController: (c) => {
    controller = c;
  },
  show: (user) => {
    let stream = user.stream;
    let screen = user.screen;


    var form = blessed.form({
      parent: screen,
      keys: true,
      left: 'center',
      top: 'center',
      width: 30,
      height: 8,
      bg: 'green',
      autoNext: true,
      content: 'Pick a Name!'
    });

    var greaterThanEdit = blessed.Textbox({
      parent: form,
      top: 3,
      height: 1,
      left: 2,
      right: 2,
      bg: '#808080',
      keys: true,
      inputOnFocus: true,
      content: 'test',
      style: {
        bg: '#808080',
        focus: {
          bg: 'black'
        }
      }
    });


    var submit = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 10,
      bottom: 2,
      name: 'submit',
      content: 'submit',
      style: {
        bg: 'blue',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    });

    var cancel = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 20,
      bottom: 2,
      name: 'cancel',
      content: 'cancel',
      style: {
        bg: 'blue',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    });

    submit.on('press', function() {
      form.submit();
    });

    cancel.on('press', function() {
      controller.changeScene('mainScreen', user);
    });

    form.on('submit', function(data) {
      screen.render();
      process.nextTick(() => console.log(form.submission));
    });

    form.on('reset', function(data) {
      form.setContent('Canceled.');
      screen.render();
    });

    screen.key('q', function() {
      process.exit(0);
    });

    greaterThanEdit.focus();


    screen.render();


  }
};
