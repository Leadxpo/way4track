import {
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_FAIL,
    TICKET_DETAIL_REQUEST,
    TICKET_DETAIL_SUCCESS,
    TICKET_DETAIL_FAIL,
    CREATE_TICKET_REQUEST,
    CREATE_TICKET_SUCCESS,
    CREATE_TICKET_FAIL,
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAIL,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    DELETE_TICKET_FAIL
} from "../Constants/ticketConstant";

import * as actionTyes from "../Constants/ticketConstant";
import api from "../../Api/api";

export const createTickets = (create_ticketPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId, problem, date, branchId, addressingDepartment } = create_ticketPayload
    dispatch({ type: CREATE_TICKET_REQUEST });

    try {
        // Attempt to fetch tickets
        const { data } = await api.post(`/tickets/get-all-ticket`, create_ticketPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch({ type: CREATE_TICKET_SUCCESS, payload: data.data });
    } catch (error) {
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_TICKET_FAIL, payload: error.message });
    }
};

export const fetchTickets = (getAll_ticketsPayload) => async (dispatch) => {
    const { unitCode, companyCode} = getAll_ticketsPayload
    dispatch({ type: FETCH_TICKETS_REQUEST });

    try {
        // Attempt to fetch tickets
        const { data } = await api.post(`/tickets/getTicketDetails`, getAll_ticketsPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_TICKETS_SUCCESS, payload: data.data });
    } catch (error) {
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: FETCH_TICKETS_FAIL, payload: error.message });
    }
};


export const ticketById = (get_ticketPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_ticketPayload
    dispatch({ type: TICKET_DETAIL_REQUEST })
    try {
        // Attempt to fetch tickets
        const { data } = await api.post(`/tickets/get-tickets-by-id`, get_ticketPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: TICKET_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: TICKET_DETAIL_FAIL, payload: refreshError.message });
    }
}


export const updateTicketReplay = (update_ticketPayload) => async (dispatch) => {
    const { unitCode, companyCode, staffId, problem, date, branchId, addressingDepartment } = update_ticketPayload
    dispatch({ type: UPDATE_TICKET_REQUEST })
    try {
        // Attempt to fetch tickets
        const { data } = await api.post(`/tickets/update-ticket`, update_ticketPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: UPDATE_TICKET_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: UPDATE_TICKET_FAIL, payload: error.message });
    }
}

export const deleteTicket = (delete_ticketPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = delete_ticketPayload
    dispatch({ type: DELETE_TICKET_REQUEST })
    try {
        // Attempt to fetch tickets
        const { data } = await api.post(`/tickets/deleteTicketDetails`, delete_ticketPayload, {
            headers: {
                
                'Content-Type': 'application/json',
            },
        });
        console.log("delete_ticketPayload ::",data)
        
        dispatch({ type: DELETE_TICKET_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        let errorMessage = error.message;
        if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes("a foreign key constraint fails")
        ) {
          errorMessage = "Cannot delete this ticket as it is linked to notifications.";
        }
        dispatch({ type: DELETE_TICKET_FAIL, payload: errorMessage });
              // Handle other types of errors
    }

}