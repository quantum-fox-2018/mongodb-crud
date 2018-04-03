const router = require('express').Router();
const books = require('../controllers/books_controller')

//Show Books
router.get('/books', books.showBooks);

//Add Books
router.post('/addbook', books.addBook);

//Update books
router.put('/updatebook/:id', books.updateBook)

//Delete books
router.delete('/deletebook/:id', books.deleteBook)

module.exports = router;