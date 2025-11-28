import React, { useState, useEffect, useCallback, memo } from "react";
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

  const [modalType, setModalType] = useState(null); // "product" or "service"
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [formData, setFormData] = useState({
    products: [{ productName: "", quantity: "" }],
    services: [{ services: "", description: "" }],
  });

  // -----------------------------------------
  // FETCH DROPDOWN DATA
  // -----------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = { companycode: "WAY4TRACK", unitCode: "WAY4" };
        const [pRes, sRes] = await Promise.all([
          api.post("/productType/getProductTypeNamesDropDown", payload),
          api.post("/ServiceType/getServiceTypeNamesDropDown", payload),
        ]);

        setProductTypes(pRes?.data?.data?.filter((i) => i.type === "PRODUCT") || []);
        setServiceTypes(sRes?.data?.data || []);
      } catch (err) {
        console.error("Dropdown Load Error:", err);
      }
    };

    fetchData();
  }, []);

  // -----------------------------------------
  // BACK BUTTON HANDLER
  // -----------------------------------------
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate("Visit_ClientInfo");
        return true;
      });

      return () => backHandler.remove();
    }, [navigation])
  );

  // -----------------------------------------
  // COMMON ITEM CHANGE HANDLER
  // -----------------------------------------
  const handleItemChange = (type, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[type]];
      updated[index][field] = value;
      return { ...prev, [type]: updated };
    });
  };

  // -----------------------------------------
  // ADD ITEM
  // -----------------------------------------
  const addItem = (type) => {
    const emptyItem =
      type === "products"
        ? { productName: "", quantity: "" }
        : { services: "", description: "" };

    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], emptyItem],
    }));
  };

  // -----------------------------------------
  // REMOVE ITEM
  // -----------------------------------------
  const removeItem = (type, index) =>
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));

  // -----------------------------------------
  // WHEN SELECTING FROM DROPDOWN
  // -----------------------------------------
  const handleSelectItem = useCallback(
    (item) => {
      if (modalType === "product") {
        handleItemChange("products", selectedIndex, "productName", item.name);
      } else {
        handleItemChange("services", selectedIndex, "services", item.name);
      }
      setModalType(null);
    },
    [selectedIndex, modalType]
  );

  // -----------------------------------------
  // MODAL COMPONENT
  // -----------------------------------------
  const DropdownModal = memo(({ visible, data }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <TouchableOpacity onPress={() => setModalType(null)}>
          <Avatar.Icon icon="close" style={styles.closeIcon} />
        </TouchableOpacity>

        <View style={styles.modalContent}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectItem(item)}>
                <Text style={styles.modalText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No items found</Text>
              </Card>
            }
          />
        </View>
      </View>
    </Modal>
  ));

  return (
    <Provider>
      <ScrollView>
        <View style={styles.container}>
          {/* ---------------------- PRODUCTS ---------------------- */}
          <Text style={styles.sectionTitle}>Products</Text>
          {formData.products.map((item, index) => (
            <Surface key={index} style={styles.surface}>
              <View style={styles.row}>
                {/* Product dropdown */}
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setSelectedIndex(index);
                    setModalType("product");
                  }}
                >
                  <Card.Cover
                    source={require("../../utilities/images/way4tracklogo.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.dropdownText}>
                    {item.productName || "Select Product"}
                  </Text>
                </TouchableOpacity>

                {/* Qty input */}
                <TextInput
                  style={styles.input}
                  placeholder="Qty"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(value) =>
                    handleItemChange("products", index, "quantity", value)
                  }
                />

                {/* Remove button */}
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

          <TouchableOpacity style={styles.addButton} onPress={() => addItem("products")}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          {/* ---------------------- SERVICES ---------------------- */}
          <Text style={styles.sectionTitle}>Services</Text>
          {formData.services.map((item, index) => (
            <Surface key={index} style={styles.surface}>
              <View style={styles.row}>
                {/* Service dropdown */}
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() => {
                    setSelectedIndex(index);
                    setModalType("service");
                  }}
                >
                  <Card.Cover
                    source={require("../../utilities/images/way4tracklogo.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.dropdownText}>
                    {item.services || "Select Service"}
                  </Text>
                </TouchableOpacity>

                {/* Description */}
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  placeholderTextColor="#aaa"
                  value={item.description}
                  onChangeText={(value) =>
                    handleItemChange("services", index, "description", value)
                  }
                />

                {/* Remove */}
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

          <TouchableOpacity style={styles.addButton} onPress={() => addItem("services")}>
            <Text style={styles.addButtonText}>Add Service</Text>
          </TouchableOpacity>

          {/* NEXT */}
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

      {/* Reusable Modal */}
      <DropdownModal
        visible={!!modalType}
        data={modalType === "product" ? productTypes : serviceTypes}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#333" },

  surface: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 5, marginVertical: 8,backgroundColor:"#f3f3f3" },

  row: { flexDirection: "row", alignItems: "center" },

  dropdownBtn: { flexDirection: "row", flex: 2, alignItems: "center" },
  dropdownText: { marginLeft: 10, color: "#444", fontSize: 16 },

  icon: { width: 40, height: 40, borderRadius: 20 },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",backgroundColor:'#f3f3f3',
    paddingHorizontal: 10,
    marginLeft: 8,
    color: "#333",
  },

  addButton: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 5, marginVertical: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  removeButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },

  nextButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  modalOverlay: {  backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center" },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "75%",
  },
  modalItem: { paddingVertical: 12 },
  modalText: { fontSize: 16, color: "#222" },

  emptyCard: { padding: 20, alignItems: "center" },
  emptyText: { color: "#888" },

  closeIcon: { backgroundColor: "green", alignSelf: "flex-end", marginBottom: 10 },
});

export default Visit_ProductInfo;
