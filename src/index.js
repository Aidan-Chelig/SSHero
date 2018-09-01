const server = require('./server');
const ui = require('./ui');
const controller = require('./controller');

ui.injectController(controller);
controller.injectUI(ui);

server.startServer(controller.registerUser);
