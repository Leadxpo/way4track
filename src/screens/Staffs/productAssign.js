import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from "react-native";
import Header from '../../components/userHeader';
import { Avatar, Card, FAB, Menu, Provider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchProductAssigns } from "../../Redux/Actions/productAssignAction";

const ProductAssign = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading:productAssignsLoading, productAssigns, error:productAssignsError } = useSelector(state => state.productAssigns);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);
  const hasAddProductassignPermission = permissions.some(p => p.name === "productassign" && p.add);
  const hasEditProductassignPermission = permissions.some(p => p.name === "productassign" && p.edit);
  const hasDeleteProductassignPermission = permissions.some(p => p.name === "productassign" && p.delete);

  useEffect(() => {
    const productAssignPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchProductAssigns(productAssignPayload));
  }, [dispatch]);

  const filteredData = productAssigns.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientInfo}>
            Phone: {item.phone}
          </Text>
          <Text style={styles.clientInfo}>DOA: {item.DOA}</Text>
          <Text style={styles.clientInfo}>Branch: {item.branch}</Text>
          <Text style={styles.clientInfo}>Amount: {item.amount}</Text>
          <Text
            style={[
              styles.status,
              { color: item.status === "Accepted" ? "green" : "red" },
            ]}
          >
            Status: {item.status}
          </Text>
        </View>
        <Menu
          visible={menuVisible && selectedItem === item.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(true);
                setSelectedItem(item.id);
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
          <Menu.Item onPress={() => { navigation.navigate("ProductAssignDetails", { productAssignDetails: item }) }} title="View" />
          {hasEditProductassignPermission && <Menu.Item onPress={() => { navigation.navigate("EditproductAssign", { productAssignDetails: item }) }} title="Edit" />}
          {hasDeleteProductassignPermission && <Menu.Item onPress={() => {
            Alert.alert(`Delete ${item.name} ProductAssign`, " Are you sure you want to delete this staff member from the database? Once deleted, you will no longer be able to access any records or perform operations related to this staff member.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with productAssignID ${item.client_id} was deleted`);
                }
              }
            ]);
          }} title="Delete" />}
        </Menu>
      </View>
    </Card>
  );

  return (
    <Provider>
      <Header />

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Client Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      {/* Add Products Button */}
      <FAB
        icon="plus" visible={hasAddProductassignPermission}
        label="Add Product Assign"
        style={styles.fab}
        onPress={() => {
          dispatch(drawLabel("Product Assign"));
          navigation.navigate('AddProductAssign');
        }}
      />

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 2,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8, backgroundColor: "#ffffff",
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
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clientInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default ProductAssign;
