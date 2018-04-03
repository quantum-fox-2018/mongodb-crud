const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017'

module.exports = {
    getAllBooks (req, res) {
        mongoClient.connect(url, (err, client) => {
            if (err) {
                res.status(500).send({
                    message: "failed connecting to mongodb"
                })
            } else {
                const col = client.db('library').collection('books')

                col.find().toArray((err, books) => {
                    if(!err) {
                        res.status(200).send({
                            message: 'query books success',
                            books
                        })
                    } else {
                        res.status(400).send({
                            message: err
                        })
                    }
                })
            }
        })
    },
    getOneBook (req, res) {
        const {id} = req.params
        mongoClient.connect(url, (err, client) => {
            if(!err) {
                const col = client.db('library').collection('books')
                
                col.find({
                    _id: ObjectId(id)
                }).toArray((err, books) => {
                    if(!err) {
                        res.status(200).send({
                            message: 'query books success',
                            books
                        })
                    } else {
                        res.status(400).send({
                            message: err
                        })
                    }
                })
            } else {
                res.status(400).send({
                    message: err
                })
            }
        })
    },
    createBook (req, res) {
        const {isbn, title, author, category, stock} = req.body
        mongoClient.connect(url, (err, client) => {
            if (!err) {
                const col = client.db('library').collection('books')

                col.insert({
                    isbn,
                    title,
                    author,
                    category,
                    stock
                })
                .then(response => {
                    res.status(201).json({
                        message: 'insert book success',
                        response
                    })
                })
                .catch(err => {
                    message: 'insert book failed'
                })
            } else {
                res.status(400).send({
                    message: err
                })
            }
        })
    },
    deleteBook (req, res) {
        const {id} = req.params
        mongoClient.connect(url, (err, client) => {
            if(!err) {
                const col = client.db('library').collection('books')

                col.deleteOne(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then(response => {
                    res.status(201).json({
                        message: 'delete book success',
                        response
                    })
                })
                .catch(err => {
                    message: 'delte book failed'
                })
            } else {
                res.status(400).send({
                    message: err
                })
            }
        })
    },
    updateBook (req, res) {
        const {id} = req.params
        let objUpdate = {};
        for(var property in req.body) {
            objUpdate[property] = req.body[property];
        }
        mongoClient.connect(url, (err, client) => {
            if(!err) {
                const col = client.db('library').collection('books')
                col.update(
                {
                    _id: ObjectId(id)
                },
                {
                    $set: objUpdate
                },
                {
                    overwrite: false
                },
                function (err, transaction) {
                    if(!err) {
                        res.status(200).send({
                            message: 'update book success',
                            data: transaction
                        })
                    } else {
                        res.status(400).send({
                            message: 'update book failed'
                        })
                    }
                });                
            } else {
                res.status(400).send({
                    message: err
                })
            }
        })
    }
}