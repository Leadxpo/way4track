import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { Text, Button, ActivityIndicator, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import api from "../../Api/api";

const ProductType = () => {
  const navigation = useNavigation();
  const [productTypes, setProductTypes] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr || permissions);
        console.log(permissions)
      };
      loadStaffloginData();
    }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await api.post('/productType/getProductTypeDetails');
      if (response.data) {
        setProductTypes(response.data);
        setAllProductTypes(response.data);
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchName.trim().toLowerCase();
    if (!query) {
      setProductTypes(allProductTypes);
    } else {
      const filtered = allProductTypes.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      setProductTypes(filtered);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product type?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: async () => {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('companyCode', initialAuthState.companyCode);
            formData.append('unitCode', initialAuthState.unitCode);

            try {
              const res = await api.post('/productType/deleteProductTypeDetails', formData);
              if (res.status) {
                Alert.alert('Success', 'Product type deleted successfully!');
                fetchProductTypes();
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete product type.');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodySmall" style={styles.typeText}>Type: {item.type}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EditProductType', { productType: item })}
          disabled={!permissions.edit}
          style={permissions.edit ? styles.editButton : styles.disabledButton}
        >
          <MaterialCommunityIcons name="pencil" size={18} color="white" />
        </Button>

        <Button
          mode="contained"
          onPress={() => handleDelete(item.id)}
          disabled={!permissions.delete}
          style={permissions.delete ? styles.deleteButton : styles.disabledButton}
        >
          <MaterialCommunityIcons name="delete" size={18} color="white" />
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Types</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by Name"
          value={searchName}
          onChangeText={setSearchName}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
          <MaterialCommunityIcons name="magnify" size={20} color="white" />
        </Button>
      </View>

      {permissions.add && (
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate('AddProductType')}
          style={styles.addButton}
        >
          Add Product Type
        </Button>
      )}

      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={productTypes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.noData}>No product types found</Text>}
        />
      )}
    </View>
  );
};

export default ProductType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 16,
    backgroundColor: 'blue',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  typeText: {
    marginTop: 4,
    color: '#555',
  },
  actions: {
    justifyContent: 'flex-end',
    gap: 8,
    paddingRight: 8,
  },
  editButton: {
    backgroundColor: '#4a90e2',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
