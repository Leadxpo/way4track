import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import BranchesDropdown from '../../components/branchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranchesDropDown } from "../../Redux/Actions/branchAction";
import { createStaff } from '../../Redux/Actions/staffAction';
import DropDownPicker from 'react-native-dropdown-picker';

// Mock API Function to Fetch Staff Data by ID branchId
const AddStaff = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [staffRole, setStaffRole] = useState("");
  const [branchID, setBranchID] = useState("");
  const [branchName, setBranchName] = useState("");
  const [roles, setRoles] = useState([
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
  
  const [create_staffPayload, setCreate_staffPayload] = useState({
    name: '',
    password: '',
    phoneNumber: '',
    staffPhoto: null,
    designation: staffRole,
    branchId: branchID,
    dob: '',
    email: '',
    aadharNumber: '',
    address: '',
    joiningDate: '',
    beforeExperience: '',
    basicSalary: '',
    companyCode: "WAY4TRACK", unitCode: "WAY4"
  });

  useEffect(() => {
    setCreate_staffPayload((prev) => ({
      ...prev,
      "designation": staffRole,
      "branchId": branchID
    }));
  }, [staffRole, branchID])

  const [image, setImage] = useState(null);
  const [comfirmPassword, setConfirmPassword] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Handle input change
  const handleInputChange = (field, value) => {
    console.log(field, ": ", value);

    setCreate_staffPayload((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log("create_staffPayload : ", create_staffPayload);
  };

  // Open camera
  const openCamera = () => {
    setBottomSheetVisible(false);
    launchCamera({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload =  {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setCreate_staffPayload((prev) => ({
          ...prev,
          "staffPhoto": imageupload,
        }));
      }
    });
  };

  // Open gallery
  const openGallery = () => {
    setBottomSheetVisible(false);
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload =  {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setCreate_staffPayload((prev) => ({
          ...prev,
          "staffPhoto": imageupload,
        }));
      }
    });
  };

  // Validate form
  const validateForm = () => {
    const { name, password, phoneNumber, designation, branchId, dob, email, aadharNumber, address, joiningDate, beforeExperience, basicSalary, companyCode, unitCode } = create_staffPayload

    if (!name || !phoneNumber || !branchId || !email || !aadharNumber || !basicSalary || !password || !designation || !joiningDate) {
      console.log("name is missing: ", !name, "\n", "phoneNumber is missing: ", !phoneNumber, "\n", "designation is missing: ", !designation, "\n", "branchId is missing: ", !branchId, "\n", "JoiningDate is missing: ", !joiningDate, "\n", "basicSalary is missing: ", !basicSalary, "\n"); Alert.alert('Validation Error', 'All fields are required...');
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Invalid phone phoneNumber format. Use +91 followed by 10 digits.');
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert('Validation Error', 'Invalid Email Address.');
      return false;
    }
    if (!/^\d{4}\s\d{4}\s\d{4}$/.test(aadharNumber)) {
      Alert.alert('Validation Error', 'Aadhar number must be in the format XXXX XXXX XXXX.');
      return false;
    }

    if (password.trim() !== comfirmPassword.trim()) {
      console.log(password, ":", comfirmPassword);
      Alert.alert("Not Matched")
      return false;
    }
    return true;
  };

  // Save functionality
  const handleSave = () => {
    if (validateForm()) {
      dispatch(createStaff(create_staffPayload))
    }
  };

  const handleAdharInputChange = (field, value) => {
    // Remove any non-digit characters
    const formattedValue = value.replace(/\D/g, '');

    // Limit the input to 12 digits
    if (formattedValue.length > 12) {
      return;
    }

    // Format the value with spaces after every 4 digits
    const formatted = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Update the state or handle the input change (e.g., setCreateStaffPayload)
    setCreate_staffPayload((prev) => ({
      ...prev,
      [field]: formatted,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Form */}
      <View style={styles.form}>
        {/* Image Picker */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
            <Image source={
              image ? { uri: image } : require('../../utilities/images/way4tracklogo.png')
            } style={styles.image} />
          </TouchableOpacity>
          <Button mode="outlined" onPress={() => setBottomSheetVisible(true)} style={styles.addPhotoButton}>
            Change Photo
          </Button>
        </View>

        {/* Text Inputs */}
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={create_staffPayload.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <DropDownPicker
          open={open}
          value={staffRole} // The selected role value
          items={roles} // Dropdown items
          setOpen={setOpen} // Toggle the dropdown open state
          setValue={(value) => {
            setStaffRole(value); // Update the staffRole state
          }}
          setItems={setRoles} // Update the roles if needed
          dropDownDirection='TOP'
          placeholder="Select Staff Role"
          containerStyle={{ width: '98%' }}
          style={[styles.input, { alignSelf: "center" }]}
          dropDownContainerStyle={{
            width: "90%",
            alignSelf: "center",
            borderColor: '#cccccc',
            borderWidth: 1,
            borderRadius: 8
          }}
        />
        <View style={{ marginBottom: 15 }}>
          <BranchesDropdown
            dropdownStyles={styles}
            branchName={(val)=>setBranchName(val)} 
            onBranchChange={setBranchID} // Pass handleInputChange function to update branch
          />
        </View>

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={create_staffPayload.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={comfirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          placeholder="Number"
          style={styles.input}
          value={create_staffPayload.phoneNumber}
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Date of Birth ( YYYY-MM-DD )"
          style={styles.input}
          value={create_staffPayload.dob}
          onChangeText={(value) => handleInputChange('dob', value)}
        />
        <TextInput
          placeholder="Email ID"
          style={styles.input}
          value={create_staffPayload.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Address"
          style={[styles.input, styles.textArea]}
          value={create_staffPayload.address}
          onChangeText={(value) => handleInputChange('address', value)}
          multiline
        />
        <TextInput
          placeholder="JoiningDate ( YYYY-MM-DD )"
          style={styles.input}
          value={create_staffPayload.joiningDate}
          onChangeText={(value) => handleInputChange('joiningDate', value)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Before Expirencer"
          style={styles.input}
          value={create_staffPayload.beforeExperience}
          onChangeText={(value) => handleInputChange('beforeExperience', value)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="basicSalary"
          style={styles.input}
          value={create_staffPayload.basicSalary}
          onChangeText={(value) => handleInputChange('basicSalary', value)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Aadhar Number"
          style={styles.input}
          value={create_staffPayload.aadharNumber}
          onChangeText={(value) => handleAdharInputChange('aadharNumber', value)}
          keyboardType="numeric"
        />

        {/* Buttons */}
        <View style={[styles.buttonContainer,{marginBottom:70}]}>
          <Button mode="contained" style={styles.saveButton} onPress={handleSave}>
            Save
          </Button>
          <Button mode="outlined" style={styles.cancelButton} onPress={() => Alert.alert('Cancelled')}>
            Cancel
          </Button>
        </View>
      </View>

      {/* Bottom Sheet */}
      <Modal visible={isBottomSheetVisible} onDismiss={() => setBottomSheetVisible(false)}>
        <View style={styles.bottomSheet}>
          <View style={{ backgroundColor: "#27AE60", borderTopEndRadius: 100, borderEndStartRadius: 10 }}>

            <Text style={{ fontFamily: "Parkinsans-SemiBold", fontSize: 24, backgroundColor: "red", color: "#f3f3f3", padding: 5 }}>Image Pic</Text>
          </View>
          <TouchableOpacity onPress={openCamera} style={styles.bottomSheetButton}>
            <Icon name="camera" size={30} color="#000" />
            <Text style={styles.bottomSheetText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.bottomSheetButton}>
            <Icon name="image" size={30} color="#000" />
            <Text style={styles.bottomSheetText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  notificationBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FF0000', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  notificationCount: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  form: { padding: 16 },
  imageContainer: { alignItems: 'center', marginBottom: 16 },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  addPhotoButton: { borderColor: '#007bff' },
  input: { backgroundColor: '#fff', padding: 10, height: 48, borderRadius: 8, marginBottom: 12, elevation: 1 },
  textArea: { height: 100, textAlignVertical: 'top' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#28a745', flex: 1, marginRight: 8, borderRadius: 8 },
  cancelButton: { borderColor: '#000', flex: 1, marginLeft: 8, borderRadius: 8 },
  bottomSheet: { backgroundColor: "#f1f1f1", paddingBottom: 10, width: "90%", borderRadius: 10, alignSelf: "center", justifyContent: 'center' },
  bottomSheetButton: { flexDirection: 'row', padding: 5, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  bottomSheetText: { fontSize: 16, marginLeft: 8, color: '#333' },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddStaff;
