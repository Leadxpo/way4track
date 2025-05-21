import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ProductDropdown from './productDropdown';
import { Surface, Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DynamicWorkInputRows = ({ onRowsChange }) => {
  const [rows, setRows] = useState([{ productId: "", name: "", hsnCode: "", isInstall: false }]);

  const updateRows = (index, field, value) => {
    const updatedRows = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  const handleProductChange = async (index, value) => {
  //  await updateRows(index, "hsnCode", value.imeiNumber);
  const updatedRows = rows.map((row, i) =>
    i === index ? { ...row, ["productId"]: value.id,["name"]: value.productName,["hsnCode"]:value.imeiNumber } : row
  );
  setRows(updatedRows);
  onRowsChange(updatedRows); // Notify parent of changes

};

  const toggleInstallStatus = (index) => {
    Alert.alert(`Install ${rows[index].name} `, `have you install this product holding IMEI number :${rows[index].hsnCode}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Installed", onPress: () => {
          updateRows(index, "isInstall", !rows[index].isInstall);
        }
      }
    ]);    
  };

  const addRow = () => {
    setRows([...rows, { productId: "", name: "", hsnCode: "", isInstall: false }]);
    onRowsChange([...rows, { productId: "", name: "", hsnCode: "", isInstall: false }]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) {
      Alert.alert("Error", "You must have at least one row.");
      return;
    }
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    onRowsChange(updatedRows);
  };

  return (
    <View style={styles.container}>
      {rows.map((item, index) => (
        <Surface key={index} style={{marginVertical:20}}>
          <View style={[styles.rowContainer,{paddingHorizontal:10}]}>
            <ProductDropdown dropdownStyles={styles} productId={item.productId} onProductChange={(value) => handleProductChange(index, value)} />
          </View>

          <TextInput style={[styles.input,{marginHorizontal:10}]} placeholder="HSN Code" value={item.hsnCode} editable={false} />

          <View style={styles.switchContainer}>
            <Switch value={item.isInstall} onValueChange={() => toggleInstallStatus(index)} />
            <Text style={{fontWeight:700,fontSize:15,backgroundColor:item.isInstall ? 'green':'gray',padding:8,borderRadius:5,color:'#f3f3f3',elevation:3}}>{item.isInstall ? "Install" : "Uninstall"}</Text>
          </View>

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
        </Surface>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 12, width: 50, height: 50,
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
  container: { padding: 10 },
  card: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 8,
    elevation: 3,
  },
  rowContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 5, backgroundColor: "#f9f9f9", marginBottom: 10 },
  switchContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  addButton: { backgroundColor: "green", padding: 10, borderRadius: 5, alignItems: "center", justifyContent: "center" },
  removeButton: { backgroundColor: "red", padding: 10, borderRadius: 5, alignItems: "center", justifyContent: "center" },

});

export default DynamicWorkInputRows;
