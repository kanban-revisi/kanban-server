const bcrypt = require('bcrypt')

const encrypt = (password, saltRounds) => {
    return bcrypt.hash(password, saltRounds)
}

const comparer = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = { encrypt, comparer }