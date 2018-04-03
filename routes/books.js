var express = require('express')
var router = express.Router()
const Books = require('../controllers/books')

/* GET users listing. */
router.get('/',Books.read)
router.post('/',Books.create)
router.put('/',Books.update)
router.delete('/',Books.delete)

module.exports = router
