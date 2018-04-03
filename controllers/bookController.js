const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'library'
const ObjectId = require('mongodb').ObjectID

module.exports = {

  getAll : function(req,res){
  MongoClient.connect(url, (err,client)=>{
    const db =client.db(dbName)
    if(!err){
      console.log('Connect success');
      db.collection('books').find().toArray((err,result)=>{
        if (!err) {
          res.status(200).json({
            message : 'get data success',
            data : result
          })
        }
        else {
          res.status(500).json({
            message : 'get data failed',
            err
          })
        }

      })
    }
  })
},

  addBook : function(req,res){

     var myobj = {
       isbn : req.body.isbn,
       title : req.body.title,
       author : req.body.author,
       category : req.body.category,
       stock : req.body.stock,
     };

    MongoClient.connect(url, (err,client)=>{
      const db =client.db(dbName)
      if(!err){
        console.log('Connect success');
        db.collection('books').insertOne(myobj,(err,result)=>{
          if (!err) {
            res.status(200).json({
              message : 'insert data success',
              data : result
            })
          }
          else {
            res.status(500).json({
              message : 'insert data failed',
              err
            })
          }

        })
      }
    })
  },


  updateBook : function(req,res){


     var newvalues = {

       isbn : req.body.isbn,
       title : req.body.title,
       author : req.body.author,
       category : req.body.category,
       stock : req.body.stock

     };


    MongoClient.connect(url, (err,client)=>{
      const db =client.db(dbName)
      if(!err){
        console.log('Connect success');
        db.collection('books').update({_id:ObjectId(req.params.id)},newvalues,(err,result)=>{
          if (!err) {
            res.status(200).json({
              message : 'update data success',
              data : result
            })
          }
          else {
            res.status(500).json({
              message : 'update data failed',
              err
            })
          }

        })
      }
    })
  },


  removeBook : function(req,res){



    MongoClient.connect(url, (err,client)=>{
      const db =client.db(dbName)
      if(!err){
        console.log('Connect success');
        db.collection('books').deleteOne({_id:ObjectId(req.params.id)},(err,result)=>{
          if (!err) {
            res.status(200).json({
              message : 'delete data success',
              data : result
            })
          }
          else {
            res.status(500).json({
              message : 'delete data failed',
              err
            })
          }

        })
      }
    })
  },


}
