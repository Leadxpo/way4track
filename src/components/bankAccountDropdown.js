import React, { useState, useEffect,useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchbankAccountsDropDown } from '../Redux/Actions/bankAccountAction';

const BankAccountsDropdown = ({ dropdownStyles, onBankAccountChange }) => {
    const dispatch = useDispatch();
    const [openBankAccountDropdown, setOpenBankAccountDropdown] = useState(false);
    const [bankAccountId, setBankAccountId] = useState(null);
    const { bankAccountsDropdown, isLoading, error } = useSelector(state => state.bankAccountsDropdownReducer);
    
    useEffect(() => {
        const bankAccountDropdownPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
        dispatch(fetchbankAccountsDropDown(bankAccountDropdownPayload));
    }, [dispatch]);
    
    const dropdownItems = useMemo(() => {
      return bankAccountsDropdown.map(account => ({
          label: account.accountName,
          value: account
      }));
  }, [bankAccountsDropdown]);
  
    const renderDropdown = () => {
       
        return (
            <DropDownPicker
                open={openBankAccountDropdown}
                value={bankAccountId}
                items={dropdownItems}
                setOpen={setOpenBankAccountDropdown}
                setValue={(value) => {
                    setBankAccountId(value); // Update local bankAccountId
                }}
                placeholder="Select BankAccount"
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
                  modalTitle="Select BankAccounts" // Optional: Custom modal title
            />
        );
    };


    useEffect(() => {
        if (bankAccountId !== null) {
          onBankAccountChange(bankAccountId);
        }
      }, [bankAccountId, onBankAccountChange]);

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

export default BankAccountsDropdown;
