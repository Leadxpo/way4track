import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Provider, FAB } from "react-native-paper";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstimates } from "../../Redux/Actions/estimatesAction";
import { drawLabel } from "../../Redux/Actions/drawAction";
import { useFocusEffect } from '@react-navigation/native';

const Estimates = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading: estimatesLoading, estimates, error: estimatesError } = useSelector(state => state.estimatesReducer);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
      console.log(permissions)
    };
    loadStaffloginData();
  }, []);

  const hasAddEstimatePermission = permissions.some(p => p.name === "estimate" && p.add);

  useFocusEffect(
    useCallback(() => {
      const estimatePayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
      dispatch(fetchEstimates(estimatePayload));
    }, [dispatch])
  )
  const filteredData = estimates?.filter((item) =>
    item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.estimateId.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={[styles.clientName, { color: "#28a745" }]}>{item.estimateId}</Text>
          <Text style={[styles.clientName, { color: '#333333' }]}>{item.clientName}</Text>
          <Text style={styles.clientInfo}>Generated Date : {item.estimateDate.split("T")[0]}</Text>
          <Text style={styles.clientInfo}>Expire Date : {item.expireDate}</Text>
          <Text style={styles.clientInfo}>Total Amount: {item.totalAmount}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Home", {
          screen: "EstimateDetails",
          params: { estimateDetails: item }
        })}>
          <Avatar.Icon size={24} icon={'eye'} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <Provider>
      {/* Header */}
      <Header />
      {/* Dropdown for Branches */}

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Estimate Name"
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
        <FAB icon="plus" visible={hasAddEstimatePermission} label="Add Estimate" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Estimate"));
          navigation.navigate('AddEstimate');
        }} />

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

export default Estimates;
