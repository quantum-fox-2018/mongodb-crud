const BooksModel = require('../models/book');

module.exports = {
    insertbook:(req,res)=> {
      BooksModel.insesrt(req,res)
    },
    readbook:(req,res)=>{
      BooksModel.read(req,res)
    },

    updatebook:(req,res)=>{
      BooksModel.update(req,res)
    },
    deletebook:(req,res)=>{
      BooksModel.delete(req,res)
    }
}
