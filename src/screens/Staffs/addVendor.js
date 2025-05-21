import React, { useState,useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,Image, Alert} from "react-native";
import { Avatar, Button, Modal, Divider, Surface } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { createVendors} from "../../Redux/Actions/vendorAction";

const AddVendor = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading:vendorInfoLoading, vendorInfo,error:vendorInfoError } = useSelector(state => state.addVendor);
  const [name, setName] = useState("");
  const [vendorPhoneNumber, setVendorPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [emailId, setEmailId] = useState("");
  const [productType, setProductType] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const companyCode = "WAY4TRACK";
  const unitCode = "WAY4";

  const handleAdharInputChange = (value) => {
    // Remove any non-digit characters
    const formattedValue = value.replace(/\D/g, '');

    // Limit the input to 12 digits
    if (formattedValue.length > 12) {
      return;
    }

    // Format the value with spaces after every 4 digits
    const formatted = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Update the state or handle the input change (e.g., setCreateStaffPayload)
    setAadharNumber(formatted)
  };

  const openCamera = () => {
    setBottomSheetVisible(false);
    launchCamera({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload = new FormData();
        imageupload.append('staffPhoto', {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        });
        setProfileImage(imageupload);

      }
    });
  };

  // Open gallery
  const openGallery = () => {
    setBottomSheetVisible(false);
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setImage(response.assets[0].uri);
        const imageupload = new FormData();
        imageupload.append('staffPhoto', {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        });
        setProfileImage(imageupload);
      }
    });
  };
  const saveDetails = () => {
    if (!name || !vendorPhoneNumber || !emailId || !address) {
      Alert.alert("Please fill all required fields!");
    } else {
      const create_vendorPayload = {
        name,
        vendorPhoneNumber,
        alternatePhoneNumber,
        startingDate,
        emailId,
        aadharNumber,
        address,
        productType,
        companyCode,
        unitCode,
        ProfileImage
      };
      dispatch(createVendors(create_vendorPayload));
      // if (vendorInfo.status) {
        
      //   Alert.alert("Vendor Details Saved Successfully!");
      // } else {
      //   Alert.alert("Vendor Details Failed!");
      // }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Profile Image */}
        <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
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
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vendor Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Vendor Phone Number</Text>
        <TextInput
          style={styles.input}
          value={vendorPhoneNumber}
          onChangeText={setVendorPhoneNumber}
        />

        <Text style={styles.label}>Alternate Phone Number</Text>
        <TextInput
          style={styles.input}
          value={alternatePhoneNumber}
          onChangeText={setAlternatePhoneNumber}
        />

        <Text style={styles.label}>Starting Date</Text>
        <TextInput
          style={styles.input}
          value={startingDate}
          onChangeText={setStartingDate}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={emailId}
          onChangeText={setEmailId}
        />

        <Text style={styles.label}>Product Type</Text>
        <TextInput
          style={styles.input}
          value={productType}
          onChangeText={setProductType}
        />
        <Text style={styles.label}>Aadhar Number</Text>
        <TextInput
          style={styles.input}
          value={aadharNumber}
          onChangeText={ handleAdharInputChange}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={saveDetails} style={styles.saveButton}>
          Save
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log("Canceled")}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>

      <Modal
        visible={isBottomSheetVisible}
        onDismiss={() => setBottomSheetVisible(false)}
      >
        <Surface style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Choose Image</Text>
          <Divider />
          <TouchableOpacity onPress={openCamera} style={styles.bottomSheetOption}>
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.bottomSheetOption}>
            <Text>Gallery</Text>
          </TouchableOpacity>
        </Surface>
      </Modal>
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

export default AddVendor;
