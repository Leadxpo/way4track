import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList, Dimensions,
  Alert, StyleSheet,
  BackHandler,
  PermissionsAndroid,
  Platform
} from "react-native";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Portal, Modal, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Camera } from "react-native-camera-kit";
import { updateDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
import api from "../../Api/api";

const DeviceInstall_ProductInfo = ({ navigation }) => {
  const dispatch = useDispatch();

  const [productIMEI, setProductIMEI] = useState("");
  const [productSIM, setProductSIM] = useState("");
  const [isScanningIMEI, setIsScanningIMEI] = useState(false);
  const [isScanningSIM, setIsScanningSIM] = useState(false);

  const [applicationTypes, setApplicationTypes] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({
    name: "Select Application Name",
    id: "",
  });
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    const fetchApplicationTypes = async () => {
      try {
        const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };
        const { data } = await api.post(
          "/productType/getProductTypeNamesDropDown",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("application :", data.data);

        if (Array.isArray(data?.data)) {
          const filteredData = data.data
            .filter((item) => item.type === "APPLICATION") // 👈 filter by type
            .map((item) => ({
              label: item.name,
              value: item.id,
            }));

          setApplicationTypes(filteredData);
        } else {
          console.warn("Unexpected response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch application types:", error);
      }
    };

    fetchApplicationTypes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("DeviceInstall_ClientInfo");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera access to scan QR codes.",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleBarcodeScan = (event, type) => {
    const code = event.nativeEvent?.codeStringValue;
    if (!code) return;

    if (type === "imei") {
      setProductIMEI(code);
      setIsScanningIMEI(false);
    } else {
      setProductSIM(code);
      setIsScanningSIM(false);
    }
  };

  const renderModal = () => (
    <Modal visible={showApplicationModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <TouchableOpacity onPress={() => setShowApplicationModal(false)} style={{ alignSelf: "flex-end" }}>
          <Avatar.Icon icon="close" style={styles.closeIcon} size={30} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <FlatList
            data={applicationTypes}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedApplication({ name: item.label, id: item.value });
                  setShowApplicationModal(false);
                }}
              >
                <Card.Cover
                  source={require('../../utilities/images/way4tracklogo.png')}
                  style={styles.thumbnail}
                />
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No items available</Text>
              </Card>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const handleNext = () => {
    if (productIMEI || productSIM) {
      const payload = {
        productIMEI,
        productSIM,
        applicationName: selectedApplication.name,
        applicationId: selectedApplication.id
      }
      console.log("payload : ", payload)
      dispatch(updateDeviceInstall(payload));
      navigation.replace("DeviceInstall_VechileInfo");
    } else {
      Alert.alert("Validation", "Please enter or scan the Product IMEI or SIM number.");
    }
  };

  return (
    <Portal>
      <View style={styles.container}>
        {isScanningIMEI ? (
          <Camera
            scanBarcode
            onReadCode={(event) => handleBarcodeScan(event, "imei")}
            showFrame
            laserColor="green"
            frameColor="white"
            style={styles.camera}
          />
        ) : (
          <TouchableOpacity
            style={styles.scanContainer}
            onPress={async () => {
              if (await requestCameraPermission()) setIsScanningIMEI(true);
              else Alert.alert("Permission Required", "Camera permission is required.");
            }}
          >
            <Icon name="camera" size={30} color="#000" />
            <Text style={styles.scanText}>Scan Product QR Code</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.label}>Product IMEI Number</Text>
        <TextInput
          style={styles.input}
          value={productIMEI}
          onChangeText={setProductIMEI}
          placeholder="Enter IMEI"
        />

        {isScanningSIM ? (
          <Camera
            scanBarcode
            onReadCode={(event) => handleBarcodeScan(event, "sim")}
            showFrame
            laserColor="red"
            frameColor="white"
            style={styles.camera}
          />
        ) : (
          <TouchableOpacity
            style={styles.scanContainer}
            onPress={async () => {
              if (await requestCameraPermission()) setIsScanningSIM(true);
              else Alert.alert("Permission Required", "Camera permission is required.");
            }}
          >
            <Icon name="camera" size={30} color="#000" />
            <Text style={styles.scanText}>Scan SIM QR Code</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.label}>Product SIM Number</Text>
        <TextInput
          style={styles.input}
          value={productSIM}
          onChangeText={setProductSIM}
          placeholder="Enter SIM"
        />

        <Text style={styles.label}>Application</Text>
        <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowApplicationModal(true)}>
          <Card.Cover source={require('../../utilities/images/way4tracklogo.png')} style={styles.icon} />
          <Text style={styles.dropdownText}>{selectedApplication.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
      {renderModal()}
    </Portal>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  scanContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    padding: 40,
    marginBottom: 20,
  },
  cameraIcon: { width: 40, height: 40, tintColor: "green" },
  scanText: { marginTop: 10, color: "#555", fontSize: 16 },
  label: {
    color: "#333",
    marginBottom: 5,
  },
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    textTransform: "capitalize",
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc", color: "#333333",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center", height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  thumbnail: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyCard: {
    padding: 20,
    alignItems: "center",
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    textTransform: "capitalize",
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#d3d3d3",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  closeIcon: {
    backgroundColor: "green",
    margin: 10,
    alignSelf: "flex-end",
  },
  nextButton: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  camera: { flex: 1 },
});

export default DeviceInstall_ProductInfo;
