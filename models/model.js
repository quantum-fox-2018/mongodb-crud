const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const ObjectId = require('mongodb').ObjectID

const dbName = 'db-mongo-test';

module.exports = {
  findAll: ()=> {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, client) {
        const col = client.db(dbName).collection('Books');
        col.find({}).toArray(function(err, books) {
          if(err){
            reject(err)
          } else {
            resolve(books)
          }
          client.close();
        });
      });
    });
  },
  create: (body)=>{
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, client) {
        const col = client.db(dbName).collection('Books');
        col.insert({
          isbn: body.isbn,
          title: body.title,
          author: body.author,
          category: body.category,
          stock: body.stock
        },function(err,result){
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
          client.close();
        })
      });
    });
  },
  update: (id, body)=>{
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, client) {
        const col = client.db(dbName).collection('Books');
        col.update({
          _id: ObjectId(id)
        },{
          $set: body
        },function(err,result){
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
          client.close();
        })
      });
    });
  },
  delete: (id)=>{
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, client) {
        const col = client.db(dbName).collection('Books');
        col.deleteOne({
          _id: ObjectId(id)
        },function(err,result){
          if(err){
            reject(err)
          } else {
            resolve(result)
          }
          client.close();
        })
      });
    });
  }
}
