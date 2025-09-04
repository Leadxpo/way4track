import api from "../../Api/api";
import {
    CREATE_RAISE_REQUEST_SUCCESS,
    CREATE_RAISE_REQUEST_REQUEST,
    CREATE_RAISE_REQUEST_FAIL,
    UPDATE_RAISE_REQUEST_SUCCESS,
    UPDATE_RAISE_REQUEST_REQUEST,
    UPDATE_RAISE_REQUEST_FAIL,
    FETCH_RAISE_REQUESTS_SUCCESS,
    FETCH_RAISE_REQUESTS_REQUEST,
    FETCH_RAISE_REQUESTS_FAIL,
    DELETE_RAISE_REQUESTS_SUCCESS,
    DELETE_RAISE_REQUESTS_REQUEST,
    DELETE_RAISE_REQUESTS_FAIL,
    RAISE_REQUEST_DETAIL_REQUEST,
    RAISE_REQUEST_DETAIL_SUCCESS,
    RAISE_REQUEST_DETAIL_FAIL,
} from "../Constants/raiseRequestConstant";

import * as actionTyes from "../Constants/raiseRequestConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createRaiseRequest = (create_raiseRequestPayload) => async (dispatch) => {
    try {
        const requestFrom = await AsyncStorage.getItem("ID");

        const requestFormdata = new FormData();

        requestFormdata.append('requestType', create_raiseRequestPayload.requestType || '');
        requestFormdata.append('requestTo', create_raiseRequestPayload.requestTo || '');
        requestFormdata.append('requestFrom', requestFrom || '');
        requestFormdata.append('companyCode', 'WAY4TRACK');
        requestFormdata.append('unitCode', 'WAY4');
        requestFormdata.append('requestFor', create_raiseRequestPayload.description || '');

        if (create_raiseRequestPayload.branch) {
            requestFormdata.append('branch', Number(create_raiseRequestPayload.branch));
        }

        if (create_raiseRequestPayload.fromDate) {
            requestFormdata.append('fromDate', create_raiseRequestPayload.fromDate);
        }

        if (create_raiseRequestPayload.toDate) {
            requestFormdata.append('toDate', create_raiseRequestPayload.toDate);
        }

        if (Array.isArray(create_raiseRequestPayload.photo)) {
            create_raiseRequestPayload.photo.forEach((file, index) => {
                requestFormdata.append('photo', {
                    uri: file.uri,
                    name: file.name || `photo_${index}.jpg`,
                    type: file.type || 'image/jpeg',
                });
            });
        }

        if (
            create_raiseRequestPayload.requestType === 'products' &&
            Array.isArray(create_raiseRequestPayload.products)
        ) {
            requestFormdata.append('products', JSON.stringify(create_raiseRequestPayload.products));
        }

        dispatch({ type: CREATE_RAISE_REQUEST_REQUEST });
        console.log("ppp :",requestFormdata)
        const { data } = await api.post('/requests/handleRequestDetails',
            requestFormdata,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        console.log("Request submitted successfully:", data);
        dispatch({ type: UPDATE_RAISE_REQUEST_SUCCESS, payload: data });

    } catch (error) {
        console.error("Error while submitting request:", error?.response?.data || error.message);
        dispatch({ type: CREATE_RAISE_REQUEST_FAIL, payload: error?.response?.data?.message || error.message });
    }
};

export const updateRaiseRequest = (update_raiseRequestPayload) => async (dispatch) => {
    console.log("update_raiseRequestPayload : ", update_raiseRequestPayload)

    dispatch({ type: UPDATE_RAISE_REQUEST_REQUEST });
    try {
        const requestFormdata = new FormData();

        requestFormdata.append('id', update_raiseRequestPayload.id || '');
        requestFormdata.append('requestType', update_raiseRequestPayload.requestType || '');
        requestFormdata.append('requestTo', update_raiseRequestPayload.requestTo || '');
        requestFormdata.append('requestFrom', update_raiseRequestPayload.requestFrom || '');
        requestFormdata.append('companyCode', 'WAY4TRACK');
        requestFormdata.append('unitCode', 'WAY4');
        requestFormdata.append('requestFor', update_raiseRequestPayload.requestFor || '');

        if (update_raiseRequestPayload.branch) {
            requestFormdata.append('branch', Number(update_raiseRequestPayload.branch));
        }

        if (update_raiseRequestPayload.fromDate) {
            requestFormdata.append('fromDate', update_raiseRequestPayload.fromDate);
        }

        if (update_raiseRequestPayload.toDate) {
            requestFormdata.append('toDate', update_raiseRequestPayload.toDate);
        }
        const photos = update_raiseRequestPayload.photo;
        for (let i = 0; i < photos.length; i++) {
            const item = photos[i];

            if (typeof item === "string") {
                // Handle remote URL
                try {
                    const response = await fetch(item);
                    const blob = await response.blob();
                    const filename = item.split("/").pop();
                    const mimeType = blob.type || "image/jpeg";

                    requestFormdata.append("photo", {
                        uri: item,
                        name: filename,
                        type: mimeType,
                    });
                } catch (err) {
                    console.warn("Failed to fetch image:", item, err);
                }
            } else if (item?.uri && item?.name && item?.type) {
                // Already a file object
                requestFormdata.append("photo", {
                    uri: item.uri,
                    name: item.name,
                    type: item.type,
                });
            }
        }

        if (
            update_raiseRequestPayload.requestType === 'products' &&
            Array.isArray(update_raiseRequestPayload.products)
        ) {
            requestFormdata.append('products', JSON.stringify(update_raiseRequestPayload.products));
            console.log("rrr :",requestFormdata)
        }
        const { data } = await api.post('/requests/handleRequestDetails',
            requestFormdata,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        console.log("Request submitted successfully:", data);
        dispatch({ type: UPDATE_RAISE_REQUEST_SUCCESS, payload: data.data });

    } catch (error) {
        console.error("Error while submitting request:", error?.response?.data || error.message);
        dispatch({ type: UPDATE_RAISE_REQUEST_FAIL, payload: error?.response?.data?.message || error.message });
    }
};

export const fetchRaiseRequests = (getAll_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_raiseRequestPayload;

    dispatch({ type: FETCH_RAISE_REQUESTS_REQUEST });
    try {
        const requestFrom = await AsyncStorage.getItem("ID");

        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/getAllRequestDetails`, getAll_raiseRequestPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequest-mainData  success: ", data.data)
        dispatch({ type: FETCH_RAISE_REQUESTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_RAISE_REQUESTS_FAIL, payload: error.message });
    }
};

export const raiseRequestById = (get_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_raiseRequestPayload;
    dispatch({ type: RAISE_REQUEST_DETAIL_REQUEST })
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/get-raiseRequest-by-id`, get_raiseRequestPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequestData : ", data.data)
        dispatch({ type: RAISE_REQUEST_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: RAISE_REQUEST_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteRaiseRequestById = (delete_raiseRequestPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_raiseRequestPayload;
    dispatch({ type: DELETE_RAISE_REQUESTS_REQUEST })
    try {
        // Attempt to fetch RAISE_REQUESTS
        const { data } = await api.post(`/requests/delete-raiseRequest-by-id`, delete_raiseRequestPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("raiseRequestData : ", data.data)
        dispatch({ type: DELETE_RAISE_REQUESTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_RAISE_REQUESTS_FAIL, payload: error.message });
    }
}

