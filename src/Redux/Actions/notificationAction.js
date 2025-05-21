import * as actionTypes from "../Constants/notificationConstant";
import api from "../../Api/api";

export const createNotification = (create_notificationPayload) => async (dispatch) => {
    const { unitCode, companyCode, branchName, description } = create_notificationPayload;
    dispatch({ type: actionTypes.CREATE_NOTIFICATION_REQUEST })
    try {
        const { data } = await api.post(`/notification/get-Notification-by-userID`,create_notificationPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const notificationStaffData=rrr.filter((item)=>{
            if (item.subtype=="all") {
                return(!item.viewers.include(userID))
            } else {
                return(!item.isview)
            }
        })
        console.log("notification-mainData  success : ", notificationStaffData)
        dispatch({ type: actionTypes.CREATE_NOTIFICATION_SUCCESS, payload: notificationStaffData})
    } catch (error) {
        console.log("error : ", error)
        dispatch({ type: actionTypes.CREATE_NOTIFICATION_FAIL, payload: error.message })
    }
}

export const fetchNotifications = (getAll_notificationPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_notificationPayload;
        dispatch({ type: actionTypes.GET_NOTIFICATIONS_REQUEST })
    try {
        const { data } = await api.post(`/notification/get-Notification-by-userID`,getAll_notificationPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const notificationStaffData=rrr.filter((item)=>{
            if (item.subtype=="all") {
                return(!item.viewers.include(userID))
            } else {
                return(!item.isview)
            }
        })
        console.log("notification-mainData  success : ", notificationStaffData)
        dispatch({ type: actionTypes.GET_NOTIFICATIONS_SUCCESS, payload: notificationStaffData})
    } catch (error) {
        console.log("error : ", error)
        dispatch({ type: actionTypes.GET_NOTIFICATIONS_FAIL, payload: error.message })
    }
}

export const notificationDetail = (get_notificationPayload) => async (dispatch) => {
    const { unitCode, companyCode,id } = get_notificationPayload;

    dispatch({ type: actionTypes.NOTIFICATION_DETAIL_REQUEST })
    try {
        const { data } = await api.post(`/notification/get-Notification-by-id`, { id }, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("mainData  success : ", data.data)
        dispatch({ type: actionTypes.NOTIFICATION_DETAIL_SUCCESS, payload: data.data })
    } catch (error) {
        console.log("error : ", error)
        dispatch({ type: actionTypes.NOTIFICATION_DETAIL_FAIL, payload: error.name })
    }
}
