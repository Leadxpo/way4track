import {
    FETCH_VENDORS_SUCCESS,
    FETCH_VENDORS_REQUEST,
    FETCH_VENDORS_FAIL,
    FETCH_VENDORS_DROPDOWN_SUCCESS,
    FETCH_VENDORS_DROPDOWN_REQUEST,
    FETCH_VENDORS_DROPDOWN_FAIL,
    VENDOR_DETAIL_REQUEST,
    VENDOR_DETAIL_SUCCESS,
    VENDOR_DETAIL_FAIL,
    CREATE_VENDOR_FAIL,
    CREATE_VENDOR_REQUEST,
    CREATE_VENDOR_SUCCESS,
    DELETE_VENDOR_FAIL,
    DELETE_VENDOR_REQUEST,
    DELETE_VENDOR_SUCCESS,
    UPDATE_VENDOR_FAIL,
    UPDATE_VENDOR_REQUEST,
    UPDATE_VENDOR_SUCCESS
} from "../Constants/vendorConstant";

import * as actionTyes from "../Constants/vendorConstant";
import api from "../../Api/api";

export const fetchVendors = (getAll_vendorpayload) => async (dispatch) => {
    const {unitCode, companyCode} =getAll_vendorpayload
    dispatch({ type: FETCH_VENDORS_REQUEST });
    try {
        // Attempt to fetch VENDORS
        const { data } = await api.post(`/dashboards/getVendorData`,getAll_vendorpayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("vendor-mainData  success: ", data.data)
        dispatch({ type: FETCH_VENDORS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: FETCH_VENDORS_FAIL, payload: error.message });
        }
};

export const createVendors = (create_vendorPayload) => async (dispatch) => {
    const {unitCode, companyCode, name, vendorPhoneNumber, alternatePhoneNumber,productType, startingDate, emailId, aadharNumber, address,ProfileImage} = create_vendorPayload
    const create_vendorPayload_formData = new FormData();
    create_vendorPayload_formData.append('unitCode', unitCode);
    create_vendorPayload_formData.append('companyCode', companyCode);
    create_vendorPayload_formData.append('name', name);
    create_vendorPayload_formData.append('alternatePhoneNumber', alternatePhoneNumber);
    create_vendorPayload_formData.append('vendorPhoneNumber', vendorPhoneNumber);
    create_vendorPayload_formData.append('aadharNumber', aadharNumber);
    create_vendorPayload_formData.append('productType', productType);
    create_vendorPayload_formData.append('startingDate', startingDate);
    create_vendorPayload_formData.append('emailId', emailId);
    create_vendorPayload_formData.append('address', address);
    if (ProfileImage) {
        console.log("vendorPhoto : ",ProfileImage)
        const parts = ProfileImage._parts;        
        //Extract the object from the _parts array
        for (const part of parts) {
          create_vendorPayload_formData.append('photo', part[1]); // Attach photo
        }
    }
    dispatch({ type: CREATE_VENDOR_REQUEST });
    try {
        console.log("create_vendorPayload_formData : ",create_vendorPayload_formData)
        // Attempt to fetch VENDORS
        const { data } = await api.post(`/vendor/handleVendorDetails`,create_vendorPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("vendor-mainData  success: ", data)
        dispatch({ type: CREATE_VENDOR_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: CREATE_VENDOR_FAIL, payload: error.message });
        }
};

export const updateVendors = (update_vendorPayload) => async (dispatch) => {
    const {unitCode, companyCode, name, vendorPhoneNumber, alternatePhoneNumber, productType, startingDate, emailId, aadharNumber, address, voucherId } = update_vendorPayload
    dispatch({ type: UPDATE_VENDOR_REQUEST });
    try {
        // Attempt to fetch VENDORS
        const { data } = await api.post(`/vendor/get-all-vendor`,update_vendorPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("vendor-mainData  success: ", data.data)
        dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: UPDATE_VENDOR_FAIL, payload: error.message });
        }
};

export const vendorById = (get_vendorPayload) => async (dispatch) => {
    const {unitCode, companyCode,vendorId} = get_vendorPayload
    dispatch({ type: VENDOR_DETAIL_REQUEST })
    try {
        // Attempt to fetch VENDORS
        const { data } = await api.post(`/vendor/get-vendor-by-id`,get_vendorPayload, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("vendorData : ", data.data)
        dispatch({ type: VENDOR_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: VENDOR_DETAIL_FAIL, payload: error.message });
        }
}

export const fetchVendorsDropDown = (vendorDropdownPayload) => async (dispatch) => {
    const {unitCode, companyCode } = vendorDropdownPayload;
console.log(unitCode, companyCode);
    dispatch({ type: FETCH_VENDORS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch vendors
        const { data } = await api.post(`/vendor/getVendorNamesDropDown`,vendorDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        const vendorsDrpdownData = data.data.map((vendor) => ({
            label: vendor.name,
            value: vendor.id,
          }));
          console.log("vendorsDropdown:",vendorsDrpdownData);
        dispatch({ type: FETCH_VENDORS_DROPDOWN_SUCCESS, payload:  vendorsDrpdownData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_VENDORS_DROPDOWN_FAIL, payload: error.message });
    }
};

export const deleteVendorById = (delete_vendorPayload) => async (dispatch) => {
    const {unitCode, companyCode,vendorId} = delete_vendorPayload
    dispatch({ type: DELETE_VENDOR_REQUEST })
    try {
        // Attempt to fetch VENDORS
        const { data } = await api.post(`/vendor/get-vendor-by-id`, delete_vendorPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: DELETE_VENDOR_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ",error)
        // If the error status is 500, try refreshing the token
            // Handle other types of errors
            dispatch({ type: DELETE_VENDOR_FAIL, payload: error.message });
        }
}

