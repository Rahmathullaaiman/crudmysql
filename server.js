const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mySqlPool = require('./DATABASE/db')

dotenv.config()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

//routes
app.use('/api/v1/student',require('./routes/router'))

app.get('/test',(req,res)=>{
    res.status(200).send('<h1>Node.js mysql app welcome</h1>')
})

const PORT = process.env.PORT || 8000

//conditionally listen
mySqlPool.query('SELECT 1').then(() =>  {
    console.log('mysql db  connected aayada');
    app.listen(PORT,()=>{
        console.log(`server running on port ${process.env.PORT} `.bgGreen.black);
    })
}).catch((error)=>{
    console.log(error);
})



