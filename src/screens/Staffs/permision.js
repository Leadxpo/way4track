import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { Surface, Checkbox, Button, Card, TextInput as PaperInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/userHeader';
import { staffPermissionById, updatePermissionById } from '../../Redux/Actions/staffAction';
import store from '../../Redux/store';

const rolesData = [
  {
    "branchName": "Central Office",
    "staffId": "SF-00001",
    "staffName": "Ramesh",
    "designation": "CEO",
    "phoneNumber": "8297215321",
    "dob": "1990-06-14T18:30:00.000Z",
    "address": "123 Main Street, City Center",
    "email": "john.doe@example.com",
    "aadharNumber": "123456789012",
    "role": "branch",
    "permissions": [
      {
        "add": true,
        "edit": true,
        "name": "branch",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "assets",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "appointments",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "staff",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "client",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "vendor",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "subdealer",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": false,
        "name": "hiring",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "bak",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "product",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "productassign",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "tickets",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "voucher",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "work-allocation",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "estimate",
        "view": true,
        "delete": true
      },
      {
        "add": true,
        "edit": true,
        "name": "attendance",
        "view": true,
        "delete": true
      }
    ]
  }
]
// http://localhost:3000/api/permissions/getStaffPermissions;

const StaffPermission = () => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading: staffsLoading, staffPermission, error: staffeError } = useSelector(state => state.permissionStaff);

  const [searchQuery, setSearchQuery] = useState('');
  const [permissionData, setPermissionData] = useState([]);
  const [staffData, setStaffData] = useState(null);
  const [permissions, setPermissions] = useState({});


  const handlePermissionToggle = (permName, perm) => {
    setPermissionData((prevData) =>
      prevData.map((permItem) =>
        permItem.name === permName
          ? { ...permItem, [perm]: !permItem[perm] }
          : permItem
      )
    );
  };

  const getStaffPermissions = () => {
    const permissionPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4", staffId: searchQuery }
    dispatch(staffPermissionById(permissionPayload));
  }

  useEffect(() => {
    if (staffPermission) {

      setPermissionData(staffPermission?.staffPermission || []);
      setStaffData(staffPermission?.staffData?.[0] || null);
    }
  }, [staffPermission]); // Runs when `staffPermission` is updated from Redux

  const renderRoleItem = ({ item, index }) => {
    return (
      <View>
        <Surface key={item.name} style={styles.roleCard}>
          <Text style={styles.roleName}>{item.name}</Text>
          <View style={styles.checkboxContainer}>
            {['view', 'edit', 'delete', 'add'].map((perm) => (
              <View key={perm} style={styles.checkboxItem}>
                <Checkbox
                  status={item[perm] ? 'checked' : 'unchecked'}
                  onPress={() => handlePermissionToggle(item.name, perm)}
                />
                <Text>{perm.charAt(0).toUpperCase() + perm.slice(1)}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </View>
    )
  };

  const ChangePermissions=()=>{
    const changePermissionsPayload={staffId:staffData?.staffId, permissions:permissionData,companyCode:"WAY4TRACK",unitCode:"WAY4"}
    console.log("changePermissionsPayload : ",changePermissionsPayload);
    dispatch(updatePermissionById(changePermissionsPayload))
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Surface style={styles.searchBar}>
        <TextInput
          placeholder="Search by Staff ID..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
        />
        <Icon name="account-search" size={24} color="gray" onPress={getStaffPermissions} />
      </Surface>

      <Card>
        <Text style={styles.roleName} >StaffName    : {staffData?.staffName}</Text>
        <Text style={styles.roleName} >BranchName   : {staffData?.branchName}</Text>
        <Text style={styles.roleName} >StaffId      : {staffData?.staffId}</Text>
        <Text style={styles.roleName} >Designation  : {staffData?.designation}</Text>
        <Text style={styles.roleName} >PhoneNumber  : {staffData?.phoneNumber}</Text>
        <Text style={styles.roleName} >Dob          : {staffData?.dob}</Text>
        <Text style={styles.roleName} >Address      : {staffData?.address}</Text>
        <Text style={styles.roleName} >Email        : {staffData?.email}</Text>
        <Text style={styles.roleName} >AadharNumber : {staffData?.aadharNumber}</Text>
        <Text style={styles.roleName} >Role         : {staffData?.role}</Text>
      </Card>

      <FlatList
        data={permissionData}
        renderItem={renderRoleItem}
        keyExtractor={(item) => item.id}
      />

      {/* Done Button */}
      <Button mode="contained" style={styles.doneButton} onPress={ChangePermissions}>DONE</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 16, backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    marginVertical: 16,
  },
  roleCard: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8, backgroundColor: '#ffffff',
    elevation: 4,
  },
  roleName: {
    fontWeight: 'bold', color: '#333333', borderRadius: 5, margin: 5, padding: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    marginVertical: 16,
  },
});

export default StaffPermission;
