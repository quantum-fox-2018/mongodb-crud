const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const mongoose = require('mongoose');

module.exports = {

    getData: function(req, res){
        
        MongoClient.connect(url, function(err, client) {
            if (err){
                res.status(500).json({
                    message: err.message
                })
            }else{

                const col = client.db("library").collection("books");
                col.find({}).toArray((err, result) => {
                    if (!err) {
                        res.status(200).json({
                            message: "success",
                            books: result
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }
            client.close();
          });
    },
    addData: function(req, res){

        MongoClient.connect(url, function(err, client) {
            if (err){
                res.status(500).json({
                    message: err.message
                })
            } else {
                const col = client.db("library").collection("books");
                let newData = {      
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category,
                    stock: req.body.stock        
                }
                
                col.insertOne(newData, function(err, result) {
                    if (err){
                        res.status(500).json({
                            message: err.message
                        })
                    } else{ 
                                               
                        res.status(201).json({
                            message: "success add book",
                            result: result.ops[0]
                        })
                    }  
                  });
            }
          })
    },
    editData: function(req, res){

        MongoClient.connect(url, function(err, client) {
            if (err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const col = client.db("library").collection("books");
                var getId = mongoose.Types.ObjectId(req.params.id);
                let updateData = {
                    stock: req.body.stock,
                    isbn: req.body.isbn,
                    title: req.body.title,
                    author: req.body.author,
                    category: req.body.category
                }
                col.findOneAndUpdate({_id:getId}, updateData, function(err,result){
                    if (!err) {
                        
                        res.status(200).json({
                            message: "success edit",
                            result: result.value
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }
            client.close();
          });
    },
    deleteData: function(req, res){

        MongoClient.connect(url, function(err, client) {
            if (err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                const col = client.db("library").collection("books");
                var getId = mongoose.Types.ObjectId(req.params.id);
                
                col.deleteOne({_id:getId},function(err,result){
                    if (!err) {                        
                        res.status(200).json({
                            message: "success delete",
                        })
                    }else{
                        res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }
            client.close();
          });
    }
}