class User {
  
  constructor(username, stream, screen, connection){
    this.stream = stream;
    this.username = username;
    this.screen = screen;
  }

  get screen() {
    return this.screen;
  }

  get stream() {
    return this.stream;
  }

  set screen(screen){
    this.screen = screen;
  }

  set stream(stream){
    this.stream = stream;
  }

  destroy() {
    screen.destroy();
    connection.end();
  }
}
module.exports = User;