import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  TextInput,
  Button,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EditEstimation() {
  const [formData, setFormData] = useState({
    client: "",
    clientNumber: "",
    email: "",
    clientAddress: "",
    billingAddress: "",
    estimateDate: "",
    expiryDate: "",
    cgst: "",
    sgst: "",
    termsConditions: "",
    product_service: [], // Array to hold product/service blocks
  });

  // Add new product/service block
  const addProductService = () => {
    setFormData((prev) => ({
      ...prev,
      product_service: [
        ...prev.product_service,
        {
          id: Date.now(), // Unique identifier for each block
          name: "",
          quantity: "",
          rate: "",
          amount: "",
          hsnCode: "",
        },
      ],
    }));
  };

  // Remove a product/service block
  const removeProductService = (id) => {
    setFormData((prev) => ({
      ...prev,
      product_service: prev.product_service.filter((item) => item.id !== id),
    }));
  };

  // Handle input changes in product/service blocks
  const handleProductServiceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      product_service: prev.product_service.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Handle form field changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save data
  const handleSave = () => {
    if (!formData.client || !formData.clientNumber || !formData.email) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    if (formData.product_service.length === 0) {
      Alert.alert("Error", "Please add at least one product/service.");
      return;
    }

    Alert.alert("Success", "Estimation saved successfully!");
    console.log("Saved data:", formData); // Replace with API call
  };

  return (
    <ScrollView style={styles.container}>
      {/* Form Fields */}
      <TextInput
        label="Client"
        value={formData.client}
        onChangeText={(value) => handleInputChange("client", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Client Number"
        value={formData.clientNumber}
        onChangeText={(value) => handleInputChange("clientNumber", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email ID"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Client Address"
        value={formData.clientAddress}
        onChangeText={(value) => handleInputChange("clientAddress", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Billing Address"
        value={formData.billingAddress}
        onChangeText={(value) => handleInputChange("billingAddress", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Estimate Date"
        value={formData.estimateDate}
        onChangeText={(value) => handleInputChange("estimateDate", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Expiry Date"
        value={formData.expiryDate}
        onChangeText={(value) => handleInputChange("expiryDate", value)}
        style={styles.input}
        mode="outlined"
      />

      {/* Dynamic Product/Service Blocks */}
      <View style={styles.productServiceContainer}>
        {formData.product_service.map((item, index) => (
          <View key={item.id} style={styles.productServiceBlock}>
            <Text style={styles.productTitle}>
              #{index + 1} Product / Service
            </Text>
            <TextInput
              label="Name"
              value={item.name}
              onChangeText={(value) =>
                handleProductServiceChange(item.id, "name", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Quantity"
              value={item.quantity}
              onChangeText={(value) =>
                handleProductServiceChange(item.id, "quantity", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Rate"
              value={item.rate}
              onChangeText={(value) =>
                handleProductServiceChange(item.id, "rate", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Amount"
              value={item.amount}
              onChangeText={(value) =>
                handleProductServiceChange(item.id, "amount", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="HSN Code"
              value={item.hsnCode}
              onChangeText={(value) =>
                handleProductServiceChange(item.id, "hsnCode", value)
              }
              style={styles.input}
              mode="outlined"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeProductService(item.id)}
            >
              <Icon name="minus-circle" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
        <Button
          icon="plus"
          mode="contained"
          style={styles.addButton}
          onPress={addProductService}
        >
          Add Product / Service
        </Button>
      </View>

      {/* Additional Fields */}
      <TextInput
        label="CGST (in %)"
        value={formData.cgst}
        onChangeText={(value) => handleInputChange("cgst", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="SGST (in %)"
        value={formData.sgst}
        onChangeText={(value) => handleInputChange("sgst", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Other Information / Terms & Conditions"
        value={formData.termsConditions}
        onChangeText={(value) => handleInputChange("termsConditions", value)}
        style={[styles.input, styles.textArea]}
        multiline
        mode="outlined"
      />

      {/* Save Button */}
      <Button
        mode="contained"
        style={styles.saveButton}
        onPress={handleSave}
      >
        Save
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  productServiceContainer: {
    marginVertical: 16,
  },
  productServiceBlock: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    position: "relative",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#4caf50",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    marginTop: 16,
  },
});
