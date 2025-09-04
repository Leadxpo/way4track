import * as actionTypes from "../Constants/notificationConstant";
import api from "../../Api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchNotifications = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_NOTIFICATIONS_REQUEST })
    try {
        const userID = await AsyncStorage.getItem('ID');
        const payload = {
            notifyStaffId: userID,
            companyCode: "WAY4TRACK",
            unitCode: "WAY4"
        };
        const { data } = await api.post('/notifications/getAllNotifications', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("rrr:",data.data.notifications)
        if (data.status) {
            const notifications = data?.data?.notifications || [];

            // Filter unread request and ticket notifications
            const requestUnread = notifications.filter(
                (n) => !n.isRead && n.notificationType === 'Request'
            );
            const ticketUnread = notifications.filter(
                (n) => !n.isRead && n.notificationType === 'Ticket'
            );

            dispatch({
                type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
                payload: {
                    notifications,
                    requestCount: requestUnread.length,
                    ticketCount: ticketUnread.length,
                },
            });
        } else {
            dispatch({
                type: actionTypes.GET_NOTIFICATIONS_FAIL,
                payload: 'No notifications found',
            });
        }
    } catch (error) {
        console.log("error : ", error)
        dispatch({ type: actionTypes.GET_NOTIFICATIONS_FAIL, payload: error.message })
    }
}

export const notificationDetail = (get_notificationPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_notificationPayload;

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
