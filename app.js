const express = require('express')
const bodyParser = require('body-parser')
const indexRoutes = require('./routes/index')
const apiRoutes = require('./routes/api-books')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRoutes)
app.use('/api', apiRoutes)

app.listen(port, log => {
    console.log(`Apps is running on port "${port}"`)
})