const EventEmitter = require('events');

const MsgEmitter = new EventEmitter();

module.exports = function setup(stream) {
        console.log('aayyeyeeyeye');
    stream.on("data", (data) => {
        data = JSON.parse(data);
        switch(data[0]) {
            case "prefix":
                MsgEmitter.emit('prefix', data[1]);
                break;
        }
    });
    return MsgEmitter;
};