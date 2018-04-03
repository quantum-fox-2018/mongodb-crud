const express = require('express');
const library = require('../controllers/library');

const routes = express.Router();


routes.get('/api/books', library.showBooks)
routes.post('/api/books', library.addBooks)
routes.put('/api/books/:id', library.updateBooks)
routes.delete('/api/books/:id', library.deleteBooks)




module.exports = routes;