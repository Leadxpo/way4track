import {
    CREATE_ASSERT_SUCCESS,
    CREATE_ASSERT_REQUEST,
    CREATE_ASSERT_FAIL,
    UPDATE_ASSERT_SUCCESS,
    UPDATE_ASSERT_REQUEST,
    UPDATE_ASSERT_FAIL,
    FETCH_ASSERTS_SUCCESS,
    FETCH_ASSERTS_REQUEST,
    FETCH_ASSERTS_FAIL,
    DELETE_ASSERTS_SUCCESS,
    DELETE_ASSERTS_REQUEST,
    DELETE_ASSERTS_FAIL,
    ASSERT_DETAIL_REQUEST,
    ASSERT_DETAIL_SUCCESS,
    ASSERT_DETAIL_FAIL,
} from "../Constants/assertConstant";

import * as actionTyes from "../Constants/assertConstant";
import api from "../../Api/api";

export const createAssert = (create_assertPayload) => async (dispatch) => {
    const { unitCode, companyCode, assertImage, assetType, quantity, branchId, description, purchaseDate, voucherId } = create_assertPayload;
    const create_assetPayload_formData = new FormData();
    create_assetPayload_formData.append('unitCode', unitCode);
    create_assetPayload_formData.append('companyCode', companyCode);
    create_assetPayload_formData.append('voucherId', voucherId);
    create_assetPayload_formData.append('branchId', branchId);
    create_assetPayload_formData.append('assetType', assetType);
    create_assetPayload_formData.append('quantity', quantity);
    create_assetPayload_formData.append('description', description);
    create_assetPayload_formData.append('purchaseDate', purchaseDate);
    if (assertImage) {
          create_assetPayload_formData.append('photo',assertImage); // Attach photo
        }

    dispatch({ type: CREATE_ASSERT_REQUEST });
    try {
        // Attempt to fetch ASSERTS
        const { data } = await api.post(`/asserts/create`, create_assetPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: CREATE_ASSERT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_ASSERT_FAIL, payload: error.message });
    }
};

export const updateAssert = (update_assertPayload) => async (dispatch) => {
    const { id, unitCode, companyCode, assertsName, assetPhoto, assertImage, assetType, quantity, branchId, description, purchaseDate, voucherId} = update_assertPayload;
    const update_assetPayload_formData = new FormData();
    update_assetPayload_formData.append('id', id);
    update_assetPayload_formData.append('unitCode', unitCode);
    update_assetPayload_formData.append('companyCode', companyCode);
    update_assetPayload_formData.append('voucherId', voucherId);
    update_assetPayload_formData.append('branchId', branchId);
    update_assetPayload_formData.append('assetType', assetType);
    update_assetPayload_formData.append('quantity', quantity);
    update_assetPayload_formData.append('description', description);
    update_assetPayload_formData.append('purchaseDate', purchaseDate);
    if (assertImage) {
          update_assetPayload_formData.append('photo',assertImage); // Attach photo
        }
        console.log('Payload:', update_assetPayload_formData);
    dispatch({ type: UPDATE_ASSERT_REQUEST });
    try {
        // Attempt to fetch ASSERTS
        const { data } = await api.post(`/asserts/create`, update_assetPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("result : ",data)
        dispatch({ type: UPDATE_ASSERT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_ASSERT_FAIL, payload: error.message });
    }
};

export const fetchAsserts = (getAll_assertPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_assertPayload;
    dispatch({ type: FETCH_ASSERTS_REQUEST });
    try {
        // Attempt to fetch ASSERTS
        const { data } = await api.post(`/asserts/getAllAssertDetails`, getAll_assertPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("assert-mainData  success: ", data.data)
        dispatch({ type: FETCH_ASSERTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_ASSERTS_FAIL, payload: error.message });
    }
};

export const assertById = (get_assertPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_assertPayload;
    dispatch({ type: ASSERT_DETAIL_REQUEST })
    try {
        // Attempt to fetch ASSERTS
        const { data } = await api.post(`/asserts/get-assert-by-id`, get_assertPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("assertData : ", data.data)
        dispatch({ type: ASSERT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: ASSERT_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteAssertById = (delete_assertPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_assertPayload;
    dispatch({ type: DELETE_ASSERTS_REQUEST })
    try {
        // Attempt to fetch ASSERTS
        const { data } = await api.post(`/asserts/delete-assert-by-id`, delete_assertPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("assertData : ", data.data)
        dispatch({ type: DELETE_ASSERTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_ASSERTS_FAIL, payload: error.message });
    }
}

