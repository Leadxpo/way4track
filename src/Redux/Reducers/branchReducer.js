import * as actionTypes from "../Constants/branchConstant";

const initialState = {
    loading: false,
    branches: [],
    error: ""
}

export const createbranchReducer = (state = { loading: false, addedBranch: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BRANCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CREATE_BRANCH_SUCCESS:
            if (state.addedBranch === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                addedBranch: action.payload
            }
        case actionTypes.CREATE_BRANCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const updatebranchReducer = (state = { loading: false, updatedBranch: {}, error: "" }, action) => { 
    switch (action.type) {
        case actionTypes.UPDATE_BRANCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_BRANCH_SUCCESS:
            if (state.updatedBranch === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                updatedBranch: action.payload
            }
        case actionTypes.UPDATE_BRANCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deletebranchReducer = (state = { loading: false, deletedbranch: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_BRANCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_BRANCH_SUCCESS:
            if (state.deletedbranch === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                deletedbranch: action.payload
            }
        case actionTypes.DELETE_BRANCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const branchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BRANCHES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BRANCHES_SUCCESS:
            if (state.branches === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                branches: action.payload
            }
        case actionTypes.FETCH_BRANCHES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const branchesDropdownReducer = (state = { loading: false, branchesDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BRANCHES_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BRANCHES_DROPDOWN_SUCCESS:
            if (state.branchesDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                branchesDropdown: action.payload
            }
        case actionTypes.FETCH_BRANCHES_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const branchProductReducer = (state = { loading: false, branchProducts: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.BRANCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BRANCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                catProducts: action.payload
            }
        case actionTypes.BRANCH_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const branchDetailReducer = (state = { loading: false, branch: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.BRANCH_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BRANCH_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                branch: action.payload
            }
        case actionTypes.BRANCH_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state

    }
}

