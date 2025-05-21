import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "accepted": return "#c1e1c1";
    case "rejected": return "#ffa9a8";
    case "expire": return "#d3d3d3";
    case "sent": return "#add8e6";
    case "declined": return "#ffc4a8";
    case "pending": return "#fdfd96";
    default: return "#f3f3f3";
  }
};

const RequestRaiseDetails= ({ route }) => {
  const data = route?.params?.requestRaiseDetails || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Request Details</Text>

        <Detail label="Request ID" value={data.requestId} />
        <Detail label="Request Type" value={data.requestType} />
        <Detail label="Description" value={data.description} />
        <Detail label="Company Code" value={data.companyCode} />
        <Detail label="Unit Code" value={data.unitCode} />
        <Detail label="From Date" value={data.fromDate || 'N/A'} />
        <Detail label="To Date" value={data.toDate || 'N/A'} />
        <Detail label="Created At" value={new Date(data.createdAt).toLocaleString()} />
        <Detail label="Updated At" value={new Date(data.updatedAt).toLocaleString()} />

        <View style={[styles.statusBox, { backgroundColor: getStatusColor(data.status) }]}>
          <Text style={styles.statusText}>Status: {data.status?.toUpperCase()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Detail = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 120,
  },
  value: {
    flex: 1,
    color: '#333',
  },
  statusBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RequestRaiseDetails;
