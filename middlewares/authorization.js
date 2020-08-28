const { Task } = require('../models')

const authorization = (req, res, next) => {
    let UserId = req.userData.id
    let TaskId = req.params.id
    Task
        .findByPk(TaskId)
        .then(task => {
            if (task.UserId === UserId) {
                next()
            } else {
                next(
                    {
                        status: 403,
                        message: "You are not authorized"
                    }
                )
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization