import * as actionTypes from "../Constants/productAssignConstant";

const initialValue = {
    loading: false,
    productAssigns: [],
    error: ""
}

export const createProductAssignsReducer = (state = { loading: false, productAssignInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PRODUCT_ASSIGN_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_PRODUCT_ASSIGN_SUCCESS:
            if (state.productAssign === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                productAssignInfo: action.payload
            }
        case actionTypes.CREATE_PRODUCT_ASSIGN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const productAssignsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_ASSIGNS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_PRODUCT_ASSIGNS_SUCCESS:
            if (state.productAssigns === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                productAssigns: action.payload
            }
        case actionTypes.FETCH_PRODUCT_ASSIGNS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const productAssignDetailReducer = (state =  { loading: false, productAssignInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_ASSIGN_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_ASSIGN_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                productAssignInfo: action.payload
            }
        case actionTypes.PRODUCT_ASSIGN_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateProductAssignReducer = (state = { loading: false, productAssign: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCT_ASSIGN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_PRODUCT_ASSIGN_SUCCESS:
            return {
                ...state,
                loading: false,
                productAssign: action.payload
            }
        case actionTypes.UPDATE_PRODUCT_ASSIGN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteProductAssignReducer = (state = { loading: false, productAssign: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_PRODUCT_ASSIGN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_PRODUCT_ASSIGN_SUCCESS:
            return {
                ...state,
                loading: false,
                productAssign: action.payload
            }
        case actionTypes.DELETE_PRODUCT_ASSIGN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
