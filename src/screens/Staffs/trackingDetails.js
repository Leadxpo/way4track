import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';

const TrackingStaff = () => {
  const productData = {
    name: 'Bike GPS Tracker',
    emiNumber: '1616 1616 1616 1616',
    vendor: {
      name: 'Shiva Raju',
      number: '9191919191',
      address: 'Vizag',
      email: 'shivaraju@gmail.com',
      gst: '37APNBJPS8813QZ10',
    },
    dateOfPurchase: '01 Nov, 2024',
    quantity: 1000,
    description: 'Way4Track offers tracking and monitoring services for your personal vehicle. Best GPS tracking device for bike.',
    warehouseStock: 600,
    branchStock: [100, 100, 100, 100],
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={productData.name}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={require('../../utilities/images/way4tracklogo.png')}
              style={styles.avatar}
            />
          )}
        />
        <Card.Content>
          <Text style={styles.label}>EMI Number:</Text>
          <Text style={styles.value}>{productData.emiNumber}</Text>

          <Text style={styles.label}>Vendor Name:</Text>
          <Text style={styles.value}>{productData.vendor.name}</Text>

          <Text style={styles.label}>Vendor Number:</Text>
          <Text style={styles.value}>{productData.vendor.number}</Text>

          <Text style={styles.label}>Vendor Address:</Text>
          <Text style={styles.value}>{productData.vendor.address}</Text>

          <Text style={styles.label}>Vendor Email ID:</Text>
          <Text style={styles.value}>{productData.vendor.email}</Text>

          <Text style={styles.label}>Vendor GST Number:</Text>
          <Text style={styles.value}>{productData.vendor.gst}</Text>

          <Text style={styles.label}>Date of Purchase:</Text>
          <Text style={styles.value}>{productData.dateOfPurchase}</Text>

          <Text style={styles.label}>Product Quantity:</Text>
          <Text style={styles.value}>{productData.quantity}</Text>

          <Text style={styles.label}>Product Description:</Text>
          <Text style={styles.value}>{productData.description}</Text>

          <Text style={styles.label}>No. of Products in Warehouse:</Text>
          <Text style={styles.value}>{productData.warehouseStock}</Text>

          {productData.branchStock.map((stock, index) => (
            <View key={index}>
              <Text style={styles.label}>No. of Products in Branch {index + 1}:</Text>
              <Text style={styles.value}>{stock}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => console.log('Request pressed')}>
          Request
        </Button>
        <Button mode="outlined" onPress={() => console.log('Close pressed')} style={styles.closeButton}>
          Close
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  avatar: {
    backgroundColor: '#28a745',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  closeButton: {
    borderColor: '#6c757d',
  },
});

export default TrackingStaff;
