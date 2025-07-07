import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_FAIL,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_DROPDOWN_SUCCESS,
    FETCH_PRODUCTS_DROPDOWN_REQUEST,
    FETCH_PRODUCTS_DROPDOWN_FAIL,
    DELETE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from "../Constants/productConstant";

import * as actionTyes from "../Constants/productConstant";
import api from "../../Api/api";

export const createProduct = (create_productPayload) => async (dispatch) => {
    const { productName, emiNumber, dateOfPurchase, vendorId, imeiNumber, categoryName, price, productDescription, voucherId, companyCode, unitCode,
        vendorPhoneNumber, vendorName, vendorAddress, vendorEmailId, supplierName, serialNumber, primaryNo, secondaryNo, primaryNetwork, secondaryNetwork,
        simStatus, planName, remarks1, } = create_productPayload;
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        // Attempt to fetch PRODUCTS
        const { data } = await api.post(`/product/get-all-product`, create_productPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.message });
    }
};

export const updateProduct = (update_productPayload) => async (dispatch) => {
    const { id, productName, emiNumber, dateOfPurchase, vendorId, imeiNumber, categoryName, price, productDescription, voucherId, companyCode, unitCode,
        vendorPhoneNumber, vendorName, vendorAddress, vendorEmailId, supplierName, serialNumber, primaryNo, secondaryNo, primaryNetwork, secondaryNetwork,
        simStatus, planName, remarks1, } = update_productPayload;
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        // Attempt to fetch PRODUCTS
        const { data } = await api.post(`/product/get-all-product`, update_productPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message });
    }
};

export const fetchProducts = (getAll_productPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_productPayload;
    console.log("rrr : ",getAll_productPayload)
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        // Attempt to fetch PRODUCTS
        const { data } = await api.post(`/products/getAllproductDetails`, getAll_productPayload, { 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("rrr : ",data.data)
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message });
    }
};

export const fetchProductsDropDown = (productDropdownPayload) => async (dispatch) => {
    const {unitCode, companyCode } = productDropdownPayload;
    dispatch({ type: FETCH_PRODUCTS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch products
        const { data } = await api.post(`/products/getAllproductDetails`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_PRODUCTS_DROPDOWN_SUCCESS, payload:  data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_PRODUCTS_DROPDOWN_FAIL, payload: error.message });
    }
};

export const productById = (get_productPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_productPayload;
    dispatch({ type: PRODUCT_DETAIL_REQUEST })
    try {
        // Attempt to fetch PRODUCTS
        const { data } = await api.post(`/product/get-product-by-id`, get_productPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("productData : ", data.data)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteproductById = (delete_productPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_productPayload;
    dispatch({ type: DELETE_PRODUCTS_REQUEST })
    try {
        // Attempt to fetch PRODUCTS
        const { data } = await api.post(`/product/delete-product-by-id`, delete_productPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("productData : ", data.data)
        dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_PRODUCTS_FAIL, payload: error.message });
    }
}