import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Card, Avatar, Button, Menu, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// const vendorPunchers = [
//   { id: '1', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Paid' },
//   { id: '2', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Pending' },
// ];

// const vendorBusiness = [
//   { id: '3', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Paid' },
//   { id: '4', date: '01-03-2025', business: 'Product', amount: '₹2099', status: 'Pending' },
// ];

const VendorDetails = ({ navigation, route }) => {
  const { vendorDetails } = route.params;
  const [visibleMenus, setVisibleMenus] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const [products, setProducts] = useState([
    { id: "1", name: "gpsTracker", tot_count: 10, onhand: 3, image: "https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/F/X/210863_1671027904.jpg" },
    { id: "2", name: "fuelControl", tot_count: 10, onhand: 3, image: "https://aerocontact.b-cdn.net/public/img/aviaexpo/produits/images/147/detail_APU-fuel-control-900x636.jpg" },
    { id: "3", name: "speedAnalizer", tot_count: 10, onhand: 3, image: "https://m.media-amazon.com/images/I/719L+Cnk9gL.jpg" },
  ]);
  
  const toggleMenu = (id) => {
    setVisibleMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const closeMenu = (id) => {
    setVisibleMenus((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const handleMenuAction = (action, id) => {
    closeMenu(id);
    console.log(`${action} clicked for item ${id}`);
  };

  const renderVendorEntry = ({ item }) => (
    <Card style={styles.entryCard}>
      <View style={styles.entryRow}>
        <View>
          <Text style={styles.entryText}>Date: {item.date}</Text>
          <Text style={styles.entryText}>Business: {item.business}</Text>
          <Text style={styles.entryText}>Amount: {item.amount}</Text>
          <Text style={styles.entryText}>Status: {item.status}</Text>
        </View>
        <Menu
          visible={visibleMenus[item.id]}
          onDismiss={() => closeMenu(item.id)}
          anchor={
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#333"
              onPress={() => toggleMenu(item.id)}
            />
          }
        >
          <Menu.Item onPress={() => handleMenuAction('Edit', item.id)} title="Edit" />
          <Menu.Item onPress={() => handleMenuAction('Delete', item.id)} title="Delete" />
          <Menu.Item onPress={() => handleMenuAction('Show Details', item.id)} title="Show Details" />
        </Menu>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Vendor Info */}
      <Card style={styles.card}>
        <View style={styles.vendorInfo}>
          <Avatar.Image
            size={80}
            source={{ uri: vendorDetails.image }} // Replace with actual image URL
            style={styles.avatar}
          />
          <View style={styles.details}>
          <Text style={styles.infoText}>Name:{vendorDetails.name} </Text>
            <Text style={styles.infoText}>Phone: +91 {vendorDetails.phone}</Text>
            <Text style={styles.infoText}>Email: {vendorDetails.Email}</Text>
            <Text style={styles.infoText}>Address: {vendorDetails.address}</Text>
          </View>
        </View>
      </Card>

      {/* Products Section */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productText}>{item.name}</Text>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

      {/* Tab View for Vendor Data */}
      {/* <TabView
        navigationState={{
          index: activeTab,
          routes: [
            { key: 'vendorPunchers', title: 'Vendor Punchers' },
            { key: 'vendorBusiness', title: 'Vendor Business' },
          ],
        }}
        onIndexChange={setActiveTab}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'vendorPunchers':
              return (
                <FlatList
                  data={vendorPunchers}
                  keyExtractor={(item) => item.id}
                  renderItem={renderVendorEntry}
                />
              );
            case 'vendorBusiness':
              return (
                <FlatList
                  data={vendorBusiness}
                  keyExtractor={(item) => item.id}
                  renderItem={renderVendorEntry}
                />
              );
            default:
              return null;
          }
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor:"#ffffff",
    elevation: 4,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    marginRight: 16,
    borderRadius: 8,
    elevation: 4,backgroundColor:"#ffffff",
    alignItems: 'center',
    padding: 16,
    width: Dimensions.get("screen").width/2.5,
    height: Dimensions.get("screen").width/2.2,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    fontFamily: "Roboto-Bold",
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
});

export default VendorDetails;
