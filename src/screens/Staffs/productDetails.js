import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import { Button, IconButton } from "react-native-paper";

const ProductDetails = ({ navigation, route }) => {
  const { productDetails } = route.params;

  const [productName, setProductName] = useState("");
  const [emiNumber, setEmiNumber] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorNumber, setVendorNumber] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [emailId, setEmailId] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [bulkFile, setBulkFile] = useState(null);

  const pickImage = () => {
    Alert.alert("Choose an option", null, [
      {
        text: "Gallery",
        onPress: () => {
          ImagePicker.launchImageLibrary(
            { mediaType: "photo", quality: 1 },
            (response) => {
              if (response.assets && response.assets[0].uri) {
                setProductImage(response.assets[0].uri);
              }
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
                setProductImage(response.assets[0].uri);
              }
            }
          );
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  useEffect(()=>{
    setProductDescription(productDetails.description);
    setProductName(productDetails.name);
    setEmiNumber(productDetails.emiNumber);
    setVendorName(productDetails.vendorName);
    setVendorNumber(productDetails.VendorNumber);
    setDateOfPurchase(productDetails.DOP);
    setEmailId(productDetails.EmailId);
    setGstNumber(productDetails.gstNumber);
    setProductQty(productDetails.productQty);
    setProductDescription(productDetails.productDescription);
    setProductImage(productDetails.productImage);
    setBulkFile(productDetails.bulkFile);
  })

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setBulkFile(result);
      Alert.alert("File Selected", `File Name: ${result.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Cancelled", "No file selected.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const validateAndSave = () => {
    if (!productName || !emiNumber || !vendorName || !productQty) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Product details saved successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        {productImage ? (
          <Image source={{ uri: productImage }} style={styles.productImage} />
        ) : (
          <MaterialCommunityIcons
            name="image"
            size={100}
            color="#ccc"
            onPress={pickImage}
          />
        )}
        <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <IconButton icon={'pencil'} size={24} mode="outlined"  iconColor="#aaaaaa" style={{position:'absolute',zIndex:99,top:10,right:10,borderColor:"#f1f1f1",elevation:3, borderWidth:1,padding:5}} onPress={()=>navigation.navigate("EditProduct",{})}></IconButton>

      {/* Product Details */}
      <TextInput
        placeholder="Product Name *"
        style={styles.input}
        editable={false}
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        placeholder="EMI Number *"
        style={styles.input}
        editable={false}
        value={emiNumber}
        onChangeText={setEmiNumber}
      />
      <TextInput
        placeholder="Vendor Name *"
        style={styles.input}
        editable={false}
        value={vendorName}
        onChangeText={setVendorName}
      />
      <TextInput
        placeholder="Vendor Number"
        style={styles.input}
        editable={false}
        value={vendorNumber}
        onChangeText={setVendorNumber}
      />
      <TextInput
        placeholder="Vendor Address"
        style={styles.input}
        editable={false}
        value={vendorAddress}
        onChangeText={setVendorAddress}
      />
      <TextInput
        placeholder="Date of Purchase"
        style={styles.input}
        editable={false}
        value={dateOfPurchase}
        onChangeText={setDateOfPurchase}
      />
      <TextInput
        placeholder="Email ID"
        style={styles.input}
        editable={false}
        value={emailId}
        onChangeText={setEmailId}
      />
      <TextInput
        placeholder="GST Number"
        style={styles.input}
        editable={false}
        value={gstNumber}
        onChangeText={setGstNumber}
      />
      <TextInput
        placeholder="Product Quantity *"
        style={styles.input}
        editable={false}
        value={productQty}
        onChangeText={setProductQty}
      />
      <TextInput
        placeholder="Product Description"
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        multiline
        editable={false}
        value={productDescription}
        onChangeText={setProductDescription}
      />

      {/* Bulk Upload Section */}
      <View style={styles.bulkUploadContainer}>
        <TouchableOpacity onPress={pickDocument} style={styles.bulkUploadBox}>
          <MaterialCommunityIcons name="file-upload" size={40} color="#ccc" />
          <Text style={styles.bulkUploadText}>
            {bulkFile ? bulkFile.name : "Drag & Drop Here"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => Alert.alert("Cancelled", "Changes discarded.")}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addPhotoButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  addPhotoText: {
    color: "#007bff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  bulkUploadContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  bulkUploadBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  bulkUploadText: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProductDetails;
