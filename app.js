const express = require('express')
var morgan = require('morgan')

const app = express()
const PORT = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded ({extended: false}))

app.use('/', require('./routes'))

app.listen(3000, () => {
  console.log(`it's running on ${PORT}`)
})