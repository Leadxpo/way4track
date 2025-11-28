import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import { DataTable, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchVouchersbyDayBook } from "../../Redux/Actions/vouchersAction";
import Header from '../../components/userHeader';
import DatePicker from 'react-native-date-picker';
import { useFocusEffect } from '@react-navigation/native';

const DayBook = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading: voucherDaybookDataLoading, voucherDaybookData, error: voucherDaybookDataError } = useSelector(state => state.voucher_daybookReducer);

  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('xx-xxx xxxx');

  function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(date).replace(' ', ' - ');
  }

  useFocusEffect(
    useCallback(() => {
      const dayBookPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
      dispatch(fetchVouchersbyDayBook(dayBookPayload));
    }, [dispatch])
  )
  
  return (
    <View style={styles.container}>
      <Header />

      {/* Day Book Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Day Book</Text>
        <Text style={styles.date} onPress={() => setDateOpen(true)}>{selectedData}</Text>
      </View>
      <DatePicker
        modal
        open={dateOpen}
        date={date}
        mode='datetime'
        onConfirm={(date) => {
          setDateOpen(false)
          setDate(date)
          const selectedSlot = formatDate(date)
          setSelectedData(selectedSlot)
        }}
        onCancel={() => {
          setDateOpen(false)
        }}
      />

      {/* Data Table */}
      <ScrollView horizontal>
        <DataTable>
          {/* Table Header */}
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ justifyContent: 'center', backgroundColor: '#f3f3f3' }}><Text style={{ color: '#333333', fontSize: 15 }}>Title</Text></DataTable.Title>
            <DataTable.Title numeric style={{ justifyContent: 'center', backgroundColor: '#f9f9f9' }}><Text style={{ color: '#333333', fontSize: 15 }}>Debit</Text></DataTable.Title>
            <DataTable.Title numeric style={{ justifyContent: 'center', backgroundColor: '#f3f3f3' }}><Text style={{ color: '#333333', fontSize: 15 }}>Credit</Text></DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {voucherDaybookData.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>0000</DataTable.Cell>
              <DataTable.Cell numeric>0000</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      {/* Bottom Navigation */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  tableHeader: {
    backgroundColor: '#f3f3f3',
    width: Dimensions.get('screen').width
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#4CAF50',
  },
});

export default DayBook
