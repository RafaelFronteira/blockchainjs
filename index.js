const Block = require('./Block');
const Chain = require('./Chain');

const c = new Chain();

const b = new Block(42);
const b2 = new Block(46);
const b3  = new Block(51);

c.addBlock(b3);
c.addBlock(b2);
c.addBlock(b);

const iterations = new Array();
for (let i = 1; i <= 3; i++) {
    const block = c.getBlock(i);
    iterations.push(block);
}


console.table(iterations);