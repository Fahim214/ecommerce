const express = require('express')
const app = express()

const errorMidleware = require('./middleware/error')


app.use(express.json())



// import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth)

// Middleware handle error
app.use(errorMidleware)

module.exports = app