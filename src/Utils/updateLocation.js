import { PermissionsAndroid, Platform } from 'react-native';
import { loadData } from "./appData";
import api from '../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw'; // Replace with your real key

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0,
            }
        );
    });
};

const updateStaffLocation = async (lat, lng) => {
    const id = await AsyncStorage.getItem("ID");
    const update_staffPayload_formData = { id: id, latitude: lat, longitude: lng }
    try {
        // Attempt to fetch STAFFS
        const { data } = await api.post(`/staff/handleStaffDetails`, update_staffPayload_formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (data.status) {
            console.log("Location updated")
        }

    } catch (error) {
        console.log("API error:", error.response?.data || error.message || error);
    }
}

const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'App needs access to your location',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS will use plist
    } catch (err) {
        console.error('Permission error:', err);
        return false;
    }
};

// export const UpdateCurrentAddress = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//         console.warn('Location permission not granted');
//         return null;
//     }

//     try {
//         // Get coordinates using Google's Geolocation API (uses WiFi, cell data)
//         const locationResponse = await fetch(
//             `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
//             {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({}),
//             }
//         );

//         const locationData = await locationResponse.json();
//         if (!locationData.location) {
//             console.warn('Failed to get location from Google API:', locationData);
//             return null;
//         }

//         const { lat, lng } = locationData.location;
//         console.log("Device location:", lat, lng);
//         await updateStaffLocation(lat, lng);
//         // Now get human-readable address using Geocoding API
//     } catch (error) {
//         console.error('Error getting address:', error);
//         return null;
//     }
// };


export const UpdateCurrentAddress = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
        console.warn('Location permission not granted');
        return null;
    }

    try {
        const position = await getCurrentPosition();
        console.log("position::",position)
        const { latitude, longitude } = position.coords;
        await AsyncStorage.setItem("Lng",String(longitude)),
        await AsyncStorage.setItem("Lat",String(latitude)),
        console.log('📍 Location:', latitude, longitude);
        await updateStaffLocation(latitude, longitude);
        return { latitude, longitude };
    } catch (error) {
        console.error('❌ Error getting location:', error.message);
        return null;
    }
};
