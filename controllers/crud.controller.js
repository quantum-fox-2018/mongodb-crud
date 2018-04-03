const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

module.exports = {
    insertOne : function(db, req, callback) {
        const books = db.collection('books');        
        books.insertOne(
            { 
                isbn: req.body.isbn,
                title:req.body.title,
                author:req.body.author,
                category:req.body.category,
                stock:req.body.stock,
            },
            function(err, result){
                callback(err, result);
            }
         );
      },

    showAll: function(db, req, callback){
        const books = db.collection('books');
        books.find({}).toArray(function(err, result) {
            callback(err, result);
          });
    },

    updateById: function(db, req, callback) {
        const books = db.collection('books');
        books.updateOne(            
            { _id : new ObjectID(req.params.id) }, 
            { $set: req.body }, 
            function(err, result) {
                callback(err ,result);
            });  
      },

      removeById : function(db,req, callback) {
        const books = db.collection('books');
        books.deleteOne(
            { _id : new ObjectID(req.params.id) }, 
            function(err, result) {
                callback(err, result);
            });    
      }
}

