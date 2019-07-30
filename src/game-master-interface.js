//TODO put timeout
//TODO ERRORHANDLE

const net = require('net');
const {
    fork
} = require('child_process');
const uuidv1 = require('uuid/v1');
const Game = require('./game/game');
const config = require('./config');
let pendingGameServers = {};
let connectedGameServers = {};

const server = net.createServer((socket) => {
    setupSocket(socket);
}).on('error', (err) => {
    // handle errors here
    throw err;
});

function startServer() {
    server.listen(config.netoptions.port, config.netoptions.host, () => {
        console.log('gmi server started on: ', server.address());
    });

}

function setupSocket(socket) {
    socket.on('data', (data) => {
        data = JSON.parse(data);
        if (data[0] === 'init') {
            initalizeConnection(socket, data[1]);
        }
    });
}

function initalizeConnection(socket, uuid) {
    if (pendingGameServers[uuid]) {
        let {
            callback,
            user,
            name,
            pass
        } = pendingGameServers[uuid];
        delete pendingGameServers[uuid];

        socket.removeAllListeners("data");
        let game = new Game(user, name, pass, socket, uuid);
        connectedGameServers[uuid] = game;
        callback(game);

    } else {
        socket.end();
    }
}

function createLobby(user, name, pass, callback) {
    uuid = uuidv1();

    pendingGameServers[uuid] = {
        callback,
        user,
        name,
        pass
    };

    fork('./src/lobby/gameserver', [server.address().port, server.address().address, uuid]); // some how make this so it spins up new server

    //return lobby
}

module.exports = {
    startServer,
    createLobby
};