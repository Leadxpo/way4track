import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { TextInput, Button, Modal, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

const EditProduct = ({ navigation, route }) => {
  // State for image
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

  const { productDetails } = route.params;
  // State for Bottom Sheet
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

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

const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 30) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to upload files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'You need to enable storage permission to upload files.');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

// Usage:
const handleFileUpload = async () => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) return;

  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.xlsx, DocumentPicker.types.xls],
    });
    console.log('File Selected:', result[0]);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('Cancelled file selection');
    } else {
      console.error('Unknown error:', err);
    }
  }
};

  // Handlers for Image Picker
  const openGallery = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProductImage(response.assets[0].uri);
      }
    });
    setBottomSheetVisible(false);
  };

  const openCamera = () => {
    launchCamera({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProductImage(response.assets[0].uri);
      }
    });
    setBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
     

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>Edit Product</Text>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
            <Image
              source={
                productImage
                  ? { uri: productImage }
                  : require('../../utilities/images/way4tracklogo.png')
              }
              style={styles.productImage}
            />
          </TouchableOpacity>
          <Button
            mode="outlined"
            style={styles.imageButton}
            onPress={() => setBottomSheetVisible(true)}
          >
            Add Photo
          </Button>
          <Button
            mode="text"
            style={styles.removeButton}
            onPress={() => setProductImage(null)}
          >
            Remove
          </Button>
        </View>

        {/* Form Inputs */}
        <TextInput
          label="Product Name"
          mode="outlined"
          value={productName}
          style={styles.input}
        />
        <TextInput
          label="EMI Number"
          mode="outlined"
          value={emiNumber}
          style={styles.input}
        />
        <TextInput
          label="Select Vendor"
          mode="outlined"
          value={vendorName}
          style={styles.input}
        />
        <TextInput
          label="Vendor Number"
          mode="outlined"
          value={vendorNumber}
          style={styles.input}
        />
        <TextInput
          label="Vendor Address"
          mode="outlined"
          value={vendorAddress}
          style={styles.input}
        />
        <TextInput
          label="Date of Purchase"
          mode="outlined"
          value="01 Nov, 2024"
          style={styles.input}
        />
        <TextInput
          label="Vendor Email ID"
          mode="outlined"
          value={emailId}
          style={styles.input}
        />
        <TextInput
          label="Vendor GST Number"
          mode="outlined"
          value={gstNumber}
          style={styles.input}
        />
        <TextInput
          label="Product Qty"
          mode="outlined"
          value={productQty}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Product Description"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={productDescription}
          style={styles.input}
        />

        {/* Drag & Drop Upload Placeholder */}
        {/* Drag & Drop Upload Placeholder */}
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={handleFileUpload}
        >
          <MaterialCommunityIcons
            name="file-upload"
            size={48}
            color="#888888"
          />
          <Text style={styles.uploadText}>
            {uploadedFileName || 'Drag & Drop Here'}
          </Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.saveButton}>
            Save
          </Button>
          <Button mode="outlined" style={styles.cancelButton}>
            Cancel
          </Button>
        </View>
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <Portal>
        <Modal
          visible={isBottomSheetVisible}
          onDismiss={() => setBottomSheetVisible(false)}
          contentContainerStyle={styles.bottomSheet}
        >
          <Button
            icon="image"
            mode="text"
            onPress={openGallery}
            style={styles.modalButton}
          >
            Gallery
          </Button>
          <Button
            icon="camera"
            mode="text"
            onPress={openCamera}
            style={styles.modalButton}
          >
            Camera
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  logo: { fontSize: 20, color: '#00b74a', fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notification: { position: 'relative', marginRight: 16 },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#ff0000',
    color: '#fff',
    fontSize: 10,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  body: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  imageContainer: { alignItems: 'center', marginBottom: 24 },
  productImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  imageButton: { marginBottom: 8, borderColor: '#00b74a' },
  removeButton: { color: '#ff0000' },
  input: { marginBottom: 12, backgroundColor: '#eeeeee' },
  uploadContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadText: { color: '#888888', marginTop: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: { flex: 0.48, backgroundColor: '#00b74a' },
  cancelButton: { flex: 0.48, borderColor: '#000000', borderWidth: 1 },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButton: { marginBottom: 16 },
});

export default EditProduct;
