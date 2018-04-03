const routes = require('express').Router()
const booksController = require('../controllers/books-controller')

routes.get('/', booksController.findBook)

routes.get('/create', booksController.findBook)
routes.post('/create', booksController.addBook)

routes.put('/:id', booksController.updateBook)

routes.delete('/:id', booksController.deleteBook)

module.exports = routes