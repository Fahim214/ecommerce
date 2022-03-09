import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productReducers, productDetailsReducers, newReviewReducer} from './reducers/Productreducers'

import { authReducer, userDetailsReducers } from './reducers/UserReducers'
import { cartReducer } from './reducers/CartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/OrderReducers'

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    auth: authReducer,
    userDetail: userDetailsReducers,
    cart: cartReducer,
    newReview: newReviewReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer
})



let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };



const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store