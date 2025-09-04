import React, { useState, useEffect,useMemo, useCallback } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Avatar, Card, FAB, Menu, Provider ,SegmentedButtons} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { loadData } from "../../Utils/appData";
import { fetchRaiseRequests } from "../../Redux/Actions/raiseRequestAction";
import api from "../../Api/api";
import { useFocusEffect } from "@react-navigation/native";

const RequestRaise = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading: raiseRequestsLoading, raiseRequests = [], error: raiseRequestsError } = useSelector(
    (state) => state.raiserequests
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSegment, setActiveSegment] = useState("myRequests");
  const [permissions, setPermissions] = useState([]);
  const [staffID, setStaffID] = useState("");

  useEffect(() => {
    const loadPermissionsAndID = async () => {
      const loadedPermissions = await loadData("staffPermissions") || [];
      const loadedStaffID = await loadData("ID") || "";
      setPermissions(loadedPermissions);
      setStaffID(loadedStaffID);
    };
    loadPermissionsAndID();
  }, []);


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

  useFocusEffect(
    useCallback(() => {
      const getStaffData = async () => {
        const staffId = await loadData("ID");
        const requestPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
          id: staffId,
        };
        dispatch(fetchRaiseRequests(requestPayload));
      };
  
      getStaffData();
      }, [dispatch, isRefresh])
  );

const raiseRequestMap = useMemo(() => ({
  myRequests: raiseRequests?.filter((item) => {
    const currentUserId = item?.requestFrom?.id;
    return (Number(currentUserId) === Number(staffID))
  }),
  requests: raiseRequests?.filter((item) => {
    const requestTo = item?.requestTo?.id; 
    return (Number(requestTo) ===  Number(staffID))
  }),

}), [raiseRequests, staffID]);

const data =  raiseRequestMap[activeSegment]||[];

  const filteredData = data.filter((item) =>
    [item.requestType, item.requestTo, item.status, item.subDealerId, item.requestFrom]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "pending": return "#ffffff";
        case "accept": return "#ffeeec";
        case "completed": return "#e9f6ff";
        case "REJECT": return "#e9f6ff";
        default: return "#f3f3f3";
      }
    };
   
    return (
      <Card key={item.id} style={[styles.card, { backgroundColor: getStatusColor(item.status) }]}>
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
            { (activeSegment==="myRequests" && item.status === "pending") &&<Menu.Item
           onPress={() => {
            setMenuVisible(false);
            navigation.navigate("Home", {
              screen: "EditRequestRaise",
              params: {
                requestDetails: item,
              },
            });
          }}
          
            title="Edit"
          /> }
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
        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
            { value: 'myRequests', label: 'My Request', style: activeSegment === 'myRequests' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'requests', label: 'Request', style: activeSegment === 'requests' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
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
  segmentContainer: {
    backgroundColor: '#F0F0F0', color: '#333333',
    borderRadius: 10, margin: 10,alignSelf:'center',
    overflow: 'hidden',width:'50%'
  },

  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default RequestRaise;
