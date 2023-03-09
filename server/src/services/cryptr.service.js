const Cryptr = require('cryptr');
const config = require('../config/config');

class CryptrService {
  constructor() {
    this.secret = config.cryptrSecret;
    this.innerCryptr = new Cryptr(config.cryptrSecret);
  }

  encrypt(originalText) {
    return this.innerCryptr.encrypt(originalText);
  }

  decrypt(encryptedText) {
    return this.innerCryptr.decrypt(encryptedText);
  }
}

const instance = new CryptrService();

module.exports = instance;
