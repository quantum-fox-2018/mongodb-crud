const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

module.exports = {
    booksClient : function(callback){
        MongoClient.connect(url, function(err, client) {
            if(err){
                res.status(500).json({
                    messsage: "fail to connect to db"
                })
            }else{
                const db = client.db("library").collection("books");
                callback(db)
            }
        });     
    }
}