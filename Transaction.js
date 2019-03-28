const crypto = require('crypto');

module.exports = class Transaction {

    constructor( from, to, value) {
        this.timestamp = new Date().getTime();
        this.from = from;
        this.to = to;
        this.value = value;
        this.hash = this._createHash();
    }

    getTimestamp() { return this.timestamp; }

    setTimestamp(timestamp) { this.timestamp = timestamp; }

    getFrom() { return this.from; }

    setFrom(from) { this.from = from; }

    getTo() { return this.to; }

    setTo(to) { this.to = to; }

    getValue() { return this.value; }

    setValue(value) { this.value = value; }

    _createHash() {
        return crypto.createHash('sha256')
            .update(`${this.from}${this.to}${this.value}`).digest('hex');
    }
}
