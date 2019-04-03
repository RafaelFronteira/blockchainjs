const crypto = require('crypto');

module.exports = class Block {

    constructor(i) {
        this.i = i;
        this.hash = null;
        this.previousHash = null;
        this.previous = null;
        this.transaction = null;
        this.markleRoot = null;
    }

    getValue() {
        return this.i;
    }

    setValue(i) {
        this.i = i;
    }

    getTransaction() {
        return this.transaction;
    }

    setTransaction(transaction) {
        this.transaction = transaction;
        this._generateMarkletree();
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
        this.hash = this._createHash(value);
    }

    getPreviousHash() {
        return this.previousHash;
    }

    setPreviousHash(value) {
        this.previousHash = value;
    }

    getMarkleRoot() {
        return this.markleRoot;
    }

    setMarkleRoot(value) {
        this.markleRoot = value;
    }

    _generateMarkletree() {
        const merkletree = new Array();
        this.getTransaction().forEach(transaction => merkletree.push(transaction.getHash()));

        for (let i = 0; i < merkletree.length; i++) {
            if (merkletree[i] && merkletree[i + 1]) {
                merkletree.push(this._createHash(merkletree[i] + merkletree[i + 1]));
                i++;
            }
        }

        this.setMarkleRoot(merkletree[merkletree.length - 1]);
    }


    _createHash(value) {
        if (value) {
            return crypto.createHash('sha256')
                .update(`${value}`).digest('hex');
        }
    }

}
