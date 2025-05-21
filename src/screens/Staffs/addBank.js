import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import BranchesDropdown from "../../components/branchDropdown";
import { useDispatch, useSelector } from 'react-redux';
import { createBankAccount } from "../../Redux/Actions/bankAccountAction";
import DropDownPicker from 'react-native-dropdown-picker';

const AddBank = ({ navigation }) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [accounbtHolderName, setAccounbtHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [amount, setAmount] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [address, setAddress] = useState("");
  const {addedBankAccount, isLoading, error } = useSelector(state => state.createbankAccountsReducer);
  const [open, setOpen] = useState(false);
  const [bankType, setBankType] = useState("");
  const [ACtype, setACtype] = useState([
    { label: 'Current A/C', value: 'current' },
    { label: 'Savings A/C', value: 'savings' },
  ]);

  const companyCode = "WAY4TRACK";
  const unitCode = "WAY4";

  const handleSave = async () => {

    if (!bankName || !phoneNumber || !branchName || !IFSC || !address || !accountNumber) {
      alert("Please fill in all required fields!");
      return;
    }

    const create_bankPayload = {unitCode, companyCode,name: bankName,accountType: bankType,accountNumber,branchName,ifscCode:IFSC,phoneNumber,address,branchId:1,accountName:accounbtHolderName,totalAmount:amount};
    await dispatch(createBankAccount(create_bankPayload));
    if (addedBankAccount.status) {
      navigation.navigate("Bank");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={'gray'}
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>Accounbt Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={'gray'}
          value={accounbtHolderName}
          onChangeText={setAccounbtHolderName}
        />
         <Text style={styles.label}>A/c Type</Text>
        <DropDownPicker
          open={open}
          value={bankType} // The selected role value
          items={ACtype} // Dropdown items
          setOpen={setOpen} // Toggle the dropdown open state
          setValue={(value) => {
            setBankType(value); // Update the bankType state
          }}
          setItems={setACtype} // Update the ACtype if needed
          placeholder="Select A/c Type"
          containerStyle={{ width: '100%' }}
          style={[styles.input, { alignSelf: "center" }]}
          dropDownContainerStyle={{
            width: "100%",
            alignSelf: "center",
            borderColor: '#cccccc',
            borderWidth: 1,
            borderRadius: 8
          }}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          placeholderTextColor={'gray'}
          keyboardType="phone-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor={'gray'}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text style={styles.label}>Branch Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Branch Name"
          placeholderTextColor={'gray'}
          keyboardType="phone-pad"
          value={branchName}
          onChangeText={setBranchName}
        />

        <Text style={styles.label}>IFSC</Text>
        <TextInput
          style={styles.input}
          placeholder="IFSC COde"
          placeholderTextColor={'gray'}
          value={IFSC}
          onChangeText={setIFSC}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Address"
          placeholderTextColor={'gray'}
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          value={amount}
          onChangeText={setAmount}
        />

      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log("Cancelled")}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>

      {/* Bottom Sheet Modal */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16, paddingBottom: 300
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: "#E0E0E0",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 8, height: 48,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16, marginBottom: 80
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: "#BDBDBD",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    margin: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  modalIcon: {
    marginRight: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#616161",
  },
});

export default AddBank;
