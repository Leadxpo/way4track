import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text,Alert, TextInput, TouchableOpacity, ScrollView} from "react-native";
import { Avatar, Card, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ClientDetails = ({ navigation, route }) => {
  // Sample Client and Product Data
  const { clientDetails } = route.params;  // Sample address data

  const [searchQuery, setSearchQuery] = useState(""); 

  const productDetails = [
    {
      id: "1",
      date: "01-Mar-2025",
      service: "Product",
      item: "Car GPS Tracker",
      price: "₹2099",
      status: "Paid",
    },
    {
      id: "2",
      date: "02-Mar-2025",
      service: "Product",
      item: "Bike GPS Tracker",
      price: "₹1599",
      status: "Unpaid",
    },
    {
      id: "3",
      date: "03-Mar-2025",
      service: "Service",
      item: "Installation Service",
      price: "₹500",
      status: "Paid",
    },
  ];

  // Filter Logic
  const filteredData = productDetails.filter(
    (item) =>
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render Product Item
  const renderProduct = ({ item }) => (
    <Card style={styles.productCard}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          <Text style={styles.label}>No:</Text> {item.id}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Date:</Text> {item.date}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Service/Product:</Text> {item.service}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Items:</Text> {item.item}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Price:</Text> {item.price}
        </Text>
        <Text
          style={[
            styles.cardText,
            { color: item.status === "Paid" ? "green" : "red" },
          ]}
        >
          <Text style={styles.label}>Status:</Text> {item.status}
        </Text>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Client Details */}
      <Card style={styles.clientCard}>
        <View style={styles.clientDetails}>
          <View style={{width:"40%",justifyContent:"center",alignSelf:"center"}}>
          <Avatar.Image
            size={100} 
            source={{ uri: clientDetails.image }}
            style={styles.avatar}
          />
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientText}>
              <Text style={styles.label}>Name:</Text> {clientDetails.name}
            </Text>
            <Text style={styles.clientText}>
              <Text style={styles.label}>Phone:</Text> {clientDetails.phoneNumber}
            </Text>
            <Text style={styles.clientText}>
              <Text style={styles.label}>Email:</Text> {clientDetails.email}
            </Text>
            <Text style={styles.clientText}>
              <Text style={styles.label}>Branch:</Text> {clientDetails.branchName}
            </Text>
            <Text style={styles.clientText}>
              <Text style={styles.label}>DOB:</Text> {clientDetails.dob.toString().split('T')[0]}
            </Text>
            <Text style={styles.clientText}>
              <Text style={styles.label}>Address:</Text> {clientDetails.address}
            </Text>
          </View>
        </View>
      </Card>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Date, Item, Service, etc."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Product List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />

    </ScrollView>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  clientCard: {
    padding: 10,backgroundColor:"#ffffff",
    marginBottom: 20,width:"90%",
    borderRadius: 10,alignSelf:"center",
    elevation: 2,
  },
  clientDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 10,alignSelf:"center",elevation:3
  },
  clientInfo: {
    flex: 1,
  },
  clientText: {
    fontSize: 14,
    marginVertical: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 1,
  },
  productCard: {
    marginBottom: 10,alignSelf:"center",
    borderRadius: 10,width:"92%",marginVertical:5,
    elevation: 2,backgroundColor:"#ffffff"
  },
  cardContent: {
    padding: 10,
  },
  cardText: {
    fontSize: 14,
    marginVertical: 2,
  },
  list: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  saveButton: {
    flex: 0.48,
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    flex: 0.48,
    borderColor: "#000",
  },
});
