import React, { useState,useEffect} from "react";
import {
  View,
  FlatList,
  Text,
  TextInput, Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchClients } from "../../Redux/Actions/clientAction";
import Header from '../../components/userHeader';
import { permissions } from "../../Utils/permissions";

const Clients = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading:clientsLoading, clients, error:clienteError } = useSelector(state => state.clients);
  
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);

  const hasAddClientPermission = permissions.some(p => p.name === "client" && p.add);
  const hasEditClientPermission = permissions.some(p => p.name === "client" && p.edit);
  const hasDeleteClientPermission = permissions.some(p => p.name === "client" && p.delete);


  const filteredData = clients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.branchId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const clientPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchClients(clientPayload));
  }, [dispatch])

  const renderItem = ({ item }) => {
    console.log("client item : ",item)
    return(
    <Card style={styles.card}>
      <View style={{backgroundColor:"#27AE60",borderTopEndRadius:6,borderTopStartRadius:6,padding:5,justifyContent:'center'}}>
        <Text style={[styles.clientName,{textAlign:'center',color:'#f3f3f3'}]}>{item.clientId}</Text>
      </View>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.clientPhoto }} />
        <View style={styles.details}>
          <Text style={[styles.clientName,{textTransform:"capitalize"}]}>{item.name}</Text>
          <Text style={styles.clientInfo}>
            Phone No.: {item.phoneNumber}
          </Text>
          <Text style={styles.clientInfo}>DOJ: {item.joiningDate}</Text>
          
        </View>
        <Menu
          visible={menuVisible && selectedItem === item.clientId}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(true);
                setSelectedItem(item.clientId);
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
         <Menu.Item titleStyle={{ color: "green" }} title='View' onPress={() => { navigation.navigate("ClientDetails", { clientDetails: item }) }} />
         {hasEditClientPermission && <Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditClient", { clientDetails: item }) }} />}
         {hasDeleteClientPermission &&  <Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
            Alert.alert(`Delete ${item.name} Client`, " Are you sure you want to delete this Client from the database? Once deleted, you will no longer be able to access any records or perform operations related to this Client.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with clienID ${item.client_id} deleted`);
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
          placeholder="Search Client Name"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.clientId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <FAB icon="plus" label="AddClient" visible={hasAddClientPermission} style={styles.fab} onPress={() => {
          dispatch(drawLabel("Clients"));
          navigation.navigate('AddClient');
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

export default Clients;
