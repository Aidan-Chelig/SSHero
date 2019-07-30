const server = require('./server');
const ui = require('./ui');
const controller = require('./controller');
const gameMasterInterface = require('./game-master-interface');

gameMasterInterface.startServer();

ui.injectController(controller);
controller.injectUI(ui);
controller.injectGMI(gameMasterInterface);

server.startServer(controller.registerUser);
