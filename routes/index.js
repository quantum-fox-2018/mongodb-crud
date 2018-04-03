const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Halo!'
  })
})

routes.use('/books', require('./book'))

module.exports = routes