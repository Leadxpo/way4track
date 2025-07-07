import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Text, Menu, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from "../../Api/api";
import { useNavigation } from '@react-navigation/native';

const Service = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [serviceList, setServiceList] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr || permissions);
        console.log(permissions)
      };
      loadStaffloginData();
    }, []);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.post("/ServiceType/getServiceTypeDetails");
      if (response.data) {
        setServiceList(response.data);
        setAllServices(response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchText.toLowerCase().trim();
    if (!query) {
      setServiceList(allServices);
    } else {
      const filtered = allServices.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      setServiceList(filtered);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this Service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', onPress: async () => {
            try {
              const payload = { id, companyCode: initialAuthState.companyCode, unitCode: initialAuthState.unitCode };
              const res = await api.post("/ServiceType/deleteServiceTypeDetails", payload);
              if (res.status) {
                Alert.alert('Success', 'Service deleted successfully');
                fetchServices();
              }
            } catch (err) {
              console.error("Error deleting:", err);
              Alert.alert("Error", "Failed to delete service.");
            }
          }
        }
      ]
    );
  };

  const renderServiceItem = ({ item }) => (
    <Card style={styles.card} key={item.id}>
      <Card.Title title={item.name} subtitle={`Duration: ${item.duration}`} />
      <Card.Content>
        <Text>{item.description}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Menu
          visible={visibleMenu === item.id}
          onDismiss={() => setVisibleMenu(null)}
          anchor={
            <TouchableOpacity onPress={() => setVisibleMenu(item.id)}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
            </TouchableOpacity>
          }
        >
          {permissions.edit && (
            <Menu.Item onPress={() => {
              setVisibleMenu(null);
              navigation.navigate("EditService", { service: item });
            }} title="Edit" />
          )}
          {permissions.delete && (
            <Menu.Item onPress={() => {
              setVisibleMenu(null);
              handleDelete(item.id);
            }} title="Delete" />
          )}
        </Menu>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services</Text>

      <View style={styles.searchRow}>
        <TextInput
          label="Search by name"
          value={searchText}
          onChangeText={setSearchText}
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" icon="magnify" onPress={handleSearch} style={styles.searchBtn}>
          Search
        </Button>
      </View>

      {permissions.add && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddService")}
          style={styles.addBtn}
        >
          Add Service
        </Button>
      )}

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={serviceList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No Services found</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { flex: 1, marginRight: 8 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  searchBtn: { height: 48, justifyContent: 'center' },
  addBtn: { marginBottom: 16 },
  card: { marginBottom: 12 },
  actions: { justifyContent: 'flex-end' },
  emptyText: { textAlign: 'center', marginTop: 20, color: 'gray' },
});

export default Service;
