import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, } from 'react-native';
import { Card, FAB, Badge, Avatar } from 'react-native-paper';
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import BranchesDropdown from '../../components/branchDropdown';
import { fetchAsserts } from '../../Redux/Actions/assertAction';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Asset = ({ navigation }) => {
  const dispatch = useDispatch();
  const { asserts, loading: assertsLoading, error: assertsError } = useSelector(state => state.assertsReducer);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
      console.log(permissions)
    };
    loadStaffloginData();
  }, []);

  const hasAddAssertPermission = permissions.some(p => p.name === "assets" && p.add);
  const hasDeleteAssertPermission = permissions.some(p => p.name === "assets" && p.delete);

  // State management
  const [branch, setBranch] = useState('All');
  const [branchId, setBranchId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assetType, setAssetType] = useState([
    { key: 'All', color: '#FF8080', label: 'All Branches Assets', count: 0 },
    { key: 'office asset', color: '#80FF80', label: 'Office Assets', count: 0 },
    { key: 'transport asset', color: '#B580FF', label: 'Transport Assets', count: 0 },
  ]);

  // Fetch assets on mount
  useEffect(() => {
    const fetchPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" };
    dispatch(fetchAsserts(fetchPayload));
  }, [dispatch]);

  // Update filtered assets and counts
  useEffect(() => {
    if (asserts) {
      updateFilteredAssets(selectedCategory, branch);
    }
  }, [asserts, selectedCategory, branch]);

  const updateFilteredAssets = (category, branch) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const filtered = asserts.filter(asset =>
      (category === 'All' || asset.assetType === category) &&
      (branch === 0 || asset.branchId.id === branch)
    );

    const officeCount = filtered.filter(asset => asset.assetType === 'office asset').length;
    const transportCount = filtered.filter(asset => asset.assetType === 'transport asset').length;
    const totalCount = filtered.length;

    setAssetType(prev => prev.map(cat => ({
      ...cat,
      count: cat.key === 'All' ? totalCount : cat.key === 'office asset' ? officeCount : transportCount,
    })));

    setFilteredAssets(filtered);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.dropdownContainer}>
        <BranchesDropdown dropdownStyles={styles} branchName={setBranchId} onBranchChange={setBranch} />
      </View>
      
      {/* Asset Categories */}
      <View style={styles.categoryContainer}>
        {assetType.map(category => {
          return(
          <TouchableOpacity
            key={category.key}
            onPress={() => setSelectedCategory(category.key)}
            style={[styles.categoryCard, { backgroundColor: category.color }]}>
            <Text style={styles.categoryCount}>{category.count}</Text>

            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        )})}
      </View>
      
      {/* Asset List */}
      {assertsLoading ? <Text>Loading assets...</Text> : assertsError ? <Text>Error loading assets</Text> : (
        <FlatList
          data={filteredAssets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log("asserts item ",item)
            return(
            <Card style={styles.assetCard}>
             {
              hasDeleteAssertPermission &&
            <Avatar.Icon icon={'delete'} size={32} color='red' style={{backgroundColor:'#f1f1f1',position:'absolute',right:-50,top:10}}></Avatar.Icon>
            } 
              <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 10 }}>
                <Image source={{ uri: item.assetPhoto }} style={styles.assetImage} />
                <View style={styles.assetInfo}>
                  <Text style={styles.assetTitle}>{item.assertsName}</Text>
                  <Text style={styles.assetLocation}>{item.branchId.branchName}</Text>
                  <Text style={styles.assetPrice}>{item.assertsAmount}</Text>
                  <TouchableOpacity onPress={() => {
                    dispatch(drawLabel("Asserts"));
                    navigation.navigate('AssetDetails', { assetDetails: item });
                  }}>
                    <Text style={styles.moreDetails}>More Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )}}
        />
      )}
      
      {/* Add Assets Button */}
      {/* <FAB icon="plus" label="Add Assets" visible={hasAddAssertPermission} style={styles.fab} onPress={() => {
        dispatch(drawLabel("Asserts"));
        navigation.navigate('AddAsset');
      }} /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
  logoContainer: { alignItems: 'center' },
  logoText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  tagline: { fontSize: 12, color: '#808080' },
  iconsContainer: { flexDirection: 'row', alignItems: 'center' },
  badge: { position: 'absolute', top: -8, right: 0, backgroundColor: '#FF8080' },
  dropdownContainer: { paddingHorizontal: 16, marginVertical: 8 },
  dropdown: { backgroundColor: '#FFF', borderColor: '#DDD' },
  dropdownList: { backgroundColor: '#FFF' },
  categoryContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  categoryCard: { alignItems: 'center', padding: 16, borderRadius: 8, elevation: 4 },
  categoryCount: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  categoryLabel: { fontSize: 14, color: '#FFF' },
  assetCard: { flexDirection: 'row', width: "90%", margin: 16, borderRadius: 8, elevation: 3, backgroundColor: "#ffffff" },
  assetImage: { width: 100, height: 100, borderRadius: 8, },
  assetInfo: { marginLeft: 16, width: "50%" },
  assetTitle: { fontSize: 16, fontWeight: 'bold' },
  assetLocation: { fontSize: 14, color: '#808080' },
  assetStatus: { fontSize: 12, color: '#FF8080' },
  assetPrice: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  moreDetails: { fontSize: 12, color: '#007BFF', marginTop: 8 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#FFD700' },
});

export default Asset;
