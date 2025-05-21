import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, DataTable, BottomNavigation, Badge } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EstimationDetails = ({ navigation, route }) => {
  
  const { estimateDetails } = route.params;  // Sample address data
  return (
    <View style={styles.container}>
      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        {/* Estimate Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>SHARON TELEMATICS PRIVATE LIMITED</Text>
            <Text style={styles.subtitle}>123 Street, City, State, PIN</Text>
            <Text style={styles.subtitle}>GSTIN: XXXXXXX</Text>
            <View style={styles.invoiceInfo}>
              <Text>Date: {estimateDetails.estimateDate.split('T')[0]}</Text>
              <Text>Due Date: {estimateDetails.expireDate}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Product Table */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>#</DataTable.Title>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>eachPrice</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          {
            estimateDetails.products.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{index+1}</DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.quantity} * {item.amount}</DataTable.Cell>
                  <DataTable.Cell numeric>₹ {parseInt(item.quantity)*parseInt(item.amount)} /-</DataTable.Cell>
                </DataTable.Row>
              )
            })
          }
          <DataTable.Row>
                  <DataTable.Cell style={{}}>Total Estimated Amount</DataTable.Cell>
                  <DataTable.Cell numeric>₹ {estimateDetails.totalAmount} /-</DataTable.Cell>
                </DataTable.Row>
        </DataTable>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button mode="contained" style={styles.buttonOrange} onPress={()=>navigation.navigate('AddInvoices',{estimateDetails:estimateDetails})}>{`Estimate --> Invoice`}</Button>
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  logo: { fontSize: 20, color: '#00b74a', fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notification: { position: 'relative', marginRight: 16 },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#ff0000', color: '#fff' },
  body: { padding: 16 },
  card: { marginBottom: 16,backgroundColor:'#f3f3f3' },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#444444' },
  invoiceInfo: { marginTop: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  buttonOrange: { backgroundColor: '#ff9800' },
  buttonGreen: { backgroundColor: '#00b74a' },
});

export default EstimationDetails;
