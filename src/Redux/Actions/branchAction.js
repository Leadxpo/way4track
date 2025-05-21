import {
    CREATE_BRANCH_SUCCESS,
    CREATE_BRANCH_REQUEST,
    CREATE_BRANCH_FAIL,
    UPDATE_BRANCH_SUCCESS,
    UPDATE_BRANCH_REQUEST,
    UPDATE_BRANCH_FAIL,
    FETCH_BRANCHES_SUCCESS,
    FETCH_BRANCHES_REQUEST,
    FETCH_BRANCHES_FAIL,
    FETCH_BRANCHES_DROPDOWN_SUCCESS,
    FETCH_BRANCHES_DROPDOWN_REQUEST,
    FETCH_BRANCHES_DROPDOWN_FAIL,
    BRANCH_PRODUCTS_REQUEST,
    BRANCH_PRODUCTS_FAIL,
    BRANCH_PRODUCTS_SUCCESS,
    BRANCH_DETAIL_REQUEST,
    BRANCH_DETAIL_SUCCESS,
    BRANCH_DETAIL_FAIL,
} from "../Constants/branchConstant";

import * as actionTyes from "../Constants/branchConstant";
import api from "../../Api/api";

export const createBranch = (create_branchPayload) => async (dispatch) => {
    const { unitCode, companyCode, branchName, branchNumber, branchAddress, addressLine1, addressLine2, city, state, pincode, branchOpening, branchPhoto, email } = create_branchPayload;
    const createBranchFormData = new FormData();
    createBranchFormData.append("branchName", branchName)
    createBranchFormData.append("branchNumber", branchNumber)
    createBranchFormData.append("branchAddress", branchAddress)
    createBranchFormData.append("addressLine1", addressLine1)
    createBranchFormData.append("addressLine2", addressLine2)
    createBranchFormData.append("city", city)
    createBranchFormData.append("state", state)
    createBranchFormData.append("pincode", pincode)
    createBranchFormData.append("branchOpening", branchOpening)
    createBranchFormData.append("email", email)
    if (branchPhoto) {
        createBranchFormData.append("photo", branchPhoto)
    }
    createBranchFormData.append("companyCode", companyCode)
    createBranchFormData.append("unitCode", unitCode)
    console.log("createBranchFormData : ", createBranchFormData);
    dispatch({ type: CREATE_BRANCH_REQUEST });

    
    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/saveBranchDetails`, createBranchFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: CREATE_BRANCH_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: CREATE_BRANCH_FAIL, payload: error.message });
    }
};

export const updateBranch = (update_branchPayload) => async (dispatch) => {
    const { unitCode, companyCode, id, branchName, branchNumber, branchAddress, addressLine1, addressLine2, city, state, pincode, branchOpening, branchPhoto, email } = update_branchPayload;
    
    const updateBranchFormData = new FormData();
    updateBranchFormData.append("id", id)
    updateBranchFormData.append("branchName", branchName)
    updateBranchFormData.append("branchNumber", branchNumber)
    updateBranchFormData.append("branchAddress", branchAddress)
    updateBranchFormData.append("addressLine1", addressLine1)
    updateBranchFormData.append("addressLine2", addressLine2)
    updateBranchFormData.append("city", city)
    updateBranchFormData.append("state", state)
    updateBranchFormData.append("pincode", pincode)
    updateBranchFormData.append("branchOpening", branchOpening)
    updateBranchFormData.append("email", email)
    if (branchPhoto) {
        updateBranchFormData.append("photo", branchPhoto)
    }
    updateBranchFormData.append("companyCode", companyCode)
    updateBranchFormData.append("unitCode", unitCode)


    dispatch({ type: UPDATE_BRANCH_REQUEST });

    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/saveBranchDetails`, updateBranchFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("updata branch :", data);
        dispatch({ type: UPDATE_BRANCH_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error.message)
        // If the error status is 500, try refreshing the token
        dispatch({ type: UPDATE_BRANCH_FAIL, payload: error.message });
    }
};

export const fetchBranches = (getAll_branchPayload) => async (dispatch) => {
    const { unitCode, companyCode } = getAll_branchPayload;

    dispatch({ type: FETCH_BRANCHES_REQUEST });

    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/getBranchDetails`, getAll_branchPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: FETCH_BRANCHES_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_BRANCHES_FAIL, payload: error.message });
    }
};

export const fetchBranchesDropDown = (branchDropdownPayload) => async (dispatch) => {
    const { unitCode, companyCode } = branchDropdownPayload;
    console.log(unitCode, companyCode);
    dispatch({ type: FETCH_BRANCHES_DROPDOWN_REQUEST });

    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/getBranchNamesDropDown`, branchDropdownPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        const branchesDrpdownData = data.data.map((branch) => ({
            label: branch.branchName,
            value: branch.id,
        }));
        branchesDrpdownData.unshift({
            label: "All",
            value: 0,
        });
        dispatch({ type: FETCH_BRANCHES_DROPDOWN_SUCCESS, payload: branchesDrpdownData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: FETCH_BRANCHES_DROPDOWN_FAIL, payload: error.message });
    }
};

export const productsByBranchId = (get_branchProductsPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_branchProductsPayload;
    dispatch({ type: BRANCH_PRODUCTS_REQUEST })
    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/get-brancheProducts-by-id`, get_branchProductsPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("mainData  success : ", data.data)
        dispatch({ type: BRANCH_PRODUCTS_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: BRANCH_PRODUCTS_FAIL, payload: error.message });
    }
}

export const branchById = (get_branchPayload) => async (dispatch) => {
    const { unitCode, companyCode, id } = get_branchPayload;

    dispatch({ type: BRANCH_DETAIL_REQUEST })
    try {
        // Attempt to fetch branches
        const { data } = await api.post(`/branch/getBranchDetailsById`, get_branchPayload, {
            headers: {

                'Content-Type': 'application/json',
            },
        });
        console.log("mainData  success : ", data.data)
        dispatch({ type: BRANCH_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        dispatch({ type: BRANCH_DETAIL_FAIL, payload: error.message });
    }
}
