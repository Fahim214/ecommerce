const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMidleware = require('./middleware/error')


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())


// import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth)

// Middleware handle error
app.use(errorMidleware)

module.exports = app