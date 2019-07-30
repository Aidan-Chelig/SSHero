const net = require('net');
const config = require('./config');
const eventHandler = require('./event-handler');
const maxUsers = 100;

let usedPrefixes = [0, 1, 2, 4];

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

    toMaster.write(JSON.stringify(['prefix', prefix]));
});