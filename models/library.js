

// class Test {

//     static showBooksAll(req,res) {

//                 let abc =  new Promise(function(resolve,reject) {
//             const findDocuments = function(db, callback) {
                
//                 const collection = db.collection('documents');
                
//                 collection.find({}).toArray(function(err, docs) {
//                     console.log(docs)

//                     if(err) {
//                         reject(err)
//                     } else {
//                         resolve(docs)
//                     }

//                     callback(docs);
//                 });
//             }

//             MongoClient.connect(url, function(err, client) {
              
//                 const db = client.db(dbName);
              
//                 findDocuments(db, function() {
//                     client.close();
//                 });
//             });

//         })

//         abc
//         .then(data => {
//             res.status(200).json({
//                 message: "Show successful",
//                 books: data
//             })    
//         })

//     }


// }

// module.exports = Test;




module.exports = {

    showBooksAll: (req,res) => {
        console.log('test masuk oi')

        return new Promise(function(resolve,reject) {
            console.log('ini di dalem promise')
            const MongoClient = require('mongodb').MongoClient;

            const url = 'mongodb://localhost:27017';

            const dbName = 'library';

            MongoClient.connect(url, function(err, client) {
                // Create a collection we want to drop later
                const col = client.db(dbName).collection('createIndexExample1');
                // Show that duplicate records got dropped
                col.find({}).toArray(function(err, items) {
                  
                    if(err) {
                        reject(err)
                    } else {
                        resolve(items)
                    }

                    // console.log(items)


                  client.close();
                });
              });
        })

        // abc
        // .then(data => {
        //     // res.send({
        //     //     message: "Show successful",
        //     //     books: data
        //     // })

        //     res.status(200).json({
        //         message: "Show successful",
        //         books: data
        //     })    
        // })


    },


}