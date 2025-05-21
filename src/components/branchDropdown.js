import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesDropDown } from '../Redux/Actions/branchAction'; // adjust path if needed


const BranchesDropdown = ({ dropdownStyles, branchName, onBranchChange }) => {
    const dispatch = useDispatch();
    const [openBranchDropdown, setOpenBranchDropdown] = useState(false);
    const [branchId, setBranchId] = useState(null);
    const { branchesDropdown, isLoading, error } = useSelector(state => state.branchesDropdownReducer);

    useEffect(() => {
        const branchDropdownPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
        dispatch(fetchBranchesDropDown(branchDropdownPayload));
    }, [dispatch]);

    const renderDropdown = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (error) {
            return <Text style={{ color: 'red' }}>Error: {error}</Text>;
        }

        return (
            <DropDownPicker
                open={openBranchDropdown}
                value={branchId}
                items={branchesDropdown}
                setOpen={setOpenBranchDropdown}
                setValue={(value) => {
                    setBranchId(value); // Update local branchId
                }}
                onChangeValue={(value) => {
                    setBranchId(value); // Update local branchId
                    const selectedBranch = branchesDropdown.find(branch => branch.value === value);
                    if (selectedBranch) {
                        branchName(selectedBranch.label); // Set branch name
                    }
                }}
                placeholder="Select Branch"
                placeholderStyle={{ color: "#aaaaaa" }}
                style={[
                    dropdownStyles.input,
                    { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
                ]}
                dropDownContainerStyle={{
                    alignSelf: "center",
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    borderRadius: 8,
                }}
                listMode="MODAL" // Use MODAL mode for better UX
                modalAnimationType="slide" // Modal animation
                closeOnBackPressed={true} // Close modal on back button press
                modalProps={{
                    animationType: "slide", // Keep the slide effect
                }}
                modalContentContainerStyle={{
                    marginVertical: 100, // Center the modal in the screen
                    marginHorizontal: 30,
                    width: "90%", // Modal width
                    height: 200, // Modal height
                    backgroundColor: "#ffffff", // Modal background
                    padding: 20,
                    borderRadius: 12,
                    elevation: 5, // Add shadow for Android
                    shadowColor: "#000", // Shadow color for iOS
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
                modalTitle="Select Branch " // Optional: Custom modal title
            />
        );
    };

    useEffect(() => {
        if (branchId !== null) {
            onBranchChange(branchId);
        }
    }, [branchId, onBranchChange]);

    return (
        <View style={styles.container}>
            {renderDropdown()}
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

export default BranchesDropdown;
