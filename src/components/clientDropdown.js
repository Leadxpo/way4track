import React, { useState, useEffect,useMemo,useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, fetchClientsDropDown } from '../Redux/Actions/clientAction'; // adjust path if needed

const ClientDropdown = ({ dropdownStyles,clientId, onClientChange }) => {
    const dispatch = useDispatch();
    const [openClientDropdown, setOpenClientDropdown] = useState(false);
    const { clientsDropdown, isLoading, error } = useSelector(state => state.clientsDropdownReducer);
  
    useEffect(() => {
        const clientDropdownPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
        dispatch(fetchClientsDropDown(clientDropdownPayload));
    }, [dispatch]);

    const dropdownItems = useMemo(() => {
        return clientsDropdown
          .filter((client) => client.clientId) // Ensure valid client IDs
          .map((client) => ({
            label: client.name || "Unnamed Client",
            value: client.clientId, // Store only clientId to avoid unnecessary re-renders
          }));
      }, [clientsDropdown]);

     
      // Callback to handle client selection
      const handleClientChange = useCallback((value) => {
        const selectedClient = clientsDropdown.find(item => item.clientId === value);
        if (selectedClient) {
            onClientChange?.(selectedClient);  // Update parent component
        }
    }, [onClientChange, clientsDropdown]);
    

    const renderDropdown = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (error) {
            return <Text style={{ color: 'red' }}>Error: {error}</Text>;
        }



        return (
            <DropDownPicker
                open={openClientDropdown}
                value={clientId}
                items={dropdownItems}
                setOpen={setOpenClientDropdown}
                setValue={(callback) => {
                  const newValue = callback();
                  handleClientChange(newValue);  // Ensure proper state update
              }}
                // onChangeValue={(val) => handleClientChange(val)}
                placeholder="Select Client"
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
                    padding: 20,
                    width: "90%", // Modal width
                    height: 200, // Modal height
                    backgroundColor: "#ffffff", // Modal background 
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
                  modalTitle="Select Clients" // Optional: Custom modal title
            />
        );
    };


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

export default ClientDropdown;
