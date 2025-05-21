import React, { useState,useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Avatar, Card, FAB, Menu, Provider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHirings } from "../../Redux/Actions/hiringAction";
import { drawLabel } from "../../Redux/Actions/drawAction";
import Header from '../../components/userHeader';

const Hiring = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);
  const hasAddHiringPermission = permissions.some(p => p.name === "hiring" && p.add);
  const hasEditHiringPermission = permissions.some(p => p.name === "hiring" && p.edit);
  const hasDeleteHiringPermission = permissions.some(p => p.name === "hiring" && p.delete);

  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading:hiringLoading, hirings, error:hiringError } = useSelector(state => state.hiringsReducer);



  useEffect(() => {
    const hiringPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchHirings(hiringPayload));
  }, [dispatch])

  const filteredData = hirings.filter((item) =>
    item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const renderItem = ({ item }) => {
    const statusColor='gray'
    switch (item.status) {
      case 'Pending':
        statusColor='blue';
        break;
      case 'Rejected':
        statusColor='red';
        break;
     
      case 'Qualified':
        statusColor='green';
        break;
      case 'APPLIED':
        statusColor='greenYellow';
        break;
    
      default:
        break;
    }
    return(
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.clientName}>{item.candidateName}</Text>
          <Text style={styles.clientInfo}>
            Phone: {item.phoneNumber}
          </Text>
          <Text style={styles.clientInfo}>Address: {itemaddress}</Text>
          <Text
            style={[
              styles.status,
              { color: statusColor},
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
          <Menu.Item  onPress={() => { navigation.navigate("HiringDetails", { hiringDetails: item }) }} title="View" />
         { hasEditHiringPermission && <Menu.Item onPress={() => { navigation.navigate("EditHiring", { hiringDetails: item }) }} title="Edit" />}
          {hasDeleteHiringPermission && <Menu.Item onPress={() => {
            Alert.alert(`Delete ${item.name} Hiring`, " Are you sure you want to delete this Hiring candidate from the database? Once deleted, you will no longer be able to access any records or perform operations related to this  Hiring process to this candidate.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.candidateName} with candiate ID ${item.id} was deleted`);
                }
              }
            ]);
          }} title="Delete" />}
        </Menu>
      </View>
    </Card>
  )};

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
      <FAB icon="plus" label="AddHiring Candidate" visible={hasAddHiringPermission} style={styles.fab} onPress={() => {
        dispatch(drawLabel("Hiring"));
        navigation.navigate('AddHiring');
      }} />
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
    borderRadius: 8, borderColor: "#f3f3f3",
    paddingHorizontal: 15, borderWidth: 1,
    fontSize: 16,
    elevation: 3,
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

export default Hiring;
