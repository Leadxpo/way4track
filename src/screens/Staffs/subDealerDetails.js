import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import { Card, Button, Menu, SegmentedButtons } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SubDealerDetails = ({ navigation, route }) => {
  const { subdealerDetails } = route.params;
  const [products, setProducts] = useState([
    { id: "1", name: "gpsTracker", tot_count: 10, onhand: 3, image: "https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/F/X/210863_1671027904.jpg" },
    { id: "2", name: "fuelControl", tot_count: 10, onhand: 3, image: "https://aerocontact.b-cdn.net/public/img/aviaexpo/produits/images/147/detail_APU-fuel-control-900x636.jpg" },
    { id: "3", name: "speedAnalizer", tot_count: 10, onhand: 3, image: "https://m.media-amazon.com/images/I/719L+Cnk9gL.jpg" },
  ]);

  const dealerPunchers = [
    { id: '1', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Paid' },
    { id: '2', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Pending' },
  ];

  const dealerBusiness = [
    { id: '3', date: '01-03-2025', business: 'services', amount: '₹2099', status: 'Paid' },
    { id: '4', date: '01-03-2025', business: 'services', amount: '₹2099', status: 'Pending' },
  ];
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSegment, setActiveSegment] = useState('dealerPunchers');

  const toggleMenu = (id) => {
    setVisibleMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeMenu = (id) => {
    setVisibleMenus((prev) => ({ ...prev, [id]: false }));
  };

  const handleMenuAction = (action, id) => {
    closeMenu(id);
    console.log(`${action} clicked for item ${id}`);
  };

  const renderDealerEntry = ({ item }) => (
    <Card style={styles.entryCard}>
      <View style={styles.entryRow}>
        <View>
          <Text style={styles.entryText}>Date: {item.date}</Text>
          <Text style={styles.entryText}>Business: {item.business}</Text>
          <Text style={styles.entryText}>Amount: {item.amount}</Text>
          <Text style={styles.entryText}>Status: {item.status}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("subdealers details")
          }} >
          <MaterialCommunityIcons
            name="eye"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderProduct = ({ item }) => (
    <Card style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productText}>{item.name}</Text>
    </Card>
  );
  const data = activeSegment === 'dealerPunchers' ? dealerPunchers : dealerBusiness;

  return (
    <View style={styles.container}>
      {/* Vendor Info */}
      <Card style={styles.card}>
        <View style={styles.vendorInfo}>
          <View style={styles.details}>
            <Text style={styles.infoText}>Name:{subdealerDetails.name} </Text>
            <Text style={styles.infoText}>Phone: +91 {subdealerDetails.phone}</Text>
            <Text style={styles.infoText}>Email: {subdealerDetails.Email}</Text>
            <Text style={styles.infoText}>Address: {subdealerDetails.address}</Text>
          </View>
        </View>
      </Card>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={renderProduct}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {/* Segmented Buttons */}
      <SegmentedButtons
        value={activeSegment}
        onValueChange={setActiveSegment}
        buttons={[
          { value: 'dealerPunchers', label: 'Dealer Punchers' },
          { value: 'dealerBusiness', label: 'Dealer Business' },
        ]}
        style={styles.segmentedButtons}
      />
      {/* List based on Active Segment */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderDealerEntry}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.actionButtons}>
        <Button mode="contained" style={styles.saveButton} onPress={() => console.log('Save')}>Save</Button>
        <Button mode="outlined" style={styles.cancelButton} onPress={() => console.log('Cancel')}>Cancel</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8, backgroundColor: "#ffffff",
    elevation: 4,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  details: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productCard: {
    marginRight: 16,
    borderRadius: 8,
    elevation: 4, backgroundColor: "#f9f9f9",
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    width: Dimensions.get("screen").width / 3,
    height: Dimensions.get("screen").width / 2.2,
  },
  productImage: {
    width: 100,
    height: 100, borderRadius: 5,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  entryCard: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  entryText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default SubDealerDetails;
