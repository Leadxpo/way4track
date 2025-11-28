import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Alert
} from "react-native";
import { Card, Menu, Provider, SegmentedButtons, FAB,Modal } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../components/userHeader";
import { deleteTicket, fetchTickets } from "../../Redux/Actions/ticketAction";
import { loadData } from "../../Utils/appData";
import { useFocusEffect } from "@react-navigation/native";

const Tickets = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null); // ticket to show in modal
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const { tickets } = useSelector(state => state.ticketsReducer);
  const [permissions, setPermissions] = useState([]);
  const [staffID, setStaffID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeSegment, setActiveSegment] = useState("myTickets");

  useEffect(() => {
    const loadPermissionsAndID = async () => {
      const loadedPermissions = await loadData("staffPermissions") || [];
      const loadedStaffID = await loadData("ID") || "";
      setPermissions(loadedPermissions);
      setStaffID(loadedStaffID);
    };
    loadPermissionsAndID();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchTicketData = async () => {
        const payload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
        dispatch(fetchTickets(payload));
      };
      fetchTicketData();
    }, [dispatch])
  )

  const ticketMap = useMemo(() => ({

    myTickets: tickets?.filter((item) => {
      const currentUserId = item.staffId ?? item.subDealerId;
      console.log("rrr::", currentUserId, "===", staffID)
      return (Number(currentUserId) === Number(staffID))
    }),
    tickets: tickets?.filter((item) => {
      const reportingStaff = item.reportingStaffId;
      return (Number(reportingStaff) === Number(staffID))
    }),

  }), [tickets, staffID]);

  const data = ticketMap[activeSegment] || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#ffffff";
      case "accept": return "#ffeeec";
      case "completed": return "#e9f6ff";
      case "REJECT": return "#e9f6ff";
      default: return "#f3f3f3";
    }
  };

  // const hasAddTicketsPermission = permissions.some(p => p.name === "tickets" && p.add);
  // const hasEditTicketsPermission = permissions.some(p => p.name === "tickets" && p.edit);
  // const hasDeleteTicketsPermission = permissions.some(p => p.name === "tickets" && p.delete);

  const filteredTickets = data.filter((item) => {
    return (
      (item.staffId && item.staffId?.toString().includes(staffID)) ||
      (item.branchName && item.branchName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.addressingDepartment && item.addressingDepartment.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ticketNumber && item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  });

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
            const payload = { companyCode: "WAY4TRACK", unitCode: "WAY4", id: item.id };
            dispatch(deleteTicket(payload));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: getStatusColor(item.ticketStatus) }]}>
      <Text style={styles.clientName}>{item?.ticketNumber}</Text>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.clientInfo}>reporting Staff: {item?.reportingStaffName}</Text>
          <Text style={styles.clientInfo}>reporting Staff designation: {item?.designationRelation}</Text>
          <Text style={styles.clientInfo}>Branch: {item?.branchName}</Text>
          <Text style={[styles.status, { color: item?.ticketStatus === "accept" ? "green" : "red" }]}>
            Status: {item.ticketStatus}
          </Text>
        </View>
        <Menu
          visible={menuVisible && selectedItemId === item.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setSelectedItemId(item?.id);
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
          {/* <Menu.Item title="Delete" titleStyle={{ color: "red" }} onPress={() => handleDelete(item)} /> */}
          {/* )} */}
          <Menu.Item
            onPress={() => {
              setSelectedTicket(item);
              setIsDetailsModalVisible(true);
              setMenuVisible(false);
              console.log("rrr::",selectedTicket)
            }}
            title="Details"
          />
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

        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
            { value: 'myTickets', label: 'My Tickets', style: activeSegment === 'myTickets' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'tickets', label: 'Tickets', style: activeSegment === 'tickets' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
          ]}
          density="medium"
          style={styles.segmentContainer}
          theme={{
            colors: {
              primary: '#007AFF', // Active Tab Color
              onSurfaceVariant: '#fff', // Text color
            },
          }}
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
        <Modal
  visible={isDetailsModalVisible}
  transparent={true}
  animationType="fade" 
  onRequestClose={() => setIsDetailsModalVisible(false)}
>
  <TouchableOpacity
    style={styles.modalOverlay}
    activeOpacity={1}
    onPressOut={() => setIsDetailsModalVisible(false)}
  >           
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              onPress={() => setIsDetailsModalVisible(false)}
              activeOpacity={1}
            />
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Ticket Details</Text>
              <Text style={styles.modalText}>Ticket Number: {selectedTicket?.ticketNumber}</Text>
              <Text style={styles.modalText}>Date: {new Date(selectedTicket?.date).toDateString()}</Text>
              <Text style={styles.modalText}>Branch: {selectedTicket?.branchName}</Text>
              <Text style={styles.modalText}>Staff: {selectedTicket?.staffName}</Text>
              <Text style={styles.modalText}>Status: {selectedTicket?.ticketStatus}</Text>
              {selectedTicket?.problem ? (
                <Text style={styles.modalText}>Problem: {selectedTicket?.problem}</Text>
              ) : null}
              {selectedTicket?.remark ? (
                <Text style={styles.modalText}>Remark: {selectedTicket?.remark}</Text>
              ) : null}

              <TouchableOpacity
                onPress={() => setIsDetailsModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

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
  segmentContainer: {
    backgroundColor: '#F0F0F0', color: '#333333',
    borderRadius: 10, margin: 10, alignSelf: 'center',
    overflow: 'hidden', width: '50%'
  },
  activeButton: {
    backgroundColor: '#28a745', // Active button background
    color: '#fff', // Active text color
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Inactive button background
    color: '#000', // Inactive text color
  },
  card: {
    marginBottom: 10, padding: 10,
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
  searchInput: {
    height: 50,
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 3,
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 9999
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF"
  },
  modalText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333"
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center"
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Tickets;
