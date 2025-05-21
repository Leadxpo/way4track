import BackgroundService from 'react-native-background-actions';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

// Request location permissions
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.error('⚠️ Permission request failed:', error);
      return false;
    }
  }
  return true; // iOS permission is handled differently
};

// Background location tracking task
const trackingTask = async (taskData) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCmiyc8iXq1KDOmW_-yWsjALkQVY1z8krw'; // Replace with your real key

  // while (BackgroundService.isRunning()) {
    console.log("📌 Fetching location...");

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

      const { lat, lng } = locationData.location;

      const location={lat:lat,log:lng}
      return location;
    }catch (error) {
      console.error('Error getting address:', error);
      return null;
  }

    // await new Promise(res => setTimeout(res, taskData.delay)); // Wait for specified delay
  // }
};

// Start background location tracking
const startTracking = async () => {
  console.log("🚀 Attempting to start tracking...");
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log('⛔ Location permission denied');
    return;
  }

  const options = {
    taskName: 'Tracking',
    taskTitle: 'Location Tracking',
    taskDesc: 'Tracking user location in the background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff0000',
    linkingURI: 'way4track://tracking', // Ensure this URI is configured in your app
    progressBar: { max: 100, value: 0, indeterminate: true },
    parameters: { delay: 10000 }, // Fetch location every 3 seconds
  };

  try {
   const loc=await trackingTask({delay:3000});
    // await BackgroundService.start(trackingTask({delay:3000}), options);
    return loc
  } catch (error) {
    console.error('❌ Failed to start background tracking:', error.message);
  }
};

// Stop background tracking
const stopTracking = async () => {
  try {
    console.log("🛑 Stopping background tracking...");
    await BackgroundService.stop();
    console.log('✅ Background tracking successfully stopped');
  } catch (error) {
    console.error('❌ Failed to stop background tracking:', error.message);
  }
};

export { startTracking, stopTracking };
