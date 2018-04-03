const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017';

module.exports = {
    showBooks: function(req, res){
        MongoClient.connect(url, function(err, client){
            const books = client.db('library').collection('books');
            books.find({}).toArray(function(err, booksData){
                if(!err) {
                    res.status(200).json({
                        message: 'Books data!',
                        books: booksData
                    })
                } else {
                    res.status(500).json({
                        message: err
                    })
                }
                client.close();
            })
        })
    },
    addBook: function(req, res){
        MongoClient.connect(url, function(err, client){
            const books = client.db('library').collection('books');
            let insertedBooksData = {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock, 
            }
            books.insert({
                insertedBooksData
            })
            .then(function(result){
                res.status(201).json({
                    message: "Added new data",
                    result: result
                })

            }).catch(function(err){
                res.status(500).json({
                    message: err
                })
            })

            client.close();
        })
    },
    deleteBook: function(req, res){
        MongoClient.connect(url, function(err, client){
            const books = client.db('library').collection('books');
            books.deleteOne({'_id': ObjectID(req.params.id)})
            .then(function(result){
                res.status(201).json({
                    message: 'data has been deleted!',
                    result: result
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })
        })
    },
    updateBook: function(req, res){
        MongoClient.connect(url, function(err, client){
            const books = client.db('library').collection('books');
            const updateBook = {
                isbn: req.body.isbn, 
                title: req.body.title,
                author: req.body.author,
                category: req.body.category,
                stock: req.body.stock
            }
            books.update({ '_id': ObjectID(req.params.id) }, { updateBook }) 
            .then(function(result){
                res.status(201).json({
                    message: "Data has been updated!",
                    result: result
                })
            })
            .catch(function(err){
                res.status(500).json({
                    message: err
                })
            })

        })
    }

}