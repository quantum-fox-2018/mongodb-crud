const MongoClient = require('mongodb').MongoClient;
// const {showBooksAll} = require('../models/library');
// const models = require('../models/library');
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'library';


class Library {

    static showBooks(req,res) {
   
        MongoClient.connect(url, function(err, client) {

        const col = client.db(dbName).collection('documents');

        col.find({}).toArray(function(err, items) {
                res.status(200).json({
                    message: "Show sucess",
                    books: items
                })
            
                client.close();
            });
        });        
    }
    

    static addBooks(req,res) {

        const {isbn,title,author,category,stock} = req.body;

        let obj = {
            isbn,
            title,
            author,
            category,
            stock
        }

        const insertDocuments = function(db, callback) {
            // Get the documents collection
            const collection = db.collection('documents');
            // Insert some documents
            collection.insertMany([
              obj
            ], function(err, result) {
              console.log('ini hasil',result);
              console.log("Inserted documents into the collection");
              
              res.status(200).json({
                message: "Insert  successful",
                books: result
              })

              callback(result);
            });
        }


        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            insertDocuments(db, function() {
                client.close();
            });
        });


    }



    static updateBooks(req,res) {

        const id = req.params.id
        const {isbn,title,author,category,stock} = req.body;

        let obj = {
            isbn,
            title,
            author,
            category,
            stock
        }
       
        MongoClient.connect(url, function(err, client) {
     
        const col = client.db(dbName).collection('documents');
     
        col.update({_id:ObjectId(id)}, obj, function(err, result) {
                
                res.status(200).json({
                    message: "Update successful",
                    books: result
                })
                // console.log(result)

            });
        });
    }


    static deleteBooks(req,res) {

        const id = req.params.id
              
        MongoClient.connect(url, function(err, client) {
     
            const col = client.db(dbName).collection('documents');
        
            col.deleteOne({_id:ObjectId(id)}, function(err, result) {
                    
                res.status(200).json({
                    message: "delete successful",
                    books: result
                })
                // console.log(result)

            });
        });
    }




}


// {$set:req.body}

module.exports = Library;