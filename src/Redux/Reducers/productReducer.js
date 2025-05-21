import * as actionTypes from "../Constants/productConstant";

const initialValue = {
    loading: false,
    products: [],
    error: ""
}

export const createProductsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PRODUCT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            if (state.products === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case actionTypes.CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const productsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            if (state.products === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case actionTypes.FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const productDetailReducer = (state =  { loading: false, productInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                productInfo: action.payload
            }
        case actionTypes.PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateProductReducer = (state = { loading: false, product: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const productsDropdownReducer = (state = { loading: false, productsDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_PRODUCTS_DROPDOWN_SUCCESS:
            if (state.productsDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                productsDropdown: action.payload
            }
        case actionTypes.FETCH_PRODUCTS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deleteProductReducer = (state = { loading: false, product: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case actionTypes.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
