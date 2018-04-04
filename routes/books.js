var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books.controller')

router.get('/', booksController.getAllBooks)
router.get('/:id', booksController.getOneBook)
router.post('/', booksController.createBook)
router.put('/:id', booksController.updateBook)
router.delete('/:id', booksController.deleteBook)
router.delete('/deletebooks', booksController.deleteLeftOverBook)

module.exports = router;
