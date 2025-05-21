import React, { useState, useEffect } from "react";
import {
  View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Alert
} from "react-native";
import { Card, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/userHeader";
import { fetchTickets } from "../../Redux/Actions/ticketAction";
import { loadData } from "../../Utils/appData";

const Tickets = ({ navigation }) => {
  const dispatch = useDispatch();

  const { tickets } = useSelector(state => state.ticketsReducer);

  const [permissions, setPermissions] = useState([]);
  const [staffID, setStaffID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const loadPermissionsAndID = async () => {
      const loadedPermissions = await loadData("staffPermissions") || [];
      const loadedStaffID = await loadData("ID") || "";
      setPermissions(loadedPermissions);
      setStaffID(loadedStaffID);
    };
    loadPermissionsAndID();
  }, []);

  useEffect(() => {
    const fetchTicketData = async () => {
      const payload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
      dispatch(fetchTickets(payload));
    };
    fetchTicketData();
  }, [dispatch]);

  // const hasAddTicketsPermission = permissions.some(p => p.name === "tickets" && p.add);
  // const hasEditTicketsPermission = permissions.some(p => p.name === "tickets" && p.edit);
  // const hasDeleteTicketsPermission = permissions.some(p => p.name === "tickets" && p.delete);

  const filteredTickets = tickets.filter((item) =>
    (item.staffId && item.staffId?.toString().includes(staffID)) ||
    (item.branchName && item.branchName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.addressingDepartment && item.addressingDepartment.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.ticketNumber && item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleEdit = (item) => {
    navigation.navigate("Home", {
      screen: "AddTickets",
      params: { ticketData: item }
    });
  };

  const handleDelete = (item) => {
    Alert.alert(
      `Delete ${item.ticketNumber}`,
      "Are you sure you want to delete this ticket?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // Dispatch delete ticket action here
            console.log(`Deleting ticket ID: ${item.id}`);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.clientName}>{item.ticketNumber}</Text>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.clientInfo}>Branch: {item.branchName}</Text>
          <Text style={styles.clientInfo}>Department: {item.addressingDepartment}</Text>
          <Text style={[styles.status, { color: item.status === "Accepted" ? "green" : "red" }]}>
            Status: {item.workStatus}
          </Text>
        </View>
        <Menu
          visible={menuVisible && selectedItemId === item.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setSelectedItemId(item.id);
                setMenuVisible(true);
              }}
            >
              <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity>
          }
        >
          {/* {hasEditTicketsPermission && ( */}
            <Menu.Item onPress={() => handleEdit(item)} title="Edit" />
          {/* )} */}
          {/* {hasDeleteTicketsPermission && ( */}
            <Menu.Item title="Delete" titleStyle={{ color: "red" }} onPress={() => handleDelete(item)} />
          {/* )} */}
          <Menu.Item onPress={() => console.log("Details:", item)} title="Details" />
        </Menu>
      </View>
    </Card>
  );

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Ticket ID"
          placeholderTextColor="#aaaaaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredTickets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        {/* {hasAddTicketsPermission && ( */}
          <FAB
            icon="plus"
            label="Create Ticket"
            style={styles.fab}
            onPress={() => navigation.navigate("Home", { screen: "AddTickets" })}
          />
        {/* )} */}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa", flex: 1
  },
  listContent: {
    padding: 10,
  },
  fab: {
    backgroundColor: '#4CAF50',
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  card: {
    marginBottom: 10,padding:10,
    borderRadius: 8,backgroundColor:"#ffffff",
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
  searchInput: {
    height: 50,
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Tickets;
