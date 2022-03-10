import axios from "axios";

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


  export const getNewProducts = (currentPage = 1) => async (dispatch) => {
    try {
      dispatch({ type: ALL_NEW_REQUEST });
  
      let link = `/api/v1/product`;
  
      const {data} = await axios.get(link)
      dispatch({
        type: ALL_NEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_NEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  //   clear error
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };