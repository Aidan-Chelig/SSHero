// from game server
//create a USER on connection and set its stream to be the input stream piped into streamfilter set to its prefix
const net = require('net');
const config = require('./config');
const eventHandler = require('../shared/event-handler');
const maxUsers = 100;
const {Prefixer, StreamFilter} = require('../shared/streamParser');

//user list and prefix list pointing toeach user
//make a blessed instance for each player


let usedPrefixes = [];

function findFirstMissing( a, s, e) {
    if (s > e)
        return e + 1;
    
    if (s != a[s]) 
        return s;

    let mid = (s + e) / 2;

    if (a[mid] == mid) {
        return findFirstMissing(a, mid+1, e);
    }

    return findFirstMissing(a, start, mid);
}


const toMaster = net.createConnection({host: process.argv[3], port: process.argv[2]}, (sock) => {
    toMaster.write(JSON.stringify(['init', process.argv[4]]));
});

let msgHandler = eventHandler(toMaster);

msgHandler.on('prefix', () => {
    let prefix = findFirstMissing(usedPrefixes, 0, usedPrefixes.length);
    usedPrefixes.push(prefix);

    toMaster.write(JSON.stringify([-1, 'prefix', prefix]));
});

msgHandler.on('raw', (data) => {
  console.log("test " + data);
})
