import {
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_REQUEST,
    FETCH_CLIENTS_FAIL,
    FETCH_CLIENTS_DROPDOWN_SUCCESS,
    FETCH_CLIENTS_DROPDOWN_REQUEST,
    FETCH_CLIENTS_DROPDOWN_FAIL,
    CLIENT_DETAIL_REQUEST,
    CLIENT_DETAIL_SUCCESS,
    CLIENT_DETAIL_FAIL,
    CREATE_CLIENT_FAIL,
    CREATE_CLIENT_REQUEST,
    CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAIL,
    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,
    UPDATE_CLIENT_REQUEST,
    UPDATE_CLIENT_SUCCESS
} from "../Constants/clientConstant";

import * as actionTyes from "../Constants/clientConstant";
import api from "../../Api/api";

export const fetchClients = (getAll_clientpayload) => async (dispatch) => {
    dispatch({ type: FETCH_CLIENTS_REQUEST });
    try {
        // Attempt to fetch CLIENTS
        const { data } = await api.post(`/dashboards/getSearchDetailClient`, getAll_clientpayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("client-mainData  success: ", data.data)
        dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_CLIENTS_FAIL, payload: error.message });
    }
};

export const createClients = (create_clientPayload) => async (dispatch) => {
    const { unitCode, companyCode, name, branch, phoneNumber, dob, email, address, joiningDate, profileImage } = create_clientPayload
    const create_clientPayload_formData = new FormData();
    create_clientPayload_formData.append('unitCode', unitCode);
    create_clientPayload_formData.append('companyCode', companyCode);
    create_clientPayload_formData.append('name', name);
    create_clientPayload_formData.append('phoneNumber', phoneNumber);
    create_clientPayload_formData.append('branchId', branch);
    create_clientPayload_formData.append('dob', dob);
    create_clientPayload_formData.append('joiningDate', joiningDate);
    create_clientPayload_formData.append('email', email);
    create_clientPayload_formData.append('address', address);
    if (profileImage) {
        create_clientPayload_formData.append('file', profileImage); // Attach photo
    }

    dispatch({ type: CREATE_CLIENT_REQUEST });
    try {
        // Attempt to fetch CLIENTS
        const { data } = await api.post(`/client/handleClientDetails`, create_clientPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("client-mainData  success: ", data)
        dispatch({ type: CREATE_CLIENT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_CLIENT_FAIL, payload: error.message });
    }
};

export const updateClients = (update_clientPayload) => async (dispatch) => {
    const { id, unitCode, companyCode, name, branchId, phoneNumber, dob, email, address, status, joiningDate, profileImage, clientId } = update_clientPayload
    const update_clientPayload_formData = new FormData();
    update_clientPayload_formData.append('id', id);
    update_clientPayload_formData.append('unitCode', unitCode);
    update_clientPayload_formData.append('companyCode', companyCode);
    update_clientPayload_formData.append('name', name);
    update_clientPayload_formData.append('phoneNumber', phoneNumber);
    update_clientPayload_formData.append('branchId', branchId);
    update_clientPayload_formData.append('dob', dob);
    update_clientPayload_formData.append('joiningDate', joiningDate);
    update_clientPayload_formData.append('email', email);
    update_clientPayload_formData.append('address', address);

    if (profileImage) {
        update_clientPayload_formData.append('file', profileImage); // Attach photo
    }

    console.log("update_clientPayload_formData : ", update_clientPayload_formData);
    dispatch({ type: UPDATE_CLIENT_REQUEST });
    try {
        // Attempt to fetch CLIENTS
        const { data } = await api.post(`/client/handleClientDetails`, update_clientPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("client-mainData  success: ", data.data)
        dispatch({ type: UPDATE_CLIENT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_CLIENT_FAIL, payload: error.message });
    }
};

export const fetchClientsDropDown = (clientDropdownPayload) => async (dispatch) => {
    const { unitCode, companyCode } = clientDropdownPayload;
    console.log(unitCode, companyCode);
    dispatch({ type: FETCH_CLIENTS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch clients
        const { data } = await api.post(`/client/getClientDetails`, clientDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });

        dispatch({ type: FETCH_CLIENTS_DROPDOWN_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_CLIENTS_DROPDOWN_FAIL, payload: error.message });
    }
};

export const clientById = (get_clientPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_clientPayload
    dispatch({ type: CLIENT_DETAIL_REQUEST })
    try {
        // Attempt to fetch CLIENTS
        const { data } = await api.post(`/client/get-client-by-id`, get_clientPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("clientData : ", data.data)
        dispatch({ type: CLIENT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CLIENT_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteClientById = (delete_clientPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_clientPayload
    dispatch({ type: DELETE_CLIENT_REQUEST })
    try {
        // Attempt to fetch CLIENTS
        const { data } = await api.post(`/client/get-client-by-id`, delete_clientPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: DELETE_CLIENT_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_CLIENT_FAIL, payload: error.message });
    }
}
