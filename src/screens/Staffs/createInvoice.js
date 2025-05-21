import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Surface, SegmentedButtons } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClientDropdown from '../../components/clientDropdown';
import ProductDropdown from '../../components/productDropdown';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';
import { createEstimate, createInvoice } from '../../Redux/Actions/estimatesAction';
import LinearGradient from 'react-native-linear-gradient';

const CreateInvoice = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { estimateDetails } = route.params;  // Sample address data
  const [totalAmount, setTotalAmount] = React.useState('');
  const [formData, setFormData] = useState({
    clientId: estimateDetails.clientId || '',
    clientNumber: estimateDetails.clientPhoneNumber || "",
    email: estimateDetails.clientEmail || "",
    clientAddress: estimateDetails.clientAddress || "",
    billingAddress: estimateDetails.buildingAddress || "",
    estimateDate: "",
    expiryDate: "",
    terms: estimateDetails.description || "",
    items: estimateDetails.products?.map(product => ({
      productId: "", // Assuming there's no productId in estimateDetails
      name: product.name || "",
      quantity: product.quantity.toString() || "",
      rate: (product.amount).toString() || "",
      amount: (parseInt(product.quantity) * parseInt(product.amount)).toString() || "",
      hsnCode: estimateDetails.hsnCode || ""
    })) || [{ productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }],
    GSTORTDS: "",
    SGST: '0',
    CGST: '0'
  });
