const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')

const crypto = require('crypto')

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

    sendToken(user, 200, res)
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

    sendToken(user, 200, res)
})

// Forgot password => /api/v1/password/forgot\
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    // get reset token
    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave: false})

    // Create reset pw
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Shop password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})

// Reset password => /api/v1/reset/:token\
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Rset password is invalid or has been expired, 400')
        )
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    // setup new pw
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)

})

// Get currently logged in user details
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// update / change pasword => /api/v1/password/update 
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password in incorrect', 400))
    }

    user.password = req.body.password;
    await user.save()

    sendToken(user, 200, res)
})

// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })
})

// logout user => /api/v1/logout
exports.logout = catchAsyncError(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Admin routes


// get all user => /api/v1/admin/users
exports.allUsers = exports.logout = catchAsyncError(async(req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

// get user details => /api/v1/admin/users/:id
exports.getUserDetail = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.paramas.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })
})

// delete user  => /api/v1/admin/users/:id
exports.deleteUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.paramas.id}`))
    }

    // remove avatar from cloudinary 
    

    await user.remove()

    res.status(200).json({
        success: true,
    })
})