import {
    ALL_NEW_REQUEST,
    ALL_NEW_SUCCESS,
    ALL_NEW_FAIL,
    NEW_DETAILS_REQUEST,
    NEW_DETAILS_SUCCESS,
    NEW_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REQUEST,
    NEW_SUCCESS,
    NEW_RESET,
    NEW_FAIL,
  } from "../constants/NewContstans";
  
  export const newReducers = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_NEW_REQUEST:
        return {
          loading: true,
          products: [],
        };
  
      case ALL_NEW_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
          resPerpage: action.payload.resPerpage,
          filteredProductCount: action.payload.filteredProductCount
        };
  
      case ALL_NEW_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newDetailsReducers = (state = { product: {} }, action) => {
    switch (action.type) {
      case NEW_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case NEW_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload
        };
  
      case NEW_DETAILS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  
  export const ReviewNewReducer = (state = {}, action) => {
    switch (action.type) {
  
        case NEW_REQUEST:
            return {
                ...state,
                loading: true
            }
  
        case NEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
  
        case NEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
  
        case NEW_RESET:
            return {
                ...state,
                success: false
            }
  
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
  
        default:
            return state
    }
  }
  
  