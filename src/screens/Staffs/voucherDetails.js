import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function VoucherDetails({ navigation }) {
  const [formData, setFormData] = useState({
    receiptNo: "",
    ledgerName: "",
    ledgerGST: "",
    creditAmount: "",
    modeOfPayment: "",
    branchName: "",
    branchAddress: "",
    purpose: "",
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save function with validations
  const handleSave = () => {
    const {
      receiptNo,
      ledgerName,
      ledgerGST,
      creditAmount,
      modeOfPayment,
      branchName,
      branchAddress,
      purpose,
    } = formData;

    if (
      !receiptNo ||
      !ledgerName ||
      !ledgerGST ||
      !creditAmount ||
      !modeOfPayment ||
      !branchName ||
      !branchAddress
    ) {
      Alert.alert("Error", "Please fill all the required fields.");
      return;
    }

    // Save data (You can replace this with an API call)
    Alert.alert("Success", "Voucher details saved successfully!");
    console.log("Saved Data:", formData);
  };

  // Cancel function (Go back to the previous screen)
  const handleCancel = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      Alert.alert("Cancel", "Navigating back is not configured.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Receipt No."
        value={formData.receiptNo}
        onChangeText={(value) => handleInputChange("receiptNo", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Ledger Name"
        value={formData.ledgerName}
        onChangeText={(value) => handleInputChange("ledgerName", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Ledger GST"
        value={formData.ledgerGST}
        onChangeText={(value) => handleInputChange("ledgerGST", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Credit Amount"
        value={formData.creditAmount}
        onChangeText={(value) => handleInputChange("creditAmount", value)}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Mode of Payment"
        value={formData.modeOfPayment}
        onChangeText={(value) => handleInputChange("modeOfPayment", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Branch Name"
        value={formData.branchName}
        onChangeText={(value) => handleInputChange("branchName", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Branch Address"
        value={formData.branchAddress}
        onChangeText={(value) => handleInputChange("branchAddress", value)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Purpose"
        value={formData.purpose}
        onChangeText={(value) => handleInputChange("purpose", value)}
        style={[styles.input, styles.textArea]}
        mode="outlined"
        multiline
      />

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          Save
        </Button>
        <Button
          mode="contained"
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          Cancel
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 0.48,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#4caf50",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
});
