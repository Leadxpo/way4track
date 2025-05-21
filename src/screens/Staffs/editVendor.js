import React, { useState,useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView ,Image} from "react-native";
import { Avatar, Button, Surface, Modal, Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const EditVendor = ({ navigation, route }) => {
  const { vendorDetails } = route.params;
  const [vendorName, setVendorName] = useState("");
  const [vendorNumber, setVendorNumber] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Open camera
  const openCamera = () => {
    setBottomSheetVisible(false);
    launchCamera({ mediaType: "photo" }, (response) => {
      if (!response.didCancel) {
        console.log("Camera Image:", response.assets[0]);
        setImage(response.assets[0].uri)

      }
    });
  };

  // Open gallery
  const openGallery = () => {
    setBottomSheetVisible(false);
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel) {
        console.log("Gallery Image:", response.assets[0]);
        setImage(response.assets[0].uri)
      }
    });
  };

  const saveDetails = () => {
    if (!vendorName || !vendorNumber || !email || !address) {
      alert("Please fill all required fields!");
    } else {
      console.log("Saved Details:", {
        vendorName,
        vendorNumber,
        altMobileNumber,
        gstNumber,
        productTypes,
        startingDate,
        email,
        aadharNumber,
        address,
      });
      alert("Details Saved Successfully!");
    }
  };

  useEffect(()=>{
    setVendorName(vendorDetails.name);
    setVendorNumber(vendorDetails.phone);
    setEmail(vendorDetails.Email);
    setAddress(vendorDetails.address);
    setDOB(vendorDetails.DOB);
    setGstNumber(vendorDetails.GST);
    setAadharNumber(vendorDetails.adharNo)
    setAltMobileNumber(vendorDetails.phone)
    setImage(vendorDetails.image)
  })


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
          onPress={() => setBottomSheetVisible(true)}
          style={{width:100,height:100}}
        >
            <Image width={100} height={100}    source={image?{ uri: image }: require("../../utilities/images/way4tracklogo.png")} style={{borderRadius:5}} />
          
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vendor Name</Text>
        <TextInput
          style={styles.input}
          value={vendorName}
          onChangeText={setVendorName}
        />

        <Text style={styles.label}>Vendor Number</Text>
        <TextInput
          style={styles.input}
          value={vendorNumber}
          onChangeText={setVendorNumber}
        />

        <Text style={styles.label}>Alternate Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={altMobileNumber}
          onChangeText={setAltMobileNumber}
        />

        <Text style={styles.label}>GST Number</Text>
        <TextInput
          style={styles.input}
          value={gstNumber}
          onChangeText={setGstNumber}
        />

        <Text style={styles.label}>Product Types</Text>
        <TextInput
          style={styles.input}
          value={productTypes}
          onChangeText={setProductTypes}
        />

        <Text style={styles.label}>DOB</Text>
        <TextInput
          style={styles.input}
          value={DOB}
          onChangeText={setDOB}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Aadhar Number</Text>
        <TextInput
          style={styles.input}
          value={aadharNumber}
          onChangeText={setAadharNumber}
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
        <Button mode="outlined" onPress={() => console.log("Canceled")} style={styles.cancelButton}>
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
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  buttonGroup: {
    flexDirection: "row",marginBottom:50,
    justifyContent: "space-between",
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

export default EditVendor;
