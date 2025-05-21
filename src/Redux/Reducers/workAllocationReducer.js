import * as actionTypes from "../Constants/workAllocationConstant";

const initialValue = {
    loading: false,
    workAllocations: [],
    error: ""
}

export const createWorkAllocationsReducer = (state = { loading: false, workAllocationInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_WORK_ALLOCATION_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_WORK_ALLOCATION_SUCCESS:
            if (state.workAllocationInfo === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                workAllocationInfo: action.payload
            }
        case actionTypes.CREATE_WORK_ALLOCATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const workAllocationsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_WORK_ALLOCATIONS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_WORK_ALLOCATIONS_SUCCESS:
            if (state.workAllocations === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                workAllocations: action.payload
            }
        case actionTypes.FETCH_WORK_ALLOCATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const workAllocationDetailReducer = (state =  { loading: false, workAllocationInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.WORK_ALLOCATION_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.WORK_ALLOCATION_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                workAllocationInfo: action.payload
            }
        case actionTypes.WORK_ALLOCATION_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateWorkAllocationReducer = (state = { loading: false, workAllocation: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_WORK_ALLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_WORK_ALLOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                workAllocation: action.payload
            }
        case actionTypes.UPDATE_WORK_ALLOCATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const deleteWorkAllocationReducer = (state = { loading: false, workAllocation: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_WORK_ALLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_WORK_ALLOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                workAllocation: action.payload
            }
        case actionTypes.DELETE_WORK_ALLOCATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
