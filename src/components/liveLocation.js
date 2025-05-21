import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const LiveLocation = () => {
    const [location, setLocation] = useState(null);
    const [tracking, setTracking] = useState('off'); // 'on' or 'off'
    const [currentTime, setCurrentTime] = useState(null);
    const companyCode = "WAY4TRACK";
    const uniqueCode = "WAY4";
    const staffId = "STAFF789";
    let intervalId = null;

    // Request location permission (Android)
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS auto-grants permission
    };

    // Send location data to API
    const sendLocationToServer = async (latitude, longitude) => {
        try {
            const response = await axios.post("http://localhost:3000/api/staff/handleStaffDetails", {
                latitude,
                longitude,
            });
            console.log("Location sent:", response.data);
        } catch (error) {
            console.error("Error sending location:", error.message);
        }
    };

    const sendAttendanceData = async (trackStatus) => {
        const attendanceCurrentTime = new Date().toISOString(); // Get current time
        setCurrentTime(attendanceCurrentTime);

        try {
            const response = await axios.post("http://localhost:3000/api/attendance/createAttendance", {
                companyCode,
                uniqueCode,
                staffId,
                attendanceCurrentTime,
            });
            console.log("Attendance recorded:", response.data);
        } catch (error) {
            console.error("Error sending attendance:", error.message);
        }
    };

    // Start tracking location every 5 minutes
    const startTracking = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            console.log("Permission denied");
            return;
        }

        intervalId = setInterval(() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    console.log("Updated Location:", latitude, longitude);
                    sendLocationToServer(latitude, longitude); // Send to API
                },
                (error) => console.log("Error fetching location:", error.message),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }, 300000); // 5 minutes (300000ms)
    };

    // Stop tracking location
    const stopTracking = () => {
        if (intervalId) {
            clearInterval(intervalId);
            console.log("Location tracking stopped");
        }
    };

    // Handle Tracking Toggle
    useEffect(() => {
        if (tracking === 'on') {
            startTracking();
        } else {
            stopTracking();
        }

        return () => stopTracking(); // Cleanup on unmount
    }, [tracking]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Live Location Tracking</Text>

            {location ? (
                <Text style={styles.location}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            ) : (
                <Text style={styles.location}>Fetching location...</Text>
            )}
 <Text style={styles.time}>
                Attendance Time: {currentTime ? currentTime : "Not recorded"}
            </Text>
            {/* Segmented Buttons for On/Off Tracking */}
            <SegmentedButtons
                value={tracking}
                onValueChange={(value) => {
                    sendAttendanceData(value,currentTime);
                    setTracking(value);
                }}
                buttons={[
                    { value: 'on', label: 'Tracker On' },
                    { value: 'off', label: 'Tracker Off' },
                ]}
                style={styles.buttons}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    location: { fontSize: 16, marginBottom: 20 },
    buttons: { width: '100%', marginTop: 20 },
});

export default LiveLocation;



    // useEffect(() => {
    //     let watchId = null;
    
    //     const trackLocation = async () => {
    //         const hasPermission = await requestLocationPermission();
    //         if (!hasPermission) return;
    
    //         watchId = Geolocation.watchPosition(
    //             (position) => {
    //                 setLocation(position.coords);
    //                 console.log("Updated Location:", position.coords);
    //             },
    //             (error) => console.log("Error:", error.message),
    //             { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
    //         );
    //     };
    
    //     trackLocation();
    
    //     return () => {
    //         if (watchId !== null) {
    //             Geolocation.clearWatch(watchId);
    //         }
    //     };
    // }, []);
    
