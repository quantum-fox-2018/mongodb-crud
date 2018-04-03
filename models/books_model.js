const MongoClient =require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'library'

module.exports = {
    findAll: function(){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if(err){
                    console.log(err)
                }
                const db = client.db(dbName)
                db.collection("books").find({}).toArray((err, result) => {
                    if(err){
                        reject(err)
                    }
                    resolve(result)
                    client.close()
                })
            })
        });
    },

    create: function(objBook){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if(err){
                    console.log(err)
                }
                const db = client.db(dbName)
                
                db.collection("books").insertOne(objBook, (err, result) => {
                    if(err){
                        reject(err)
                    }
                    resolve(result)
                    client.close()
                })
            })
        });
    },

    update: function(id, objBook){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if(err){
                    console.log(err)
                }
                const db = client.db(dbName)
                
                db.collection("books").update({_id: ObjectId(id)},{$set: objBook} , (err, result) => {
                    if(err){
                        reject(err)
                    }
                    resolve(result)
                    client.close()
                })
            })
        });
    },

    delete: function(id){
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, client) => {
                if(err){
                    console.log(err)
                }
                const db = client.db(dbName)
                
                db.collection("books").deleteOne({_id: ObjectId(id)}, (err, result) => {
                    if(err){
                        reject(err)
                    }
                    resolve(result)
                    client.close()
                })
            })
        });
    }


}

