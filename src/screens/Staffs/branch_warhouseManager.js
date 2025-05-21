import React, { useState ,useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image,Animated, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from '../../components/userHeader';

const branchData = [
  {
    branchName: 'Visakhapatnam',
    products: [],
  },
  {
    branchName: 'Hyderabad',
    products: [
      { id: '01', name: 'Bike GPS Tracker', type: 'Bike GPS Tracker', count: 45, image: 'https://via.placeholder.com/50' },
      { id: '02', name: 'Car GPS Tracker', type: 'Car GPS Tracker', count: 56, image: 'https://via.placeholder.com/50' },
      { id: '03', name: 'Bike GPS Tracker', type: 'Bike GPS Tracker', count: 509, image: 'https://via.placeholder.com/50' },
      { id: '04', name: 'Car GPS Tracker', type: 'Car GPS Tracker', count: 346, image: 'https://via.placeholder.com/50' },
    ],
  },
  {
    branchName: 'Vijayawada',
    products: [],
  },
  {
    branchName: 'Kakinada',
    products: [],
  },
];

const Branch_WarhouseManager = () => {
  const [expandedBranch, setExpandedBranch] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleBranch = (branchName) => {
    if (expandedBranch === branchName) {
      // Collapse animation
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedBranch(null));
    } else {
      setExpandedBranch(branchName);
      // Expand animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  // const toggleBranch = (branchName) => {
  //   setExpandedBranch(expandedBranch === branchName ? null : branchName);
  // };

  const renderProductItem = ({ item }) => (
    <View style={styles.productRow}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productText}>{item.id}</Text>
      <Text style={styles.productText}>{item.name}</Text>
      <Text style={styles.productText}>{item.type}</Text>
      <Text style={styles.productText}>{item.count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header/>
      <View style={{backgroundColor:"#f3f3f3"}}>

      <Text style={styles.heading}>Branch's</Text>

      {branchData.map((branch, index) => {
        const isExpanded = expandedBranch === branch.branchName;
        const animatedHeight = animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, branch.products.length > 0 ? 200 : 0], // Adjust height dynamically
        });

        return (
          <View key={index} style={styles.branchContainer}>
            {/* Branch Header */}
            <TouchableOpacity
              style={styles.branchHeader}
              onPress={() => toggleBranch(branch.branchName)}
            >
              <Text style={styles.branchTitle}>{branch.branchName}</Text>
              <MaterialCommunityIcons
                name={isExpanded ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'}
                size={24}
                color="#f3f3f3"
              />
            </TouchableOpacity>

            {/* Animated Products Table */}
            {branch.products.length > 0 && (
              <Animated.View style={[styles.animatedContainer, { height: isExpanded ? animatedHeight : 0, overflow: 'hidden' }]}>
                <Card style={styles.productCard} mode='elevated'>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, { flex: 1 }]}>No.</Text>
                    <Text style={[styles.tableHeaderText, { flex: 3 }]}>Product Name</Text>
                    <Text style={[styles.tableHeaderText, { flex: 2 }]}>Type</Text>
                    <Text style={[styles.tableHeaderText, { flex: 2 }]}>Number of Product</Text>
                  </View>

                  <FlatList data={branch.products} keyExtractor={(item) => item.id} renderItem={renderProductItem} />
                </Card>
              </Animated.View>
            )}
          </View>
        );
      })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  branchContainer: {
    marginBottom: 10,
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#029D48',
    padding: 15,
    borderRadius: 5,
  },
  branchTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  productCard: {
    marginTop: 5,
    backgroundColor: '#fff',
    padding: 10,margin:5,
    borderRadius: 5,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',justifyContent:'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontWeight: 'bold',justifyContent:'center',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  productText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    flex: 1,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
});
export default Branch_WarhouseManager;
