import * as actionTypes from "../Constants/assertConstant";

const initialValue = {
    loading: false,
    asserts: [],
    error: ""
}

export const createAssertReducer = (state = { loading: false, assertInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ASSERT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_ASSERT_SUCCESS:
            if (state.assertInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                assertInfo: action.payload
            }
        case actionTypes.CREATE_ASSERT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const assertsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ASSERTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ASSERTS_SUCCESS:
            if (state.asserts === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                asserts: action.payload
            }
        case actionTypes.FETCH_ASSERTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const assertDetailReducer = (state =  { loading: false, assertInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.ASSERT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.ASSERT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                assertInfo: action.payload
            }
        case actionTypes.ASSERT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateAssertReducer = (state = { loading: false, assert: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ASSERT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_ASSERT_SUCCESS:
            return {
                ...state,
                loading: false,
                assert: action.payload
            }
        case actionTypes.UPDATE_ASSERT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteAssertReducer = (state = { loading: false, assert: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_ASSERT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_ASSERT_SUCCESS:
            return {
                ...state,
                loading: false,
                assert: action.payload
            }
        case actionTypes.DELETE_ASSERT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
