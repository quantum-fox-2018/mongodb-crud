const router = require('express').Router();
const BooksController = require('../controllers/book.controller')

router
    .post('/books', BooksController.create)        // C
    .get('/books', BooksController.read)           // R
    .put('/books/:id', BooksController.update)     // U
    .delete('/books/:id', BooksController.delete)  // D

module.exports = router;