import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Avatar, Text, TextInput, Card, ActivityIndicator, Provider } from 'react-native-paper';
import { loadData } from '../../Utils/appData';
import api from '../../Api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';
import { useFocusEffect } from "@react-navigation/native";

const ProfileSubStaffSettings = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {

        try {
          const payload = {
            staffId: await loadData('staffID'),
            id: await loadData('ID'),
            companyCode: "WAY4TRACK",
            unitCode: "WAY4",
          };
          const response = await api.post('/subDealerStaff/getSubDealerStaffDetailsById', payload);
          if (response && response.status) {
            setProfileData(response.data?.data || null);
          } else {
            setError(response?.internalMessage || 'Failed to fetch profile details.');
          }
        } catch (err) {
          setError('Error fetching profile details.');
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [])
  )

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!profileData) {
    return (
      <Provider>
        <Header />
        <Text style={{ margin: 10, textAlign: "center" }}>No profile data available.</Text>);
      </Provider>
    )
  }

  return (
    <Provider>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <Card style={styles.card}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: profileData?.subDealerId?.subDealerPhoto }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profileData?.name || 'N/A'}</Text>
              <Text style={styles.designation}>Staff ID: {profileData?.staffId || 'N/A'}</Text>
              <Text style={styles.department}>Sub-dealer: {profileData?.subDealerId?.name || 'N/A'}</Text>
            </View>
          </View>
        </Card>

        {/* Contact Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Contact Information"
            left={() => <MaterialCommunityIcons name="phone" size={24} />}
          />
          <Card.Content>
            <Text><MaterialCommunityIcons name="cellphone" /> Mobile: {profileData?.phoneNumber || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="phone-classic" /> Alternate: {profileData?.alternateNumber || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="email" /> Email: {profileData?.email || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* Personal Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Personal Information"
            left={() => <MaterialCommunityIcons name="account" size={24} />}
          />
          <Card.Content>
            <Text><MaterialCommunityIcons name="calendar" /> DOB: {profileData?.dob || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="gender-male-female" /> Gender: {profileData?.gender || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="map-marker" /> Address: {profileData?.address || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* Identification Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Identification"
            left={() => <MaterialCommunityIcons name="card-account-details-outline" size={24} />}
          />
          <Card.Content>
            <Text><MaterialCommunityIcons name="credit-card" /> Aadhar: {profileData?.aadharNumber || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="card-text" /> PAN: {profileData?.panCardNumber || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* SubDealer Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Sub Dealer Information"
            left={() => <MaterialCommunityIcons name="account-supervisor" size={24} />}
          />
          <Card.Content>
            <Text><MaterialCommunityIcons name="identifier" /> ID: {profileData?.subDealerId?.subDealerId || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="account" /> Name: {profileData?.subDealerId?.name || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="phone" /> Phone: {profileData?.subDealerId?.subDealerPhoneNumber || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="email" /> Email: {profileData?.subDealerId?.emailId || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="map-marker" /> Address: {profileData?.subDealerId?.address || 'N/A'}</Text>
            <Text><MaterialCommunityIcons name="file-document" /> GST: {profileData?.subDealerId?.gstNumber || 'N/A'}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 16,
    color: '#007BFF',
  },
  department: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default ProfileSubStaffSettings;