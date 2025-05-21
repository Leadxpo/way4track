import {
    CREATE_PRODUCT_ASSIGN_SUCCESS,
    CREATE_PRODUCT_ASSIGN_REQUEST,
    CREATE_PRODUCT_ASSIGN_FAIL,
    UPDATE_PRODUCT_ASSIGN_SUCCESS,
    UPDATE_PRODUCT_ASSIGN_REQUEST,
    UPDATE_PRODUCT_ASSIGN_FAIL,
    FETCH_PRODUCT_ASSIGNS_SUCCESS,
    FETCH_PRODUCT_ASSIGNS_REQUEST,
    FETCH_PRODUCT_ASSIGNS_FAIL,
    DELETE_PRODUCT_ASSIGNS_SUCCESS,
    DELETE_PRODUCT_ASSIGNS_REQUEST,
    DELETE_PRODUCT_ASSIGNS_FAIL,
    PRODUCT_ASSIGN_DETAIL_REQUEST,
    PRODUCT_ASSIGN_DETAIL_SUCCESS,
    PRODUCT_ASSIGN_DETAIL_FAIL,
} from "../Constants/productAssignConstant";

import * as actionTyes from "../Constants/productAssignConstant";
import api from "../../Api/api";

export const createProductAssign = (create_productAssignPayload) => async (dispatch) => {
    const {  staffId, productId, branchId, imeiNumberFrom, imeiNumberTo, numberOfProducts, branchOrPerson, productAssignPhoto, companyCode, unitCode } = create_productAssignPayload;
    dispatch({ type: CREATE_PRODUCT_ASSIGN_REQUEST });
    try {
        // Attempt to fetch PRODUCT_ASSIGNS
        const { data } = await api.post(`/productAssign/get-all-productAssign`,create_productAssignPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_PRODUCT_ASSIGN_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: CREATE_PRODUCT_ASSIGN_FAIL, payload: error.message });
        }
};

export const updateProductAssign = (update_productAssignPayload) => async (dispatch) => {
    const {  staffId, productId, branchId, imeiNumberFrom, imeiNumberTo, numberOfProducts, branchOrPerson, productAssignPhoto, companyCode, unitCode } =  update_productAssignPayload;
    dispatch({ type: UPDATE_PRODUCT_ASSIGN_REQUEST });
    try {
        // Attempt to fetch PRODUCT_ASSIGNS
        const { data } = await api.post(`/productAssign/get-all-productAssign`,update_productAssignPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_PRODUCT_ASSIGN_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: UPDATE_PRODUCT_ASSIGN_FAIL, payload: error.message });
        }
};

export const fetchProductAssigns = (getAll_productAssignPayload) => async (dispatch) => {
    const { unitCode, companyCode} = getAll_productAssignPayload;
    dispatch({ type: FETCH_PRODUCT_ASSIGNS_REQUEST });
    try {
        // Attempt to fetch PRODUCT_ASSIGNS
        const { data } = await api.post(`/productAssign/get-all-productAssign`,getAll_productAssignPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("productAssign-mainData  success: ", data.data)
        dispatch({ type: FETCH_PRODUCT_ASSIGNS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: FETCH_PRODUCT_ASSIGNS_FAIL, payload: error.message });
        }
};

export const productAssignById = (get_productAssignPayload) => async (dispatch) => {
    const { unitCode, companyCode,id } = get_productAssignPayload;
    dispatch({ type: PRODUCT_ASSIGN_DETAIL_REQUEST })
    try {
        // Attempt to fetch PRODUCT_ASSIGNS
        const { data } = await api.post(`/productAssign/get-productAssign-by-id`, get_productAssignPayload, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("productAssignData : ", data.data)
        dispatch({ type: PRODUCT_ASSIGN_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error) 
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: PRODUCT_ASSIGN_DETAIL_FAIL, payload: error.message });
        }
}

export const deleteproductAssignById = (delete_productAssignPayload) => async (dispatch) => {
    const { unitCode, companyCode,id } = delete_productAssignPayload;
    dispatch({ type: DELETE_PRODUCT_ASSIGNS_REQUEST })
    try {
        // Attempt to fetch PRODUCT_ASSIGNS
        const { data } = await api.post(`/productAssign/delete-productAssign-by-id`, delete_productAssignPayload, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("productAssignData : ", data.data)
        dispatch({ type: DELETE_PRODUCT_ASSIGNS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: DELETE_PRODUCT_ASSIGNS_FAIL, payload: error.message });
        }
}

