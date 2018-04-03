const router = require('express').Router();
const {showAllBooks, insertBooks, updateBooks, deleteBooks} = require('../controller/booksController');


router.get('/', showAllBooks)
      .post('/', insertBooks)
      .put('/:id', updateBooks)
      .delete('/:id', deleteBooks)


module.exports = router;
