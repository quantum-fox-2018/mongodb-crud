const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017';
const ObjectId = require('mongodb').ObjectId

module.exports = {
  getAllBooks: (req, res) => {
    MongoClient.connect(url, function(err, client) {
      if(!err){
        const db = client.db('library1').collection('books')
        db.find({}).toArray().then(books => {
          res.status(200).json({
            message: "succes show all books",
            books
          })
        }).catch(err=>{
          res.status(400).json({
            message: "error",
            err
          })
        })
      }else{
        res.status(500).json({
          message: "connection failed"
        })
      }
      client.close();
    });
  }, 
  addNewBook: (req, res) => {
    let input = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    MongoClient.connect(url, function(err, client){
      if(!err){
        const db = client.db('library1').collection('books')
        db.insertOne(input).then(newBook => {
          res.status(200).json({
            message: "succes add new book",
            newBook
          })
        }).catch(err =>{
          res.status(400).json({
            message: "error",
            err
          })
        })
      }else{
        res.status(500).json({
          message: "connection failed"
        })
      }
      client.close();
    })
  },
  deleteBook: (req, res) => {
    MongoClient.connect(url, function(err, client){
      if(!err){
        const db = client.db('library1').collection('books')
        db.deleteOne({
          _id:ObjectId(req.params.id)
        }).then(book => {
          res.status(200).json({
            message: "succes remove a book",
            book
          })
        }).catch(err=>{
          res.status(400).json({
            message: "error",
            err
          })
        })
      }else{
        res.status(500).json({
          message: "connection failed"
        })
      }
      client.close()
    })
  },
  editBook: (req, res) => {
    let id = {_id: ObjectId(req.params.id)}
    let input = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }
    MongoClient.connect(url, function(err, client){
      if(!err) {
        const db = client.db('library1').collection('books')
        db.updateOne(id,{$set:req.body}).then(dataBook => {
          res.status(200).json({
            message: "succes edit a book",
            dataBook
          })
        }).catch(err=>{
          res.status(400).json({
            message: "error",
            err
          })
        })
      }else{
        res.status(500).json({
          message: "connection failed"
        })
      }
      client.close()
    })
  }
}