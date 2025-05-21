import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ProductAssignDetails = () => {
  // State for user and product details
  const [userDetails, setUserDetails] = useState({
    name: "K Praveen Sai",
    phone: "77788 77788",
    email: "way4track@gmail.com",
    branch: "Visakhapatnam",
    dob: "03 Mar 1970",
    address: "*****************",
  });

  const [productDetails, setProductDetails] = useState({
    productType: "Services",
    productName: "Bike GPS Tracker",
    dateOfAssign: "***************",
    numberOfProducts: "2343334",
    productImage: require("../../utilities/images/way4tracklogo.png"), // Replace with your placeholder or real image path
  });

  const handleEditDetails = () => {
    Alert.alert("Edit", "Feature to edit details can be implemented here.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Information */}
      <View style={styles.userCard}>
        <Avatar.Image
          size={80}
          source={require("../../utilities/images/way4tracklogo.png")} // Replace with a user avatar placeholder
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Name: </Text>
            {userDetails.name}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Phone: </Text>
            {userDetails.phone}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Email: </Text>
            {userDetails.email}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Branch: </Text>
            {userDetails.branch}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>DOB: </Text>
            {userDetails.dob}
          </Text>
          <Text style={styles.userInfoText}>
            <Text style={styles.label}>Address: </Text>
            {userDetails.address}
          </Text>
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.productCard}>
        <TouchableOpacity>
          <Avatar.Image
            size={120}
            source={productDetails.productImage}
            style={styles.productImage}
          />
        </TouchableOpacity>
        <Text style={styles.productName}>{productDetails.productName}</Text>
      </View>

      {/* Product Assignment Details */}
      <View style={styles.detailsContainer}>
        <TextInput
          label="Product Type"
          value={productDetails.productType}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Product Name"
          value={productDetails.productName}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Date of Assign"
          value={productDetails.dateOfAssign}
          editable={false}
          style={styles.input}
        />
        <TextInput
          label="Number of Products Assigned"
          value={productDetails.numberOfProducts}
          editable={false}
          style={styles.input}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          icon="pencil"
          mode="contained"
          onPress={handleEditDetails}
          style={styles.editButton}
        >
          Edit Details
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  userCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userInfoText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  productCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  productImage: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#F5F5F5",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ProductAssignDetails;
