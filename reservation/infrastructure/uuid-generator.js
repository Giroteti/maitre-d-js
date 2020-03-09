const uuid = require('uuid');

class UUIDGenerator {
    next() {
        return uuid.v4()
    }
}

module.exports = UUIDGenerator