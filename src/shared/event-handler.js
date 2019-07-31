const EventEmitter = require('events');

const MsgEmitter = new EventEmitter();
const masterPrefix = -1;
const reg = RegExp('^!\\d+!');

module.exports = function setup(stream) {
  stream.on("data", (data) => {

    let found = data.toString().match(reg);
    if(found){
      MsgEmitter.emit('raw', data.toString().slice(found[0].length))
    } else {
      data = JSON.parse(data);
      if(data[0] == masterPrefix){
        //master messages
        switch(data[1]) {
          case "prefix":
            MsgEmitter.emit('prefix', data[2]);
            break;
        }
      }}});
  return MsgEmitter;
};
