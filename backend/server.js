const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

// handle uncought exceptions
process.on('uncaughtException', err => {
    console.log(`error: ${err.message}`);
    console.log('shuting down the server due to uncought exception');
    process.exit(1)
})

// setting config
dotenv.config({path: 'backend/config/config.env'})



// cnnecting to db
connectDatabase()

// setting up cloudinary configurations
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// handle unhandled promise rijection
process.on('unhandledRejection', err => {
    console.log(`ERROR :  ${err.stack}`);
    console.log('shutting the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})