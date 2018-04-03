const routes = require('express').Router()

routes.get('/', (req, res) => {
    res.send('Halaman Home Index')
})

module.exports = routes