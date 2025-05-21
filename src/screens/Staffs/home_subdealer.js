import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../../Api/api';

const Home_SubDealer = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);
  
  // To store total amounts
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalReeferAmount, setTotalReeferAmount] = useState(0);

  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {
        const payload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
          role:await loadData('role'),
        };

        if (payload.role === 'Technician' || payload.role === 'Sales Man') {
          payload.staffId =await loadData('staffId');
        }

        const response = await api.post('/dashboards/getPurchaseOrderDataTable', payload);
        
        if (response.status) {
          setDataSource(response.data || []);
        } else {
          setDataSource([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        Alert.alert('Error', 'Failed to fetch purchase order data.');
      }
    };

    fetchPurchaseOrderData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const payload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
          role: await loadData('role'),
        };

        if (payload.role === 'Technician' || payload.role === 'Sales Man') {
          payload.staffId = await loadData('staffId');
        }

        const response = await api.post('/dashboards/getPaymentDataTable', payload);
        
        if (response.status) {
          setData(response.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        Alert.alert('Error', 'Failed to fetch payment data.');
      }
    };

    fetchPaymentData();
  }, []);

  // Calculate total amounts
  useEffect(() => {
    const totalPurchase = dataSource.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    const totalReefer = data.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

    setTotalPurchaseAmount(totalPurchase);
    setTotalReeferAmount(totalReefer);
  }, [dataSource, data]);

  // Render Table Rows
  const renderTable = (data) => {
    if (!data.length) return null;
    const columns = Object.keys(data[0]);

    return data.map((item, index) => (
      <View key={index} style={styles.row}>
        {columns.map((column, colIndex) => (
          <Text key={colIndex} style={styles.cell}>{item[column]}</Text>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Total Amounts */}
      <View style={styles.inputContainer}>
        <TextInput
          value={`Purchase Amount: ${totalPurchaseAmount}`}
          editable={false}
          style={styles.input}
        />
        <TextInput
          value={`Reefer Amount: ${totalReeferAmount}`}
          editable={false}
          style={styles.input}
        />
      </View>

      {/* Purchase Order */}
      <Text style={styles.header}>Purchase Order</Text>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => renderTable([item])}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Business Given */}
      <Text style={styles.header}>Business Given</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => renderTable([item])}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  cell: {
    flex: 1,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: 'center',
  },
});

export default Home_SubDealer;
