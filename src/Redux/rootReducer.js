// rootReducer.js
import { combineReducers } from 'redux';
import { analysisDetailReducer, analysisReducer } from './Reducers/analysisReducer'; // Import analysis
import { appointmentDetailReducer, appointmentsReducer, createAppointmentReducer, deleteAppointmentReducer, updateAppointmentReducer } from './Reducers/appointmentReducer'; // Import application
import { assertDetailReducer, assertsReducer, createAssertReducer, deleteAssertReducer, updateAssertReducer } from './Reducers/assertReducer'; // Import application
import { branchDetailReducer, branchProductReducer, branchesReducer, createbranchReducer, deletebranchReducer, updatebranchReducer, branchesDropdownReducer } from './Reducers/branchReducer'; // Import userLoginReducer
import { bankAccountDetailReducer, bankAccountsDropdownReducer, bankAccountsReducer, createbankAccountReducer, deletebankAccountReducer, updatebankAccountReducer } from './Reducers/bankAccountReducer'; // Import userLoginReducer
import { categorysReducer, categoryProductReducer, categoryDetailReducer } from './Reducers/categoryReducer'; // Import category Reducer
import { clientDetailReducer, clientsDropdownReducer, clientsReducer, createClientsReducer, deleteClientReducer, updateClientReducer, } from './Reducers/clientReducer'; // Import client Reducer
import { drawReducer } from './Reducers/drawReducer'; // Import drawmenu Reducer 
import { deviceInstallReducer,uploadDeviceInstallReducer } from './Reducers/deviceInstallReducer'; // Import drawmenu Reducer
import { CEO_dashboardReducer,WarehouseManager_dashboardReducer,BranchManager_dashboardReducer,HR_dashboardReducer,SubdealerStaff_dashboardReducer,SalesMen_dashboardReducer,Technician_dashboardReducer, } from './Reducers/dashboardReducer'; // Import drawmenu Reducer
import { createEstimatesReducer, createInvoiceReducer, createRecieptReducer, deleteEstimateReducer, estimateDetailReducer, estimatesReducer, invoicesReducer, recieptsReducer, updateEstimateReducer, } from './Reducers/estimateReducer'; // Import estimation Reducer
import { createHiringsReducer, deleteHiringReducer, hiringDetailReducer, hiringsReducer, updateHiringReducer } from './Reducers/hiringReducer'; // Import hiring Reducer
import { staffLoginReducer } from './Reducers/loginReducer'; // Import userLoginReducer
import { salesVisitReducer,uploadSalesVisitReducer} from './Reducers/salesVisitReducer'; // Import drawmenu Reducer
import { notificationReducer, singleNotificationReducer } from './Reducers/notificationReducer'; // Import notification Reducer
import { productsReducer, productDetailReducer, updateProductReducer, createProductsReducer, deleteProductReducer, productsDropdownReducer } from './Reducers/productReducer'; // Import product Reducer
import { createProductAssignsReducer,deleteProductAssignReducer,productAssignDetailReducer,productAssignsReducer,updateProductAssignReducer} from './Reducers/productAssignReducer'; // Import product Reducer
import { createRaiseRequestsReducer, deleteRaiseRequestReducer, raiseRequestDetailReducer, raiseRequestsReducer, updateRaiseRequestReducer } from './Reducers/raiseRequestReducer'; // Import raiserequest Reducer
import { createReportsReducer, reportsReducer } from './Reducers/reportReducer'; // Import raiserequest Reducer
import { staffReducer, staffDetailReducer, updateStaffReducer, deleteStaffReducer, createStaffReducer, staffsDropdownReducer,permissionStaffReducer,updatePermissionStaffReducer } from './Reducers/staffReducer'; // Import staff Reducer
import { createSubdealersReducer, deleteSubdealerReducer, subdealerDetailReducer, subdealersDropdownReducer, subdealersReducer, updateSubdealerReducer } from './Reducers/subDealerReducer'; // Import subdealer Reducer
import { createTechnicianWorksReducer,deleteTechnicianWorkReducer,technicianWorkDetailReducer,technicianWorksReducer,updateTechnicianWorkReducer } from './Reducers/technicianWorkReducer'; // Import subdealer Reducer
import { createTicketReducer, deleteTicketReducer, ticketDetailReducer, ticketReducer, updateTicketReducer } from './Reducers/ticketReducer'; // Import subdealer Reducer
import { createVendorReducer, deleteVendorReducer, updateVendorReducer, vendorDetailReducer, vendorsDropdownReducer, vendorsReducer } from './Reducers/vendorReducer'; // Import vendor Reducer
import { createVouchersReducer, deleteVoucherReducer, updateVoucherReducer, voucherDetailReducer, voucher_daybookReducer, voucher_ledgerReducer, voucher_paymentsReducer, voucher_purchasesReducer, voucher_recieptReducer, vouchersReducer } from './Reducers/voucherReducer'; // Import vendor Reducer
import { createWorkAllocationsReducer, deleteWorkAllocationReducer, updateWorkAllocationReducer, workAllocationDetailReducer, workAllocationsReducer } from './Reducers/workAllocationReducer'; // Import workAllocation Reducer
// Combine reducers and assign them to keys
const rootReducer = combineReducers({
  appointmentDetailReducer: appointmentDetailReducer,
  appointmentsReducer: appointmentsReducer,
  createAppointmentReducer: createAppointmentReducer,
  deleateAppointmentReducer: deleteAppointmentReducer,
  updateAppointmentReducer: updateAppointmentReducer,
  assertDetailReducer: assertDetailReducer,
  assertsReducer: assertsReducer,
  createAssertReducer: createAssertReducer,
  deleateAssertReducer: deleteAssertReducer,
  updateAssertReducer: updateAssertReducer,
  branchDetailReducer: branchDetailReducer,
  branchProductReducer: branchProductReducer,
  branchesReducer: branchesReducer,
  branchesDropdownReducer: branchesDropdownReducer,
  createbranchsReducer: createbranchReducer,
  deletebranchReducer: deletebranchReducer,
  updatebranchReducer: updatebranchReducer,
  bankAccountDetailReducer: bankAccountDetailReducer,
  bankAccountsReducer: bankAccountsReducer,
  bankAccountsDropdownReducer: bankAccountsDropdownReducer,
  createbankAccountsReducer: createbankAccountReducer,
  deletebankAccountReducer: deletebankAccountReducer,
  updatebankAccountReducer: updatebankAccountReducer,
  clients: clientsReducer, // The key 'clients' must match the state selector used
  clientDetails: clientDetailReducer,  // The key 'clients' must match the state selector used
  addClient: createClientsReducer, // The key 'staffs' must match the state selector used
  updateClientDetails: updateClientReducer,  // The key 'staffs' must match the state selector used
  clientsDropdownReducer: clientsDropdownReducer,  // The key 'staffs' must match the state selector used
  deleteClientStatus: deleteClientReducer, // The key 'staffs' must match the state selector used
  CEO_homeInfoReducer: CEO_dashboardReducer, // The key 'staffs' must match the state selector used
  WarehouseManager_homeInfoReducer: WarehouseManager_dashboardReducer, // The key 'staffs' must match the state selector used
  HR_homeInfoReducer: HR_dashboardReducer, // The key 'staffs' must match the state selector used
  BranchManager_homeInfoReducer: BranchManager_dashboardReducer, // The key 'staffs' must match the state selector used
  Technician_homeInfoReducer: Technician_dashboardReducer, // The key 'staffs' must match the state selector used
  SubdealerStaff_homeInfoReducer: SubdealerStaff_dashboardReducer, // The key 'staffs' must match the state selector used
  SalesMen_homeInfoReducer: SalesMen_dashboardReducer, // The key 'staffs' must match the state selector used
  deviceInstallReducer: deviceInstallReducer,
  uploadDeviceInstallReducer: uploadDeviceInstallReducer,
  estimateDetailReducer: estimateDetailReducer,
  estimatesReducer: estimatesReducer,
  invoicesReducer: invoicesReducer,
  recieptsReducer: recieptsReducer,
  createestimatesReducer: createEstimatesReducer,
  deleteestimateReducer: deleteEstimateReducer,
  updateestimateReducer: updateEstimateReducer,
  hiringDetailReducer: hiringDetailReducer,
  hiringsReducer: hiringsReducer,
  createHiringsReducer: createHiringsReducer,
  deleteHiringReducer: deleteHiringReducer, 
  updateHiringReducer: updateHiringReducer,
  raiserequests: raiseRequestsReducer, // The key 'Requests' must match the state selector used
  requestDetails: raiseRequestDetailReducer,  // The key 'Requests' must match the state selector used
  addRequests: createRaiseRequestsReducer, // The key 'Requests' must match the state selector used
  updateRequests: updateRaiseRequestReducer, // The key 'Requests' must match the state selector used
  deleteRequestStatus: deleteRaiseRequestReducer, // The key 'staffs' must match the state selector used
  salesVistReducer: salesVisitReducer,
  uploadSalesVistReducer: uploadSalesVisitReducer,
  selectedDrawLabel: drawReducer,  // The key 'drawer menu' must match the state selector used
  staffLogin: staffLoginReducer,  // The key 'staffLogin' must match the state selector used
  staffs: staffReducer, // The key 'staffs' must match the state selector used
  staffDetails: staffDetailReducer,  // The key 'staffs' must match the state selector used
  addStaffs: createStaffReducer, // The key 'staffs' must match the state selector used
  updateStaffs: updateStaffReducer, // The key 'staffs' must match the state selector used
  staffsDropdownReducer: staffsDropdownReducer, // The key 'staffs' must match the state selector used
  deleteStaffStatus: deleteStaffReducer, // The key 'staffs' must match the state selector used
  permissionStaff: permissionStaffReducer, // The key 'staffs' must match the state selector used
  updatePermissionStaff: updatePermissionStaffReducer, // The key 'staffs' must match the state selector used
  subdealers: subdealersReducer, // The key 'subdealers' must match the state selector used
  subdealerDetails: subdealerDetailReducer,  // The key 'subdealers' must match the state selector used
  addSubdelear: createSubdealersReducer, // The key 'staffs' must match the state selector used
  updateSubdelearDetails: updateSubdealerReducer,  // The key 'staffs' must match the state selector used
  subdealersDropdownReducer: subdealersDropdownReducer,  // The key 'staffs' must match the state selector used
  deleteSubdelearStatus: deleteSubdealerReducer, // The key 'staffs' must match the state selector used
  ticketsReducer: ticketReducer, // The key 'tickets' must match the state selector used
  ticketDetails: ticketDetailReducer,  // The key 'tickets' must match the state selector used
  addTicket: createTicketReducer, // The key 'staffs' must match the state selector used
  updateTicketDetails: updateTicketReducer,  // The key 'staffs' must match the state selector used
  deleteTicketStatus: deleteTicketReducer, // The key 'staffs' must match the state selector used
  techWorksReducer: technicianWorksReducer, // The key 'techWorks' must match the state selector used
  techWorkDetails: technicianWorkDetailReducer,  // The key 'techWorks' must match the state selector used
  addTechWork: createTechnicianWorksReducer, // The key 'staffs' must match the state selector used
  updateTechWorkDetails: updateTechnicianWorkReducer,  // The key 'staffs' must match the state selector used
  deleteTechWorkStatus: deleteTechnicianWorkReducer, // The key 'staffs' must match the state selector used
  products: productsReducer,  // The key 'product' must match the state selector used
  productInfo: productDetailReducer,  // The key 'product' must match the state selector used
  productUpdate: updateProductReducer,  // The key 'product' must match the state selector used
  productsDropdownReducer: productsDropdownReducer,  // The key 'staffs' must match the state selector used
  productAssigns: productAssignsReducer,  // The key 'productAssign' must match the state selector used
  addProductAssigns: createProductAssignsReducer,  // The key 'productAssign' must match the state selector used
  productAssignInfo: productAssignDetailReducer,  // The key 'productAssign' must match the state selector used
  updateProductAssign: updateProductAssignReducer,  // The key 'productAssign' must match the state selector used
  categorys: categorysReducer,  // The key 'categorys' must match the state selector used
  categoryProducts: categoryProductReducer,  // The key 'categorys' must match the state selector used
  categoryDetails: categoryDetailReducer,  // The key 'categorys' must match the state selector used
  notifications: notificationReducer,  // The key 'notification' must match the state selector used
  notificationDetails: singleNotificationReducer,  // The key 'notification' must match the state selector used
  vendors: vendorsReducer, // The key 'vendors' must match the state selector used
  vendorDetails: vendorDetailReducer,  // The key 'vendors' must match the state selector used
  addVendor: createVendorReducer, // The key 'staffs' must match the state selector used
  updateVendorDetails: updateVendorReducer,  // The key 'staffs' must match the state selector used
  vendorsDropdownReducer: vendorsDropdownReducer,  // The key 'staffs' must match the state selector used
  deleteVendorStatus: deleteVendorReducer, // The key 'staffs' must match the state selector used
  vouchersReducers: vouchersReducer, // The key 'vouchers' must match the state selector used
  voucherDetails: voucherDetailReducer,  // The key 'vouchers' must match the state selector used
  addVoucher: createVouchersReducer, // The key 'staffs' must match the state selector used
  updateVoucherDetails: updateVoucherReducer,  // The key 'staffs' must match the state selector used
  voucher_daybookReducer: voucher_daybookReducer,  // The key 'staffs' must match the state selector used
  voucher_ledgerReducer: voucher_ledgerReducer,  // The key 'staffs' must match the state selector used
  voucher_paymentsReducer: voucher_paymentsReducer,  // The key 'staffs' must match the state selector used
  voucher_purchasesReducer: voucher_purchasesReducer,  // The key 'staffs' must match the state selector used
  voucher_recieptReducer: voucher_recieptReducer,  // The key 'staffs' must match the state selector used
  deleteVoucherStatus: deleteVoucherReducer, // The key 'staffs' must match the state selector used
  workAllocations: workAllocationsReducer, // The key 'workAllocations' must match the state selector used
  workAllocationDetails: workAllocationDetailReducer,  // The key 'workAllocations' must match the state selector used
  addWorkAllocation: createWorkAllocationsReducer, // The key 'staffs' must match the state selector used
  updateWorkAllocationDetails: updateWorkAllocationReducer,  // The key 'staffs' must match the state selector used
  deleteWorkAllocationStatus: deleteWorkAllocationReducer, // The key 'staffs' must match the state selector used 


});

export default rootReducer;
