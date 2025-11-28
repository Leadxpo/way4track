import React, { useState,useEffect,useCallback } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { Avatar, Card, Button, Menu, Provider } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchReciepts } from '../../Redux/Actions/estimatesAction';
import Header from '../../components/userHeader';
import { useFocusEffect } from "@react-navigation/native";

const Receipt = ({ navigation }) => {
  const dispatch = useDispatch();
  const { reciepts, loading: recieptsLoading, error: recieptsError } = useSelector(state => state.recieptsReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useFocusEffect(
    useCallback(() => {
    const fetchPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
    dispatch(fetchReciepts(fetchPayload));
  }, [dispatch])
)

  const filteredData = reciepts.filter((item) =>
    item.clientName?.toLowerCase().includes(searchQuery.toLowerCase())||
    item.receiptId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={styles.clientName}>{item.clientName}</Text>
          <Text style={styles.clientInfo}>
            PhoneNumber: {item.clientPhoneNumber}
          </Text>
          <Text style={styles.clientInfo}>Joining Date: {item.joiningDate}</Text>
          <Text style={styles.clientInfo}>Amount: {item.amount}</Text>
          <Text
            style={[
              styles.status,
              { color: item.status === "Accepted" ? "green" : "red" },
            ]}
          >
            Status: {item.status}
          </Text>
        </View>
      </View>
    </Card>
  );

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
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 2,
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

export default Receipt;
