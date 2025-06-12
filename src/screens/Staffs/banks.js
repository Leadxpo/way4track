import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
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
  const { loading: bankAccountsLoading, bankAccounts, error: bankAccountsError } = useSelector(state => state.bankAccountsReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
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
    console.log("bank item : ", item)
    return (
      <Card style={styles.card}>
        <View style={{ backgroundColor: "#27AE60", borderTopEndRadius: 6, borderTopStartRadius: 6, padding: 5, justifyContent: 'center' }}>
          <Text style={[styles.bankName, { textAlign: 'center', color: '#f3f3f3' }]}>{item.name}</Text>
        </View>
        <View style={styles.cardContent}>
          <Avatar.Icon size={50} icon={'bank'} />
          <View style={styles.details}>
            <Text style={styles.bankInfo}>IFSC: {item.ifscCode}</Text>
            <Text style={styles.bankInfo}> Phone No.: {item.phoneNumber}  </Text>
            <Text style={styles.bankInfo}> Account Type : {item.accountType}  </Text>
          </View>
          <TouchableOpacity onPress={() => {
            setSelectedBank(item);
            setModalVisible(true);
          }}>
            <Avatar.Icon size={30} icon={'eye'} />
          </TouchableOpacity>

          {/* <Menu
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
        </Menu> */}
        </View>
      </Card>
    )
  };

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
        {/* <FAB icon="plus" label="AddBank" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Banks"));
          navigation.navigate('AddBank');
        }} /> */}

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Bank Details</Text>
              {selectedBank && (
                <>
                  <Text style={styles.modalText}>Name: {selectedBank.name}</Text>
                  <Text style={styles.modalText}>Account Name: {selectedBank.accountName}</Text>
                  <Text style={styles.modalText}>Account Number: {selectedBank.accountNumber}</Text>
                  <Text style={styles.modalText}>Account Type: {selectedBank.accountType}</Text>
                  <Text style={styles.modalText}>IFSC Code: {selectedBank.ifscCode}</Text>
                  <Text style={styles.modalText}>Phone: {selectedBank.phoneNumber || 'N/A'}</Text>
                  <Text style={styles.modalText}>Address: {selectedBank.address}</Text>
                  <Text style={styles.modalText}>Total Amount: ₹{selectedBank.totalAmount}</Text>
                </>
              )}
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={{ marginTop: 16 }}
              >
                Close
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
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
