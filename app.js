const express = require('express')
const app = express();

const indexRouter = require('./routers/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, () =>{
    console.log("connected to port 3000");
})