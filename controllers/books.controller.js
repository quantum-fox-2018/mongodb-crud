const ObjectId = require('mongodb').ObjectID;
const db = require('../db/books')

module.exports = {
    getAllBooks: function(req, res){
        db.booksClient(function(db){
            db.find().toArray(function(err, books){
                if (err) {
                    res.status(500).json({
                        message: "fail to retrieve books"
                    })
                }else{
                    res.status(200).json({
                        message: "retrieve books succeed",
                        books
                    })
                }
            })
        })
    },

    getOneBook: function(req, res){
        db.booksClient(function(db){

            db.findOne({
                _id: ObjectId(req.params.id)
            },function(err, book){
                if (err) {
                    res.status(500).json({
                        message: "fail to retrieve books"
                    })
                } else {
                    res.status(200).json({
                        message: "retrieve book succeed",
                        book
                    })
                }
            })

        })
    },

    createBook: function(req, res){
        db.booksClient(function(db){
            let objProperties = {
                "isbn" : req.body.isbn,
                "title" : req.body.title,
                "author" : req.body.author,
                "category" : req.body.category,
                "stock" : req.body.stock
                }
            db.insert(objProperties)
            .then(function(newBook){
                res.status(201).json({
                    message: "insert book succeed",
                    newBook
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: "error inserting book"
                })
            })
        })
    },
    updateBook: function(req, res){
        db.booksClient(function(db){
            db.update(
                {_id: ObjectId(req.params.id)},
                {$set: req.body}
            )
            .then(function(success){
                res.status(200).json({
                    message: "update succeed"
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: "fail to update"
                })
            })
        })
    },
    deleteBook: function(req, res){
        db.booksClient(function(db){
            db.remove({
                _id: ObjectId(req.params.id)
            })
            .then(function(success){
                res.status(200).json({
                    messaage: "delete success"
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
        })
    },

    deleteLeftOverBook: function(req, res){
        db.booksClient(function(db){
            db.remove({
                stock: {$lt: req.body.stock}
            })
        })
        .then(function(success){
            res.status(200).json({
                message: "Delete success"
            })
        })
    }
}
