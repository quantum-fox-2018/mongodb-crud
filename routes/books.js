const router = require('express').Router()
const { showAll, addNew, findOne, updateData, deleteData } = require('../controllers/controllerBook')

router.get('/', showAll)
      .post('/', addNew)
      .get('/:id', findOne)
      .put('/:id', updateData)
      .delete('/:id', deleteData)

module.exports = router;