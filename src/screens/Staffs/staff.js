import React, { useState,useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, Alert} from "react-native";
import { Card, Menu, MD3Colors, Provider as PaperProvider, Icon, FAB, } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchStaffs, staffPermissionById } from "../../Redux/Actions/staffAction";
import Header from '../../components/userHeader';

const Staff = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(null); // Track which product's menu is open
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading:staffsLoading, staffs, error:staffeError } = useSelector(state => state.staffs);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);

  const hasAddStaffPermission = permissions.some(p => p.name === "staff" && p.add);
  const hasEditStaffPermission = permissions.some(p => p.name === "staff" && p.edit);
  const hasDeleteStaffPermission = permissions.some(p => p.name === "staff" && p.delete);

  // Filter Logic
  const filteredData = staffs?.filter( (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch?.branchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const staffsPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4"}
    dispatch(fetchStaffs(staffsPayload));
  }, [dispatch])

  // Render Staff Item
  const renderStaff = ({ item }) => {
    return(
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.staffPhoto }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.designation}</Text>
          <Text style={styles.location}>{item.branch?.branchName || "No Branch Assigned"}</Text>
        </View>
        <Menu
          visible={visibleMenu === item.id}
          onDismiss={() => setVisibleMenu(null)}
          anchor={<TouchableOpacity onPress={() => setVisibleMenu(item.id)}>
            <Icon
              source="dots-vertical"
              color={MD3Colors.neutral30}
              size={20}

            />
          </TouchableOpacity>}
        >
          <Menu.Item titleStyle={{ color: "green" }}  title='View' onPress={() => { navigation.navigate("StaffDetails", { staffDetails: item }) }} />
          {hasEditStaffPermission&&<Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditStaff", { staffDetails: item }) }} />}
          {hasDeleteStaffPermission&&<Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() =>{ 
            Alert.alert(`Delete ${item.name} Staff`, " Are you sure you want to delete this staff member from the database? Once deleted, you will no longer be able to access any records or perform operations related to this staff member.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with staffID ${item.client_id} was deleted`);
                }
              }
            ]);
          }} />}
        </Menu>
      </View>
    </Card>
  )};

  return (
    <PaperProvider>
      {/* Header */}
      <Header />
      {/* Dropdown for Branches */}
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Staff"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Staff List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderStaff}
          contentContainerStyle={styles.listContainer}
        />
        <FAB icon="plus" visible={hasAddStaffPermission} label="AddStaff" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Staff"));
          navigation.navigate('AddStaff');
        }} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
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
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
});

export default Staff;