const [SGSTAmount,setSGSTAmount]=useState(0);
const [CGSTAmount,setCGSTAmount]=useState(0);
const [finalAmount,setFinalAmount]=useState(0);

  useEffect(() => {
    setFormData({
      clientId: estimateDetails.clientId || '',
      clientNumber: estimateDetails.clientPhoneNumber || "",
      email: estimateDetails.clientEmail || "",
      clientAddress: estimateDetails.clientAddress || "",
      billingAddress: estimateDetails.buildingAddress || "",
      estimateDate: "",
      expiryDate: "",
      terms: estimateDetails.description || "",
      items: estimateDetails.products?.map(product => ({
        productId: "", // Assuming there's no productId in estimateDetails
        name: product.name || "",
        quantity: product.quantity.toString() || "",
        rate: (product.amount).toString() || "",
        amount: (parseInt(product.quantity) * parseInt(product.amount)).toString() || "",
        hsnCode: estimateDetails.hsnCode || ""
      })) || [{ productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }],
      GSTORTDS: '',
      SGST: '0',
      CGST: '0'
    })
    setTotalAmount(estimateDetails.totalAmount)
    setFinalAmount(estimateDetails.totalAmount)
  }, [estimateDetails])

  useEffect(() => {
    const SGSTValue = parseInt(totalAmount) * ( parseInt(formData.SGST)/100);
    setSGSTAmount(SGSTValue)
    const CGSTValue = parseInt(totalAmount) * (parseInt(formData.CGST)/100);
    setCGSTAmount(CGSTValue)

    const finalValue = totalAmount - (SGSTValue + CGSTValue)
    setFinalAmount(finalValue)

  })

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

  const handleItemProductChange = (index, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index]["productId"] = value.id;
    updatedItems[index]["name"] = value.productName;
    updatedItems[index]["rate"] = value.price;
    updatedItems[index]["hsnCode"] = value.imeiNumber;

    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleInputRateChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    // Calculate the amount based on the new rate and quantity
    const itemQuantity = parseInt(updatedItems[index].quantity) || 0; // Ensure quantity is a number
    const itemRate = parseInt(updatedItems[index].rate) || 0; // Ensure rate is a valid number

    // Calculate the new amount
    const itemAmount = itemQuantity * itemRate;

    // Update the row with the calculated amount
    updatedItems[index]["amount"] = itemAmount.toFixed(2)
    setFormData((prev) => ({ ...prev, items: updatedItems }));
    setFormData((prev) => {
      const newTotalAmount = prev.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
      setTotalAmount(newTotalAmount);
      return prev;
    });
  };


  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", name: "", quantity: "", rate: "", amount: "", hsnCode: "" }],
    }));
  };



  const removeItem = (index) => {
    setFormData((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);

      // Calculate new total amount
      const newTotalAmount = updatedItems.reduce((total, item) => total + parseFloat(item.amount || 0), 0);

      // Update formData and return the new state
      return {
        ...prev,
        items: updatedItems
      };
    });

    // Use the callback version of setFormData to ensure the latest state is used
    setFormData((prev) => {
      const newTotalAmount = prev.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
      setTotalAmount(newTotalAmount);
      return prev;
    });
  };


  const handleSave = () => {
    const createInvoice_payload = {
      id: estimateDetails.id,
      estimateId: estimateDetails.estimateId || '',
      clientId: formData.clientId,
      buildingAddress: formData.billingAddress,
      // estimateDate: formData.estimateDate,
      // expireDate: formData.expiryDate,
      productOrService: formData.items.map((item) => item.name).join(", "),
      description: formData.terms,
      totalAmount: formData.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0),
      convertToInvoice: true,
      companyCode: "WAY4TRACK", // Replace with actual company code
      unitCode: "WAY4", // Replace with actual unit code
      productDetails: formData.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: parseInt(item.quantity, 10),
        // amount: parseFloat(item.rate) * parseInt(item.quantity, 10),
         hsnCode: item.hsnCode,
      })),
      GSTORTDS: formData.GSTORTDS,
      SGST: formData.SGST,
      CGST: formData.CGST
    };
    // Send payload to API or handle it as needed
    dispatch(createInvoice(createInvoice_payload))
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Client</Text>
        <ClientDropdown
          dropdownStyles={styles}
          clientId={formData.clientId}
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

        {/* <View style={styles.rowContainer}>
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
        </View> */}

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
                  dropdownStyles={styles}
                  productId={item.productId}
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
        <View style={{ alignItems: 'center', }}>
          <SegmentedButtons
            value={formData.GSTORTDS}
            onValueChange={(value) => handleInputChange("GSTORTDS", value)}
            buttons={[
              { value: 'GST', label: 'GST' },
              { value: 'TDS', label: 'TDS' },
            ]}
          />
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
          <View style={{ width: '50%', paddingEnd: 8 }}>
            <Text style={styles.label}>SGST</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Enter SGST"
              multiline
              value={formData.SGST}
              onChangeText={(value) => handleInputChange("SGST", value)}
            />
          </View>
          <View style={{ width: '50%' }}>
            <Text style={styles.label}>CGST</Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter CGST"
              multiline
              value={formData.CGST}
              onChangeText={(value) => handleInputChange("CGST", value)}
            />
          </View>
        </View>
        <Card style={{ backgroundColor: '#ffffff' }}>
          <Card.Content>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}>Amount</Text>
              <Text style={{ flex: 1 }}>:</Text>
              <Text style={{ flex: 1 }}>{totalAmount}</Text>
            </View>

            <LinearGradient
              colors={["#2E7D32", "#ffffff"]} // Green Gradient (light to dark)
              start={{ x: 0, y: 0 }} // Gradient direction start
              end={{ x: 1, y: 1 }}   // Gradient direction end
              style={{
                flex: 1,
                borderRadius: 5,
                marginVertical: 10,
                padding: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: '700', fontSize: 15, color: "#fff" }}>
                {formData.GSTORTDS}
              </Text>
            </LinearGradient>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}>SGST</Text>
              <Text style={{ flex: 1 }}>:</Text>
              <Text style={{ flex: 1 }}>{SGSTAmount}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}>CGST</Text>
              <Text style={{ flex: 1 }}>:</Text>
              <Text style={{ flex: 1 }}>{CGSTAmount}</Text>
            </View>
            <LinearGradient
              colors={["#2E7D32", "#333333"]} // Green Gradient (light to dark)
              start={{ x: 0, y: 0 }} // Gradient direction start
              end={{ x: 1, y: 1 }}   // Gradient direction end
              style={{
                flex: 1,
                borderRadius: 5,
                marginVertical: 10,
                padding: 8,
                alignItems: "center",flexDirection: 'row',
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: '700', fontSize: 15, color: "#fff" }}>
                Final Amount
              </Text>
              <Text style={{ fontWeight: '700', fontSize: 15, color: "#fff" }}>
                {finalAmount}
              </Text>
            </LinearGradient>
          </Card.Content>
        </Card>
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
    marginBottom: 70
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

export default CreateInvoice;
