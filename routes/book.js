const express = require('express');
const routerbook = express.Router();
const book =require('../controllers/bookcontroller.js')

routerbook.get('/',book.readbook)
routerbook.post('/',book.insertbook)
routerbook.delete('/:id',book.deletebook)
routerbook.put('/:id',book.updatebook)

module.exports = routerbook
