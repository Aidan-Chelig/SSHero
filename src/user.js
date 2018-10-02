class User {
  
  constructor(username, stream, screen){
    this.stream = stream;
    this.username = username;
    this.screen = screen;
  }
  

  destroy() {
    this.screen.destroy();
    this.stream.end();
  }
}
module.exports = User;
