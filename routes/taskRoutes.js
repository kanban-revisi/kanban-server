const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const authorization = require('../middlewares/authorization')

router.get('/', TaskController.getAllTask)
router.post('/', TaskController.addTask)
router.put('/:id', authorization, TaskController.updateTask)
router.delete('/:id', authorization, TaskController.deleteTask)

module.exports = router