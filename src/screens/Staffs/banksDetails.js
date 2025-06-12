import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, Alert, StyleSheet, TouchableOpacity} from "react-native";
import { Avatar, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { bankAccountById, fetchbankAccounts } from "../../Redux/Actions/bankAccountAction";
import Header from '../../components/userHeader';

const Banks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { bankDetails } = route.params;  // Sample address data
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading: bankAccountsLoading, bankAccount, error: bankAccountsError } = useSelector(state => state.bankAccountDetailReducer);

  const filteredData = bankDetails?.invoiceData?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const bankPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4", id: bankDetails.id }
    dispatch(bankAccountById(bankPayload));
  }, [dispatch])

  const renderItem = ({ item }) => {
    console.log("bank item : ", item)
    return (
      <View style={styles.details}>
        <Text style={[styles.bankName, { textTransform: "capitalize" }]}>{item.name}-{item.id}</Text>
        <Text style={styles.bankInfo}> {item.createdDate}</Text>
        <Text style={styles.bankInfo}>  {item.amount} {item.voucherType} </Text>
      </View>
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

  details: {
    flex: 1, alignItems: "center",
    padding: 5,
    marginLeft: 8, flexWrap: "wrap", flexDirection: 'row'
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
