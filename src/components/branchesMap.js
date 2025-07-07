import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ApiService from "../services/ApiService"; // Adjust path

const { width, height } = Dimensions.get("window");

const defaultRegion = {
  latitude: 15.9129,
  longitude: 79.7400,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const GoogleMapScreen = () => {
  const [branches, setBranches] = useState([]);
  const [region, setRegion] = useState(defaultRegion);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post("/branch/getBranchDetails");

        if (response.status && Array.isArray(response.data)) {
          const validBranches = response.data.filter((branch) => {
            const lat = parseFloat(branch.latitude);
            const lng = parseFloat(branch.longitude);
            return !isNaN(lat) && !isNaN(lng);
          });

          setBranches(validBranches);

          if (validBranches.length > 0) {
            const first = validBranches[0];
            setRegion({
              latitude: parseFloat(first.latitude),
              longitude: parseFloat(first.longitude),
              latitudeDelta: 2,
              longitudeDelta: 2,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {branches.map((branch, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(branch.latitude),
              longitude: parseFloat(branch.longitude),
            }}
            image={'../utilities/images/way4tracklogo.png'}
            title={branch.branchName}
            description={branch.address || ""}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.6,
  },
});

export default GoogleMapScreen;
