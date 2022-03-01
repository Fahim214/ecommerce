const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// Ragister a user => /api/v1/register
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {name, email, password}= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '03/avataaars-e28093-koolinus-1-12mar2019',
            url: 'https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png'
        }
    })

    const token = user.getJwtToken()

    res.status(201).json({
        success: true,
        token
    })
})

// login user  => /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next)=> {
    const {email, password} = req.body

    // check email and password is enterd user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    const token = user.getJwtToken()

    res.status(200).json({
        success: true,
        token
    })
})