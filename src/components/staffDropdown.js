import React, { useState, useEffect,useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffsDropDown } from '../Redux/Actions/staffAction';

const StaffDropdown = ({ dropdownStyles, staffRole, branchId, staffPlaceHolder, onStaffChange }) => {
    const dispatch = useDispatch();
    const [openStaffDropdown, setOpenStaffDropdown] = useState(false);
    const [staffId, setStaffId] = useState(null);
    // Fetch staff data from Redux store
    const { staffsDropdown, isLoading, error } = useSelector(state => state.staffsDropdownReducer);

    // Fetch dropdown data only once when component mounts
    useEffect(() => {
        dispatch(fetchStaffsDropDown({ companyCode: "WAY4TRACK", unitCode: "WAY4" }));
    }, [dispatch]);    

    // **Filter staff based on `staffRole` and `branchId` props**
    const filteredStaffs = useMemo(() => {
        return staffsDropdown.filter(staff => {
            const isCEO = staffRole?.toLowerCase() === "ceo";
            const isBranchAll = branchId?.toString().toLowerCase() === "0";
    
            const matchesRole = staffRole ? staff.designation?.toLowerCase() === staffRole.toLowerCase() : true;
            const matchesBranch = branchId ? staff.branch?.id?.toString() === branchId.toString() : true;
    
            // Show all staff if role is CEO
            if (isCEO) return true;
            
            // Show staff matching role if branchId is "All"
            if (isBranchAll) return matchesRole;
    
            // Otherwise, filter based on both role and branchId
            return matchesRole && matchesBranch;
        });
    }, [staffsDropdown, staffRole, branchId]); // Recompute when dependencies change
    

    // Convert filtered staff data to dropdown format
    const dropdownItems = useMemo(() => {
        return filteredStaffs.map(staff => ({
            label: staff.name,
            value: staff.staffId
        }));
    }, [filteredStaffs]);

    // Handle dropdown value change
    useEffect(() => {
        if (staffId !== null) {
            onStaffChange(staffId);
        }
    }, [staffId, onStaffChange]);

    // Render dropdown with loading and error handling
    return (
        <View style={{ marginVertical: 10 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            ) : (
                <DropDownPicker
                    open={openStaffDropdown}
                    value={staffId}
                    items={dropdownItems} // Filtered staff data
                    setOpen={setOpenStaffDropdown}
                    setValue={setStaffId}
                    placeholder={staffPlaceHolder || "Select Staff"}
                    placeholderStyle={{ color: "#aaaaaa" }}
                    style={[
                        dropdownStyles?.input || {},
                        { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
                    ]}
                    dropDownContainerStyle={{
                        alignSelf: "center",
                        borderColor: "#cccccc",
                        borderWidth: 1,
                        borderRadius: 8,
                    }}
                    listMode="MODAL"
                    modalAnimationType="slide"
                    closeOnBackPressed={true}
                    modalProps={{
                        animationType: "slide",
                    }}
                    modalContentContainerStyle={{
                        marginVertical: 100,
                        marginHorizontal: 30,
                        padding: 20,
                        height: 200,
                        backgroundColor: "#ffffff",
                        borderRadius: 12,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    modalTitleStyle={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333",
                        textAlign: "center",
                        marginBottom: 10,
                    }}
                    modalTitle="Select Staff"
                />
            )}
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: "#f3f3f3", // Change to any background color you prefer
    },
    dropdownList: {
        borderColor: "#ccc",
    },
};

export default StaffDropdown;
