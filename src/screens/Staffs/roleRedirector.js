import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { loadData } from '../../Utils/appData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, ProgressBar, useTheme } from 'react-native-paper';

const RoleRedirector = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.02;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const redirect = async () => {
      const fetchedRole = await loadData("role");
      console.log("rolesss:", fetchedRole)
      setTimeout(() => {
        if (fetchedRole === "Technician" || fetchedRole === "Technician" || fetchedRole === "Field Technician") {
          navigation.reset({
            index: 0,
            routes: [{ name: "TechBottomStack" }],
          });
        } else if (fetchedRole === "SalesMan" || fetchedRole === "Sales Executive") {
          navigation.reset({
            index: 0,
            routes: [{ name: "SalesBottomStack" }],
          });
        } else if (fetchedRole === "sub dealer staff") {
          navigation.reset({
            index: 0,
            routes: [{ name: "SubdealerStaffBottomStack" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }
      }, 2000); // show loading screen for 2 seconds
    };

    redirect();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="progress-clock" size={50} color={theme.colors.primary} />
      <Text style={styles.title}>SHARONTELEMATRIC</Text>
      <Text style={styles.subtitle}>Please wait home screen was loading ..</Text>
      <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 8,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
});

export default RoleRedirector;
