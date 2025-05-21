import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, FAB, Menu, Provider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchVouchers } from "../../Redux/Actions/vouchersAction";
import Header from '../../components/userHeader';

const Vouchers = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading:voucherLoading, vouchers, error:voucherError } = useSelector(state => state.vouchersReducers);
  const [searchQuery, setSearchQuery] = useState("");
  const [voucherData, setVoucherData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const vouchersPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" } 
    dispatch(fetchVouchers(vouchersPayload));
    console.log("vouchers : ",vouchers)
  }, [dispatch]);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);

const hasAddVoucherPermission = permissions.some(p => p.name === "voucher" && p.add);
const hasEditVoucherPermission = permissions.some(p => p.name === "voucher" && p.edit);
const hasDeleteVoucherPermission = permissions.some(p => p.name === "voucher" && p.delete);

  const filteredData = vouchers?.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.clientInfo}>
            Designation: {item.designation}
          </Text>
          <Text style={styles.clientInfo}>Joining Date: {item.joiningDate}</Text>
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
          {hasEditVoucherPermission &&<Menu.Item onPress={() => console.log("Edit")} title="Edit" />}
          {hasDeleteVoucherPermission &&<Menu.Item onPress={() => console.log("Delete")} title="Delete" />}
          <Menu.Item onPress={() => console.log("Details")} title="Details" />
        </Menu>
      </View>
    </Card>
  );

  return (
    <Provider>
      {/* Header */}
      <Header />
      {/* Dropdown for Branches */}

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Voucher"
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
        <FAB icon="plus" visible={hasAddVoucherPermission} label="AddVoucher" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Voucher"));
          navigation.navigate('CreateVoucher');
        }} />
      </View>
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

export default Vouchers;


// switch (role) {
//     case "CEO":
//       setHomeComponent(Home_CEO);
//       setBranchComponent(Branch);
//       break;
//     case "HR":
//       setHomeComponent(Home_HR);
//       setBranchComponent(Branch_HR);
//       break;
//     case "Accountant":
//       setHomeComponent(Home_CEO);
//       setBranchComponent(Branch);
//       break;
//     case "Warehouse Manager":
//       setHomeComponent(Home_WarehouseManager);
//       setBranchComponent(Branch_WarhouseManager);
//       break;
  
//     case "Branch Manager":
//       setHomeComponent(Home_BranchManager);
//       setBranchComponent(Branch);
//       break;
  
//     case "Sub Dealer":
//       setHomeComponent(Home_Subdealer);
//       setBranchComponent(Branch);
//       break;
  
//     case "Technician":
//       setHomeComponent(Home_Technician);
//       setBranchComponent(Branch);
//       break;
  
//     case "Sales Man":
//       setHomeComponent(Home_SalesMen);
//       setBranchComponent(Branch);
//       break;
  
//     default:
//       break;
//   }
  