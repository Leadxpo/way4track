import React, { useState,useEffect,useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView, TextInput} from 'react-native';
import {  Card, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchInvioces } from '../../Redux/Actions/estimatesAction';
import Header from '../../components/userHeader';
import { useFocusEffect } from '@react-navigation/native';

const Invoice = ({ navigation }) => {
  const dispatch = useDispatch();
  const { invoices, loading: invoicesLoading, error: invoicesError } = useSelector(state => state.invoicesReducer);

  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
    const fetchPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
    dispatch(fetchInvioces(fetchPayload));
  }, [dispatch])
)

  const filteredData = invoices?.filter(item => {
    const matchesSearch =
      item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceId?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch ;
  });

  const renderItem = ({ item }) => (
    <Card key={item.id} style={styles.card} onPress={()=> navigation.navigate("Home", {
      screen: "InvoiceDetails",
      params: { estimateDetails: item }
    })}>
     <Text style={{fontWeight:'bold',fontSize:18,color:"#28a745"}}>{item.invoiceId}</Text>
      <Card.Title
        title={`Client: ${item.clientName}`}
        subtitle={`Estimate Date: ${item.estimateDate?.split("T")[0]}\nExpiry Date: ${item.expiryDate}`}
        left={props => (
          <Avatar.Text
            {...props}
            label={item.clientName?.charAt(0)}
            style={{ backgroundColor: '#28a745' }}
          />
        )}
      />
      <Card.Content>
        <Text>Amount: {item.totalAmount}</Text>
        <Text>Branch Name: {item.branchName}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
            <Header />
      <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search Client Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    elevation: 4,
    marginBottom: 10,
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,borderColor:"#aaaaaa",
    elevation: 2,borderWidth:1,
  },
  card: {
    margin: 10,padding:10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  button: {
    backgroundColor: '#28a745',
    marginTop: 10,
  },
});

export default Invoice;
