const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'library'
const ObjectId = require('mongodb').ObjectID

class Book {
    
    static create(req, res) {
        MongoClient.connect(url, (err, client)=> {
            if(!err) {
                console.log('connect success')
                
                const db = client.db(dbName)
                
                db.collection('books').insertOne({
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock
                }, function(err, data) {
                    if(!err){
                        res.status(201).json({
                            message: 'querry insert success',
                            data: data.ops[0]
                        })
                    } else {
                        res.status(500).json({
                            message: 'Internal server error bro',
                            err
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message: 'Check your mongo connection'
                })
            }
        })
    }

    static read(req, res) {
        MongoClient.connect(url, (err, client) => {
            if(!err){
                console.log('connect success')
                
                const db = client.db(dbName)

                db.collection('books').find().toArray(function(err, data) {
                    if(!err) {
                        res.status(200).json({
                            message: 'Data buku berhasil didapatkan',
                            data
                        })
                    } else {
                        res.status(500).json({
                            message: 'Read error',
                            err
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message: 'Check your mongo connection'
                })
            }
        })
    }

    static update(req, res) {
        MongoClient.connect(url, (err, client) => {
            if(!err){
                // console.log('ID ---> ',req.params.id)
                console.log('connect success')

                const db = client.db(dbName)

                db.collection('books').update({
                    _id: ObjectId(req.params.id)
                }, {
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock
                }, function(err, data) {
                    if(!err) {
                        res.status(201).json({
                            message: 'data berhasil di update',
                            data: data
                        })
                    } else {
                        res.status(500).json({
                            message: 'Update error',
                            err
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message: 'Check your mongo connection'
                })
            }
        })
    }

    static delete(req, res) {
        MongoClient.connect(url, (err, client) => {
            if(!err){
                console.log('connect success')

                const db = client.db(dbName)

                db.collection('books').deleteOne({
                    _id: ObjectId(req.params.id)
                }, function(err, data) {
                    if(!err){
                        res.status(200).json({
                            message: 'data berhasil dihapus',
                        })
                    } else {
                        res.status(500).json({
                            message: 'Delete error'
                        })
                    }
                })
            } else {
                res.status(500).json({
                    message: 'Check your mongo connection'
                })
            }
        })
    }

}

module.exports = Book