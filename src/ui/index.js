const glob = require('glob');
const path = require('path');
const blessed = require('blessed');
let controller;

let uis = {};
files = glob.sync('**/ui/*.js', []);

for (var file of files) {
    if(!file.includes('index')){
        let name = file.split('\\').pop().split('/').pop().split('.')[0];
        uis[name] = require(path.resolve(file));
    }
}

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

function clearChildren(user) {
    let temp = Object.keys(user.screen.children);
    for (let i = 0; i < temp.length; i++) {
        user.screen.remove(user.screen.children[0]);
    }
}

function tearDown(screen) {
    screen.destroy();
}

module.exports = {
    injectController: (c) => {
        controller = c;
        for(var key in uis){
            uis[key].injectController(c);
        }
    },
    init,
    clearChildren,
    tearDown,
    ...uis
};

