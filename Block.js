const crypto = require('crypto');

module.exports = class Block {

    constructor(i) {
        this.i = i;
        this.hash = null;
        this.previousHash = null;
        this.previous = null;
    }

    getValue() {
        return this.i;
    }

    setValue(i) {
        this.i = i;
    }

    getPrevious() {
        return this.previous;
    }

    setPrevious(b) {
        this.previous = b;
    }

    getHash() {
        return this.hash;
    }

    setHash(value) {
        this.hash = crypto.createHash('sha256').update(`${value}`).digest('hex');
    }

    getPreviousHash() {
        return this.previousHash;
    }

    setPreviousHash(value) {
        this.previousHash = crypto.createHash('sha256').update(`${value}`).digest('hex');
    }

}
