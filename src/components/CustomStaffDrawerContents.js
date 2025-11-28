// components/CustomStaffDrawerContent.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Card } from 'react-native-paper';
import { loadData } from '../Utils/appData';
import { useNavigation } from '@react-navigation/native';

const CustomStaffDrawerContents = (props) => {
  const navigation = useNavigation();

  const [staffId, setStaffId] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffDesignation, setStaffDesignation] = useState("");
  const [staffPhoto, setStaffPhoto] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchStaffData = async () => {
      const staffId = await loadData("staffID");
      const staffName = await loadData("staffName");
      const staffDesignation = await loadData("role");
      const branchName = await loadData("branchName");
      const staffPhoto = await loadData("staffPhoto");
      const phoneNumber = await loadData("phoneNumber");
      const email = await loadData("email");

      setStaffId(staffId);
      setStaffName(staffName);
      setStaffDesignation(staffDesignation);
      setStaffPhoto(staffPhoto);
      setPhoneNumber(phoneNumber);
      setBranchName(branchName);
      setEmail(email);
    }
    fetchStaffData()
  })

  const handleLogout = () => {
    Alert.alert(
      `${staffDesignation} Logout`,
      `Do you want to logout from the ${staffDesignation} dashboard?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.navigate("Home", {
              screen: "Login"
            });
          }
        }
      ]
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* 🔼 Header */}
      <View style={styles.header}>
        <Avatar.Image source={staffPhoto ? { uri: staffPhoto } : require("../utilities/images/way4tracklogo.png")} size={50} style={{ backgroundColor: '#ffffff', margin: 5, alignSelf: 'center' }} />
        <Text style={styles.headerText}>{staffName}</Text>
        <Card.Title title={staffId} titleStyle={{ color: '#222222', textAlign: 'center', textTransform: "capitalize" }} subtitleStyle={{ color: "#222222", textAlign: 'center', textTransform: "capitalize" }} subtitle={staffDesignation + "\n" + email + "\n" + phoneNumber} subtitleNumberOfLines={5} titleVariant='bodyLarge' subtitleVariant='bodySmall' />
        <Card.Content>
        <Text style={{color: '#222222', textAlign: 'center', textTransform: "capitalize"}}>{branchName}</Text>
        </Card.Content>
      </View>

      {/* 🧭 Drawer Items */}
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* 🔽 Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomStaffDrawerContents;

const styles = StyleSheet.create({
  header: {
    padding: 20, justifyContent: "center",
    backgroundColor: '#FFE5E5',borderBottomEndRadius:15,borderBottomStartRadius:15,borderBottomWidth:3,borderBottomColor:"#ffe5f690"
  },
  headerText: {
    color: '#222222', textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    padding: 20, marginBottom: 50,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: '600',

  },
  // footerText: {
  //   color: '#ff3b30',
  // },
});
