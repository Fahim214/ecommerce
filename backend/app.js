const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const errorMidleware = require('./middleware/error')


app.use(express.json())
app.use(cookieParser())



// import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

// Middleware handle error
app.use(errorMidleware)

module.exports = app