const express = require('express')
const morgan = require('morgan')
const app = express()

const books = require('./routes/books')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/books', books)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server starts on ${port}`)
})
