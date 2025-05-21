import {
    FETCH_STAFFS_SUCCESS,
    FETCH_STAFFS_REQUEST,
    FETCH_STAFFS_FAIL,
    FETCH_STAFF_PERMISSION_SUCCESS,
    FETCH_STAFF_PERMISSION_REQUEST,
    FETCH_STAFF_PERMISSION_FAIL,
    UPDATE_STAFF_PERMISSION_SUCCESS,
    UPDATE_STAFF_PERMISSION_REQUEST,
    UPDATE_STAFF_PERMISSION_FAIL,
    FETCH_STAFFS_DROPDOWN_SUCCESS,
    FETCH_STAFFS_DROPDOWN_REQUEST,
    FETCH_STAFFS_DROPDOWN_FAIL,
    STAFF_DETAIL_REQUEST,
    STAFF_DETAIL_SUCCESS,
    STAFF_DETAIL_FAIL,
    CREATE_STAFF_FAIL,
    CREATE_STAFF_REQUEST,
    CREATE_STAFF_SUCCESS,
    DELETE_STAFF_FAIL,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    UPDATE_STAFF_FAIL,
    UPDATE_STAFF_REQUEST,
    UPDATE_STAFF_SUCCESS,
    SEARCH_STAFF_FAIL,
    SEARCH_STAFF_REQUEST,
    SEARCH_STAFF_SUCCESS
} from "../Constants/staffConstant";

import * as actionTyes from "../Constants/staffConstant";
import api from "../../Api/api";

export const fetchStaffs = (getAll_staffpayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_staffpayload
    dispatch({ type: FETCH_STAFFS_REQUEST });
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/getStaffDetails`, getAll_staffpayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_STAFFS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_STAFFS_FAIL, payload: error.message });
    }
};


export const searchStaffs = (getSearch_staffpayload) => async (dispatch) => {
    const { unitCode, companyCode, } = getSearch_staffpayload
    dispatch({ type: SEARCH_STAFF_REQUEST });
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/dashboards/getStaffSearchDetails`, getSearch_staffpayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: SEARCH_STAFF_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: SEARCH_STAFF_FAIL, payload: error.message });
    }
};

export const createStaff = (create_staffPayload) => async (dispatch) => {
    const { unitCode, companyCode, name, phoneNumber, password, branchId, designation, dob, email, aadharNumber, address, joiningDate, basicSalary, beforeExperience, staffPhoto } = create_staffPayload
    const create_staffPayload_formData = new FormData();
    create_staffPayload_formData.append('unitCode', unitCode);
    create_staffPayload_formData.append('companyCode', companyCode);
    create_staffPayload_formData.append('name', name);
    create_staffPayload_formData.append('phoneNumber', phoneNumber);
    create_staffPayload_formData.append('password', password);
    create_staffPayload_formData.append('branchId', branchId);
    create_staffPayload_formData.append('designation', designation);
    create_staffPayload_formData.append('dob', dob);
    create_staffPayload_formData.append('email', email);
    create_staffPayload_formData.append('aadharNumber', aadharNumber);
    create_staffPayload_formData.append('address', address);
    create_staffPayload_formData.append('joiningDate', joiningDate);
    create_staffPayload_formData.append('basicSalary', basicSalary);
    create_staffPayload_formData.append('beforeExperience', beforeExperience);
    if (staffPhoto) {
        create_staffPayload_formData.append('photo', staffPhoto); // Attach photo
    }
    dispatch({ type: CREATE_STAFF_REQUEST });
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/handleStaffDetails`, create_staffPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: CREATE_STAFF_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_STAFF_FAIL, payload: error.message });
    }
};

export const updateStaffs = (update_staffPayload) => async (dispatch) => {
    const { id, unitCode, companyCode, name, phoneNumber, password, staffId, branchId, designation, dob, email, aadharNumber, address, joiningDate, attendance, basicSalary, beforeExperience, staffPhoto } = update_staffPayload
    console.log("update_staffPayload : ", update_staffPayload)
    const update_staffPayload_formData = new FormData();
    update_staffPayload_formData.append('id', id);
    update_staffPayload_formData.append('staffId', staffId);
    update_staffPayload_formData.append('unitCode', unitCode);
    update_staffPayload_formData.append('companyCode', companyCode);
    update_staffPayload_formData.append('name', name);
    update_staffPayload_formData.append('phoneNumber', phoneNumber);
    update_staffPayload_formData.append('password', password);
    update_staffPayload_formData.append('branchId', branchId);
    update_staffPayload_formData.append('designation', designation);
    update_staffPayload_formData.append('dob', dob);
    update_staffPayload_formData.append('email', email);
    update_staffPayload_formData.append('aadharNumber', aadharNumber);
    update_staffPayload_formData.append('address', address);
    update_staffPayload_formData.append('joiningDate', joiningDate);
    update_staffPayload_formData.append('basicSalary', basicSalary);
    update_staffPayload_formData.append('beforeExperience', beforeExperience);

    if (staffPhoto) {
        update_staffPayload_formData.append('photo', staffPhoto); // Attach photo
    }
    console.log("update_staffPayload_formData : ", update_staffPayload_formData)
    dispatch({ type: UPDATE_STAFF_REQUEST });
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/handleStaffDetails`, update_staffPayload_formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: UPDATE_STAFF_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_STAFF_FAIL, payload: error.message });
    }
};

export const fetchStaffsDropDown = (staffDropdownPayload) => async (dispatch) => {
    const { unitCode, companyCode } = staffDropdownPayload;
    console.log(unitCode, companyCode);
    dispatch({ type: FETCH_STAFFS_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch staffs
        const { data } = await api.post(`/staff/getStaffNamesDropDown`, staffDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_STAFFS_DROPDOWN_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_STAFFS_DROPDOWN_FAIL, payload: error.message });
    }
};

export const staffById = (get_staffPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId } = get_staffPayload

    dispatch({ type: STAFF_DETAIL_REQUEST })
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/getStaffDetailsById`, get_staffPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: STAFF_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: STAFF_DETAIL_FAIL, payload: error.message });
    }
}

export const deleteStaffById = (delete_staffPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId } = delete_staffPayload
    dispatch({ type: DELETE_STAFF_REQUEST })
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/get-staff-by-id`, delete_staffPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: DELETE_STAFF_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: DELETE_STAFF_FAIL, payload: error.message });
    }
}

export const staffPermissionById = (permission_staffPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId } = permission_staffPayload
    dispatch({ type: FETCH_STAFF_PERMISSION_REQUEST })
    try {
        // Attempt to fetch STAFFS
        const staffData = await api.post(`/dashboards/getStaffSearchDetails`, permission_staffPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const staffPermission = await api.post(`/permissions/getStaffPermissions`, permission_staffPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const staffPermissionData = {
            staffData: staffData.data.data,
            staffPermission: staffPermission.data.data[0].permissions
        }
        console.log(staffPermissionData);
        dispatch({ type: FETCH_STAFF_PERMISSION_SUCCESS, payload: staffPermissionData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_STAFF_PERMISSION_FAIL, payload: error.message });
    }
}

export const updatePermissionById = (updatePermission_staffPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId, permissions } = updatePermission_staffPayload
    dispatch({ type: UPDATE_STAFF_PERMISSION_REQUEST })
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/permissions/handlePermissionDetails`, updatePermission_staffPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_STAFF_PERMISSION_SUCCESS, payload: data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_STAFF_PERMISSION_FAIL, payload: error.message });
    }
}

