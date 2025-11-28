import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Avatar, Button, PaperProvider, Modal } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { updateDeviceInstall, uploadDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
import store from "../../Redux/store";
import { PermissionsAndroid, Platform } from 'react-native';
import api from "../../Api/api";

const DeviceInstall_VechileInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const [vehicleType, setVehicleType] = useState(null);
  const [vehicleID, setVehicleID] = useState("");
  const [open, setOpen] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [vehiclePhotos, setVehiclePhotos] = useState([]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };

      try {
        const { data } = await api.post("/VehicleType/getVehicleTypeNamesDropDown", payload, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (data?.data && Array.isArray(data.data)) {
          // Map API response to match expected format
          const formattedVehicleTypes = data.data.map((item) => ({
            label: item.name,  // Ensure API response contains a 'name' field
            value: item.id  // Ensure API response contains a 'code' field
          }));

          // Merge default options with API response if needed
          setVehicleTypes([...formattedVehicleTypes]);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };
    fetchVehicleTypes();
  }, []);


  async function requestCameraPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your Camera to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } else {
        // iOS or other platforms
        return true;
      }
    } catch (err) {
      console.warn('Failed to request camera permission:', err);
      return false;
    }
  }
  async function requestReadMediaPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Media Permission',
            message: 'This app needs access to your Media to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Media permission granted');
          return true;
        } else {
          console.log('Media permission denied');
          return false;
        }
      } else {
        // iOS or other platforms
        return true;
      }
    } catch (err) {
      console.warn('Failed to request camera permission:', err);
      return false;
    }
  }

  async function requestGalleryPermission() {
    try {
      let granted;

      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // For Android 13 (API 33) and above
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'This app needs access to your gallery to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
        } else {
          // For Android versions below 13
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'This app needs access to your storage to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
        }

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission granted');
          return true;
        } else {
          console.log('Gallery permission denied');
          return false;
        }
      } else {
        // iOS or other platforms (handle accordingly)
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  useEffect(() => {
    requestCameraPermission();
    requestGalleryPermission();
    requestReadMediaPermission();
  }, [])

  const handleCameraImagePick = async () => {
    if (vehiclePhotos.length >= 10) {
      Alert.alert("Limit Reached", "You can only upload up to 10 photos.");
      return;
    }

    ImagePicker.launchCamera(
      {
        mediaType: "photo",
        quality: 0.5, // Compress to 50% quality
        includeBase64: false,
        noData: true,
        maxWidth: 600,
        maxHeight: 500,
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image capture');
          return;
        }
  
        if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
          return;
        }
        const asset = response?.assets?.[0];
        if (!asset) {
          console.warn('No image asset returned');
          return;
        }
            const imageObject = {
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName || `image_${Date.now()}.jpg`,
            };

            setVehiclePhotos((prevPhotos) => [...prevPhotos, imageObject]);
          }
    );
  };

  const handleGalleryImagePick = async () => {
    if (vehiclePhotos.length >= 10) {
      Alert.alert("Limit Reached", "You can only upload up to 10 photos.");
      return;
    }

    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.5, // Compress to 50% quality
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        includeBase64: false,
        noData: true,
        maxWidth: 600,
        maxHeight: 500,
        allowsEditing: false,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          const selectedImage = response.assets[0];

          const imageObject = {
            uri: selectedImage.uri,
            type: selectedImage.type,
            name: selectedImage.fileName || `image_${Date.now()}.jpg`,
          };

          setVehiclePhotos((prevPhotos) => [...prevPhotos, imageObject]);
        }
      }
    );
  };

  // Function to remove an image from the list
  const removeImage = (index) => {
    setVehiclePhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const deviceInstall_payload = {
      vehicleType,
      vehicleID,
      vehicleNumber,
      chassisNumber,
      engineNumber,
      vehiclePhotos,
    };

    console.log("Payload:", deviceInstall_payload);
    navigation.navigate("InstallDeviceOverview");
    dispatch(updateDeviceInstall(deviceInstall_payload));
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          {/* Vehicle Type Dropdown */}
          <Text style={styles.label}>Vehicle Type</Text>
          <DropDownPicker
            open={open}
            value={vehicleID}
            items={vehicleTypes}
            setOpen={setOpen}
            setValue={setVehicleID}
            setItems={setVehicleTypes}
            placeholder="Select Vehicle Type"
            containerStyle={{ width: "100%" }}
            style={[styles.input, { zIndex: 0 }]}
            onChangeValue={(value) => {
              const selectedItem = vehicleTypes.find(item => item.value === value);
              if (selectedItem) {
                setVehicleType(selectedItem.label); // sets vehicleID to item.id
              }
            }}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          {/* Vehicle Number */}
          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Vehicle Number"
            placeholderTextColor="gray"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />

          {/* Chassis Number */}
          <Text style={styles.label}>Chassis Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Chassis Number"
            placeholderTextColor="gray"
            value={chassisNumber}
            onChangeText={setChassisNumber}
          />

          {/* Engine Number */}
          <Text style={styles.label}>Engine Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Engine Number"
            placeholderTextColor="gray"
            value={engineNumber}
            onChangeText={setEngineNumber}
          />

          {/* Vehicle Photo Upload */}
          <View style={{ alignItems: "center", margin: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Vehicle Photos</Text>

            {/* Button to pick an image */}
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setShowImagePickerModal(true)}>
              <Avatar.Icon size={40} color="#ffffff" icon={"camera"} style={{ backgroundColor: "green" }} />
            </TouchableOpacity>

            {/* Display selected images */}
            <FlatList
              data={vehiclePhotos}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item, index }) => (
                <View style={{ margin: 5, alignItems: "center" }}>
                  <Image source={{ uri: item.uri }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                  <TouchableOpacity onPress={() => removeImage(index)} style={{ marginTop: 5 }}>
                    <Avatar.Icon size={20} color="#ffffff" icon={"close"} style={{ backgroundColor: "red" }} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            Save
          </Button>
          <Button mode="outlined" onPress={() => console.log("Cancelled")} style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
        <Modal
          visible={showImagePickerModal}
          transparent
          animationType="slide"
          style={{ flex: 1 }}
          onRequestClose={() => setShowImagePickerModal(false)}
        >
          <View style={{ justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}></View>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.sheetTitle}>Upload Photo</Text>

            {/* Camera Option */}
            <TouchableOpacity style={styles.optionRow} onPress={handleCameraImagePick}>
              <Avatar.Icon size={30} icon="camera" style={[styles.icon, { backgroundColor: "green" }]} />
              <Text style={styles.optionText}>Take a Photo</Text>
            </TouchableOpacity>

            {/* Gallery Option */}
            <TouchableOpacity style={styles.optionRow} onPress={handleGalleryImagePick}>
              <Avatar.Icon size={30} icon="image" style={[styles.icon, { backgroundColor: "blue" }]} />
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity onPress={() => setShowImagePickerModal(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>
    </PaperProvider>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 5, color: "#333333", },
  dropdownContainer: { width: "100%", borderColor: "#ccc", borderWidth: 1, borderRadius: 8 },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1, zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '70%', alignSelf: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: 'red',
    fontWeight: 'bold',
  },
  imagePlaceholder: { color: "gray" },
  vehicleImage: { width: "100%", height: "100%", borderRadius: 5 },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 60 },
  saveButton: { backgroundColor: "#007BFF", padding: 10 },
  cancelButton: { borderColor: "#007BFF", padding: 10 },
});

export default DeviceInstall_VechileInfo;
