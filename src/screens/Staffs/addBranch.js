import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "react-native-image-picker";
import { ActivityIndicator, Card, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { createBranch, fetchBranches } from "../../Redux/Actions/branchAction";

const AddBranch = () => {
  const dispatch = useDispatch();
  const { loading:addedLoading, addedBranch,error:addedError } = useSelector(state => state.createbranchsReducer);
  const [isAddBranch,setIsAddedBranch]=useState(false);
  const [image, setImage] = useState(null);
  const [create_branchPayload, setCreateBranchPayload] = useState({
    branchName: "",
    branchNumber: "",
    branchAddress: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    branchOpening: "",
    email: "",
    branchPhoto: "",
    companyCode:"WAY4TRACK", unitCode:"WAY4"
  });


  const handleInputChange = (field, value) => {
    setCreateBranchPayload({ ...create_branchPayload, [field]: value });
  };

  const pickBranchPhoto = () => {
    Alert.alert("Choose an option", null, [
      {
        text: "Gallery",
        onPress: () => {
          ImagePicker.launchImageLibrary(
            { mediaType: "photo", quality: 1 },
            (response) => {
              const imageupload = {
                uri: response.assets[0]["uri"],
                type: response.assets[0]["type"],
                name: response.assets[0]["fileName"]
              };
              setCreateBranchPayload((prev) => ({
                ...prev,
                "branchPhoto": imageupload,
              }));
              setImage(response.assets[0].uri);
            }

          );
        },
      },
      {
        text: "Camera",
        onPress: () => {
          ImagePicker.launchCamera(
            { mediaType: "photo", quality: 1 },
            (response) => {
              if (response.assets && response.assets[0].uri) {
                const imageupload = {
                  uri: response.assets[0]["uri"],
                  type: response.assets[0]["type"],
                  name: response.assets[0]["fileName"]
                };
                setCreateBranchPayload((prev) => ({
                  ...prev,
                  "branchPhoto": imageupload,
                }));

              }
              setImage(response.assets[0].uri);
            }
          );
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const validateAndSave = () => {
    setIsAddedBranch(true)
    const {
      branchName,
      branchNumber,
      branchAddress,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      email,
    } = create_branchPayload;

    if (
      !branchName ||
      !branchNumber ||
      !branchAddress ||
      !addressLine1 ||
      !city ||
      !state ||
      !pincode ||
      !email
    ) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }
    try {
      dispatch(createBranch(create_branchPayload));
    } catch (error) {
      console.log("error : ",error)
    }finally{
      const branchesPayload={companyCode:"WAY4TRACK", unitCode:"WAY4"}
      dispatch(fetchBranches(branchesPayload))
      setIsAddedBranch(false);
      }

    Alert.alert("Success", "Branch details saved successfully!");
  };

  const removePhoto = (uri) => {
    handleInputChange(
      "branchPhotos",
      create_branchPayload.branchPhotos.filter((photo) => photo !== uri)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Branch Logo/Name */}
      <View style={styles.headerContainer}>
      <Card mode="elevated" elevation={3} style={{ backgroundColor: "#4CAF50" }} onPress={pickBranchPhoto}>
          <Card.Cover
            source={
              create_branchPayload?.branchPhoto
                ? { uri: image }
                : require('../../utilities/images/way4tracklogo.png')
            }
            style={styles.logo}
          />
          <View style={{ width: 30, height: 30, borderRadius: 35, position: "absolute", bottom: -10, right: -10, justifyContent: 'center', alignContent: 'center' }}>

            <MaterialCommunityIcons name="camera" size={24} color="#4CAF50" />
          </View>
        </Card>

        <Text style={styles.headerText}>Branch - 1</Text>
      </View>
      {/* Input Fields */}
      <TextInput
        placeholder="Branch Name *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'account'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.branchName}
        onChangeText={(text) => handleInputChange("branchName", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Branch Number *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'office-building'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.branchNumber}
        onChangeText={(text) => handleInputChange("branchNumber", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Branch Address *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'marker'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.branchAddress}
        onChangeText={(text) => handleInputChange("branchAddress", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address Line 1 *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'location-enter'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.addressLine1}
        onChangeText={(text) => handleInputChange("addressLine1", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Address Line 2"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'map-marker-account'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.addressLine2}
        onChangeText={(text) => handleInputChange("addressLine2", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="City *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'city'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.city}
        onChangeText={(text) => handleInputChange("city", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="State *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'ski-cross-country'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.state}
        onChangeText={(text) => handleInputChange("state", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Pincode *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'pin'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.pincode}
        onChangeText={(text) => handleInputChange("pincode", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Branch Opening Date (DD-MM-YYYY)"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'calendar'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.branchOpening}
        onChangeText={(text) => handleInputChange("branchOpening", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email ID *"
        outlineColor="#f3f3f3"
        activeOutlineColor="#aaaaaa"
        left={<TextInput.Icon icon={'email'} size={24} color={"#f3f3f3"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center", backgroundColor: "#4CAF50", padding: 0, marginStart: -4, borderTopEndRadius: 0, borderBottomEndRadius: 0, borderTopStartRadius: 5, borderBottomStartRadius: 5 }} />}
        value={create_branchPayload.email}
        onChangeText={(text) => handleInputChange("email", text)}
        style={styles.input}
      />

      {/* Branch Photos Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
       { isAddBranch ?<ActivityIndicator size='small' color="#4CAF50"></ActivityIndicator>:<Text style={styles.saveButtonText}>Add Branch</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    alignItems: "center", justifyContent: "center",
    marginBottom: 20, flexDirection: "row", flex: 1
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50", marginLeft: 10,
    marginTop: 10,
  },
  logo: {
    alignSelf: 'center',
    width: 80, backgroundColor: "#ffffff",
    height: 80
  },
  input: {
    borderWidth: 1, height: 48,
    borderColor: "#ccc", padding: 0,
    marginBottom: 15, borderRadius: 8
  },
  photosSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  photoWrapper: {
    position: "relative",
    marginRight: 10,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  removePhotoButton: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  addPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
  },
  addPhotoText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#4CAF50",
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddBranch;
