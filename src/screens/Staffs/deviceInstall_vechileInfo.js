import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import { updateDeviceInstall, uploadDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
import store from "../../Redux/store";
import { PermissionsAndroid } from 'react-native';
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
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestCameraPermission();
  })

  const handleImagePick = async () => {
    if (vehiclePhotos.length >= 10) {
      Alert.alert("Limit Reached", "You can only upload up to 10 photos.");
      return;
    }

    ImagePicker.launchCamera(
      {
        mediaType: "photo",
        quality: 0.5, // Compress to 50% quality
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        includeBase64:false,
        noData: true,
        maxWidth: 600,
        maxHeight: 500,
        allowsEditing: false,      },
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

  // const handleImagePick_one = async () => {
  //   ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       console.log("imageResponce :", response)
  //       setVehiclePhoto_one(response.assets[0].uri);
  //       const imageupload = {
  //         uri: response.assets[0]["uri"],
  //         type: response.assets[0]["type"],
  //         name: response.assets[0]["fileName"]
  //       };
  //       setVehiclePhotoUpload_one(imageupload);
  //     }
  //   });
  // };

  // const handleImagePick_two = async () => {
  //   ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       setVehiclePhoto_two(response.assets[0].uri);
  //       const imageupload = {
  //         uri: response.assets[0]["uri"],
  //         type: response.assets[0]["type"],
  //         name: response.assets[0]["fileName"]
  //       };
  //       setVehiclePhotoUpload_two(imageupload);
  //     }
  //   });
  // };

  // const handleImagePick_three = async () => {
  //   ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       setVehiclePhoto_three(response.assets[0].uri);
  //       const imageupload = {
  //         uri: response.assets[0]["uri"],
  //         type: response.assets[0]["type"],
  //         name: response.assets[0]["fileName"]
  //       };
  //       setVehiclePhotoUpload_three(imageupload);
  //     }
  //   });
  // };

  // const handleImagePick_four = async () => {
  //   ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       setVehiclePhoto_four(response.assets[0].uri);
  //       const imageupload = {
  //         uri: response.assets[0]["uri"],
  //         type: response.assets[0]["type"],
  //         name: response.assets[0]["fileName"]
  //       };
  //       setVehiclePhotoUpload_four(imageupload);
  //     }
  //   });
  // };

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
          style={styles.input}
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
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={handleImagePick}>
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
    </ScrollView>
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
  imagePlaceholder: { color: "gray" },
  vehicleImage: { width: "100%", height: "100%", borderRadius: 5 },
  buttonGroup: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginBottom: 60 },
  saveButton: { backgroundColor: "#007BFF", padding: 10 },
  cancelButton: { borderColor: "#007BFF", padding: 10 },
});

export default DeviceInstall_VechileInfo;


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StyleSheet,
//   PermissionsAndroid,
//   Alert,
//   Dimensions
// } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import { Avatar, Button } from "react-native-paper";
// import * as ImagePicker from "react-native-image-picker";
// import { useDispatch } from 'react-redux';
// import { updateDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
// import api from "../../Api/api";
// import CameraKit, { Camera } from 'react-native-camera-kit';

// const DeviceInstall_VehicleInfo = ({ navigation }) => {
//   const dispatch = useDispatch();

//   const [vehicleID, setVehicleID] = useState(null);
//   const [vehicleType, setVehicleType] = useState("");
//   const [vehicleTypes, setVehicleTypes] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [chassisNumber, setChassisNumber] = useState("");
//   const [engineNumber, setEngineNumber] = useState("");
//   const [isCameraVisible, setIsCameraVisible] = useState(false);
//   const [vehiclePhotos, setVehiclePhotos] = useState([]);

