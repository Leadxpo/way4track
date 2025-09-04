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
    CREATE_SALES_VISITS_DASHBOARD_REQUEST,
    CREATE_SALES_VISITS_DASHBOARD_SUCCESS,
    CREATE_SALES_VISITS_DASHBOARD_FAIL,
    CREATE_SUBDEALER_STAFF_DASHBOARD_REQUEST,
    CREATE_SUBDEALER_STAFF_DASHBOARD_SUCCESS,
    CREATE_SUBDEALER_STAFF_DASHBOARD_FAIL,
    CREATE_SALES_MEN_DASHBOARD_REQUEST,
    CREATE_SALES_MEN_DASHBOARD_SUCCESS,
    CREATE_SALES_MEN_DASHBOARD_FAIL,
} from "../Constants/dashboardConstant";

import * as actionTyes from "../Constants/dashboardConstant";
import api from "../../Api/api";

export const intiateCEO_dashboard = (create_CEO_dashboardPayload) => async (dispatch) => {
    const { unitCode, companyCode } = create_CEO_dashboardPayload;
    const currentYear = new Date().getFullYear().toString();
    dispatch({ type: CREATE_CEO_DASHBOARD_REQUEST });
    try {
        // Attempt to fetch CEO_DASHBOARDS
        const productAndServiceSales = await api.post(`/dashboards/getSalesBreakdown`, {companyCode,unitCode,date:currentYear}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const amountData = await api.post(`/dashboards/getAmountDetails`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const saleTable = await api.post(`/dashboards/getSalesForTable`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const payableTable = await api.post(`/dashboards/getPayableAmountForTable`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const receivableTable = await api.post(`/dashboards/getReceivableAmountForTable`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const purchaseData = await api.post(`/dashboards/getPurchaseData`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const solidLiquidData = await api.post(`/dashboards/getSolidLiquidCash`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const branchWiseSolidLiquidCash = await api.post(`/dashboards/getBranchWiseSolidLiquidCash`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const TotalProductAndServiceSales = await api.post(`/dashboards/getTotalProductAndServiceSales`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const monthWiseBalanceData = await api.post(`/dashboards/getBranchWiseMonthlySales`, {companyCode,unitCode,date:currentYear}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const branchWiseYearlySales = await api.post(`/dashboards/getBranchWiseYearlySales`, {companyCode,unitCode,date:currentYear}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const purchaseCount = await api.post(`/dashboards/getPurchaseCount`, create_CEO_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const dashboardData = {
            ProductAndServiceSales: productAndServiceSales.data.data,
            monthWiseBalance: monthWiseBalanceData.data.data,
            solidLiquid: solidLiquidData.data.data,
            branchWiseSolidLiquidCash: branchWiseSolidLiquidCash.data.data,
            amountDetails: amountData.data.data,
            PurchaseCount: purchaseCount.data.data,
            saleTable: saleTable.data.data,
            payableTable: payableTable.data.data,
            receivableTable: receivableTable.data.data,
            TotalProductAndServiceSales: TotalProductAndServiceSales.data.data,
            branchWiseYearlySales: branchWiseYearlySales.data.data,
            purchaseData: purchaseData.data.data,
            // ProductTypeCreditAndDebitPercentages: ProductTypeCreditAndDebitPercentages.data.data,
        }
console.log("rrr :",dashboardData);
        dispatch({ type: CREATE_CEO_DASHBOARD_SUCCESS, payload: dashboardData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_CEO_DASHBOARD_FAIL, payload: error.message });
    }
};

export const intiateWarhouse_dashboard = (create_Warhouse_dashboardPayload) => async (dispatch) => {
    const { id, unitCode, companyCode } = create_Warhouse_dashboardPayload;
    dispatch({ type: CREATE_WAREHOUSE_MANAGER_DASHBOARD_REQUEST });
    try {
        // Attempt to fetch CEO_DASHBOARDS
        const requestData = await api.post(`/requests/getTodayRequestBranchWise`, create_Warhouse_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const productByBranch = await api.post(`/dashboards/getProductDetailsByBranch`, create_Warhouse_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const dashboardWarehouseData = {
            requestData: requestData.data.data,
            productByBranch: productByBranch.data.data
        }
        dispatch({ type: CREATE_WAREHOUSE_MANAGER_DASHBOARD_SUCCESS, payload: dashboardWarehouseData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_WAREHOUSE_MANAGER_DASHBOARD_FAIL, payload: error.message });
    }
};

export const intiateHR_dashboard = (create_HR_dashboardPayload) => async (dispatch) => {
    const { id, unitCode, companyCode } = create_HR_dashboardPayload;
    dispatch({ type: CREATE_HR_DASHBOARD_REQUEST });
    try {
        // Attempt to fetch CEO_DASHBOARDS
        const staffCountByBranchData = await api.post(`/dashboards/getTotalStaffDetails`, create_HR_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch({ type: CREATE_HR_DASHBOARD_SUCCESS, payload: staffCountByBranchData.data.data });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_HR_DASHBOARD_FAIL, payload: error.message });
    }
};

export const intiateBranchManager_dashboard = (create_BranchManager_dashboardPayload) => async (dispatch) => {
    const { id, unitCode, companyCode, branchName, branch } = create_BranchManager_dashboardPayload;
    dispatch({ type: CREATE_BRANCH_MANAGER_DASHBOARD_REQUEST });
    try {
        // Attempt to fetch CEO_DASHBOARDS
        const CreditAndDebitPercentages = await api.post(`/dashboards/getLast30DaysCreditAndDebitPercentages`, create_BranchManager_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
console.log("CreditAndDebitPercentages :",CreditAndDebitPercentages.data)
        const productByBranch = await api.post(`/products/getProductDetailsByBranch`, create_BranchManager_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("productByBranch :",productByBranch)
        const totalStaff = await api.post(`/dashboards/getTotalStaffDetails`, create_BranchManager_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const assertCard = await api.post(`/dashboards/assertsCardData`, create_BranchManager_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("assertCard :",assertCard.data)

        const dashboardBranchManagerData = {
            CreditAndDebitPercentages: CreditAndDebitPercentages.data.data,
            productByBranch: productByBranch.data.data,
            totalStaff: totalStaff.data.data,
            assertCard: assertCard.data.data
        }
        console.log("dashboardBranchManagerData :",dashboardBranchManagerData)
        dispatch({ type: CREATE_BRANCH_MANAGER_DASHBOARD_SUCCESS, payload: dashboardBranchManagerData });
    } catch (error) {
        console.log("error : ", error)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_BRANCH_MANAGER_DASHBOARD_FAIL, payload: error.message });
    }
};

export const intiateTechnician_dashboard = (create_Technician_dashboardPayload) => async (dispatch) => {
    dispatch({ type: CREATE_TECHNICIAN_DASHBOARD_REQUEST });
    try {
        const { data } = await api.post(
            `/technician/getStaffWorkAllocation`,
            create_Technician_dashboardPayload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const totalWorkAllocation = data.data || [];
        const installWorks = totalWorkAllocation.filter(item => item.workStatus === "install");
        const acceptWorks = totalWorkAllocation.filter(item => item.workStatus === "accept");
        const activateWorks = totalWorkAllocation.filter(item => item.workStatus === "activate");
        const paymentPendingWorks = totalWorkAllocation.filter(item => item.paymentStatus === "PENDING" && item.workStatus === "activate");
        const paymentDonedWorks = totalWorkAllocation.filter(item => item.paymentStatus === "COMPLETED" && item.workStatus === "activate");

        const totalPendingAndSucessTickets = await api.post(`/tickets/getTotalPendingAndSucessTickets`, create_Technician_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const dashboardTechnicianData = {
            installWorks: installWorks.length,
            acceptWorks: acceptWorks.length,
            activateWorks: activateWorks.length,
            paymentPendingWorks: paymentPendingWorks.length,
            paymentDonedWorks: paymentDonedWorks.length,
            totalPendingAndSucessTickets: totalPendingAndSucessTickets.data.data,
        }
        dispatch({ type: CREATE_TECHNICIAN_DASHBOARD_SUCCESS, payload: dashboardTechnicianData });
    } catch (error) {
        console.log("error : ", error.message)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_TECHNICIAN_DASHBOARD_FAIL, payload: error.message });
    }
};
export const intiateSalesVisit_dashboard = (create_SalesVisit_dashboardPayload) => async (dispatch) => {

    dispatch({ type: CREATE_SALES_MEN_DASHBOARD_REQUEST });
    try {
        const { data } = await api.post(
            `/sales-works/getSalesSearchDetails`,
            create_SalesVisit_dashboardPayload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const rrr=data?.data.filter((item)=>{
           return (Number(item.staffId)===Number(create_SalesVisit_dashboardPayload.StaffId))
        })
        const totalLeads = rrr || [];
        const pendingLeads = totalLeads?.filter(item => item.leadStatus === "pending");
        const allocatedLeads = totalLeads?.filter(item => item.leadStatus === "allocated");
        const pendingPaymentLeads = totalLeads?.filter(item => item.leadStatus === "paymentPending");
        const partiallyPaymentLeads = totalLeads?.filter(item => item.leadStatus === "partiallyPaid");
        const completedLeads = totalLeads?.filter(item => item.leadStatus === "completed");

        const totalPendingAndSuccessTickets = await api.post(`/tickets/getTotalPendingAndSucessTickets`, create_SalesVisit_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const dashboardSalesVisitData = {
            totalLeadsData: totalLeads,
            pendingLeads: pendingLeads.length,
            allocatedLeads: allocatedLeads.length,
            pendingPaymentLeads: pendingPaymentLeads.length,
            partiallyPaymentLeads: partiallyPaymentLeads.length,
            completedLeads: completedLeads.length,
            totalPendingAndSuccessTickets: totalPendingAndSuccessTickets.data.data,
        }

        dispatch({ type: CREATE_SALES_MEN_DASHBOARD_SUCCESS, payload: dashboardSalesVisitData });
    } catch (error) {
        console.log("error : ", error.message)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_SALES_MEN_DASHBOARD_FAIL, payload: error.message });
    }
};

export const intiateSubDealerStaff_dashboard = (create_subdealerStaff_dashboardPayload) => async (dispatch) => {
    const {subdealerId,subDealerStaffId}=create_subdealerStaff_dashboardPayload
    dispatch({ type: CREATE_SUBDEALER_STAFF_DASHBOARD_REQUEST });
    try {
        const { data } = await api.post(
            `/technician/getBackendSupportWorkAllocation`,
            create_subdealerStaff_dashboardPayload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        const totalWorkAllocation = data.data.filter(item =>item.subDealerStaffId === subDealerStaffId) || [];  
        const installWorks = totalWorkAllocation?.filter(item => item.workStatus === "install");
        const acceptWorks = totalWorkAllocation?.filter(item => item.workStatus === "accept");
        const activateWorks = totalWorkAllocation?.filter(item => item.workStatus === "activate");
        const paymentPendingWorks = totalWorkAllocation?.filter(item => item.paymentStatus === "PENDING" && item.workStatus === "activate");
        const paymentDonedWorks = totalWorkAllocation?.filter(item => item.paymentStatus === "COMPLETED" && item.workStatus === "activate");

        const totalPendingAndSucessTickets = await api.post(`/tickets/getTotalPendingAndSucessTickets`, create_subdealerStaff_dashboardPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const dashboardTechnicianData = {
            installWorks: installWorks.length,
            acceptWorks: acceptWorks.length,
            activateWorks: activateWorks.length,
            paymentPendingWorks: paymentPendingWorks.length,
            paymentDonedWorks: paymentDonedWorks.length,
            totalPendingAndSucessTickets: totalPendingAndSucessTickets.data.data,
            totalSubdealerStaffWork:totalWorkAllocation
        }
        dispatch({ type: CREATE_SUBDEALER_STAFF_DASHBOARD_SUCCESS, payload: dashboardTechnicianData });
    } catch (error) {
        console.log("error : ", error.message)
        // If the error status is 500, try refreshing the token
        // Handle other types of errors
        dispatch({ type: CREATE_SUBDEALER_STAFF_DASHBOARD_FAIL, payload: error.message });
    }
};

