import * as actionTypes from "../Constants/notificationConstant";

const initialState = {
    notifications: [],
    requestCount: 0,
    ticketCount: 0,
    loading: false,
    error: null,
  };
  

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_NOTIFICATIONS_SUCCESS:
            if (state.notifications === action.payload) {
                return state;  // No state change if the array is the same
              }
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications,
                requestCount: action.payload.requestCount,
                ticketCount: action.payload.ticketCount,
                        }
        case actionTypes.GET_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export const singleNotificationReducer = (state = { loading: false, notification: {}, error: "" }, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.NOTIFICATION_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                notification: action.payload
            }
        case actionTypes.NOTIFICATION_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}