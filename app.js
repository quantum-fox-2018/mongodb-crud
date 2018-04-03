const express = require('express');
const app = express();

app.use(express.json()) // body parser replacer
app.use(express.urlencoded({extended: false})) // body parser replacer

app.use('/', require('./routes'))


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})