import React, { useState,useEffect} from "react";
import { View, FlatList, Text, TextInput, Alert, StyleSheet, TouchableOpacity} from "react-native";
import { Avatar, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchbankAccounts } from "../../Redux/Actions/bankAccountAction";
import Header from '../../components/userHeader';

const Banks = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading:bankAccountsLoading,  bankAccounts, error:bankAccountsError } = useSelector(state => state.bankAccountsReducer);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);

const hasAddBankPermission = permissions.some(p => p.name === "bank" && p.add);
const hasEditBankPermission = permissions.some(p => p.name === "bank" && p.edit);
const hasDeleteBankPermission = permissions.some(p => p.name === "bank" && p.delete);

  const filteredData = bankAccounts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const bankPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchbankAccounts(bankPayload));
  }, [dispatch])

  const renderItem = ({ item }) => {
    console.log("bank item : ",item)
    return(
    <Card style={styles.card}>
      <View style={{backgroundColor:"#27AE60",borderTopEndRadius:6,borderTopStartRadius:6,padding:5,justifyContent:'center'}}>
        <Text style={[styles.bankName,{textAlign:'center',color:'#f3f3f3'}]}>{item.name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Avatar.Icon size={50} icon={'bank'}/>
        <View style={styles.details}>
          <Text style={styles.bankInfo}>IFSC: {item.ifscCode}</Text>
          <Text style={styles.bankInfo}> Phone No.: {item.phoneNumber}  </Text>
          <Text style={styles.bankInfo}> Account Type : {item.accountType}  </Text>
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
          <Menu.Item titleStyle={{ color: "green" }} title='View' onPress={() => { navigation.navigate("BankDetails", { bankDetails: item }) }} />
          <Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditBank", { bankDetails: item }) }} />
          <Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
            Alert.alert(`Delete ${item.name} Bank`, " Are you sure you want to delete this Bank from the database? Once deleted, you will no longer be able to access any records or perform operations related to this Bank.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with clienID ${item.id} deleted`);
                }
              }
            ]);
          }} />
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
          placeholder="Search Bank Name"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.bankId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <FAB icon="plus" label="AddBank" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Banks"));
          navigation.navigate('AddBank');
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
  bankName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bankInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Banks;
