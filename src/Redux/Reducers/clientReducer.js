import * as actionTypes from "../Constants/clientConstant";

const initialValue = {
    loading: false,
    clients: [],
    error: ""
}

export const createClientsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CLIENT_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_CLIENT_SUCCESS:
            if (state.clients === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                clients: action.payload
            }
        case actionTypes.CREATE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const clientsReducer = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CLIENTS_REQUEST:
            return { 
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_CLIENTS_SUCCESS:
            if (state.clients === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                clients: action.payload
            }
        case actionTypes.FETCH_CLIENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const clientDetailReducer = (state =  { loading: false, clientInfo: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.CLIENT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                clientInfo: action.payload
            }
        case actionTypes.CLIENT_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const updateClientReducer = (state = { loading: false, client: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                client: action.payload
            }
        case actionTypes.UPDATE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}

export const clientsDropdownReducer = (state = { loading: false, clientsDropdown: [], error: "" }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CLIENTS_DROPDOWN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_CLIENTS_DROPDOWN_SUCCESS:
            if (state.clientsDropdown === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                clientsDropdown: action.payload
            }
        case actionTypes.FETCH_CLIENTS_DROPDOWN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const deleteClientReducer = (state = { loading: false, client: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_CLIENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                client: action.payload
            }
        case actionTypes.DELETE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
