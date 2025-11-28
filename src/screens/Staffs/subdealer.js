import React, { useState,useEffect,useCallback } from "react";
import {View,FlatList,Text,TextInput,StyleSheet,TouchableOpacity} from "react-native";
import { Avatar, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchVendors } from "../../Redux/Actions/vendorAction";
import { fetchSubdealers } from "../../Redux/Actions/subdealerAction";
import Header from '../../components/userHeader';
import { permissions } from "../../Utils/permissions";
import { useFocusEffect } from "@react-navigation/native";

const SubDealer = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading:subdealersLoading, subdealers, error:subdealereError } = useSelector(state => state.subdealers);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);
  const hasAddSubdealerPermission = permissions.some(p => p.name === "subdealer" && p.add);
  const hasEditSubdealerPermission = permissions.some(p => p.name === "subdealer" && p.edit);
  const hasDeleteSubdealerPermission = permissions.some(p => p.name === "subdealer" && p.delete);
  
  const filteredData = subdealers.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subdealerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.SubDealerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
    const subdealersPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchSubdealers(subdealersPayload));
  }, [dispatch])
  )

  const renderItem = ({ item }) => {
    console.log("client item : ",item)
    return(
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: item.image }} />
        <View style={styles.details}>
          <Text style={styles.subDealerName}>{item.name}</Text>
          <Text style={styles.subDealerInfo}>
            Phone No: {item.phoneNumber}
          </Text>
          <Text style={styles.subDealerInfo}>Joining Data: {item.joiningDate.split("T")[0]}</Text>
        </View>
        <Menu
          visible={menuVisible && selectedItem === item.SubDealerId}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(true);
                setSelectedItem(item.SubDealerId);
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
          <Menu.Item titleStyle={{ color: "green" }} title='View' onPress={() => { navigation.navigate("SubDealerDetails", { subdealerDetails: item }) }} />
          {hasEditSubdealerPermission &&<Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditSubDealer", { subdealerDetails: item }) }} />}
          {hasDeleteSubdealerPermission &&<Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
            Alert.alert(`Delete ${item.name} Staff`, " Are you sure you want to delete this SubDealer from the database? Once deleted, you will no longer be able to access any records or perform operations related to this SubDealer.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with clienID ${item.SubDealerId} deleted`);
                }
              }
            ]);
          }} />}
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
          placeholder="Search SubDealer Name"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.SubDealerId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <FAB icon="plus" visible={hasAddSubdealerPermission} label="AddSubDealer" style={styles.fab} onPress={() => {
          dispatch(drawLabel("SubDealers"));
          navigation.navigate('AddSubDealer');
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
  subDealerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subDealerInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default SubDealer;
