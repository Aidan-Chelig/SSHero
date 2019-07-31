const { Transform } = require('stream');

class StreamFilter extends Transform {
  constructor(prefix){
    super();
    this.prefix = '!' + prefix + '!';
  }

  _transform(chunk, encoding, callback){
    if(chunk.toString().startsWith(this.prefix))
      this.push(chunk.toString().slice(this.prefix.length));
  }

}

class Prefixer extends Transform {
  constructor(prefix){
    super();
    this.prefix = prefix;
  }

  _transform(chunk, encoding, callback) {
    const transformchunk = '!' + this.prefix + '!' + chunk.toString()
    this.push(transformchunk);
    callback();
  }
}

module.exports = {
  StreamFilter,
  Prefixer
}

