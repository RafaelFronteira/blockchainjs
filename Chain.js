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
        console.log(this.isEmpty());
        if (this.isEmpty()) {
            this.first = block;
            this.first.setHash(block.getValue());
            this.last = block;
            this.last.setHash(block.getValue());
        }
        else {
            block.setPrevious(this.last);
            block.setHash(this.last.getHash());
            // TODO
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
