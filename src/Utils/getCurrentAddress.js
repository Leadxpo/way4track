import { PermissionsAndroid, Platform } from 'react-native';

// DO NOT USE THIS IN PRODUCTION — Move your API key to a secure place
const GOOGLE_MAPS_API_KEY = 'AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw'; // Replace with your real key

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

export const getCurrentAddress = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
        console.warn('Location permission not granted');
        return null;
    }

    try {
        // Get coordinates using Google's Geolocation API (uses WiFi, cell data)
        const locationResponse = await fetch(
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            }
        );

        const locationData = await locationResponse.json();
        console.log("location : ", locationData)
        const { lat, lng } = locationData.location;

        // Now get human-readable address using Geocoding API
        const addressResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
        );

        const addressData = await addressResponse.json();

        if (addressData.status === 'OK') {
            // Find result where location_type is 'ROOFTOP'
            const rooftopResult = addressData.results.find(
                (result) => result.geometry.location_type === 'ROOFTOP'
            );

            const address = rooftopResult?.formatted_address || addressData.results[0]?.formatted_address;
            return address || 'Address not found';
        } else {
            console.warn('Geocode API error:', addressData.status);
            return null;
        }
    } catch (error) {
        console.error('Error getting address:', error);
        return null;
    }
};
