const Book = require('../models/books')

module.exports = {
  readData(req, res) {
    Book.findAll()
    .then(books => {
      res.status(200).json({
        message: 'success read all book',
        data: books
      })
    })
    .catch(err => res.status(500).json({message: 'database is error'}))
  },

  createData(req, res) {
    let newBook = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    Book.create(newBook)
    .then(info => {
      res.status(201).json({
        message: 'success insert new book',
        data: info
      })
    })
    .catch(err => res.status(500).json({message: 'database is error'}))
  },

  updateData(req, res) {
    let id = req.params.id
    let updateBook = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    Book.update(id, updateBook)
    .then(info => {
      res.status(201).json({
        message: 'success update book',
        data: info
      })
    })
    .catch(err => res.status(500).json({message: 'database is error'}))
  },

  deleteData(req, res) {
    let id = req.params.id
    Book.deleteData(id)
    .then(info => {
      res.status(201).json({
        message: 'success delete book',
        data: info
      })
    })
    .catch(err => res.status(500).json({message: 'database is error'}))
  }
}