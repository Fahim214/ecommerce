const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

exports.newOrder = catchAsyncErrors(async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
     } = req.body;

     const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
     })

     res.status(200).json({
         success: true,
         order
     })
})

// get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        return next(new ErrorHandler( 'No order found with this id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get logged user order => /api/v1/order/me
exports.myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})


// get all order - admin => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})



// update / process order - admin => /api/v1/admin/order/:id
exports.updateOrders = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status, 
    order.delivereAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity
    await product.save({ validateBeforeSave: save})
}




// delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler( 'No order found with this id', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})




// Order Models
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            product: {
                type: String,
                required: true,
                ref: 'Product'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt : {
        type: Date
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0 
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0 
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0 
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0 
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema)



// Order Router
const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrders,
  deleteOrder,
} = require("./OrderFunction");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrders)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
