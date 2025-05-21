import {
    FETCH_STAFFS_REQUEST,
    FETCH_STAFFS_SUCCESS,
    FETCH_STAFFS_FAIL,
    FETCH_STAFF_PERMISSION_REQUEST,
    FETCH_STAFF_PERMISSION_SUCCESS,
    FETCH_STAFF_PERMISSION_FAIL,
    UPDATE_STAFF_PERMISSION_REQUEST,
    UPDATE_STAFF_PERMISSION_SUCCESS,
    UPDATE_STAFF_PERMISSION_FAIL,
    FETCH_STAFFS_DROPDOWN_REQUEST,
    FETCH_STAFFS_DROPDOWN_SUCCESS,
    FETCH_STAFFS_DROPDOWN_FAIL,
    CREATE_STAFF_REQUEST,
    CREATE_STAFF_SUCCESS,
    CREATE_STAFF_FAIL,
    STAFF_DETAIL_SUCCESS,
    STAFF_DETAIL_FAIL,
    STAFF_DETAIL_REQUEST,
    STAFF_DETAIL_DELETE,
    UPDATE_STAFF_FAIL,
    UPDATE_STAFF_REQUEST,
    UPDATE_STAFF_SUCCESS,
    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAIL
} from "../Constants/staffConstant";

const initialState = {
    loading: false,
    staffs: [],
    error: "",
    staff: {},
}

export const createStaffReducer = (state = { loading: false, staff: {}, error: "" }, action) => {
    switch (action.type) {
        case CREATE_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_STAFF_SUCCESS:
            return {
                ...state,
                loading: false,
                staff: action.payload
            }
        case CREATE_STAFF_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const staffReducer = (state = initialState, action) => {
    switch (action.type) { 
        case FETCH_STAFFS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_STAFFS_SUCCESS:
            if (state.staffs === action.payload) {
                return state;  // No state change if the array is the same
            }
            return {
                ...state,
                loading: false,
                staffs: action.payload
            }
        case FETCH_STAFFS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const staffDetailReducer = (state = { loading: false, staffByIdInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case STAFF_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case STAFF_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                staffByIdInfo: action.payload
            }
        case STAFF_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case STAFF_DETAIL_DELETE:
            return {
                ...state,
                loading: false,
                staffByIdInfo:{}
            }
        default: return state
    }
}

export const updateStaffReducer = (state = { loading: false, staff: {}, error: "" }, action) => {
    switch (action.type) {
        case UPDATE_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_STAFF_SUCCESS:
            return {
                ...state,
                loading: false,
                staff: action.payload
            }
        case UPDATE_STAFF_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const staffsDropdownReducer = (state = { loading: false, staffsDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case FETCH_STAFFS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_STAFFS_DROPDOWN_SUCCESS:
            if (state.staffsDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                staffsDropdown: action.payload
            }
        case FETCH_STAFFS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deleteStaffReducer = (state = { loading: false, staff: {}, error: "" }, action) => {
    switch (action.type) {
        case DELETE_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_STAFF_SUCCESS:
            return {
                ...state,
                loading: false,
                staff: action.payload
            }
        case DELETE_STAFF_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const permissionStaffReducer = (state = { loading: false, staffPermission: {}, error: "" }, action) => {
    switch (action.type) {
        case FETCH_STAFF_PERMISSION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_STAFF_PERMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                staffPermission: action.payload
            }
        case FETCH_STAFF_PERMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const updatePermissionStaffReducer = (state = { loading: false, updateStaffPermission: {}, error: "" }, action) => {
    switch (action.type) {
        case UPDATE_STAFF_PERMISSION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_STAFF_PERMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                updateStaffPermission: action.payload
            }
        case UPDATE_STAFF_PERMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}