var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class Books {

  static read(req,res){
    MongoClient.connect(url, function(err, db) {
      if (err){
        res.status(500).json({
          message:'error when connecting to database'
        })
      }
      let dbo = db.db("library");
      dbo.collection("books").find({}).toArray(function(err, result) {
        if (err){
          res.status(500).json({
            message:'error when reading books data'
          })
        } else {
          res.status(200).send({
            message:'this is library booklist',
            data:result
          })
        }
        db.close();
      });
    });
  }

  static create(req,res){
    MongoClient.connect(url, function(err, db) {
    if (err){
      res.status(500).json({
        message:'error when connecting to database'
      })
    }
    var dbo = db.db("library");
    var myobj = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category : req.body.category,
      stock : req.body.stock
    };
    dbo.collection("books").insertOne(myobj, function(err, result){
      if (err){
        res.status(500).json({
          message:'error when adding books'
        })
      } else {
        res.status(200).json({
          message:'successfully adding 1 books',
          data:myobj
        })
      }
      db.close();
      });
    });
  }

  static update(req,res,next){
    MongoClient.connect(url, function(err, db) {
      if (err){
        res.status(500).json({
          message:'error when connecting to database'
        })
      } else {
        var dbo = db.db("library");
        var myquery = { title: req.params.title };
        var newvalues = { $set:
          {
          name: req.body.name,
          isbn: req.body.isbn,
          title: req.body.title,
          author:req.body.author,
          category: req.body.category,
          stock: req.body.stock
          }
        };
        dbo.collection("books").updateOne(myquery, newvalues, function(err, result) {
          if (err){
            res.status(500).json({
              message:'error when updating data'
            })
          } else {
            res.status(200).json({
              message:'document is sucessfully updated',
              data: newvalues
            })
          }
          db.close();
        })
      }
    })
  }

  static delete(req,res,next){
    MongoClient.connect(url, function(err, db) {
      if (err){
        res.status(500).json({
          message:'error when connecting to database'
        })
      }
      var dbo = db.db("library");
      var myquery = {
         title: req.params.title
       };
      dbo.collection("books").deleteOne(myquery, function(err, obj) {
        if (err){
          res.status(500).json({
            message:'error when deleting data'
          })
        } else {
          res.status(200).json({
            message:'sucessfully deleting data',
            data:obj
          })
          db.close();
        }
      });
    });
  }

}

module.exports = Books;