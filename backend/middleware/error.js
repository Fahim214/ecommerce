const ErrorHandler = require('../utils/errorHandler')


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err}

        error.message = err.message

        // wrong mongoose object id error
        if(err.name === 'CastError') {
            const message = `Resource Not found, invalid ${err.path}`

            error = new ErrorHandler(message, 400)
        }

        // Handling mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

        // Handling mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate Email entered`
            error = new ErrorHandler(message, 400)
        }

        // Handling Wrong jwt error
        if(err.name === 'JsonWebTokenError'){
            const message = 'Json web token invalid, try again'
            error = new ErrorHandler(message, 400)
        }

         // Handling expire jwt error
         if(err.name === 'TokenExpireError'){
            const message = 'Json web token expired, try again'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })

    }

    
}