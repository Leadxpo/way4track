import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const getStatusColor = (status = "") => {
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

const RequestRaiseDetails = ({ route }) => {
  const data = route?.params?.requestRaiseDetails || {};

  const {
    requestId,
    requestType,
    description,
    status,
    createdDate,
    requestFrom,
    requestTo,
    requestFor,
    branchId,
    fromDate,
    toDate,
    products,
  } = data;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Request Details</Text>

        <Detail label="Request ID" value={requestId} />
        <Detail label="Request Type" value={requestType} />
        <Detail label="Request From" value={requestFrom?.name} />
        <Detail label="Request To" value={requestTo?.name} />
        <Detail label="Branch" value={branchId?.branchName} />
        <Detail label="Request For" value={requestFor || 'N/A'} />
        <Detail label="Created Date" value={new Date(createdDate).toLocaleString()} />

        {/* Conditional Fields Based on Request Type */}
        {["leaveRequest", "personal"].includes(requestType?.toLowerCase()) && (
          <>
            <Detail label="From Date" value={new Date(fromDate).toDateString()} />
            <Detail label="To Date" value={new Date(toDate).toDateString()} />
          </>
        )}

        {requestType?.toLowerCase() === "products" && Array.isArray(products) && (
          <>
            <Text style={styles.subTitle}>Products:</Text>
            {products.map((product, index) => (
              <View key={index} style={styles.productRow}>
                <Text style={styles.productText}>{product.productType}</Text>
                <Text style={styles.productQty}>Qty: {product.quantity}</Text>
              </View>
            ))}
          </>
        )}

        {description && <Detail label="Description" value={description} />}

        {/* Status Box */}
        <View style={[styles.statusBox, { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>Status: {status?.toUpperCase()}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable Detail Row
const Detail = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value || 'N/A'}</Text>
  </View>
);

// Styles
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
    color: '#007AFF',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    width: 130,
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef6ff',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  productText: {
    fontWeight: '500',
    color: '#333',
  },
  productQty: {
    fontWeight: '500',
    color: '#555',
  },
  statusBox: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
});

export default RequestRaiseDetails;
