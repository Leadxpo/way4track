import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Alert, PermissionsAndroid,
  ActivityIndicator, ScrollView, Image, StyleSheet
} from 'react-native';
import { Surface, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { login } from '../../Redux/Actions/loginAction';
import { saveData } from '../../Utils/appData';
import store from '../../Redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateCurrentAddress } from '../../Utils/updateLocation';
import { getDeviceId } from '../../Utils/getUniqueDeviceID';
import api from '../../Api/api';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { staffInfo } = useSelector(state => state.staffLogin); // ✅ OK  // State Variables
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const [staffRole, setStaffRole] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [deviceID, setDeviceID] = useState(null);

  // Role List
  const [designations, setDesignations] = useState([]);
  const [staffRoleOptions, setStaffRoleOptions] = useState([]);

  const fetchDesignations = async () => {
    try {
      const response = await api.post("/designations/getAllDesignation");
      const fetchedData = Array.isArray(response.data.data) ? response.data.data : [];
      // Append custom roles
      const finalData = [
        ...fetchedData,
        { designation: "sub dealer" },
        { designation: "sub dealer staff" },
      ];

      setDesignations(finalData);
      setStaffRoleOptions(
        finalData.map((item) => ({
          label: item.designation,
          value: item.designation,
        }))
      );
    } catch (error) {
      console.error("Error fetching designations:", error);
      setDesignations([]);
      setStaffRoleOptions([]);
    }
  };

  const getSubdealerStaffDetails = async (staffInfo) => {
    try {

      const subdealerStaffpayload = {
        subDealerId: staffInfo?.subDealerId.subDealerId,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4"
      };
      const subdealerStaffResponse = await api.post("/subdealer/getSubDealerDetailById", subdealerStaffpayload);
      const subdealerdetails = subdealerStaffResponse.data.data
      await saveData('ID', staffInfo?.id);
      await saveData('staffID', staffInfo?.staffId);
      await saveData('subDealerId', subdealerdetails?.subDealerId);
      await saveData('subDealerPrmId', subdealerdetails?.id);
      await saveData('subDealerstaffId', staffInfo?.staffId);
      await saveData('subDealerstaffPrmId', staffInfo?.id);
      await saveData('staffName', staffInfo?.name);
      // await saveData('staffPhoto', staffInfo?.subDealerPhoto);
      await saveData('phoneNumber', staffInfo?.phoneNumber);
      await saveData('email', staffInfo?.email);
      await saveData('branch_id', subdealerdetails?.branchId);
      await saveData('branchName', subdealerdetails?.branchName);
      await saveData('role', "sub dealer staff");
      const permissions = staffInfo?.permissions?.[0]?.permissions || [];

      if (Array.isArray(permissions)) {
        await saveData('staffPermissions', permissions);
      } else {
        console.warn('Permissions data is not an array');
      }
    } catch (error) {
      console.error("Error fetching subdealer details:", error);
      Alert.alert("Error", "Failed to fetch subdealer details.");
    }

  }

  useEffect(() => {
    fetchDesignations();
  }, []);

  // useEffect(() => {
  //   if (staffInfo) {
  //     console.log("staffInfo ::", staffInfo)
  //     // perform your saving and navigation here
  //   }
  // }, [staffInfo]);

  useEffect(() => {
    const fetchDeviceID = async () => {
      const deviceIDs = await getDeviceId();
      setDeviceID(deviceIDs);
    }
    fetchDeviceID();
  }, [])

  useEffect(() => {
    const removePrevData = async () => {
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('staffID');
      await AsyncStorage.removeItem('staffName');
      await AsyncStorage.removeItem('staffPhoto');
      await AsyncStorage.removeItem('phoneNumber');
      await AsyncStorage.removeItem('latitude');
      await AsyncStorage.removeItem('longitude');
      await AsyncStorage.removeItem('isLogin');
      await AsyncStorage.removeItem('ID');
      await AsyncStorage.removeItem('branch_id');
      await AsyncStorage.removeItem('branchName');
      await AsyncStorage.removeItem('staffPermissions');
    }
    removePrevData();
  }, [])
  // Handle Login Logic
  const handleLogin = async () => {
    setLoginLoading(true);

    if (!staffID.trim() || !password.trim() || !staffRole) {
      setError('All fields are required!');
      Alert.alert('Validation Error', 'Please enter Staff Role, Staff ID, and Password.');
      setLoginLoading(false);
      return;
    }

    try {
      const loginPayload = {
        staffId: staffID,
        password: password,
        designation: staffRole,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4"
      };

      await dispatch(login(loginPayload));
      const state = store.getState(); // Assuming you have access to the Redux store
      const { staffInfo } = state.staffLogin;

      if (staffInfo?.staffId === staffID || staffInfo?.subDealerId === staffID) {
        await saveData('isLogin', true);
        if (staffInfo) {
          if (staffRole !== "sub dealer" && staffRole !== "sub dealer staff") {
            await saveData('ID', staffInfo?.id);
            await saveData('staffID', staffInfo?.staffId);
            await saveData('staffName', staffInfo?.name);
            await saveData('staffPhoto', staffInfo?.staffPhoto);
            await saveData('phoneNumber', staffInfo?.phoneNumber);
            await saveData('email', staffInfo?.email);
            await saveData('branch_id', staffInfo?.branch?.id || 0);
            await saveData('branchName', staffInfo?.branch?.branchName);
            await saveData('role', staffInfo?.designation);
            await saveData('latitude', staffInfo?.latitude);
            await saveData('longitude', staffInfo?.longitude);
            const activePermissionsObj = Array.isArray(staffInfo?.permissions)
            ? staffInfo.permissions.findLast(p => p.staffStatus === 'ACTIVE')
            : null;
          
          const permissionsToStore = activePermissionsObj?.permissions || [];
            if (Array.isArray(permissionsToStore)) {
              await saveData('staffPermissions', permissionsToStore);
            } else {
              console.warn('Permissions data is not an array');
            }
            await UpdateCurrentAddress();
          }

          if (staffRole === "sub dealer") {
            await saveData('role', "sub dealer");
          }

          if (staffRole === "sub dealer staff") {
            await getSubdealerStaffDetails(staffInfo);
            await saveData('role', "sub dealer staff");
          }

          navigation.navigate('RoleRedirector');

        } else {
          console.log("staffdata :", staffInfo)
        }
      }
    } catch (error) {
      console.log("Error : ", error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <ScrollView keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true} // ✅ This is critical
      contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Logo Section */}
        <Surface style={styles.header}>
          <Image
            source={require('../../utilities/images/way4tracklogo.png')}
            style={styles.logo}
          />
        </Surface>

        {/* Login Heading */}
        <Text style={styles.heading}>Login</Text>

        {/* Error Message */}
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        {/* Staff Role Dropdown */}
        <View style={{ zIndex: 1000 }}>
  <DropDownPicker
    open={open}
    value={staffRole}
    items={staffRoleOptions}
    setOpen={setOpen}
    setValue={setStaffRole}
    setItems={setStaffRoleOptions}
    placeholder="Select Staff Role"
    listMode="MODAL"
    modalTitle="Choose Staff Role"
    modalProps={{
      animationType: 'slide',
      presentationStyle: 'pageSheet',
    }}
    modalContentContainerStyle={{
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 24,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flex: 1,
    }}
    style={{
      borderColor: '#cccccc',
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: 12,
      backgroundColor: '#fafafa',
    }}
    containerStyle={{
      width: '90%',
      alignSelf: 'center',
      marginBottom: 16,
    }}
    textStyle={{
      fontSize: 16,
      color: '#333',
    }}
    dropDownContainerStyle={{
      borderRadius: 8,
      borderColor: '#cccccc',
    }}
    listItemLabelStyle={{
      fontSize: 16,
      color: '#333',elevation:0,alignSelf:'center',
      paddingVertical: 10,borderBottomWidth:1,borderColor:"#E6F4EA",
      paddingLeft: 8,
    }}
    selectedItemContainerStyle={{
      backgroundColor: '#F0FFF4',
    }}
    selectedItemLabelStyle={{
      color: '#2ECC71',
      fontWeight: 'bold',
    }}
    closeIconStyle={{
      tintColor: '#888'
    }}
    showTickIcon={true}
    tickIconStyle={{ tintColor: '#2ECC71' }}
  />
</View>
        {/* StaffID Input */}
        <TextInput
          style={[styles.input, { zIndex: open ? 0 : 1 }]}
          placeholder="Staff ID"
          mode='outlined'
          outlineColor='#cccccc'
          placeholderTextColor="#888"
          value={staffID}
          textColor='#333333'
          onChangeText={(text) => {
            setStaffID(text);
            setError('');
          }}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          outlineColor='#cccccc'
          placeholderTextColor="#888"
          right={<TextInput.Icon icon={isVisible ? 'eye' : 'eye-off'} size={24} color={"#cccccc"} style={{ width: 48, height: 48, alignSelf: 'center', justifyContent: "center" }} onPress={() => { setIsVisible(!isVisible) }} />}
          value={password} mode='outlined'
          secureTextEntry={isVisible}
          activeOutlineColor='#f3f3f3'
          textColor='#333333'
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loginLoading}>
          {loginLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FDE8E8',
    height: 200,
    width: "100%",
    justifyContent: 'center',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
    color: '#000',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '90%',
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;
