import { CREATE_SALES_VISIT_REQUEST, CREATE_SALES_VISIT_SUCCESS, CREATE_SALES_VISIT_FAILURE, DELETE_SALES_VISIT_REQUEST, UPDATE_SALES_VISIT_REQUEST } from "../Constants/salesVisitConstant";
import * as actionType from "../Constants/salesVisitConstant";

const initialState = {
  salesVisitData: null,
  loading: false,
  error: null,
};

export const uploadSalesVisitReducer = (state = { loading: false, uploadSalesVisitInfo: {}, error: "" }, action) => {
  switch (action.type) {
      case actionType.UPLOADE_SALES_VISIT_REQUEST:
          return { 
              ...state,
              loading: true,
          }
      case actionType.UPLOADE_SALES_VISIT_SUCCESS:
          if (state.uploadSalesVisitInfo === action.payload) {
              return state;  // No state change if the array is the same
            }
          return {
              ...state,
              loading: false,
              uploadSalesVisitInfo: action.payload
          }
      case actionType.UPLOADE_SALES_VISIT_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          }
      default: return state
  }
}

export const salesVisitReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SALES_VISIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SALES_VISIT_SUCCESS:
      return {
        ...state,
        loading: false,
        salesVisitData: action.payload,
      };
    case CREATE_SALES_VISIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_SALES_VISIT_REQUEST:
      return {
        ...state,
        salesVisitData: {
          ...state.salesVisitData,  // Spread the existing salesVisitData
          ...action.payload,   // Merge with the updated data
        },
      };
    case DELETE_SALES_VISIT_REQUEST:
      return {
        ...state,
        salesVisitData: null, // Clear the salesVisit data
      };

    default:
      return state;
  }
};
