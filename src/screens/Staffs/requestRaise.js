import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Avatar, Card, FAB, Menu, Provider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { loadData } from "../../Utils/appData";
import { fetchRaiseRequests } from "../../Redux/Actions/raiseRequestAction";
import api from "../../Api/api";

const RequestRaise = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading: raiseRequestsLoading, raiseRequests = [], error: raiseRequestsError } = useSelector(
    (state) => state.raiserequests
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const deleteRequest = async (ticketId) => {
    try {
      const payload = {
        id: ticketId,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      };

      const res = await api.post('/requests/deleteRequestDetails', payload);

      if (res.status) {
        Alert.alert('request deleted successfully.');
        setIsRefresh(!isRefresh)
      } else {
        Alert.alert('Failed to delete request.');
      }
    } catch (err) {
      console.error('Failed to delete request:', err);
      Alert.alert('An error occurred while deleting the ticket.');
    }

  }

  useEffect(() => {
    const getStaffData = async () => {
      const staffId = await loadData("ID");
      console.log("rrr : ", staffId)
      const requestPayload = {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
        id: staffId,
      };
      dispatch(fetchRaiseRequests(requestPayload));
    };

    getStaffData();
  }, [dispatch, isRefresh]);

  const filteredData = raiseRequests.filter((item) =>
    [item.requestType, item.requestTo, item.status, item.subDealerId, item.requestFrom]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "accepted": return "#c1e1c1";   // light green
        case "rejected": return "#ffa9a8";   // light red/pink
        case "expire": return "#d3d3d3";     // gray
        case "sent": return "#add8e6";       // light blue
        case "declined": return "#ffc4a8";   // light orange
        case "pending": return "#add8e6";    // light yellow
        default: return "#f3f3f3";           // default light gray
      }
    };

    return (
      <Card style={[styles.card, { backgroundColor: getStatusColor(item.status) }]}>
        <View style={styles.cardContent}>
          <View style={[styles.details]}>
            <Card.Title
              title={item.requestType}
              subtitle={item.requestId}
              titleStyle={styles.clientName}
            />
            <Text
              style={[
                styles.status,
                { color: item.status === "Accepted" ? "green" : "#333333", justifyContent: "center", position: 'absolute', fontSize: 10, zIndex: 99, top: 20, right: 10, textTransform: "uppercase", backgroundColor: "#f3f3f3", elevation: 3, padding: 5, width: 100, textAlign: 'center', borderRadius: 10 },
              ]}
            >
              {item.status}
            </Text>
          </View>

          <Menu
            visible={menuVisible && selectedItem === item.id}
            onDismiss={() => {
              setMenuVisible(false);
              setSelectedItem(null);
            }}
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
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Home", {
                  screen: "RequestRaiseDetails",
                  params: { requestRaiseDetails: item },
                },
                );
              }}
              title="View"
            />
            {/* <Menu.Item
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("EditRequestRaise", {
                productAssignDetails: item,
              });
            }}
            title="Edit"
          /> */}
            {item.status === "pending" &&

              <Menu.Item
                onPress={() => {
                  setMenuVisible(false);
                  Alert.alert(
                    `Delete ${item.name}`,
                    "Are you sure you want to delete this request? Once deleted, it cannot be recovered.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive", // makes it red on iOS
                        onPress: () => deleteRequest(item.id), // pass the ID or relevant identifier
                      },
                    ]
                  );
                }}
                title="Delete"
              />
            }
          </Menu>
        </View>
      </Card>
    )
  };

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Request Type, Name, etc."
          placeholderTextColor="#aaaaaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.noDataText}>No data found.</Text>}
        />

        <FAB
          icon="plus"
          label="Add Request Raise"
          style={styles.fab}
          onPress={() => {
            dispatch(drawLabel("Request Raise"));
            navigation.navigate("Home", {
              screen: "AddRequestRaise",
            })
          }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  fab: {
    backgroundColor: '#4CAF50',width:'70%',
    elevation: 4,marginBottom:50,alignSelf:'center'
},

  searchInput: {
    height: 40, width: "90%",
    backgroundColor: "#fff",
    margin: 10, alignSelf: "center",
    borderRadius: 8, borderColor: "#f3f3f3",
    paddingHorizontal: 15,
    fontSize: 16, borderWidth: 1,
    elevation: 2,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginVertical: 10,
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

export default RequestRaise;
