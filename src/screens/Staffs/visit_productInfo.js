import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateDeviceInstall } from "../../Redux/Actions/deviceInstallAction";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import ProductDropdown from "../../components/productDropdown";
import { updateSalesVisit } from "../../Redux/Actions/salesVisitAction";
import { ScrollView } from "react-native-gesture-handler";

const Visit_ProductInfo = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    products: [{ productId: "", name: "", quantity: "" }],
    services: [{ serviceName: "", serviceDescription: "" }],
  });

  const handleItemChange = (type, index, field, value) => {
    console.log("values : ",value);
    const updatedItems = [...formData[type]];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, [type]: updatedItems }));
  };

  const addItem = (type) => {
    const newItem = type === "products" ? { productId: "", name: "", quantity: "" } : { serviceName: "", serviceDescription: "" };
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
  
      return () => backHandler.remove(); // ✅ Correct way to clean up
    }, [navigation])
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Products</Text>
      {formData.products.map((item, index) => (
        <Surface key={index} style={styles.surface}>
          <View style={styles.rowContainer}>
            <View style={{flex:3}}>
            <ProductDropdown productId={item.productId} onProductChange={(value) => {
              handleItemChange("products", index, "productId", value.id);
              handleItemChange("products", index, "name", value.productName);
              }} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Qty"
              keyboardType="numeric"
              value={item.quantity}
              onChangeText={(value) => handleItemChange("products", index, "quantity", value)}
            />
            {index > 0 && (
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem("products", index)}>
                <MaterialCommunityIcons name="minus" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </Surface>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => addItem("products")}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Services</Text>
      {formData.services.map((item, index) => (
        <Surface key={index} style={styles.surface}>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={item.serviceName}
              onChangeText={(value) => handleItemChange("services", index, "serviceName", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={item.serviceDescription}
              onChangeText={(value) => handleItemChange("services", index, "serviceDescription", value)}
            />
            {index > 0 && (
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem("services", index)}>
                <MaterialCommunityIcons name="minus" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </Surface>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => addItem("services")}>
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.nextButton,{marginBottom:70}]} onPress={() => {
        dispatch(updateSalesVisit(formData));
        navigation.navigate("SalesVisitOverview");
      }}>
        <Text style={styles.nextButtonText} >Next</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
});

export default Visit_ProductInfo;
