const express = require('express')
const app = express()

const errorMidleware = require('./middleware/error')


app.use(express.json())


// import all routes
const products = require('./routes/product')

app.use('/api/v1', products)

// Middleware handle error
app.use(errorMidleware)

module.exports = app