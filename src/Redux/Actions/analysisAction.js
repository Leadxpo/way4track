import {
    
    FETCH_ANALYSISES_SUCCESS,
    FETCH_ANALYSISES_REQUEST,
    FETCH_ANALYSISES_FAIL,
    ANALYSIS_DETAIL_REQUEST,
    ANALYSIS_DETAIL_SUCCESS,
    ANALYSIS_DETAIL_FAIL,
} from "../Constants/analysisConstant";

import * as actionTyes from "../Constants/analysisConstant";
import api from "../../Api/api";


export const fetchAnalisis = (getAll_analysisPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_analysisPayload;
    dispatch({ type: FETCH_ANALYSISES_REQUEST });
    try {
        // Attempt to fetch ANALYSIS
        const { data } = await api.post(`/analysis/get-all-analysis`, getAll_analysisPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("analysis-mainData  success: ", data.data)
        dispatch({ type: FETCH_ANALYSISES_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_ANALYSISES_FAIL, payload: error.message });
    }
};

export const analysisById = (get_analysisPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_analysisPayload;
    dispatch({ type: ANALYSIS_DETAIL_REQUEST })
    try {
        // Attempt to fetch ANALYSIS
        const { data } = await api.post(`/analysis/get-analysis-by-id`, get_analysisPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("analysisData : ", data.data)
        dispatch({ type: ANALYSIS_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: ANALYSIS_DETAIL_FAIL, payload: error.message });
    }
}
