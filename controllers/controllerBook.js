const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017'
const dbName = 'library'

module.exports = {
  showAll: function (req, res) {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const col = client.db(dbName).collection('books')

        col.find().toArray()
        .then(books => {
          res.status(200).send({
            message: 'Show all books',
            data: books
          })
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error books not found',
            detail: err.message
          })
        })
      } else {
        res.status(500).send({
          message: 'Internal server error',
          detail: err.message
        })
      }
    })
  },

  addNew: function (req, res) {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const col = client.db(dbName).collection('books')

        col.insertOne({
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: req.body.stock
        })
        .then(success => {
          res.status(201).send({
            message: 'Add data book success',
            data: req.body
          })
        })
        .catch(err => {
          res.status(500).send({
            message: 'Add data book failed',
            data: err.message
          })
        })
      } else {
        res.status(500).send({
          message: 'Internal server error',
          detail: err.message
        })
      }
    })
  },

  findOne: function(req, res) {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const col = client.db(dbName).collection('books')
        let id = req.params.id

        col.findOne({
          _id: ObjectID(id) 
        })
        .then(found => {
          res.status(200).send({
            message: 'Data book found',
            data: found
          })
        })
        .catch(err => {
          res.status(500).send({
            message: 'Data book not found',
            detail: err.message
          })
        })
      } else {
        res.status(500).send({
          message: 'Internal server error',
          detail: err.message
        })
      }
    })
  },

  updateData: function (req, res) {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const col = client.db(dbName).collection('books')
        let id = req.params.id
        let updateData = {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: req.body.stock
        }

        col.findOneAndUpdate({
          _id: ObjectID(id)
        },{
          updateData
        })
        .then(success => {
          res.status(201).send({
            message: 'Update data book success',
            data: success
          })
        })
        .catch(err => {
          res.status(500).send({
            message: 'Update data book failed',
            detail: err.message
          })
        })
      } else {
        res.status(500).send({
          message: 'Internal server error',
          detail: err.message
        })
      }
    })

  },

  deleteData: function (req, res) {
    MongoClient.connect(url, (err, client) => {
      if (!err) {
        const col = client.db(dbName).collection('books')
        let id = req.params.id

        col.deleteOne({
          _id: ObjectID(id)
        })
        .then(success => {
          res.status(200).send({
            message: 'Delete data book success',
            detail: success
          })
        })
        .catch(err => {
          res.status(500).send({
            message: 'Delete data book failed',
            detail: err.message
          })
        })
      } else {
        res.status(500).send({
          message: 'Delete data book error',
          detail: err.message
        })
      }
    })
  }
}