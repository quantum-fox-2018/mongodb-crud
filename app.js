const express = require('express')
const routerBook = require('./routes/book')
// const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', routerBook)

app.listen(3000, () => {
    console.log('Aplikasi berjalan di 3000')
})