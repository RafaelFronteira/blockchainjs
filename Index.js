//TODO: criar uma classe para a merklethree
const crypto = require('crypto');

const Block = require('./core/Block');
const Transaction = require('./core/Transaction');
const Chain = require('./core/Chain');

const c = new Chain();

const b = new Block(42);
const b2 = new Block(46);
const b3  = new Block(51);
const b4  = new Block(89);


const transactions = new Array (
    new Transaction('Maria', 'João', 3333),
    new Transaction('João', 'Pedro', 9876),
    new Transaction('Rafael', 'Maria', 1234),
    new Transaction('Lucas', 'José', 8527),
);

const merkletree = new Array();
transactions.forEach(transaction => merkletree.push(transaction.getHash()));

for (let i = 0; i < merkletree.length; i++) {
    if (merkletree[i] && merkletree[i + 1]) {
        merkletree.push(createHash(merkletree[i] + merkletree[i + 1]));
        i++;
    }
}

console.log('Merkle tree:');
console.table(merkletree);


// b.setTransaction(transactions);
// b2.setTransaction(transactions);
// b3.setTransaction(transactions);
// b4.setTransaction(transactions);

// c.addBlock(b);
// c.addBlock(b2);
// c.addBlock(b3);
// c.addBlock(b4);

// const iterations = new Array();

// for (let i = 1; i <= 4; i++) {
//     const block = c.getBlock(i);
//     iterations.push(block);
// }


// console.table(iterations);


function createHash(value) {
    if (value) {
        return crypto.createHash('sha256')
            .update(`${value}`).digest('hex');
    }
}