import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,Image, Alert } from "react-native";
import { Avatar, Button,Modal,Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { createClients } from "../../Redux/Actions/clientAction";
import { createSubdealers } from "../../Redux/Actions/subdealerAction";

const AddSubdealer = () => {
  const [subdealerName, setSubdealerName] = useState("");
  const [subdealerNumber, setSubdealerNumber] = useState("");
  const [password, setPassword] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState("");
  const companyCode = "WAY4TRACK";
  const unitCode = "WAY4";
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const dispatch = useDispatch();

  // Open camera
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


  const saveDetails = () => {
    if (!subdealerName || !subdealerNumber || !email || !address) {
      Alert.alert("Please fill all required fields!");
    } else {
      const create_subdealersPayload= {
        subdealerName,
        subdealerNumber,
        altMobileNumber,
        gstNumber,
        productTypes,
        password,
        startingDate,
        email,
        aadharNumber,
        address,
        profileImage,
        companyCode,
        unitCode
      };
      dispatch(createSubdealers(create_subdealersPayload));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
          onPress={() => setBottomSheetVisible(true)}
          style={styles.imageContainer}
        >
            <Image source={image?{ uri: image }: require("../../utilities/images/way4tracklogo.png")} style={styles.image} />
         
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subdealer Name</Text>
        <TextInput
          style={styles.input}
          value={subdealerName}
          placeholder="subdealerName"
          onChangeText={setSubdealerName}
        />

        <Text style={styles.label}>Subdealer Number</Text>
        <TextInput
          style={styles.input}
          value={subdealerNumber}
          placeholder="Subdealer Number"
          onChangeText={setSubdealerNumber}
        />
        
        <Text style={styles.label}>Subdealer Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Subdealer Password"
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Alternate Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={altMobileNumber}
          placeholder="AltMobileNumber"
          onChangeText={setAltMobileNumber}
        />

        <Text style={styles.label}>GST Number</Text>
        <TextInput
          style={styles.input}
          value={gstNumber}
          placeholder="GST Number"
          onChangeText={setGstNumber}
        />

        <Text style={styles.label}>Product Types</Text>
        <TextInput
          style={styles.input}
          value={productTypes}
          placeholder="Product Types"
          onChangeText={setProductTypes}
        />

        <Text style={styles.label}>Starting Date</Text>
        <TextInput
          style={styles.input}
          value={startingDate}
          placeholder="starting Date"
          onChangeText={setStartingDate}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Aadhar Number</Text>
        <TextInput
          style={styles.input}
          value={aadharNumber}
          placeholder="AadharNumber"
          onChangeText={handleAdharInputChange}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          placeholder="Address"
          onChangeText={setAddress}
          multiline
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={saveDetails} style={styles.saveButton}>
          Save
        </Button>
        <Button mode="outlined" onPress={() => console.log("Canceled")} style={styles.cancelButton}>
          Cancel
        </Button>
      </View>

      <Modal
        visible={isBottomSheetVisible}
        onDismiss={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Choose Image</Text>
          <Divider />
          <TouchableOpacity onPress={openCamera} style={styles.bottomSheetOption}>
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.bottomSheetOption}>
            <Text>Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  addPhotoText: {
    color: "#4CAF50",
    marginTop: 8,
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
    padding: 5,height:48,
    marginBottom: 16,fontSize:16,
    backgroundColor: "#FFFFFF",
  },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",marginBottom:50
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
  bottomSheet: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomSheetOption: {
    padding: 16,
  },
});

export default AddSubdealer;
