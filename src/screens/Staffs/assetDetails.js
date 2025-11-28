import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Card, Button, TextInput, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { permissions } from '../../Utils/permissions';

const AssetDetails = ({ navigation, route }) => {
  const { assetDetails } = route.params;  // Sample address data
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const [permissions, setPermissions] = useState([]);
  
  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
      console.log(permissions)
    };
    loadStaffloginData();
  }, []);

  const hasEditAssertPermission = permissions.some(p => p.name === "assets" && p.edit);

  const [formData, setFormData] = useState({
    loanId: '',
    principalAmount: '',
    interestAmount: '',
    emiAmount: '',
    stream: '',
    startingMonth: '',
    endingMonth: '',
    status: ''
  });


  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));


    // Remove error for the field once the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: ''
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.loanId) errors.loanId = 'Loan ID is required';
    if (!formData.principalAmount) {
      errors.principalAmount = 'Principal Amount is required';
    } else if (isNaN(formData.principalAmount)) {
      errors.principalAmount = 'Principal Amount must be a number';
    }

    if (!formData.interestAmount) {
      errors.interestAmount = 'Interest Amount is required';
    } else if (isNaN(formData.interestAmount)) {
      errors.interestAmount = 'Interest Amount must be a number';
    }

    if (!formData.emiAmount) {
      errors.emiAmount = 'EMI Amount is required';
    } else if (isNaN(formData.emiAmount)) {
      errors.emiAmount = 'EMI Amount must be a number';
    }

    if (!formData.stream) errors.stream = 'Stream is required';
    if (!formData.startingMonth) errors.startingMonth = 'Starting Month is required';
    if (!formData.endingMonth) errors.endingMonth = 'Ending Month is required';
    if (!formData.status) errors.status = 'Status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted successfully!', formData);
      // Perform your submission logic here (e.g., API call)
    } else {
      console.log('Form has errors:', formErrors);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Asset Details Card */}
      <Card style={styles.assetCard}>
        <View style={styles.assetHeader}>
          <Image
            source={{ uri: assetDetails.assetPhoto }} // Replace with your motorbike image
            style={styles.assetImage}
          />
          <View style={styles.assetInfo}>
            <Text style={styles.assetTitle}>{assetDetails.assertsName}</Text>
            <Text style={[styles.assetLocation, { color: '#27AE60' }]}>{assetDetails.assetType}</Text>
            <Text style={styles.assetLocation}>{assetDetails.branchId.branchName}</Text>
            <Text style={styles.assetAmount}> {assetDetails.assertsAmount} /-</Text>
            <Text style={[styles.assetAmount, { color: '#27AE60' }]}> {assetDetails.voucherId.voucherType} </Text>
            {hasEditAssertPermission &&<Button mode="contained" style={styles.moreDetailsButton}  onPress={() => {
                  dispatch(drawLabel("Asserts"));
                  navigation.navigate('EditAsset',{assetDetails:assetDetails});
                }}>
              Edit
            </Button>}
          </View>
        </View>
      </Card>
      <Text style={styles.assetTitle}>{assetDetails.vocherID}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -5,
    right: -10,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
  },
  input: {
    borderWidth: 1, height: 48,
    borderColor: "#ccc", padding: 0,
    marginBottom: 15, borderRadius: 8
  },
  assetCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  assetInfo: {
    marginLeft: 16,
  },
  assetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  assetLocation: {
    fontSize: 14,
    color: '#808080',
  },
  assetAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  moreDetailsButton: {
    marginTop: 8, color: "#f3f3f3",
    backgroundColor: '#4caf50',
  },
  inputSection: {
    padding: 16,
  },
  sectionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionAmount: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50'
  }
});

export default AssetDetails;
