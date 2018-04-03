const routes = require('express').Router()
const bookController = require('../controllers/book')

routes.get('/', bookController.readData)
routes.post('/', bookController.createData)
routes.put('/:id', bookController.updateData)
routes.delete('/:id', bookController.deleteData)

module.exports = routes