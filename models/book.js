var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    isbn: 
    {
        type: String,
        unique: true
    },
    title: String,
    author: String,
    category: String,
    stock: Number
},{
    timestamps: true
});

mongoose.model('book', BookSchema);