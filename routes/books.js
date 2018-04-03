const {getAll,addBook,updateBook,removeBook}  = require('../controllers/bookController')
const express = require('express');
const router = express.Router()

router.get('/',getAll)
router.post('/add',addBook)
router.delete('/delete/:id',removeBook)
router.put('/update/:id',updateBook)



module.exports = router;
