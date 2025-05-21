import {
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAIL,
    CATEGORY_PRODUCT_REQUEST,
    CATEGORY_PRODUCT_FAIL,
    CATEGORY_PRODUCT_SUCCESS,
    CATEGORY_DETAIL_REQUEST,
    CATEGORY_DETAIL_SUCCESS,
    CATEGORY_DETAIL_FAIL,
} from "../Constants/categoryConstant";

import * as actionTyes from "../Constants/categoryConstant";
import api from "../../Api/api";

export const fetchCategories = () => async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
        // Attempt to fetch categories
        const { data } = await api.post(`/categories/get-all-categories`, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        const categories = data?.data || [];

        // Filtering only the active categories
        const activeCategories = categories.filter(category => category.status === "active");

        // Dispatching success action with filtered data
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: activeCategories });
    } catch (error) {
        // Improved error handling with status code check
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';

        console.error("Error fetching categories:", errorMessage);

        // Dispatching failure action with error messageresponse
        dispatch({ type: FETCH_CATEGORIES_FAIL, payload: errorMessage });
    }
};

export const productsByCategoryId = (category_id) => async (dispatch) => {
    dispatch({ type: CATEGORY_PRODUCT_REQUEST })
    try {
        // Attempt to fetch categories
        const { data } = await api.post(`/categories/get-categories-by-id`, { category_id }, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("productCategory  success : ", data.data.productDetails)
        dispatch({ type: CATEGORY_PRODUCT_SUCCESS, payload: data.data.productDetails });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: CATEGORY_PRODUCT_FAIL, payload: error.message });
    }
}

export const categoryById = (category_id) => async (dispatch) => {
    dispatch({ type: CATEGORY_DETAIL_REQUEST })
    try {
        // Attempt to fetch categories
        const { data } = await api.post(`/categories/get-categories-by-id`, { category_id }, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("CategoryData : ", data.data)
        dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: CATEGORY_DETAIL_FAIL, payload: error.message });
    }
}
