class User {
  
  constructor(username, stream, screen){
    this.stream = stream;
    this.username = username;
    this.screen = screen;
  }
  

  destroy() {
    screen.destroy();
    connection.end();
  }
}
module.exports = User;
