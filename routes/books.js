const router = require('express').Router();
const {getAllBooks, getOneBook, createBook, deleteBook, updateBook} = require('../controllers/books.controller')

router
    .get('/', getAllBooks) //get all users info (admin only)
    .get('/:id', getOneBook) // get a single user info (admin and authenticated user)
    .post('/', createBook) // create a user (admin only)
    .delete('/:id', deleteBook) // delete a user(admin only)
    .put('/:id', updateBook) //update a user with new info (admin dan authenticated user)

module.exports = router