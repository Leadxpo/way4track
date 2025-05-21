import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Modal, TextInput as VoucherInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { voucherById } from '../../Redux/Actions/vouchersAction';
import { useDispatch, useSelector } from 'react-redux';

const AddProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading: voucherInfoLoading, voucherInfo, error: voucherInfoError } = useSelector(state => state.voucherDetails);
  const [formData, setFormData] = useState({
    companyCode: 'WAY4TRACK',
    unitCode: 'WAY4',
    productName: '',
    voucherId: '',
    vendorName: '',
    vendorNumber: '',
    vendorAddress: '',
    purchaseDate: '',
    vendorEmail: '',
    gstNumber: '',
    productDescription: '',
  });
  const [productImage, setProductImage] = useState(null);
  const [bulkFile, setBulkFile] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Open Camera
  const openCamera = () => {
    setBottomSheetVisible(false);
    launchCamera({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setProductImage(response.assets[0].uri);
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    setBottomSheetVisible(false);
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setProductImage(response.assets[0].uri);
      }
    });
  };

  // Pick a document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setBulkFile(result);
      Alert.alert('File Selected', `File Name: ${result.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No file selected.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  const getVoucherData = () => {
    if (!formData.voucherId) {
      Alert.alert('Error', 'Please enter a Voucher ID.');
      return;
    }
    const payload = { companyCode: formData.companyCode, unitCode: formData.unitCode, voucherId: formData.voucherId };
    dispatch(voucherById(payload));

    handleInputChange('productName', voucherInfo[0].voucherName);
    handleInputChange('vendorName', voucherInfo[0].clientName);
    handleInputChange('vendorNumber', voucherInfo[0].cl_phone_number);
    handleInputChange('vendorAddress', voucherInfo[0].cl_address);
    handleInputChange('purchaseDate', voucherInfo[0].generationDate.split("T")[0].toString());
    handleInputChange('vendorEmail', voucherInfo[0].cl_email);
    handleInputChange('GST Number', voucherInfo[0].cl_GST_number);
  };

  // Validate form
  const validateForm = () => {
    const { productName, voucherId, vendorName, vendorNumber, vendorAddress, purchaseDate, vendorEmail, gstNumber } = formData;

    if (!productName || !voucherId || !vendorName || !vendorNumber || !vendorAddress || !purchaseDate || !vendorEmail || !gstNumber) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    if (!/^\d+$/.test(voucherId)) {
      Alert.alert('Validation Error', 'EMI Number must be numeric.');
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(vendorEmail)) {
      Alert.alert('Validation Error', 'Invalid Email Address.');
      return false;
    }
    return true;
  };

  // Save form
  const handleSave = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Product saved successfully!');
      console.log('Form Data:', formData);
      console.log('Image:', productImage);
      console.log('Bulk File:', bulkFile);
    }
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
            onPress={() => setBottomSheetVisible(true)}
          />
        )}
        <TouchableOpacity style={styles.addPhotoButton} onPress={() => setBottomSheetVisible(true)}>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 5 }}>
        <VoucherInput
          key={'voucherId'}
          placeholder="Voucher ID"
          mode="outlined"
          right={
            <VoucherInput.Affix
              text={
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={getVoucherData}
                >
                  <Text style={styles.buttonText}>GET</Text>
                </TouchableOpacity>
              }
            />
          }
          style={styles.input}
          value={formData['voucherId']}
          onChangeText={(value) => handleInputChange('voucherId', value)}
          keyboardType="default"
        />
      </View>
      {/* Product Details */}
      {[
        { placeholder: 'Product Name *', field: 'productName' },
        { placeholder: 'Vendor Name *', field: 'vendorName' },
        { placeholder: 'Vendor Number *', field: 'vendorNumber', keyboardType: 'numeric' },
        { placeholder: 'Vendor Address', field: 'vendorAddress' },
        { placeholder: 'Date of Purchase', field: 'purchaseDate' },
        { placeholder: 'Email ID', field: 'vendorEmail', keyboardType: 'email-address' },
        { placeholder: 'GST Number', field: 'gstNumber' },
      ].map((input) => (
        <TextInput
          key={input.field}
          placeholder={input.placeholder}
          style={styles.input}
          value={formData[input.field]}
          onChangeText={(value) => handleInputChange(input.field, value)}
          keyboardType={input.keyboardType || 'default'}
        />
      ))}

      {/* Product Description */}
      <TextInput
        placeholder="Product Description"
        style={[styles.input, styles.textArea]}
        multiline
        value={formData.productDescription}
        onChangeText={(value) => handleInputChange('productDescription', value)}
      />

      {/* Bulk Upload Section */}
      <TouchableOpacity onPress={pickDocument} style={styles.bulkUploadBox}>
        <MaterialCommunityIcons name="file-upload" size={40} color="#ccc" />
        <Text style={styles.bulkUploadText}>{bulkFile ? bulkFile.name : 'Upload Bulk File'}</Text>
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <Modal
        visible={isBottomSheetVisible}
        onDismiss={() => setBottomSheetVisible(false)}
        contentContainerStyle={styles.bottomSheet}
      >
        <TouchableOpacity onPress={openCamera} style={styles.bottomSheetButton}>
          <MaterialCommunityIcons name="camera" size={30} color="#000" />
          <Text style={styles.bottomSheetText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={styles.bottomSheetButton}>
          <MaterialCommunityIcons name="image" size={30} color="#000" />
          <Text style={styles.bottomSheetText}>Gallery</Text>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  productImage: { width: 100, height: 100, borderRadius: 10 },
  addPhotoButton: { marginTop: 10 },
  addPhotoText: { color: '#007BFF', fontSize: 16 },
  touchable: {
    justifyContent: 'center', alignSelf: 'center',
    height: '100%', margin: 0, alignItems: 'center'
  },
  buttonText: {
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold', verticalAlign: 'middle',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 5 },
  textArea: { height: 80, textAlignVertical: 'top' },
  bulkUploadBox: { alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 10 },
  bulkUploadText: { color: '#777' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  saveButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  saveButtonText: { color: '#fff', textAlign: 'center' },
  cancelButton: { backgroundColor: '#dc3545', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  cancelButtonText: { color: '#fff', textAlign: 'center' },
  bottomSheet: { backgroundColor: '#fff', padding: 20 },
  bottomSheetButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  bottomSheetText: { marginLeft: 10 },
});

export default AddProduct;
