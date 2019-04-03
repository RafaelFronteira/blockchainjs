const Block = require('./Block');

module.exports = class Chain {

    constructor() {
        this.first = null;
        this.last = null;
        this.total = 0;
    }

    isEmpty() {
        if (this.first === null && this.last === null)
            return true;
        else
            return false;
    }

    addBlock(block) {
        if (this.isEmpty()) {
            this.first = block;
            this.first.setHash(block.getHash() + block.getMarkleRoot());
            this.last = block;
            this.last.setHash(block.getHash() + block.getMarkleRoot());
        }
        else {
            block.setPrevious(this.last);
            block.setHash(this.last.getHash() + block.getMarkleRoot());
            block.setPreviousHash(this.last.getHash());
            this.last = block;
        }

        this.total++;
    }

    getBlock(index) {
        let next = this.last;
        for (let i = this.total; i > index; i--) {
            next = next.getPrevious();
        }

        return next;
    }

}
