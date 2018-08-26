var fs = require('fs');
var crypto = require('crypto');
var inspect = require('util').inspect;
const ui = require('./ui');
const controller = require('./controller')(ui);
const { User } = require('./user');
const config = require('./config');


var buffersEqual = require('buffer-equal-constant-time');
var ssh2 = require('ssh2');
var utils = ssh2.utils;


let sshserver = new ssh2.Server({
  hostKeys: [fs.readFileSync(config.ssh2.keys[0])],
  algorithms: config.ssh2.algorithms
}, function (client) {
  console.log('Client connected!');
  let name;
  let stream;

  client.on('error', (e) => {
    throw (e);
  });

  client.on('authentication', function (ctx) {
    console.log("auth");
    if (ctx.method === 'password' && ctx.username) {
      name = ctx.username;
      ctx.accept();
    } else
      ctx.reject();
  }).on('ready', function () {
    console.log('Client authenticated!');
    let rows, cols, term;
    client.on('session', function (accept, reject) {
      var session = accept();

      //get size of window
      session.once('pty', (accept, reject, info) => {
        rows = info.rows;
        cols = info.cols;
        term = info.term;
        accept();
      });

      //establish a shell
      session.once('shell', (accept, reject) => {
        let stream = accept();
        stream.rows = rows;
        stream.columns = cols;
        stream.isTTY = true;
        stream.setRawMode = (v) => {};
        stream.on("error", (v) => {
          console.log('stream error: ' + v);
        });

        session.on('window-change', (accept, reject, info) => {
          if(stream) {
            stream.rows = info.rows;
            stream.columns = info.cols;
            stream.emit('resize');
          }
        });

        controller.registerUser(name, stream, term);
      });
    });
  }).on('error', (e) => {
    throw(e);
  }).on('end', () => {
    console.log('Client disconnected');
  });
});

module.exports = {
    startServer: () => {
      sshserver.listen(config.port, () => {
        console.log('Listening on port ' + config.port);
      });
    }
};
