const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

const crud = require('./crud.controller');

module.exports = 
{
    addNewBook: function(req, res){
       // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
        
            const db = client.db(dbName);
        
            crud.insertOne(db, req, function(err, result) {
                if(err){
                    res.status(500).json({
                        message:"problem with server"
                    })
                } else {
                    res.status(200).json({
                        message:"succesful create user"
                    }) 
                }
            client.close();
            });
        }); 
    },

    showAllBook: function(req, res){
         // Use connect method to connect to the server
         MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
        
            const db = client.db(dbName);
        
            crud.showAll(db, req, function(err, result) {
                if(err){
                    res.status(500).json({
                        message:"problem with server"
                    })
                } else {
                    res.status(200).json({
                        message:"succesful get all user",
                        result: result
                    }) 
                }
            client.close();
            });
        }); 
    },

    updateBookById: function(req, res){
        // Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
           console.log("Connected successfully to server");
       
           const db = client.db(dbName);
       
           crud.updateById(db, req, function(err, result) {
                if(err){
                    res.status(500).json({
                        message:"problem with server"
                    })
                } else {
                    res.status(200).json({
                        message:"succesful update user",
                        result: result
                    }) 
                }
            client.close();
            });
       }); 
   },

   deleteBookById: function(req, res){
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
       console.log("Connected successfully to server");
   
       const db = client.db(dbName);
   
       crud.removeById(db, req, function(err, result) {
            if(err){
                res.status(500).json({
                    message:"problem with server"
                })
            } else {
                res.status(200).json({
                    message:"succesful delete user",
                    result: result
                }) 
            }
        client.close();
        });
   }); 
},
    
};
 
