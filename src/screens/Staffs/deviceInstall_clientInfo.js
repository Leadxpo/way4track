import React, { useState, useEffect } from "react";
import {
  View, TextInput, TouchableOpacity, ScrollView,
  FlatList, Button, Alert,
  Dimensions
} from "react-native";
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Card, Provider, Modal, Text, Avatar } from "react-native-paper";
import api from "../../Api/api";
import { loadData } from "../../Utils/appData";
import { createDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
import Header from "../../components/userHeader";

const DeviceInstall_ClientInfo = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("Select Product Name");
  const [service, setService] = useState("Select Services");
  const [serviceId, setServiceId] = useState("");
  const [subDealerId, setSubDealerId] = useState("");
  const [role, setRole] = useState("");
  const [productID, setProductID] = useState("");
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userID, setUserID] = useState("");
  const [subdealerStaffId, setSubdealerStaffId] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [productTypes, setProductTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };

      try {
        const [productRes, serviceRes] = await Promise.all([
          api.post("/productType/getProductTypeNamesDropDown", payload),
          api.post("/ServiceType/getServiceTypeNamesDropDown", payload),
        ]);

        // Check and filter product types
        const productList = productRes?.data?.data;
        if (Array.isArray(productList)) {
          const filteredProducts = productList
            .filter((item) => {
              const isValid = item && item.type === "PRODUCT" && item.name && item.id;
              if (!isValid) {
                console.warn("Skipping invalid item:", item);
              }
              return isValid;
            })
          setProductTypes(filteredProducts);

        } else {
          console.warn("Product response is not an array:", productList);
        }

        // Set service types if valid
        const serviceList = serviceRes?.data?.data;
        if (Array.isArray(serviceList)) {
          setServiceTypes(serviceList);
        } else {
          console.warn("Service response is not an array:", serviceList);
          setServiceTypes([]);
        }

      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    let mounted = true;

    const getStaffDetails = async () => {
      const id = await loadData("ID");
      const subDealerPrmId = await loadData("subDealerPrmId");
      const subDealerstaffPrmId = await loadData("subDealerstaffPrmId");
      const role = await loadData("role");
      setRole(role)
      if (mounted) {
        if (role === "sub dealer staff") {
          setSubDealerId(subDealerPrmId);
          setSubdealerStaffId(subDealerstaffPrmId);
        } else {
          setStaffId(id)
        }
      }
    };

    getStaffDetails();
    return () => { mounted = false; };
  }, []);

  const handleNext = () => {
    // Validate required fields
    if (!name || !phoneNumber || !email || !address) {
      Alert.alert("Validation", "Please enter all required fields");
      return;
    }
  
    // Construct the payload based on role
    const commonPayload = {
      userID,
      productName,
      name,
      email,
      phoneNumber,
      service,
      serviceId,
      address,
      date,
    };
  
    const payload = role === "sub dealer staff"
      ? { ...commonPayload, subDealerId,subdealerStaffId }
      : { ...commonPayload, staffId };
  
    // Log and dispatch
    console.log("payload:", payload);
    dispatch(createDeviceInstall(payload));
  
    // Navigate to the next screen
    navigation.navigate("Home", {
      screen: "DeviceInstall_ProductInfo",
    });
  };
  
  const renderItem = (item, setter, IdSetter, closeModal) => {
    console.log("item :", item.name)
    return (
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          setter(item.name);
          IdSetter(item.id);
          closeModal(false);
        }}
      >
        <Card.Cover
          source={item.productPhoto ? { uri: item.productPhoto } : require('../../utilities/images/way4tracklogo.png')}
          style={styles.thumbnail}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  };

  const renderModal = (visible, setVisible, data, setter, IdSetter) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: "flex-end" }}>
          <Avatar.Icon icon="close" style={styles.closeIcon} size={30} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => renderItem(item, setter, IdSetter, setVisible)}
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

  return (
    <Provider>
      <Header />
      <ScrollView style={styles.container}>
        <FormField label="UserID" value={userID} onChangeText={setUserID} placeholder="Enter User ID" />
        <FormField label="Name" value={name} onChangeText={setName} placeholder="Enter Name" />
        <FormField label="Email" value={email} onChangeText={setEmail} placeholder="Enter Email" />
        <FormField label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter Phone Number" keyboardType="phone-pad" />
        <FormField label="Date" value={date} onChangeText={setDate} placeholder="Enter Date (YYYY-MM-DD)" />

        {/* Product Picker */}
        <Text style={styles.label}>Product</Text>
        <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowProductModal(true)}>
          <Card.Cover source={require('../../utilities/images/way4tracklogo.png')} style={styles.icon} />
          <Text style={[styles.dropdownText, { color: "#333333" }]}>{productName}</Text>
        </TouchableOpacity>

        {/* Service Picker */}
        <Text style={styles.label}>Service</Text>
        <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowServiceModal(true)}>
          <Card.Cover source={require('../../utilities/images/way4tracklogo.png')} style={styles.icon} />
          <Text style={[styles.dropdownText, { color: "#333333" }]}>{service}</Text>
        </TouchableOpacity>

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Address"
          placeholderTextColor="#aaa"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.buttonGroup}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </ScrollView>
      {renderModal(showProductModal, setShowProductModal, productTypes, setProductName, setProductID)}
      {renderModal(showServiceModal, setShowServiceModal, serviceTypes, setService, setServiceId)}

    </Provider>
  );
};

const FormField = ({ label, ...props }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholderTextColor="#aaa" {...props} />
  </>
);

const styles = {
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "#333",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
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
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#d3d3d3",
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 50,
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
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  closeIcon: {
    backgroundColor: "green",
    margin: 10,
    alignSelf: "flex-end",
  },
};

export default DeviceInstall_ClientInfo;
