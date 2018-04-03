const bookModel = require('../models/books_model')

module.exports = {
    findBook: function(req, res){
        bookModel.findAll()
        .then(result => {
            res.status(200).json({
                message: 'This Books Data List',
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'This is ERROR',
                error: err
            })
        })
    },
    addBook: function(req, res){
        // console.log(req)
        let objBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }
        bookModel.create(objBook)
        .then(result => {
            res.status(201).json({
                message: 'Add New Book has been success',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'This is ERROR',
                error: err
            })
        })
    },
    updateBook: function(req, res){
        let id = req.params.id
        let objBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        }
        bookModel.update(id, objBook)
        .then(result => {
            res.status(201).json({
                message: 'Updatew Book has been success',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'This is ERROR',
                error: err
            })
        })
    },
    deleteBook: function(req, res){
        let id = req.params.id
        bookModel.delete(id)
        .then(result => {
            res.status(201).json({
                message: 'Data Book has been DELETED',
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'This is ERROR',
                error: err
            })
        })
    }

}

// console.log(bookModel.findAll())