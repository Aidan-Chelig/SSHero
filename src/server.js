var fs = require('fs');
var crypto = require('crypto');
var inspect = require('util').inspect;
const ui = require('./ui');
const game = require('./game');
const { User } = require('./user');
const config = require('./config');


var buffersEqual = require('buffer-equal-constant-time');
var ssh2 = require('ssh2');
var utils = ssh2.utils;

var pubKey = utils.genPublicKey(utils.parseKey(fs.readFileSync('./keys/user.pub')));

let sshserver = new ssh2.Server({
  hostKeys: [fs.readFileSync(config.ssh2.keys[0]), fs.readFileSync(config.ssh2.keys[1])],
  algorithms: config.ssh2.algorithms
}, function (client) {
  console.log('Client connected!');
  let name;

  client.on('error', (e) => {
    throw (e);
  });

  client.on('authentication', function (ctx) {
    console.log("auth");
    if (ctx.method === 'password'
      // Note: Don't do this in production code, see
      // https://www.brendanlong.com/timing-attacks-and-usernames.html
      // In node v6.0.0+, you can use `crypto.timingSafeEqual()` to safely
      // compare two values.
      &&
      ctx.username) {
      name = ctx.username;
      ctx.accept();
    } else if (ctx.method === 'publickey' &&
      ctx.key.algo === pubKey.fulltype &&
      buffersEqual(ctx.key.data, pubKey.public)) {
      if (ctx.signature) {
        var verifier = crypto.createVerify(ctx.sigAlgo);
        verifier.update(ctx.blob);
        if (verifier.verify(pubKey.publicOrig, ctx.signature))
          ctx.accept();
        else
          ctx.reject();
      } else {
        // if no signature present, that means the client is just checking
        // the validity of the given public key
        ctx.accept();
      }
    } else
      ctx.reject();
  }).on('ready', function () {
    console.log('Client authenticated!');
    let rows, cols, term;
    client.on('session', function (accept, reject) {

      var session = accept();
      session.once('pty', (accept, reject, info) => {
        rows = info.rows;
        cols = info.cols;
        term = info.term;
        accept && accept();
      });

      session.once('shell', (accept, reject) => {
        let stream = accept();
        stream.rows = rows;
        stream.columns = cols;
        stream.isTTY = true;
        stream.setRawMode = (v) => {};
        stream.on("error", (v) => {
          console.log(v)
        })

        game.registerUser(name, stream, term);
      });
    });
  }).on('error', (e) => {

  }).on('end', function () {
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