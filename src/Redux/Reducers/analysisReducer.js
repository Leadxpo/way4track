import * as actionTypes from "../Constants/analysisConstant";

const initialValue = {
    loading: false,
    analysis: [],
    error: ""
}

export const analysisReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ANALYSIS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ANALYSIS_SUCCESS:
            if (state.analysis === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                analysis: action.payload
            }
        case actionTypes.FETCH_ANALYSIS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const analysisDetailReducer = (state =  { loading: false, analysisInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.ANALYSIS_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.ANALYSIS_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                analysisInfo: action.payload
            }
        case actionTypes.ANALYSIS_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
