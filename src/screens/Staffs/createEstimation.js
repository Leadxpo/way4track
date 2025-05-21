import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClientDropdown from '../../components/clientDropdown';
import ProductDropdown from '../../components/productDropdown';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';
import { createEstimate } from '../../Redux/Actions/estimatesAction';
import GenerateEstimatePDF from '../../components/estimateTemplate';

const CreateEstimate = ({ navigation }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    clientId:'',
    clientNumber: "",
    email: "",
    clientAddress: "", 
    billingAddress: "",
    estimateDate: "",
    expiryDate: "",
    terms: "",
    items: [{ productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }],
  });
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleInputDateChange = (field, value) => {
    let newFormData = { ...formData, [field]: formatDate(value) };

    // If estimate date is selected, auto-set expiry date (estimateDate + 3 days)
    if (field === "estimateDate") {
      const expiryDate = new Date(value);
      expiryDate.setDate(expiryDate.getDate() + 3); // Add 3 days
      newFormData.expiryDate = formatDate(expiryDate);
    }

    setFormData(newFormData);
  };

  const handleInputClientChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value.clientId, ['clientNumber']: value.phoneNumber, ['clientAddress']: value.address, ['email']: value.email, ['billingAddress']: value.address }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleItemProductChange = (index,  value) => {
    const updatedItems = [...formData.items];
    updatedItems[index]["productId"]= value.id;
    updatedItems[index]["name"]= value.productName;
    updatedItems[index]["rate"]= value.price;
    updatedItems[index]["hsnCode"]=value.imeiNumber;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleInputRateChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    // Calculate the amount based on the new rate and quantity
    const itemQuantity = parseInt(updatedItems[index].quantity) || 0; // Ensure quantity is a number
    const itemRate =parseInt(updatedItems[index].rate) || 0; // Ensure rate is a valid number
    
    // Calculate the new amount
    const itemAmount = itemQuantity * itemRate;

    // Update the row with the calculated amount
    updatedItems[index]["amount"]=itemAmount.toFixed(2)
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };


  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const createEstimate_payload = {
      clientId: formData.clientId,
      buildingAddress: formData.billingAddress,
      estimateDate: formData.estimateDate,
      expireDate: formData.expiryDate,
      productOrService: formData.items.map((item) => item.name).join(", "),
      description: formData.terms,
      totalAmount: formData.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0),
      companyCode: "WAY4TRACK", // Replace with actual company code
      unitCode: "WAY4", // Replace with actual unit code
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        amount: parseFloat(item.rate) * parseInt(item.quantity, 10),
        hsnCode: item.hsnCode,
      })),
    };
    const estimatePDF=GenerateEstimatePDF(formData)
    // Send payload to API or handle it as needed
    dispatch(createEstimate(createEstimate_payload,estimatePDF))
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Client</Text>
        <ClientDropdown
          dropdownStyles={styles}
          onClientChange={(value) => handleInputClientChange("clientId", value)}
        />

        <Text style={styles.label}>Client Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Client Number"
          value={formData.clientNumber}
          onChangeText={(value) => handleInputChange("clientNumber", value)}
        />

        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email ID"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <Text style={styles.label}>Client Address</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter Client Address"
          multiline
          value={formData.clientAddress}
          onChangeText={(value) => handleInputChange("clientAddress", value)}
        />

        <Text style={styles.label}>Billing Address</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter Billing Address"
          multiline
          value={formData.billingAddress}
          onChangeText={(value) => handleInputChange("billingAddress", value)}
        />

        <View style={styles.rowContainer}>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Estimate Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Estimate Date"
              value={formData.estimateDate}
              onPress={() => setOpen(true)}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              mode='date'
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                handleInputDateChange("estimateDate", date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={formData.expiryDate}
              onChangeText={(value) => handleInputChange("expiryDate", value)}
            />
          </View>
        </View>

        <Text style={styles.label}># Product / Service</Text>
        {formData.items.map((item, index) => (
          <Surface
            key={index}
            mode="elevated"
            style={{ borderColor: "#dddddd", borderWidth: 1, padding: 5, backgroundColor: "#ffffff", borderRadius: 5, marginVertical: 8 }}
          >
            <View style={[styles.rowContainer, { flex: 1 }]}>
              <View style={{ flex: 2, marginLeft: 3 }}>

                <ProductDropdown 
                  dropdownStyles={styles} productId={item.productId}
                  onProductChange={(value) => handleItemProductChange(index, value)}
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
                onChangeText={(value) => handleItemChange(index, "rate", value)}
              />
            </View>
            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
                placeholder="Amount"
                value={item.amount}
                onChangeText={(value) => handleItemChange(index, "amount", value)}
              />
              <TextInput
                style={[styles.input, { flex: 1, marginHorizontal: 3 }]}
                placeholder="HSN Code"
                value={item.hsnCode}
                onChangeText={(value) => handleItemChange(index, "hsnCode", value)}
              />
              {index === 0 ? (
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                  <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              ) : index === formData.items.length - 1 ? (
                <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                  <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                </TouchableOpacity>
              ) : null}
            </View>
          </Surface>
        ))}

        <Text style={styles.label}>Other Information / Terms & Conditions</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter Terms & Conditions"
          multiline
          value={formData.terms}
          onChangeText={(value) => handleInputChange("terms", value)}
        />

        <Button
          mode="contained"
          buttonColor="#FFA500"
          textColor="#fff"
          style={styles.saveButton}
          onPress={handleSave}
        >
          Save & Send
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  createEstimateButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    height: 80,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 8,
    marginLeft: 4,
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 8,
    marginLeft: 4,
  },
  saveButton: {
    marginTop: 16,
    marginBottom:70
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default CreateEstimate;
