const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;

module.exports = {
  showAllBooks: function (req, res){
    mongoClient.connect(url, (err, client) =>{
      let col = client.db('library').collection('collection')

      col.find().toArray(function(err, books){
        if(!err){
          res.status(200).json({
            message: "Books Collection",
            books
          })
        }else{
          res.status(500).json({
            message: "Books not found",
            err
          })
        }

      })

    })
  },
  insertBooks: function(req, res) {
    mongoClient.connect(url, (err, client) =>{
      if(!err){
        let db = client.db('library')
        let booksCol = db.collection('collection')

        let newBook = {
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
          stock: req.body.stock
        }
        // console.log(newBook);
        booksCol.insertOne(newBook)
                .then(books =>{
                  res.status(201).json({
                    message: "Books Succesfully Added.",
                    books
                  })
                })
                .catch(err =>{
                  res.status(500).json({
                    message: "Books not found",
                    err
                  })
                })

      }else{
        res.status(500).json({
          message: err
        })
      }

    })
  },
  updateBooks: function(req, res){
    let bookId = req.params.id;
    let bookUpdate = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }

    mongoClient.connect(url, (err, client) =>{
      if(!err){
        let db = client.db('library')
        let booksCol = db.collection('collection')

        //tes buat find books by id
        // booksCol.findOne({_id:ObjectID(bookId)})
        //         .then(books =>{
        //           res.status(200).send({
        //             message: "Books Founded.",
        //             books
        //           })
        //         })
        //         .catch(err =>{
        //           res.status(200).send({
        //             message: "Books not found",
        //             err
        //           })
        //         })

        booksCol.findOneAndUpdate({_id:ObjectID(bookId)}, bookUpdate)
                .then(results =>{
                  res.status(200).json({
                    message: `Books with Id ${bookId} Succesfully updated`,
                    books: results
                  })
                })
                .catch(err =>{
                  res.status(500).json({
                    message: err
                  })
                })
      }else {
        res.status(500).json({
          message: err
        })
      }

    })
  },
  deleteBooks: function(req, res){
    let bookId = req.params.id;

    mongoClient.connect(url, (err, client) =>{
      if(!err){
        let booksCol = client.db('library').collection('collection')

        booksCol.findOneAndDelete({_id:ObjectID(bookId)})
                .then(books =>{
                  res.status(200).json({
                    message: `Books with id ${bookId} Succesfully deleted`,
                    books
                  })
                })
                .catch(err =>[
                  res.status(500).json({
                    message: err
                  })
                ])
      }else {
        res.status(500).json({
          message: err
        })
      }

    })
  }
}













//
