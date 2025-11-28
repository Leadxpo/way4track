import React, { useState, useEffect,useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Avatar, Text, TextInput, Card, ActivityIndicator, Provider } from 'react-native-paper';
import { loadData } from '../../Utils/appData';
import api from '../../Api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';
import { useFocusEffect } from "@react-navigation/native";

const ProfileSettings = () => {
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
          const response = await api.post('/staff/getStaffDetailsById', payload);
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
              source={{ uri: profileData?.staffPhoto }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profileData?.name}</Text>
              <Text style={styles.designation}>{profileData?.designation}</Text>
              <Text style={styles.department}>{profileData?.department}</Text>
            </View>
          </View>
        </Card>

        {/* Contact Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Contact Information" titleStyle={{color:'#29AB87', fontWeight:'bold'}}
            left={() => <MaterialCommunityIcons name="phone" size={24} color={'#3EB489'} />}
          />
          <Card.Content>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="cellphone" color={'#3EB489'} /> Mobile: {profileData?.phoneNumber || 'N/A'}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="email" color={'#3EB489'} /> Email: {profileData?.email || 'N/A'}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="email-outline" color={'#3EB489'} /> Office Email: {profileData?.officeEmail || 'N/A'}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="map-marker" color={'#3EB489'} /> Location: {profileData?.location || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* Address & Personal Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Personal Information" titleStyle={{color:'#29AB87', fontWeight:'bold'}}
            left={() => <MaterialCommunityIcons name="account" size={24} color={'#3EB489'} />}
          />
          <Card.Content>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="calendar" color={'#3EB489'}/> DOB: {profileData?.dob}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="gender-male-female" color={'#3EB489'} /> Gender: {profileData?.gender}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="blood-bag" color={'#3EB489'} /> Blood Group: {profileData?.bloodGroup}</Text>
            <Text style={{color:'#004526'}}><MaterialCommunityIcons name="home" color={'#3EB489'}/> Address: {profileData?.address}</Text>
          </Card.Content>
        </Card>

        {/* Bank Details */}
        <Card style={styles.card}>
          <Card.Title
            title="Bank Information" titleStyle={{color:'#29AB87', fontWeight:'bold'}}
            left={() => <MaterialCommunityIcons name="bank" size={24} color={'#3EB489'}/>}
          />
          <Card.Content>
            <Text style={{color:'#004526'}}>Bank: {profileData?.bankName || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>Branch: {profileData?.accountBranch || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>Account #: {profileData?.accountNumber || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>Type: {profileData?.accountType || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>IFSC: {profileData?.ifscCode || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* Work & Salary Info */}
        <Card style={styles.card}>
          <Card.Title
            title="Work & Salary" titleStyle={{color:'#29AB87', fontWeight:'bold'}}
            left={() => <MaterialCommunityIcons name="briefcase" size={24} color={'#3EB489'}/>}
          />
          <Card.Content>
            <Text style={{color:'#004526'}}>Joining Date: {profileData?.joiningDate}</Text>
            <Text style={{color:'#004526'}}>Monthly Salary: ₹{profileData?.monthlySalary}</Text>
            <Text style={{color:'#004526'}}>Final Settlement: {profileData?.finalSettlementDate || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>Resignation Date: {profileData?.resignationDate || 'N/A'}</Text>
            <Text style={{color:'#004526'}}>Termination Date: {profileData?.terminationDate || 'N/A'}</Text>
          </Card.Content>
        </Card>

        {/* Allocation Details */}
        <Card style={styles.card}>
          <Card.Title
            title="Resource Allocation" titleStyle={{color:'#29AB87', fontWeight:'bold'}}
            left={() => <MaterialCommunityIcons name="toolbox-outline" size={24} color={'#3EB489'} />}
          />
          <Card.Content>
            <Text style={{color:'#004526'}}>Bike Allocated: {profileData?.bikeAllocation}</Text>
            <Text style={{color:'#004526'}}>Mail Allocated: {profileData?.mailAllocation}</Text>
            <Text style={{color:'#004526'}}>Mobile Allocated: {profileData?.mobileAllocation}</Text>
            <Text style={{color:'#004526'}}>Mobile Brand: {profileData?.mobileBrand}</Text>
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
    flex: 1,color:'#333333',
  },
  name: {
    fontSize: 20,color:'#333333',
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 16,color:'#333333',
    color: '#007BFF',
  },
  department: {
    fontSize: 14,color:'#333333',
    color: '#6c757d',
  },
});

export default ProfileSettings;