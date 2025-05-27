import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  BackHandler,
} from "react-native";
import {
  Provider,
  Surface,
  Modal,
  Text,
  Avatar,
  Card,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../Api/api";
import { updateSalesVisit } from "../../Redux/Actions/salesVisitAction";

const Visit_ProductInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const [productTypes, setProductTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  const [formData, setFormData] = useState({
    products: [{  productName: "", quantity: "" }],
    services: [{ services: "", description: "" }],
  });

  const handleItemChange = (type, index, field, value) => {
    const updatedItems = [...formData[type]];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, [type]: updatedItems }));
  };

  const addItem = (type) => {
    const newItem =
      type === "products"
        ? {  productName: "", quantity: "" }
        : { services: "", description: "" };
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  const removeItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Visit_ClientInfo");
        return true;
      };
      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandler.remove();
    }, [navigation])
  );

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };

        const [productRes, serviceRes] = await Promise.all([
          api.post("/productType/getProductTypeNamesDropDown", payload),
          api.post("/ServiceType/getServiceTypeNamesDropDown", payload),
        ]);

        const productList = productRes?.data?.data || [];
        const serviceList = serviceRes?.data?.data || [];
        setProductTypes(productList.filter((item) => item.type === "PRODUCT"));
        setServiceTypes(serviceList);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleSelectProduct = (item, index) => {
    const updated = [...formData.products];
    updated[selectedProductIndex] = {
      ...updated[selectedProductIndex],
      productName: item.name,
    };
    setFormData((prev) => ({ ...prev, products: updated }));
    setShowProductModal(false);
  };

  const handleSelectService = (item, index) => {
    const updated = [...formData.services];
    updated[selectedServiceIndex] = {
      ...updated[selectedServiceIndex],
      services: item.name,
    };
    setFormData((prev) => ({ ...prev, services: updated }));
    setShowServiceModal(false);
  };

  const renderItem = (item, type) => {
    return(
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() =>
        type === "product"
          ? handleSelectProduct(item)
          : handleSelectService(item)
      }
    >
      <Text style={styles.modalText}>{item.name}</Text>
    </TouchableOpacity>
  )};

  const renderModal = (visible, setVisible, data, type) => (
    <Modal visible={visible} transparent animationType="slide" style={{flex:1}}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity onPress={() => setVisible(false)} style={{ alignSelf: "flex-end" }}>
          <Avatar.Icon icon="close" style={styles.closeIcon} size={30} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => renderItem(item, type)}
            ListEmptyComponent={
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No items available</Text>
              </Card>
            }
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Products</Text>
          {formData.products.map((item, index) => (
            <Surface key={index} style={styles.surface}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setSelectedProductIndex(index);
                    setShowProductModal(true);
                  }}
                >
                  <Card.Cover
                    source={require("../../utilities/images/way4tracklogo.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.dropdownText}>{item.productName || "Select Product"}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Qty"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(value) =>
                    handleItemChange("products", index, "quantity", value)
                  }
                />
                {index > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem("products", index)}
                  >
                    <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </Surface>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addItem("products")}
          >
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Services</Text>
          {formData.services.map((item, index) => (
            <Surface key={index} style={styles.surface}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setSelectedServiceIndex(index);
                    setShowServiceModal(true);
                  }}
                >
                  <Card.Cover
                    source={require("../../utilities/images/way4tracklogo.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.dropdownText}>{item.services || "Select Service"}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={item.description}
                  onChangeText={(value) =>
                    handleItemChange("services", index, "description", value)
                  }
                />
                {index > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem("services", index)}
                  >
                    <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </Surface>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addItem("services")}
          >
            <Text style={styles.addButtonText}>Add Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextButton, { marginBottom: 70 }]}
            onPress={() => {
              dispatch(updateSalesVisit(formData));
              navigation.navigate("SalesVisitOverview");
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {renderModal(showProductModal, setShowProductModal, productTypes, "product")}
      {renderModal(showServiceModal, setShowServiceModal, serviceTypes, "service")}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  surface: { borderColor: "#ddd", borderWidth: 1, padding: 5, backgroundColor: "#fff", borderRadius: 5, marginVertical: 8 },
  rowContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: "#ccc", color: "#333", borderRadius: 5, paddingHorizontal: 10, marginHorizontal: 3 },
  addButton: { backgroundColor: "#4CAF50", padding: 10, alignItems: "center", borderRadius: 5, marginVertical: 5 },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  removeButton: { backgroundColor: "#f44336", borderRadius: 5, padding: 8, marginLeft: 4 },
  nextButton: { backgroundColor: "green", padding: 15, alignItems: "center", borderRadius: 5, marginTop: 20 },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  dropdownBtn: { flexDirection: "row", alignItems: "center", flex: 2 },
  dropdownText: { marginLeft: 10, color: "#555", fontSize: 16 },
  icon: { width: 40, height: 40, borderRadius: 20 },
  modalOverlay: { justifyContent: "center", },
  modalContent: { backgroundColor: "#fff", margin: 20,    width: "90%",
 padding: 20, borderRadius: 10, maxHeight: "80%" },
  modalItem: { paddingVertical: 10},
  modalText: { fontSize: 16,color:'#333333' },
  emptyCard: { padding: 20, alignItems: "center" },
  emptyText: { color: "#777" },
  closeIcon: {
    backgroundColor: "green",
    margin: 10,
    alignSelf: "flex-end",
  },
});

export default Visit_ProductInfo;
