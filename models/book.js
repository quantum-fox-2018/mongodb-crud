const mongodb=require('mongodb')
var url ='mongodb://localhost:27017'
const ObjectId = require('mongodb').ObjectId
const mongoclient=mongodb.MongoClient

class Booksmodel{

  static read(req,res){
    mongoclient.connect(url,(err,client)=>{
      if(err){
        return res.status(500).send('error connection')
      }else{
        const db = client.db('library')
        db.collection('books').find().toArray().then(response=>{res.status(200).send(response)})
      }
    })
  }

  static insert(req,res){
    mongoclient.connect(url,(err,client)=>{
      if(err){
        return res.status(500).send('error connection')
      }else{
        const db = client.db('library')
        db.collection('books').insertOne(
          {
            "isbn":req.body.isbn,
            "title":req.body.title,
            "author":req.body.author,
            "category":req.body.category,
            "stock":req.body.stock
          },(err,r)=>{
            if(err){
              return res.status(500).send('gagal insert data')
            }
            res.status(200).send(r)
          })
      }
    })
  }

  static delete(req,res){
    mongoclient.connect(url,(err,client)=>{
      if(err){
        return res.status(500).send('error connection')
      }else{
        const db = client.db('library')
        db.collection('books').deleteOne({_id: ObjectId(req.params.id)}).then(response=>{res.status(200).send(response)})
      }
    })
  }

  static update(req,res){
    mongoclient.connect(url,(err,client)=>{
      if(err){
        return res.status(500).send('error connection')
      }else{
        const db = client.db('library')
        db.collection('books').updateOne({_id: ObjectId(req.params.id)}, {$set: {isbn:req.body.isbn,title:req.body.title,author:req.body.author,category:req.body.category,stock:req.body.stock}}).then(response=>{res.status(200).send(response)})
      }
    })
  }
}


module.exports= Booksmodel
