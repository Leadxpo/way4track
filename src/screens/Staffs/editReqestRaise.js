import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Alert, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import BranchesDropdown from '../../components/branchDropdown';
import StaffDropdown from '../../components/staffDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { createRaiseRequest } from "../../Redux/Actions/raiseRequestAction";

const EditRequestRaise = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { loading: raiseRequestInfoLoading, raiseRequestInfo, error: raiseRequestInfoError } = useSelector(state => state.addRequests);
  const { requestDetails } = route.params;  // Sample address data
  const [open, setOpen] = useState(false);
  const [staffRole, setStaffRole] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);
  const [branchID, setBranchID] = useState("");
  const [branchName, setBranchName] = useState("");
  const [dropdownRoles, setDropDownRoles] = useState([
    { label: 'CEO', value: 'CEO' },
    { label: 'HR', value: 'HR' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Warehouse Manager', value: 'Warehouse Manager' },
    { label: 'Branch Manager', value: 'Branch Manager' },
    { label: 'Sub Dealer', value: 'Sub Dealer' },
    { label: 'Technician', value: 'Technician' },
    { label: 'Sales Man', value: 'Sales Man' },
    { label: 'Call Center', value: 'Call Center' },
  ]);

  const [dropdownRequestType, setDropdownRequestType] = useState([
    { label: 'Assert', value: 'Assert' },
    { label: 'Money', value: 'Money' },
    { label: 'Product', value: 'Product' },
  ]);

  // State management for form fields
  const [formData, setFormData] = useState({
    id: '',
    requestType: '',
    // staffID: '',
    requestBY: '',
    requestTo: '',
    description: '',
    createdDate: '',
    branchId: '',
    branchName: '',
    status: '',
    subDealerId: '',
    subDealerName: '',
    companyCode: 'WAY4TRACK',
    unitCode: 'WAY4'
  });



  useEffect(() => {
    const getStaffData = async () => {
      setFormData({
        id:requestDetails.id,
        requestType:requestDetails.requestType,
        // staffID:requestDetails.staffID,
        requestBY:requestDetails.requestBY,
        requestTo:requestDetails.requestTo,
        description:requestDetails.description,
        createdDate:requestDetails.createdDate,
        branchId:requestDetails.branchId,
        branchName:requestDetails.branchName,
        status:requestDetails.status,
        subDealerId:requestDetails.subDealerId,
        subDealerName:requestDetails.subDealerName,
      })
    }

    getStaffData()
  })
  // Error state for validation
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.requestType.trim()) {
      newErrors.requestType = "Request type is required.";
      isValid = false;
    }
    if (!formData.requestBY.trim()) {
      newErrors.requestBY = "Request by is required.";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Request for is required.";
      isValid = false;
    }
    if (!formData.branchId.toString().trim()) {
      newErrors.branchId = "Branch is required.";
      isValid = false;
    }
    if (!formData.requestTo.trim()) {
      newErrors.requestTo = "Request to is required.";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save button handler
  const handleSave = () => {
    if (validateForm()) {
      dispatch(createRaiseRequest(formData))
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          {/* Request Type */}
          <DropDownPicker
            open={requestOpen}
            value={formData.requestType} // The selected role value
            items={dropdownRequestType} // Dropdown items
            setOpen={setRequestOpen} // Toggle the dropdown open state
            setValue={(callback) => setFormData(prev => ({ ...prev, requestType: callback(prev.requestType) }))}
            setItems={setDropdownRequestType} // Update the roles if needed
            dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
            placeholder="Select Request Type"
            placeholderStyle={{ color: "#aaaaaa" }}
            style={[
              styles.input,
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
              marginHorizontal: 30,
              width: "90%", // Modal width
              height: 200, // Modal height
              backgroundColor: "#ffffff", // Modal background
              padding: 20, // Set a fixed height for the modal
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
            modalTitle="Select Staff Role" // Optional: Custom modal title
          />

          {errors.requestType && (
            <Text style={styles.errorText}>{errors.requestType}</Text>
          )}

          {/* Request By */}
          <TextInput
            label="Request By"
            mode="outlined"
            value={formData.requestBY}
            onChangeText={(text) => setFormData(prev => ({ ...prev, requestBY: text }))}
            error={!!errors.requestBY}
            outlineStyle={[styles.input,]}
            style={{ backgroundColor: '#ffffff', marginVertical: 8 }}
          />
          {errors.requestBY && (
            <Text style={styles.errorText}>{errors.requestBY}</Text>
          )}

          {/* Request For */}
          <TextInput
            label="Request For"
            mode="outlined"
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            error={!!errors.description}
            outlineStyle={[styles.input, { height: 100 }]}
            style={{ backgroundColor: '#ffffff', marginVertical: 8, height: 100 }}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <View style={{ marginTop: 8 }}>
            <BranchesDropdown
              dropdownStyles={styles} branchName={setBranchName}
              onBranchChange={(value) => formData.branchId = value}
            />
          </View>

          <DropDownPicker
            open={open}
            value={staffRole} // The selected role value
            items={dropdownRoles} // Dropdown items
            setOpen={setOpen} // Toggle the dropdown open state
            setValue={setStaffRole} // Update the staffRole state
            setItems={setDropDownRoles} // Update the roles if needed
            dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
            placeholder="Select Staff Role"
            placeholderStyle={{ color: "#aaaaaa" }}
            style={[
              styles.input,
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
              marginHorizontal: 30,
              width: "90%", // Modal width
              height: 200, // Modal height
              backgroundColor: "#ffffff", // Modal background
              padding: 20, // Set a fixed height for the modal
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
            modalTitle="Select Staff Role" // Optional: Custom modal title
          />
          {/* Request To */}

          <StaffDropdown
            dropdownStyles={styles}
            branchId={formData.branchId}  // Ensure it's correctly passed
            staffRole={staffRole}
            onStaffChange={(value) => formData.requestTo = value}
            staffPlaceHolder={'Requested To'}
          />

          {errors.requestTo && (
            <Text style={styles.errorText}>{errors.requestTo}</Text>
          )}


          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              buttonColor="#28a745"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => Alert.alert("Cancelled")}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  description: {
    height: 100,
  },
  dropdown: {
    marginBottom: 16,
    borderColor: "#ccc",
  },
  buttonSave: {
    backgroundColor: "#4caf50",
    marginBottom: 8,
  },
  buttonCancel: {
    borderColor: "#000000",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default EditRequestRaise;
