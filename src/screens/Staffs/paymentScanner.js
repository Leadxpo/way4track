import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Button, Modal, Portal, TextInput } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../Api/api';

const PaymentScanner = ({ navigation, route }) => {
  const { paymentData } = route?.params;  // Sample address data
  const [isLoading,setIsLoading]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBillVisible, setModalBillVisible] = useState(false);
  const [modalUnbillVisible, setModalUnbillVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [amount, setAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [description, setDescription] = useState(0);
  const dispatch = useDispatch();

  const handleImageResponse = useCallback((response) => {
    if (response.didCancel || response.errorCode) return;

    const imageUri = response.assets?.[0]?.uri;
    const imageType = response.assets?.[0]?.type;
    const imageName = response.assets?.[0]?.fileName;

    if (imageUri) {
      setImage(imageUri);
      const imageUpload = new FormData();
      imageUpload.append('staffPhoto', {
        uri: imageUri,
        type: imageType,
        name: imageName,
      });
      setProfileImage({
        uri: imageUri,
        type: imageType,
        name: imageName,
      });
    }
  }, []);

  const handleSubmit = async () => {
    setModalBillVisible(false)
    const currentDateTime = new Date().toISOString();
    const updateWorkFormData = new FormData();
    if (profileImage) {
      updateWorkFormData.append("screenShot", {
        uri: profileImage.uri,  // Ensure it's a URI
        name:  profileImage.name, // Assign a proper filename
        type: profileImage.type,  // Correct MIME type
      })
    }
    updateWorkFormData.append("id", paymentData.id);
    updateWorkFormData.append("amount", amount);
    updateWorkFormData.append("paidAmount", paidAmount);
    updateWorkFormData.append("description", description);
    updateWorkFormData.append("endDate", currentDateTime);
    updateWorkFormData.append("companyCode", "WAY4TRACK");
    updateWorkFormData.append("unitCode", "WAY4");
    if (parseInt(paidAmount) < parseInt(amount)) {
      updateWorkFormData.append("paymentStatus", "PARTIALLY_PAID");
    } else {
      updateWorkFormData.append("paymentStatus", "COMPLETED");
    }

    console.log("updateWorkFormData: ", updateWorkFormData);

    try {
      // Attempt to fetch branches
      const { data } = await api.post(`/technician/handleTechnicianDetails`, updateWorkFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("payment Response :", data)
      if (data.status) {
        Alert.alert('Success', 'Work updated successfully');
        navigation.navigate("InstallSuccessfully");
      } else {
        Alert.alert('Error', 'Work creation not updated');
      }
    } catch (error) {
      console.log("error : ", error)
      // If the error status is 500, try refreshing the token
    }
  };

  const handleUnbillSubmit = async () => {
    setModalUnbillVisible(false)
    const currentDateTime = new Date().toISOString();
    const updateWorkFormData = new FormData();
    updateWorkFormData.append("id", paymentData.id);
    updateWorkFormData.append("amount", amount);
    updateWorkFormData.append("paidAmount", 0);
    updateWorkFormData.append("description", description);
    updateWorkFormData.append("endData", currentDateTime);
    updateWorkFormData.append("companyCode", "WAY4TRACK");
    updateWorkFormData.append("unitCode", "WAY4");
    updateWorkFormData.append("paymentStatus", "UNPAID");

    console.log("updateWorkFormData: ", updateWorkFormData);

    try {
      // Attempt to fetch branches
      const { data } = await api.post(`/technician/handleTechnicianDetails`, updateWorkFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("payment Response :", data)
      if (data.status) {
        Alert.alert('Success', 'Work updated successfully');
        navigation.navigate("InstallSuccessfully");
      } else {
        Alert.alert('Error', 'Work creation not updated');
      }
    } catch (error) {
      console.log("error : ", error)
      // If the error status is 500, try refreshing the token
    }
  };


  const openCamera = useCallback(() => {
    setModalVisible(false);
    launchCamera({ mediaType: 'photo' }, handleImageResponse);
  }, [handleImageResponse]);

  const openGallery = useCallback(() => {
    setModalVisible(false);
    launchImageLibrary({ mediaType: 'photo' }, handleImageResponse);
  }, [handleImageResponse]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Scan QR Code</Text>

        <Image
          source={{ uri: "https://storage.googleapis.com/way4track-application/Sharlon_App_usage/Sharon%20Telematics%20Logo.png" }}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* QR Code */}
        {
          paymentData?.br_qr_photo ?
            (<Image
              source={{ uri: paymentData.br_qr_photo }}
              style={styles.mainImage}
              resizeMode="contain"
            />) : (
              <Image
                source={require("../../utilities/images/QR.jpg")}
                style={styles.mainImage}
                resizeMode="contain"
              />)
        }

        <Text style={styles.title}>{paymentData.staff_branch_name}</Text>
        {/* Action Buttons */}
        <Button mode="contained" onPress={() => setModalBillVisible(true)} style={styles.button}>
          Paid
        </Button>
        <Button mode="contained" onPress={() => setModalUnbillVisible(true)} style={[styles.button, { marginBottom: 30 }]}>
          Unpaid
        </Button>
      </View>

      {/* Upload Bill Modal */}
      <Portal>
        <Modal
          visible={modalBillVisible}
          onDismiss={() => setModalBillVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.modalText}>Upload Bill</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="file" size={24} color="#4CAF50" style={styles.modalIcon} />
              <Text style={styles.modalText}>Select File</Text>
            </TouchableOpacity>
            {image &&
              <View>
                <Image
                  source={{ uri: image }}
                  style={[styles.billImage]}
                  resizeMode="contain"
                />
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={[styles.input, { width: 300, height: 40, backgroundColor: "#ffffff" }]}
                  placeholder="Amount"
                  keyboardType='numeric'
                  placeholderTextColor={"#aaaaaa"}
                  mode='outlined'
                  outlineStyle={{ backgroundColor: '#ffffff' }}
                  outlineColor="#aaaaaa"
                  activeOutlineColor='#aaaaaa'
                  value={amount}
                  onChangeText={setAmount}
                />
                <Text style={styles.label}>Paid Amount</Text>

                <TextInput
                  style={[styles.input, { width: 300, height: 40 }]}
                  placeholder="Paid Amount"
                  mode='outlined'
                  outlineColor="#aaaaaa"
                  keyboardType='numeric'
                  placeholderTextColor={"#aaaaaa"}
                  value={paidAmount}
                  onChangeText={setPaidAmount}
                />
                <Text style={styles.label}>Description</Text>

                <TextInput
                  style={[styles.input, { width: 300, height: 100 }]}
                  placeholder="Description"
                  mode='outlined'
                  outlineColor="#aaaaaa"
                  keyboardType='numeric'
                  placeholderTextColor={"#aaaaaa"}
                  value={description}
                  onChangeText={setDescription}
                />
                            {isLoading ? (<ActivityIndicator size={'large'} color='green' />) : (
                <Button mode="outlined" onPress={handleSubmit} style={styles.submitButton}>
                  Submit
                </Button>
                            )
                          }
              </View>

            }
          </ScrollView>

        </Modal>

        <Modal
          visible={modalUnbillVisible}
          onDismiss={() => setModalUnbillVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView>
            <Text style={styles.modalText}>Upload Bill</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="file" size={24} color="#4CAF50" style={styles.modalIcon} />
              <Text style={styles.modalText}>Select File</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={[styles.input, { width: 300, height: 40 }]}
                placeholder="Amount"
                mode='outlined'
                outlineColor="#aaaaaa"
                keyboardType='numeric'
                placeholderTextColor={"#aaaaaa"}
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.label}>Description</Text>

              <TextInput
                style={[styles.input, { width: 300, height: 100 }]}
                placeholder="Description"
                mode='outlined'
                outlineColor="#aaaaaa"
                keyboardType='numeric'
                placeholderTextColor={"#aaaaaa"}
                value={description}
                onChangeText={setDescription}
              />
              <Button mode="outlined" onPress={handleUnbillSubmit} style={styles.submitButton}>
                Submit
              </Button>
            </View>
          </ScrollView>
        </Modal>

        {/* Camera/Gallery Modal */}
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
            <MaterialCommunityIcons name="camera" size={24} color="#4CAF50" style={styles.modalIcon} />
            <Text style={styles.modalText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
            <MaterialCommunityIcons name="image" size={24} color="#4CAF50" style={styles.modalIcon} />
            <Text style={styles.modalText}>Gallery</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: "#fff", marginBottom: 40 },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { padding: 5, marginTop: 5, color: "#333333" },
  title: { fontSize: 22, fontWeight: "bold", color: "#d89225", marginVertical: 20 },
  logo: { width: 250, height: 250 },
  billImage: { width: 300, height: 550 },
  mainImage: { width: "90%", height: 250 },

  button: { backgroundColor: "green", marginTop: 15, paddingHorizontal: 40 },
  submitButton: { backgroundColor: "#ffffff", borderColor: "green", marginTop: 15, marginBottom: 50, paddingHorizontal: 40, },

  modalContainer: { backgroundColor: "white", paddingHorizontal: 20, borderRadius: 10, alignItems: "center", marginHorizontal: 30 },
  modalText: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 10 },
  modalOption: { flexDirection: "row", alignItems: "center", paddingTop: 15 },
  modalIcon: { marginRight: 10 },
});

export default PaymentScanner;
