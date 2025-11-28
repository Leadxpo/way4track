// Header.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Badge, TextInput, Appbar } from 'react-native-paper'; // For the badge on the cart icon
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from '../utilities';
import { loadData } from '../Utils/appData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../Redux/Actions/notificationAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ title = 'way4track', showStaff = true }) => {
  const width = Dimensions.get("screen");
  const navigation = useNavigation();
  const [role, setRole] = useState(null); // Initial role
  const [notifyStaffId, setNotifyStaffId] = useState(null); // Initial role
  const [location, setLocation] = useState(""); // Initial role
  const [notificationsCount, setNotificationsCount] = useState(null); // Initial role
  const dispatch = useDispatch();
  const { requestCount, ticketCount, notifications } = useSelector(
    (state) => state.notifications
  );


  const getAddress = async (lat, lng) => {
    console.log("fff::", lat, lng)
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SharonTelematic/1.0',
          'Accept-Language': 'en'
        }
      });
      const data = await response.json();
      console.log('Reverse geocode data:', data);
      // Nominatim returns many fields; `display_name` is a full address string
      const addr = `${data?.display_name?.split(",")[0]} , ${data?.address?.city} , ${data?.address?.state}-${data?.address?.country_code}` || 'Address not found';
      setLocation(addr);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  }; useEffect(() => {
    const userLocation = async () => {
      const lng = await AsyncStorage.getItem("Lng") || '0.00';
      const lat = await AsyncStorage.getItem("Lat") || '0.00';
      getAddress(Number(lat), Number(lng));
    }
    userLocation();
    setNotificationsCount(Number(requestCount) + Number(ticketCount))
  }, [])

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await loadData("role");
      const fetchedNotifyId = await loadData("ID");
      setRole(prev => prev = fetchedRole); // Default to "Guest" if role is null 
      setNotifyStaffId(prev => prev = fetchedNotifyId); // Default to "Guest" if role is null 
    };
    fetchRole();
  }, [role]);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch])


  const openMenu = () => {
    navigation.openDrawer();  // This will now work
  };

  return (
    <Appbar.Header style={styles.appBar}>
      <View>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={openMenu}>
            <MaterialCommunityIcons name="menu" size={30} color="#333" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../utilities/images/logo.png')} style={styles.logo} />
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.notification} onPress={() =>
              navigation.navigate("Home", {
                screen: "Notification"
              })
            }>
              <MaterialCommunityIcons name="bell" size={28} color="#333" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{notificationsCount}</Text>
              </View>
            </TouchableOpacity>
            {role !== "Technician" && role !== "Sales Man" && (
              <TouchableOpacity onPress={() =>
                navigation.navigate("Home", {
                  screen: "StaffPermission",
                })
              }>
                <MaterialCommunityIcons name="cog" size={28} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginEnd: 10 }}>
          <MaterialCommunityIcons name="map-marker" size={18} color="green" />
          <Text style={{ color: 'green',textTransform:'capitalize', fontSize: 10 }}>{location? location : "Location Loading ..."}</Text>
        </View>
      </View>
    </Appbar.Header>
  );
};



const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center', width: Dimensions.get('screen').width,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  taglineText: {
    fontSize: 12,
    color: '#555',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center', left: -8
  },
  notification: {
    position: 'relative',
    marginRight: 10,
  },
  notificationBadge: {
    position: 'absolute',
    // top: -5,
    // right: -5,
    backgroundColor: '#FF0000',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
  },
  logo: {
    width: 150,
    height: 35,
  },
  appBar: {
    backgroundColor: "#FFFFFF", width: Dimensions.get('screen').width,
    alignItems: "center", borderColor: '#f3f3f3', borderBottomWidth: 2,
  },
});

export default Header;