//   useEffect(() => {
//     requestCameraPermission();
//     fetchVehicleTypes();
//   }, []);

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'This app needs access to your camera',
//           buttonPositive: 'OK',
//           buttonNegative: 'Cancel',
//         }
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.warn("Camera permission denied");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchVehicleTypes = async () => {
//     try {
//       const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };
//       const { data } = await api.post("/VehicleType/getVehicleTypeNamesDropDown", payload);
//       if (Array.isArray(data?.data)) {
//         const formattedTypes = data.data.map(item => ({
//           label: item.name,
//           value: item.id,
//         }));
//         setVehicleTypes(formattedTypes);
//       } else {
//         console.warn("Invalid vehicle types response format");
//       }
//     } catch (error) {
//       console.error("Vehicle types fetch error:", error);
//     }
//   };

//   const handleCapture = (image) => {
//     if (!image?.uri) return;
//     const newPhoto = {
//       uri: image.uri,
//       type: "image/jpeg",
//       name: `photo_${Date.now()}.jpg`,
//     };
//     setVehiclePhotos(prev => [...prev, newPhoto]);
//     setIsCameraVisible(false);
//   };

//   const handleImagePick = () => {
//     if (vehiclePhotos.length >= 10) {
//       Alert.alert("Limit Reached", "You can only upload up to 10 photos.");
//       return;
//     }
//     ImagePicker.launchCamera(
//       { mediaType: "photo", quality: 0.5 },
//       response => {
//         if (!response.didCancel && !response.errorCode && response.assets?.length) {
//           const photo = response.assets[0];
//           const imageObj = {
//             uri: photo.uri,
//             type: photo.type,
//             name: photo.fileName || `photo_${Date.now()}.jpg`,
//           };
//           setVehiclePhotos(prev => [...prev, imageObj]);
//         }
//       }
//     );
//   };

//   const removeImage = useCallback((index) => {
//     setVehiclePhotos(prev => prev.filter((_, i) => i !== index));
//   }, []);

//   const handleSave = () => {
//     const payload = {
//       vehicleType,
//       vehicleID,
//       vehicleNumber,
//       chassisNumber,
//       engineNumber,
//       vehiclePhotos,
//     };
//     dispatch(updateDeviceInstall(payload));
//     navigation.navigate("InstallDeviceOverview");
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Vehicle Type</Text>
//         <DropDownPicker
//           open={open}
//           value={vehicleID}
//           items={vehicleTypes}
//           setOpen={setOpen}
//           setValue={setVehicleID}
//           setItems={setVehicleTypes}
//           placeholder="Select Vehicle Type"
//           style={styles.input}
//           dropDownContainerStyle={styles.dropdownContainer}
//           onChangeValue={(val) => {
//             const selected = vehicleTypes.find(item => item.value === val);
//             setVehicleType(selected?.label || "");
//           }}
//         />

//         <Text style={styles.label}>Vehicle Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Vehicle Number"
//           value={vehicleNumber}
//           onChangeText={setVehicleNumber}
//           placeholderTextColor="#888"
//         />

//         <Text style={styles.label}>Chassis Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Chassis Number"
//           value={chassisNumber}
//           onChangeText={setChassisNumber}
//           placeholderTextColor="#888"
//         />

//         <Text style={styles.label}>Engine Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Engine Number"
//           value={engineNumber}
//           onChangeText={setEngineNumber}
//           placeholderTextColor="#888"
//         />
//       </View>

//       <View style={styles.photoSection}>
//         <Text style={styles.sectionTitle}>Vehicle Photos</Text>
//         {isCameraVisible ? (
//           <Camera
//           actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
//           onBottomButtonPressed={(event) => {
//             if (event.type === 'capture') {
//               handleCapture(event.captureImages[0]);
//             } else {
//               setIsCameraVisible(false);
//             }
//           }}
//           hideControls={false} // 👈 Make sure this is false or remove it entirely
//           cameraType="back"
//           flashImages={{
//             on: require('../../utilities/images/logo.png'),
//             off: require('../../utilities/images/logo.png'),
//             auto: require('../../utilities/images/logo.png'),
//           }}
//           cameraFlipImage={require('../../utilities/images/logo.png')}
//           captureButtonImage={require('../../utilities/images/logo.png')}
//           style={{height:300,width:"95%" }}        />
        
//         ) : (
//           <TouchableOpacity onPress={()=>setIsCameraVisible(true)}>
//             <Avatar.Icon size={40} icon="camera" style={{ backgroundColor: "green" }} />
//           </TouchableOpacity>
//         )}

//         <FlatList
//           data={vehiclePhotos}
//           numColumns={3}
//           keyExtractor={(_, index) => index.toString()}
//           renderItem={({ item, index }) => (
//             <View style={styles.imageWrapper}>
//               <Image source={{ uri: item.uri }} style={styles.image} />
//               <TouchableOpacity onPress={() => removeImage(index)}>
//                 <Avatar.Icon size={20} icon="close" style={{ backgroundColor: "red" }} />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       </View>

//       <View style={styles.buttonGroup}>
//         <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
//           Save
//         </Button>
//         <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.cancelButton}>
//           Cancel
//         </Button>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   inputGroup: { marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
//   input: {
//     borderWidth: 1, borderColor: "#ccc", padding: 10,
//     borderRadius: 5, marginTop: 5, color: "#333"
//   },
//   dropdownContainer: { borderColor: "#ccc", borderWidth: 1, borderRadius: 5 },
//   photoSection: { alignItems: "center", marginTop: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   imageWrapper: { margin: 5, alignItems: "center" },
//   image: { width: 80, height: 80, borderRadius: 10 },
//   buttonGroup: {
//     flexDirection: "row", justifyContent: "space-between",
//     marginTop: 30, marginBottom: 40
//   },
//   saveButton: { backgroundColor: "#007BFF", padding: 10 },
//   cancelButton: { borderColor: "#007BFF", padding: 10 },
// });

// export default DeviceInstall_VehicleInfo;
