const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.controller');


router.post('/create', booksController.addNewBook);
router.get('/', booksController.showAllBook);
router.put('/update/:id', booksController.updateBookById);
router.delete('/delete/:id', booksController.deleteBookById);

module.exports = router;
