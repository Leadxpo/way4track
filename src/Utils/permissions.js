import { loadData } from "./appData";

export const permission=[
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "branch",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "assets",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "appointments",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "staff",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "client",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "vendor",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "subdealer",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "hiring",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "bank",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "product",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "productassign",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "tickets",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "voucher",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "work-allocation",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "estimate",
        "view": true
    },
    {
        "add": true,
        "delete": true,
        "edit": true,
        "name": "attendance",
        "view": true
    }
]

export const staffDataHook = async () => {
    const role = await loadData('role');
    const staffID = await loadData('staffID');
    const staffName = await loadData('staffName');
    const staffPhoto = await loadData('staffPhoto');
    const phoneNumber = await loadData('phoneNumber');
    const latitude = await loadData('latitude');
    const longitude = await loadData('longitude');
    // const branchId = await loadData('branchId');
    const branchName = await loadData('branchName');
    const staffPermissions = await loadData('staffPermissions');
    return {
        role: role,
        staffID: staffID,
        staffName: staffName,
        staffPhoto: staffPhoto,
        phoneNumber: phoneNumber,
        // branchId: branchId,
        branchName: branchName,
        latitude: latitude,
        longitude: longitude,
        staffPermissions: staffPermissions
    }
}


export const loadStaffData = async () => {
    const staffData = await staffDataHook();
    return staffData;
};

export const getPermissions = async () => {
    const staffData = await staffDataHook();
    return staffData.staffPermissions || [];
};

