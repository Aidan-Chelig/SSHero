/* jshint esversion: 6 */
//create blessed modules for setup of the main game screen and key binds for main game screen

const blessed = require('blessed');

module.exports = {

        show: (user) => {
            let stream = user.stream;
            let screen = user.screen;
            /*
                let output = user.stream.output = new blessed.image({
                    screen: user.screen,
                    parent: user.screen,
                    type: 'ansi',
                    height: '100%',
                  file: '../test.apng'
               });
                */

            var output = stream.output = blessed.box({
                top: 'center',
                left: 'center',
                width: '50%',
                height: '50%',
                content: 'Hello {bold}world{/bold}!',
                tags: true,
                border: {
                    type: 'line'
                },
                style: {
                    fg: 'white',
                    bg: 'magenta',
                    border: {
                        fg: '#f0f0f0'
                    },
                    hover: {
                        bg: 'green'
                    }
                }
            });

            var image = blessed.image({
                screen: screen,
                parent: screen,
                file: './logo.png',
                type: 'ansi',
                ascii: true,
                left: 'center',
                height: '100%'
            });

            listbar = blessed.listbar({
                bottom: 0,
                left: 'center',
                height: 1,
                width: 'shrink',
                keys: true,
                vi: true,
                style: {
                    bg: 'green',
                    item: {
                        bg: 'red',
                        hover: {
                            bg: 'blue'
                        },
                        //focus: {
                        //  bg: 'blue'
                        //}
                    },
                    selected: {
                        bg: 'blue'
                    }
                },
                commands: {
                    'Play': () => {
                        console.log('play');
                    },
                    'New Character': () => {
                        console.log('nc');
                    },
                    'Options': () => {
                        console.log('opts');
                    },
                    'quit': () => {
                      controller.quit(user);
                    }
                }
            });


            screen.append(image);
            screen.append(listbar);
            listbar.focus();
            //user.screen.append(output);
            user.screen.render();
        }
};
