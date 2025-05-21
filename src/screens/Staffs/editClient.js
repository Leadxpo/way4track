import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { Button, Modal, Portal, Provider,Avatar } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BranchesDropdown from "../../components/branchDropdown";
import { useDispatch, useSelector } from 'react-redux';
import { createClients, updateClients } from "../../Redux/Actions/clientAction";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const EditClient = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [branchName, setBranchName] = useState("");
  const { clientDetails } = route.params;  // Sample Address data
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [branchID, setBranchID] = useState("");
  const [clientId, setClientId] = useState("");
  const [dob, setDOB] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const companyCode = "WAY4TRACK";
  const unitCode = "WAY4";

  useEffect(() => {
    if (clientDetails) {
      setId(clientDetails.id)
      setAddress(clientDetails.address);
      setName(clientDetails.name);
      setPhoneNumber(clientDetails.phoneNumber);
      setDOB(clientDetails.DOB);
      setBranch(clientDetails.branchName);
      setEmail(clientDetails.email);
      setJoiningDate(clientDetails.joiningDate.toString().split("T")[0]);
      setClientId(clientDetails.clientId);
      setImage(clientDetails.image);
    }
  },[clientDetails])

  const openCamera = () => {
    setModalVisible(false);
    launchCamera({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload ={
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setProfileImage(imageupload);

      }
    });
  };

  // Open gallery
  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload =  {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setProfileImage(imageupload);
      }
    });
  };

  useEffect(() => {
    // setBranchID(prev => prev = clientDetails.branchId ? clientDetails.branchId : "")
    setBranch(branchID);
  }, [branchID])

  const handleSave = () => {
    console.log("Validation Check - Current State:");
  console.log("Name:", name);
  console.log("Phone Number:", phoneNumber);
  console.log("Branch:", branch);
  console.log("Email:", email);
  console.log("Address:", address);
    if (!name || !phoneNumber || !branch || !email || !address) {
      Alert.alert("Please fill in all required fields!");
      return;
    }

    const update_clientPayload = {
      id,
      companyCode,
      unitCode,
      clientId,
      name,
      phoneNumber,
      branch,
      dob,
      email,
      address,
      joiningDate,
      profileImage,
    };

    dispatch(updateClients(update_clientPayload))
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Profile Image */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar.Image
            size={100}
            source={
              image
                ? { uri: image }
                : require("../../utilities/images/way4tracklogo.png") // Default placeholder image
            }
            style={styles.avatar}
          />
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color="#4CAF50"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
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

        <Text style={styles.label}>Branch</Text>
        <View style={{ marginBottom: 15 }}>
          <BranchesDropdown
            dropdownStyles={styles}
            branchName={(val)=>setBranchName(val)} 
            onBranchChange={setBranchID} // Pass handleInputChange function to update branch
          />
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor={'gray'}
          value={dob}
          onChangeText={setDOB}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email ID"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
         <Text style={styles.label}>Joining Data</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor={'gray'}
          value={joiningDate}
          onChangeText={setJoiningDate}
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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <TouchableOpacity
            style={styles.modalOption}
            onPress={openCamera}
          >
            <MaterialCommunityIcons
              name="camera"
              size={24}
              color="#4CAF50"
              style={styles.modalIcon}
            />
            <Text style={styles.modalText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={openGallery}
          >
            <MaterialCommunityIcons
              name="image"
              size={24}
              color="#4CAF50"
              style={styles.modalIcon}
            />
            <Text style={styles.modalText}>Gallery</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,paddingBottom:300
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
    marginTop: 16,marginBottom:80
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

export default EditClient;
