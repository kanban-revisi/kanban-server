const errorHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).json(err.message)
    }
    res.status(500).json(err)
}

module.exports = errorHandler