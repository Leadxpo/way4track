import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubdealers, fetchSubdealersDropDown } from '../Redux/Actions/subdealerAction'; // adjust path if needed

const SubdealerDropdown = ({ dropdownStyles, onSubdealerChange }) => {
    const dispatch = useDispatch();
    const [openSubdealerDropdown, setOpenSubdealerDropdown] = useState(false);
    const [subdealerId, setSubdealerId] = useState(null);
    const { subdealersDropdown, isLoading, error } = useSelector(state => state.subdealersDropdownReducer);
    
    useEffect(() => {
        const subdealerDropdownPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
        dispatch(fetchSubdealersDropDown(subdealerDropdownPayload));
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
                open={openSubdealerDropdown}
                value={subdealerId}
                items={subdealersDropdown}
                setOpen={setOpenSubdealerDropdown}
                setValue={(value) => {
                    setSubdealerId(value); // Update local subdealerId
                }}
                placeholder="Select Subdealer"
                placeholderStyle={{color:"#aaaaaa"}}
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
                    // transparent: true, // Modal with transparency
                    animationType: "slide", // Fade effect for smooth appearance
                  }}
                  modalContentContainerStyle={{
                    marginVertical: 100, // Center the modal in the screen
                    marginHorizontal:30,
                    padding: 20,height: 200, // Set a fixed height for the modal
                    backgroundColor: "#ffffff", // Modal background color
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
                  modalTitle="Select Subdealers" // Optional: Custom modal title
            />
        );
    };


    useEffect(() => {
        if (subdealerId !== null) {
          onSubdealerChange(subdealerId);
        }
      }, [subdealerId, onSubdealerChange]);

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

export default SubdealerDropdown;
