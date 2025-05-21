import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const InstallationProcessing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>Installation Processing</Text>

      <Image
          source={{ uri: "https://storage.googleapis.com/way4track-application/Sharlon_App_usage/Sharon%20Telematics%20Logo.png" }} // Replace with actual URL
          style={styles.logo}
          resizeMode="contain"
        />
      {/* Installation Processing Section */}
      <Image
        source={{ uri: "https://storage.googleapis.com/way4track-application/Sharlon_App_usage/InstallationProcessing.png" }} // Replace with actual URL
        style={styles.mainImage}
        resizeMode="contain"
      />

      {/* Refresh Button */}
      <Button mode="contained" onPress={() =>navigation.navigate("InstallSuccessfully")} style={styles.refreshButton} >
        Next
      </Button>
    </View>
  );
};

export default InstallationProcessing;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", padding: 15, backgroundColor: "#fff", borderBottomWidth: 2, borderColor: "#f3f3f3" },
  logo: { width: 300, height: 300 },
  title: { fontSize: 22, fontWeight: "bold", color: "#d89225", marginVertical: 20 },
  mainImage: { width: "90%", height: 250 },

  refreshButton: { backgroundColor: "green", marginTop: 20, paddingHorizontal: 40, paddingVertical: 10 },

  bottomNav: { flexDirection: "row", justifyContent: "space-around", width: "100%", position: "absolute", bottom: 0, backgroundColor: "#fff", paddingVertical: 10, borderTopWidth: 1, borderColor: "#ddd" },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#555", marginTop: 3 },
});
