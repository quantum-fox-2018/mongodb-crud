const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT || 3000

const routeBooks = require('./routes/books');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).json('Welcome home')
})

app.use('/books', routeBooks)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})