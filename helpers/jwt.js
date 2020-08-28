const jwt = require('jsonwebtoken')

const generateToken = (object, secret) => {
    return jwt.sign(object, secret)
}

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, verifyToken }