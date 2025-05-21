// reducerStaff.js
import {
  CREATE_CEO_DASHBOARD_REQUEST,
  CREATE_CEO_DASHBOARD_SUCCESS,
  CREATE_CEO_DASHBOARD_FAIL,
  CREATE_WAREHOUSE_MANAGER_DASHBOARD_REQUEST,
  CREATE_WAREHOUSE_MANAGER_DASHBOARD_SUCCESS,
  CREATE_WAREHOUSE_MANAGER_DASHBOARD_FAIL,
  CREATE_HR_DASHBOARD_REQUEST,
  CREATE_HR_DASHBOARD_SUCCESS,
  CREATE_HR_DASHBOARD_FAIL,
  CREATE_BRANCH_MANAGER_DASHBOARD_REQUEST,
  CREATE_BRANCH_MANAGER_DASHBOARD_SUCCESS,
  CREATE_BRANCH_MANAGER_DASHBOARD_FAIL,
  CREATE_TECHNICIAN_DASHBOARD_REQUEST,
  CREATE_TECHNICIAN_DASHBOARD_SUCCESS,
  CREATE_TECHNICIAN_DASHBOARD_FAIL,
  CREATE_SUBDEALER_STAFF_DASHBOARD_REQUEST,
  CREATE_SUBDEALER_STAFF_DASHBOARD_SUCCESS,
  CREATE_SUBDEALER_STAFF_DASHBOARD_FAIL,
  CREATE_SALES_MEN_DASHBOARD_REQUEST,
  CREATE_SALES_MEN_DASHBOARD_SUCCESS,
  CREATE_SALES_MEN_DASHBOARD_FAIL,
} from '../Constants/dashboardConstant';

const CEO_initialState = {
  loading: false,
  CEO_homeInfo: null,
  error: null,
};

const WarehouseManager_initialState = {
  loading: false,
  WarehouseManager_homeInfo: null,
  error: null,
};

const HR_initialState = {
  loading: false,
  HR_homeInfo: null,
  error: null,
};

const BranchManager_initialState = {
  loading: false,
  BranchManager_homeInfo: null,
  error: null,
};

const Technician_initialState = {
  loading: false,
  Technician_homeInfo: null,
  error: null,
};

const SubdealerStaff_initialState = {
  loading: false,
  SubdealerStaff_homeInfo: null,
  error: null,
};

const SalesMen_initialState = {
  loading: false,
  SalesMen_homeInfo: null,
  error: null,
};

export const CEO_dashboardReducer = (state = CEO_initialState, action) => {
  switch (action.type) {
    case CREATE_CEO_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_CEO_DASHBOARD_SUCCESS:
      if (state.CEO_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        CEO_homeInfo: action.payload
      }
    case CREATE_CEO_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const WarehouseManager_dashboardReducer = (state = WarehouseManager_initialState, action) => {
  switch (action.type) {
    case CREATE_WAREHOUSE_MANAGER_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_WAREHOUSE_MANAGER_DASHBOARD_SUCCESS:
      if (state.WarehouseManager_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        WarehouseManager_homeInfo: action.payload
      }
    case CREATE_WAREHOUSE_MANAGER_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const HR_dashboardReducer = (state = HR_initialState, action) => {
  switch (action.type) {
    case CREATE_HR_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_HR_DASHBOARD_SUCCESS:
      if (state.HR_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        HR_homeInfo: action.payload
      }
    case CREATE_HR_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const BranchManager_dashboardReducer = (state = BranchManager_initialState, action) => {
  switch (action.type) {
    case CREATE_BRANCH_MANAGER_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_BRANCH_MANAGER_DASHBOARD_SUCCESS:
      if (state.BranchManager_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        BranchManager_homeInfo: action.payload
      }
    case CREATE_BRANCH_MANAGER_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Technician_dashboardReducer = (state = Technician_initialState, action) => {
  switch (action.type) {
    case CREATE_TECHNICIAN_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_TECHNICIAN_DASHBOARD_SUCCESS:
      if (state.Technician_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        Technician_homeInfo: action.payload
      }
    case CREATE_TECHNICIAN_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SubdealerStaff_dashboardReducer = (state = SubdealerStaff_initialState, action) => {
  switch (action.type) {
    case CREATE_SUBDEALER_STAFF_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_SUBDEALER_STAFF_DASHBOARD_SUCCESS:
      if (state.SubdealerStaff_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        SubdealerStaff_homeInfo: action.payload
      }
    case CREATE_SUBDEALER_STAFF_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SalesMen_dashboardReducer = (state = SalesMen_initialState, action) => {
  switch (action.type) {
    case CREATE_SALES_MEN_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case CREATE_SALES_MEN_DASHBOARD_SUCCESS:
      if (state.SalesMen_homeInfo === action.payload) {
        return state;  // No state change if the array is the same
      }
      return {
        ...state,
        loading: false,
        SalesMen_homeInfo: action.payload
      }
    case CREATE_SALES_MEN_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
