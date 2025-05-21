import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ProductDropdown from './productDropdown';
import { Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DynamicInputRows = ({ onRowsChange }) => {
  const [rows, setRows] = useState([{ productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    onRowsChange(updatedRows); // Notify parent of changes
  };

  const handleInputProductChange = (index,  value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, ["productId"]: value.id,["rate"]: value.price,["hsnCode"]:value.imeiNumber } : row
    );
    setRows(updatedRows);
    onRowsChange(updatedRows); // Notify parent of changes
  };

  const handleInputRateChange = (index, field, value) => {
    // Update the rate first
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
  
    // Calculate the amount based on the new rate and quantity
    const updatedRow = updatedRows[index]; // Get the updated row
    const itemQuantity = parseInt(updatedRow.quantity) || 0; // Ensure quantity is a number
    const itemRate = updatedRow.rate || 0; // Ensure rate is a valid number
    
    // Calculate the new amount
    const itemAmount = itemQuantity * itemRate;
  console.log("itemrate :",itemRate)
    // Update the row with the calculated amount
    const updatedRowss = updatedRows.map((row, i) =>
      i === index ? { ...row, amount: itemAmount.toFixed(2) } : row // Round the amount to two decimal places
    );
  
    // Update state with the new rows
    setRows(updatedRowss);
    onRowsChange(updatedRowss); // Notify parent of changes
  };
  
  const addRow = () => {
    const newRows = [...rows, { productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: ""  }];
    setRows(newRows);
    onRowsChange(newRows); // Notify parent of changes
  };

  const removeRow = (index,key) => {
    if (rows.length === 1) {
      Alert.alert('Error', 'You must have at least one row.');
      return;
    }
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onRowsChange(updatedRows); // Notify parent of changes
  };

  const calculateTotalAmount = () => {
    return rows.reduce((total, row) => total + (parseFloat(row.amount) || 0), 0);
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Input Rows */}
      {rows.map((item, index) => (
        <Surface
          key={index}
          mode="elevated"
          style={{ borderColor: "#dddddd", borderWidth: 1, padding: 5, backgroundColor: "#ffffff", borderRadius: 5, marginVertical: 8 }}
        >
          <View style={[styles.rowContainer, { flex: 1 }]}>
            <View style={{ flex: 2, marginLeft: 3 }}>
              <ProductDropdown
                dropdownStyles={styles}
                onProductChange={(value) => handleInputProductChange(index, value)}
              />
            </View>
            <TextInput
              style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
              placeholder="Qty"
              value={item.quantity}
              onChangeText={(value) => handleInputRateChange(index, "quantity", value)}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
              placeholder="Rate"
              value={item.rate}
              editable={false}
            keyboardType='numeric'
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
              placeholder="Amount"
              value={item.amount}
              keyboardType='numeric'
              editable={false}
              // onChangeText={(value) => handleInputChange(index, "amount", value)}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
              placeholder="HSN Code"
              value={item.hsnCode}
              editable={false}
            // onChangeText={(value) => handleInputChange(index, "hsnCode", value)}
            />
            <View style={styles.buttonContainer}>
              {index === 0 ? (
                <TouchableOpacity style={styles.addButton} onPress={addRow}>
                  <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              ) : index === rows.length - 1 ?(
                <TouchableOpacity style={styles.removeButton} onPress={() => removeRow(index)}>
                  <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                </TouchableOpacity>
              ):null}
            </View>
          </View>
        </Surface>
      ))}

      {/* Total Amount */}
      <Text style={styles.totalAmount}>
        Total Amount: {calculateTotalAmount().toLocaleString('en-IN')} /-
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdown: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalAmount: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default DynamicInputRows;


// const handleInputChange = (id, field, value) => {
// };