import React, { useState, useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInput, Button, Text } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

export default function TrackerScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [staffLocation, setStaffLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [watchId, setWatchId] = useState(null);

  // Request location permissions
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      startLocationTracking();
    };

    requestLocationPermission();

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const startLocationTracking = () => {
    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setRegion({
          ...region,
          latitude,
          longitude,
        });
        setStaffLocation({ latitude, longitude });
      },
      (error) => {
        console.log('Error in tracking location:', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update location every 10 meters
        interval: 5000, // Location update interval for Android
        fastestInterval: 2000, // Fastest update interval for Android
      }
    );
    setWatchId(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          label="Staff ID"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Staff Name"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Branch"
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" style={styles.button} onPress={startLocationTracking}>
          Start Tracking
        </Button>
      </View>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker
          coordinate={staffLocation}
          title="Staff Location"
          description="Live location of the staff"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});
