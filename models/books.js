const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017'
const dbName = 'library'
const colName = 'books'

module.exports = {
  findAll() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
        const book = client.db(dbName).collection(colName)
  
        book.find({}).toArray((err, books) => {
          if(err) {
            reject(err)
          } else {
            resolve(books)
          }
        })
        client.close()
      });
    })
  },

  create(obj) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
        const book = client.db(dbName).collection(colName)
  
        book.insert(obj, function(err, result) {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
        client.close()
      })
    })
  },

  update(idObj, obj) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
        const book = client.db(dbName).collection(colName)
  
        book.update({
          _id: ObjectId(idObj)
        }, {
          $set: obj
        }, function(err, result) {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
        client.close()
      })
    })
  },

  deleteData(idObj) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, client) {
        const book = client.db(dbName).collection(colName)
  
        book.deleteOne({
          _id: ObjectId(idObj)
        }, function(err, result) {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
        client.close()
      })
    })
  }

}