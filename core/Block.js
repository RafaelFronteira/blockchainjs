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

        const aux = new Array();
        for (let i =  merkletree.length - 1; i > 0; i--) {
            console.log('length aux => ', aux.length);
            console.log('Index => ', i);
            console.log('I = 1 && merkletree.length é impar? ', i === 1 && merkletree.length % 2 !== 0);
            if (i === 1 && merkletree.length % 2 !== 0) {
                console.log('clone value from merkletree');
                merkletree.push(merkletree[merkletree.length - 1]);
                i++;
            }

            console.log('length merkletree => ', merkletree.length);
            merkletree.push(this._createHash(merkletree[i] + merkletree[i - 1]));
            // console.log('Index current -> ', merkletree[i]);
            // console.log('Index next    ->', merkletree[i - 1]);
            // aux.push(this._createHash(merkletree[i] + merkletree[i - 1]));
            // console.log('aux condition => ', aux > 0 && aux.length % 2 === 0);
            // if (aux.length > 0 && aux.length % 2 === 0) {
            //     aux.push(this._createHash(aux[aux.length - 2] + aux[aux.length - 1]));
            //     console.log('Aux => ', aux);
            // }
        }

        // for (let i = 0; i < merkletree.length; i++) {
        //     if (merkletree[i] && merkletree[i + 1]) {
        //         merkletree.push(this._createHash(merkletree[i] + merkletree[i + 1]));
        //         i++;
        //     }
        // }
        
        console.log('Merkletree => ', merkletree);
        console.log('Length => ', merkletree.length - 1);
        
        // console.table(merkletree);
        // this.setMarkleRoot(merkletree[merkletree.length - 1]);
    }


    _createHash(value) {
        if (value) {
            return crypto.createHash('sha256')
                .update(`${value}`).digest('hex');
        }
    }

}
