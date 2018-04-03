var express = require('express');
var router = express.Router();
const{getAllBooks, addNewBook, deleteBook, editBook} = require('../controllers/booksController')

router.get('/', getAllBooks)
router.post('/', addNewBook)
router.put('/:id', editBook)
router.delete('/:id', deleteBook)
module.exports = router;
