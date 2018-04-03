const router = require('express').Router()
const bookController = require('../controllers/controller')

router.get('/', bookController.findAll)

router.post('/', bookController.create)

router.put('/:id', bookController.update)

router.delete('/:id', bookController.delete)

module.exports = router
