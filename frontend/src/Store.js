import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productReducers, productDetailsReducers} from './reducers/Productreducers'

import { authReducer, userDetailsReducers } from './reducers/UserReducers'

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    auth: authReducer,
    userDetail: userDetailsReducers
})




let initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store