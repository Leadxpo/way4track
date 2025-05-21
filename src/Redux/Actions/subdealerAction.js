import {
    FETCH_SUBDEALERS_SUCCESS,
    FETCH_SUBDEALERS_REQUEST,
    FETCH_SUBDEALERS_FAIL,
    FETCH_SUBDEALERS_DROPDOWN_SUCCESS,
    FETCH_SUBDEALERS_DROPDOWN_REQUEST,
    FETCH_SUBDEALERS_DROPDOWN_FAIL,
    SUBDEALER_DETAIL_REQUEST,
    SUBDEALER_DETAIL_SUCCESS,
    SUBDEALER_DETAIL_FAIL,
    CREATE_SUBDEALER_FAIL,
    CREATE_SUBDEALER_REQUEST,
    CREATE_SUBDEALER_SUCCESS,
    DELETE_SUBDEALER_FAIL,
    DELETE_SUBDEALER_REQUEST,
    DELETE_SUBDEALER_SUCCESS,
    UPDATE_SUBDEALER_FAIL,
    UPDATE_SUBDEALER_REQUEST,
    UPDATE_SUBDEALER_SUCCESS
} from "../Constants/subDealerConstant";

import * as actionTyes from "../Constants/subDealerConstant";
import api from "../../Api/api";

export const fetchSubdealers = (getAll_subdealerpayload) => async (dispatch) => {
    const {unitCode, companyCode} =getAll_subdealerpayload
    dispatch({ type: FETCH_SUBDEALERS_REQUEST });
    try {
        // Attempt to fetch SUBDEALERS
        const { data } = await api.post(`/dashboards/getSubDealerData`,getAll_subdealerpayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("subdealer-mainData  success: ", data.data)
        dispatch({ type: FETCH_SUBDEALERS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: FETCH_SUBDEALERS_FAIL, payload: error.message });
        }
};

export const createSubdealers = (create_subdealerPayload) => async (dispatch) => {
    const {unitCode, companyCode, subdealerName, subdealerNumber, altMobileNumber,dob, password, gstNumber, startingDate, email, aadharNumber, address,profileImage} = create_subdealerPayload;
    const create_subdealerPayload_formData = new FormData();
    create_subdealerPayload_formData.append('unitCode', unitCode);
    create_subdealerPayload_formData.append('companyCode', companyCode);
    create_subdealerPayload_formData.append('name', subdealerName);
    create_subdealerPayload_formData.append('subDealerPhoneNumber', subdealerNumber);
    create_subdealerPayload_formData.append('password', password);
    create_subdealerPayload_formData.append('alternatePhoneNumber', altMobileNumber);
    create_subdealerPayload_formData.append('gstNumber', gstNumber);
    create_subdealerPayload_formData.append('dob', dob);
    create_subdealerPayload_formData.append('startingDate', startingDate);
    create_subdealerPayload_formData.append('emailId', email);
    create_subdealerPayload_formData.append('aadharNumber', aadharNumber);
    create_subdealerPayload_formData.append('address', address);
    if (profileImage) {
        console.log("subdealerPhoto : ",profileImage)
        const parts = profileImage._parts;        
        //Extract the object from the _parts array
        for (const part of parts) {
          create_subdealerPayload_formData.append('photo', part[1]); // Attach photo
        }
    }
  
    dispatch({ type: CREATE_SUBDEALER_REQUEST });
    try {
        // Attempt to fetch SUBDEALERS
        const { data } = await api.post(`/subdealer/handleSubDealerDetails`,create_subdealerPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("subdealer-mainData  success: ", data.data)
        dispatch({ type: CREATE_SUBDEALER_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: CREATE_SUBDEALER_FAIL, payload: error.message });
        }
};

export const updateSubdealer = (update_subdealerPayload) => async (dispatch) => {
    const { unitCode, companyCode, name,subDealerId, subDealerPhoneNumber, alternatePhoneNumber,password,dob, gstNumber, startingDate, emailId, aadharNumber, address,profileImage } = update_subdealerPayload;
    const create_subdealerPayload_formData = new FormData();
    create_subdealerPayload_formData.append('unitCode', unitCode);
    create_subdealerPayload_formData.append('companyCode', companyCode);
    create_subdealerPayload_formData.append('name', name);
    create_subdealerPayload_formData.append('id', subDealerId);
    create_subdealerPayload_formData.append('phoneNumber', subDealerPhoneNumber);
    create_subdealerPayload_formData.append('password', password);
    create_subdealerPayload_formData.append('alternatePhoneNumber', alternatePhoneNumber);
    create_subdealerPayload_formData.append('gstNumber', gstNumber);
    create_subdealerPayload_formData.append('dob', dob);
    create_subdealerPayload_formData.append('startingDate', startingDate);
    create_subdealerPayload_formData.append('emailId', emailId);
    create_subdealerPayload_formData.append('aadharNumber', aadharNumber);
    create_subdealerPayload_formData.append('address', address);
    if (profileImage) {
        console.log("subdealerPhoto : ",profileImage)
        const parts = profileImage._parts;        
        //Extract the object from the _parts array
        for (const part of parts) {
          create_subdealerPayload_formData.append('file', part[1]); // Attach photo
        }
    }
  

    dispatch({ type: UPDATE_SUBDEALER_REQUEST });
    try {
        // Attempt to fetch SUBDEALERS
        const { data } = await api.post(`/subdealer/get-all-subdealer`,update_subdealerPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("subdealer-mainData  success: ", data.data)
        dispatch({ type: UPDATE_SUBDEALER_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: UPDATE_SUBDEALER_FAIL, payload: error.message });
        }
};

export const subdealerById = (get_subdealerPayload) => async (dispatch) => {
    const {unitCode, companyCode,subdealerId} = get_subdealerPayload
    dispatch({ type: SUBDEALER_DETAIL_REQUEST })
    try {
        // Attempt to fetch SUBDEALERS
        const { data } = await api.post(`/subdealer/get-subdealer-by-id`,get_subdealerPayload, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("subdealerData : ", data.data)
        dispatch({ type: SUBDEALER_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: SUBDEALER_DETAIL_FAIL, payload: error.message });
        }
}

export const fetchSubdealersDropDown = (subdealerDropdownPayload) => async (dispatch) => {
    const {unitCode, companyCode } = subdealerDropdownPayload;
console.log(unitCode, companyCode);
    dispatch({ type: FETCH_SUBDEALERS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch subdealers
        const { data } = await api.post(`/subdealer/getSubdealerNamesDropDown`,subdealerDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        const subdealersDrpdownData = data.data.map((subdealer) => ({
            label: subdealer.name,
            value: subdealer.id,
          }));
          console.log("subdealersDropdown:",subdealersDrpdownData);
        dispatch({ type: FETCH_SUBDEALERS_DROPDOWN_SUCCESS, payload:  subdealersDrpdownData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_SUBDEALERS_DROPDOWN_FAIL, payload: error.message });
    }
};


export const deleteSubdealerById = (delete_subdealerPayload) => async (dispatch) => {
    const {unitCode, companyCode,subdealerId} = delete_subdealerPayload
    dispatch({ type: DELETE_SUBDEALER_REQUEST })
    try {
        // Attempt to fetch SUBDEALERS
        const { data } = await api.post(`/subdealer/get-subdealer-by-id`, delete_subdealerPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: DELETE_SUBDEALER_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: DELETE_SUBDEALER_FAIL, payload: error.message });
        }
}

