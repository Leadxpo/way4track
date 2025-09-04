import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Card, FAB, Menu, Provider, Modal, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchVouchers } from "../../Redux/Actions/vouchersAction";
import Header from '../../components/userHeader';

const Vouchers = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading: voucherLoading, vouchers, error: voucherError } = useSelector(state => state.vouchersReducers);
  const [searchQuery, setSearchQuery] = useState("");
  const [voucherData, setVoucherData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const vouchersPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchVouchers(vouchersPayload));
  }, [dispatch]);

  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
    };
    loadStaffloginData();
  }, []);

  const hasAddVoucherPermission = permissions.some(p => p.name === "voucher" && p.add);
  const hasEditVoucherPermission = permissions.some(p => p.name === "voucher" && p.edit);
  const hasDeleteVoucherPermission = permissions.some(p => p.name === "voucher" && p.delete);

  const filteredData = vouchers?.filter((item) => {
    return (item.voucherType?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  });

  const renderItem = ({ item }) => {
    const shortName = item?.voucherId?.split("-")[0]
    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.details}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar.Text label={shortName} size={50} style={{ marginRight: 10 }} />
              <Text style={[styles.clientName, { alignSelf: 'center' }]}>
                {item.voucherId}
              </Text>
            </View>
            <Text style={styles.clientInfo}>Ledger Name: <Text style={{ fontWeight: '400' }}>{item.ledgerName}</Text></Text>
            <Text style={styles.clientInfo}>Branch Name: <Text style={{ fontWeight: '400' }}>{item.branchName}</Text></Text>
            <Text style={styles.clientInfo}>Voucher Type: <Text style={{ fontWeight: '400' }}>{item.voucherType}</Text></Text>
            <Text style={styles.clientInfo}>Generation Date: <Text style={{ fontWeight: '400' }}>{item.generationDate?.split("T")[0]}</Text></Text>
            {item.supplierLocation && <Text style={styles.clientInfo}>Supplier Location: <Text style={{ fontWeight: '400' }}>{item.supplierLocation}</Text></Text>}
            {item.invoiceId && <Text style={styles.clientInfo}>Invoice ID: <Text style={{ fontWeight: '400' }}>{item.invoiceId}</Text></Text>}
            <Text style={styles.clientInfo}>Amount: <Text style={{ fontWeight: '400' }}>{item.amount}</Text></Text>
            {item.remainingAmount !== null && <Text style={styles.clientInfo}>Remaining Amount: <Text style={{ fontWeight: '400' }}>{item.remainingAmount}</Text></Text>}
            <Text style={[styles.status, { color: item.paymentStatus === 'COMPLETED' ? 'green' : 'gray' }]}>
              Status: {item.paymentStatus}
            </Text>
          </View>
          <Menu
            visible={menuVisible && selectedItem?.id === item.id}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setMenuVisible(true)
              }}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => {
              setMenuVisible(false)
              setModalVisible(true)
            }} title="Details" />
          </Menu>
        </View>
      </Card>)
  };

  return (
    <Provider>
      {/* Header */}
      <Header />
      {/* Dropdown for Branches */}

      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Voucher"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
        <FAB icon="plus" visible={hasAddVoucherPermission} label="AddVoucher" style={styles.fab} onPress={() => {
          dispatch(drawLabel("Voucher"));
          navigation.navigate('CreateVoucher');
        }} />
      </View>
      <Modal
        animationType="slide"
        transparent style={{flex:1,backgroundColor:'#00000090'}}
        visible={modalVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Voucher Details</Text>
              {selectedItem && (
                <>
                  <Text style={styles.modalText}>Voucher ID: {selectedItem.voucherId}</Text>
                  <Text style={styles.modalText}>Voucher Type: {selectedItem.voucherType}</Text>
                  <Text style={styles.modalText}>Ledger: {selectedItem.ledgerName}</Text>
                  <Text style={styles.modalText}>Branch: {selectedItem.branchName}</Text>
                  <Text style={styles.modalText}>Amount: {selectedItem.amount}</Text>
                  <Text style={styles.modalText}>Remaining Amount: {selectedItem.remainingAmount}</Text>
                  <Text style={styles.modalText}>Invoice ID: {selectedItem.invoiceId}</Text>
                  <Text style={styles.modalText}>Payment Status: {selectedItem.paymentStatus}</Text>
                  <Text style={styles.modalText}>Generation Date: {new Date(selectedItem.generationDate).toLocaleDateString()}</Text>
                  {selectedItem.supplierLocation && (
                    <Text style={styles.modalText}>Supplier Location: {selectedItem.supplierLocation}</Text>
                  )}
                  {selectedItem.purpose && (
                    <Text style={styles.modalText}>Purpose: {selectedItem.purpose}</Text>
                  )}
                  {/* Add more fields as needed */}
                  {Array.isArray(selectedItem.productDetails) && selectedItem.productDetails.length > 0 && (
              <>
                <Text style={[styles.modalTitle, { marginTop: 16 }]}>Product Details</Text>
                {selectedItem.productDetails.map((product, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.modalText}>Product Name: {product.productName || 'N/A'}</Text>
                    <Text style={styles.modalText}>TotalAmount:  {product.quantity || 0} x {product.rate || 0} ={product.totalCost || 0}</Text>
                    <Text style={styles.modalText}>Sale Type: {product.type || 'N/A'}</Text>
                  </View>
                ))}
              </>
            )}
                </>
              )}
              <Button mode="contained" onPress={() => setModalVisible(false)} style={{ marginTop: 16 }}>
                Close
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 2,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  }, 
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    maxHeight: '95%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8, borderColor: "#f3f3f3",
    paddingHorizontal: 15, borderWidth: 1,
    fontSize: 16,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  clientInfo: {
    fontSize: 14,
    color: "#555", fontWeight: 'bold',
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Vouchers;