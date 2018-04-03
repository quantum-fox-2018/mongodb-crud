const express = require('express')
const morgan = require('morgan')
const app = express()

const port = 3000
const books = require('./routes/books')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

app.get('/', function(req,res){
  res.send(`MongoDB CRUD`)
})
app.use('/books', books)

app.listen(port,function(req,res){
  console.log(`App listen on ${port}`)
})
