import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from "../../Api/api";

const Designation = () => {
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState({});
  const [profiles, setProfiles] = useState([]);

  const getStaffSearchDetails = useCallback(async () => {
    try {
      const response = await api.post('/designations/getAllDesignation');
      if (response.status) {
        setProfiles(response.data || []);
      } else {
        Alert.alert('Error', response.data.internalMessage || 'Failed to fetch designation details.');
      }
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to fetch designation details.');
    }
  }, []);

  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr || permissions);
        console.log(permissions)
      };
      loadStaffloginData();
    }, []);

  const handleDetails = (designationDetails) => {
    navigation.navigate('DesignationDetails', { designationDetails });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={item.designation}
        left={() => (
          <MaterialCommunityIcons name="account-tie" size={28} color="#6200ee" style={styles.icon} />
        )}
      />
      <Card.Actions>
        <Button
          mode="contained"
          icon="information"
          onPress={() => handleDetails(item)}
          disabled={!permissions.view}
          style={[styles.button, !permissions.view && styles.disabledButton]}
        >
          More Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate('AddDesignation')}
          disabled={!permissions.add}
          style={[styles.addButton, !permissions.add && styles.disabledButton]}
        >
          Add Designation
        </Button>
      </View>
      <FlatList
        data={profiles}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Designation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#fbbf24', // yellow-500
  },
  disabledButton: {
    backgroundColor: '#d1d5db', // gray-300
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 12,
    elevation: 4,
  },
  icon: {
    marginRight: 8,
  },
  button: {
    marginLeft: 'auto',
  },
});
