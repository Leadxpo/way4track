import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet,Image } from 'react-native';
import { Avatar, Text, TextInput, Card, ActivityIndicator, Provider } from 'react-native-paper';
import { loadData } from '../../Utils/appData';
import api from '../../Api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!profileData) {
    return (
      <Provider>
      <Header/>
      <Text style={{margin:10,textAlign:"center"}}>No profile data available.</Text>);
      </Provider>
    )
  }

  return (
    <Provider>
      <Header/>
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
          title="Contact Information"
          left={() => <MaterialCommunityIcons name="phone" size={24} />}
        />
        <Card.Content>
          <Text><MaterialCommunityIcons name="cellphone" /> Mobile: {profileData?.phoneNumber || 'N/A'}</Text>
          <Text><MaterialCommunityIcons name="email" /> Email: {profileData?.email || 'N/A'}</Text>
          <Text><MaterialCommunityIcons name="email-outline" /> Office Email: {profileData?.officeEmail || 'N/A'}</Text>
          <Text><MaterialCommunityIcons name="map-marker" /> Location: {profileData?.location || 'N/A'}</Text>
        </Card.Content>
      </Card>

      {/* Address & Personal Info */}
      <Card style={styles.card}>
        <Card.Title
          title="Personal Information"
          left={() => <MaterialCommunityIcons name="account" size={24} />}
        />
        <Card.Content>
          <Text><MaterialCommunityIcons name="calendar" /> DOB: {profileData?.dob}</Text>
          <Text><MaterialCommunityIcons name="gender-male-female" /> Gender: {profileData?.gender}</Text>
          <Text><MaterialCommunityIcons name="blood-bag" /> Blood Group: {profileData?.bloodGroup}</Text>
          <Text><MaterialCommunityIcons name="home" /> Address: {profileData?.address}</Text>
        </Card.Content>
      </Card>

      {/* Bank Details */}
      <Card style={styles.card}>
        <Card.Title
          title="Bank Information"
          left={() => <MaterialCommunityIcons name="bank" size={24} />}
        />
        <Card.Content>
          <Text>Bank: {profileData?.bankName || 'N/A'}</Text>
          <Text>Branch: {profileData?.accountBranch || 'N/A'}</Text>
          <Text>Account #: {profileData?.accountNumber || 'N/A'}</Text>
          <Text>Type: {profileData?.accountType || 'N/A'}</Text>
          <Text>IFSC: {profileData?.ifscCode || 'N/A'}</Text>
        </Card.Content>
      </Card>

      {/* Work & Salary Info */}
      <Card style={styles.card}>
        <Card.Title
          title="Work & Salary"
          left={() => <MaterialCommunityIcons name="briefcase" size={24} />}
        />
        <Card.Content>
          <Text>Joining Date: {profileData?.joiningDate}</Text>
          <Text>Monthly Salary: ₹{profileData?.monthlySalary}</Text>
          <Text>Final Settlement: {profileData?.finalSettlementDate || 'N/A'}</Text>
          <Text>Resignation Date: {profileData?.resignationDate || 'N/A'}</Text>
          <Text>Termination Date: {profileData?.terminationDate || 'N/A'}</Text>
        </Card.Content>
      </Card>

      {/* Allocation Details */}
      <Card style={styles.card}>
        <Card.Title
          title="Resource Allocation"
          left={() => <MaterialCommunityIcons name="toolbox-outline" size={24} />}
        />
        <Card.Content>
          <Text>Bike Allocated: {profileData?.bikeAllocation}</Text>
          <Text>Mail Allocated: {profileData?.mailAllocation}</Text>
          <Text>Mobile Allocated: {profileData?.mobileAllocation}</Text>
          <Text>Mobile Brand: {profileData?.mobileBrand}</Text>
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

export default ProfileSettings;