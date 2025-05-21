import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchVendors } from "../../Redux/Actions/vendorAction";
import Header from '../../components/userHeader';
import { permissions } from "../../Utils/permissions";

const Vendors = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading:subdealersLoading, vendors, error:subdealereError } = useSelector(state => state.vendors);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);
  const hasAddVendorPermission = permissions.some(p => p.name === "vendor" && p.add);
  const hasEditVendorPermission = permissions.some(p => p.name === "vendor" && p.edit);
  const hasDeleteVendorPermission = permissions.some(p => p.name === "vendor" && p.delete);

  useEffect(() => {
    const vendorPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchVendors(vendorPayload));
  }, [dispatch]);

  const filteredData = vendors?.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vendorId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vendor_phone_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return(
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={styles.vendorName}>{item.name}</Text>
          <Text style={styles.vendorInfo}>
            Phone Number: {item.phoneNumber}
          </Text>
          <Text style={styles.vendorInfo}>Start Date: {item.joiningDate?.split("T")[0]}</Text>
        </View>
        <Menu
          visible={menuVisible && selectedItem === item.vendorId}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(true);
                setSelectedItem(item.vendorId);
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item titleStyle={{ color: "green" }} title='View' onPress={() => { navigation.navigate("VendorDetails", { vendorDetails: item }) }} />
          {hasEditVendorPermission &&<Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditVendor", { vendorDetails: item }) }} />}
          {hasDeleteVendorPermission &&<Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
            Alert.alert(`Delete ${item.name} Staff`, " Are you sure you want to delete this Vendor from the database? Once deleted, you will no longer be able to access any records or perform operations related to this Vendor.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with clienID ${item.vendorId} deleted`);
                }
              }
            ]);
          }} />}
        </Menu>
      </View>
    </Card>
  )};

  return (
    <Provider>
            {/* Header */}
            <Header />
      {/* Dropdown for Branches */}

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Vendor Name"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.vendorId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <FAB icon="plus" visible={hasAddVendorPermission} label="AddVendor" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Vendors"));
          navigation.navigate('AddVendor');
        }} />

      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 16,
    backgroundColor: "#f8f9fa",
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  vendorInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Vendors;
