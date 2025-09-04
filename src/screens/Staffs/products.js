import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import BranchesDropdown from '../../components/branchDropdown';
import { fetchProducts } from '../../Redux/Actions/productAction';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Product = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts({ companyCode: "WAY4TRACK", unitCode: "WAY4" }));
  }, [dispatch]);

  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
      console.log(permissions)
    };
    loadStaffloginData();
  }, []);

  // const hasAddProductPermission = permissions.some(p => p.name === "product" && p.add);
  // const hasEditProductPermission = permissions.some(p => p.name === "product" && p.edit);
  // const hasDeleteProductPermission = permissions.some(p => p.name === "product" && p.delete);

  const [branch, setBranch] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('warehouse');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([
    { key: 'warehouse', color: '#FF8080', label: 'Warehouse Products', count: 0 },
    { key: 'inHand', color: '#80FF80', label: 'In-Hand Products', count: 0 },
    { key: 'branch', color: '#B580FF', label: 'Installed Products', count: 0 },
  ]);


  useEffect(() => {
    updateFilteredProducts(selectedCategory, branch);
  }, [products, selectedCategory, branch]);

  const updateFilteredProducts = (category, branch) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const rrr = products
    console.log("rrr:", rrr)
    const filtered = rrr?.filter(product => {
      return ((category === 'warehouse' || product.location === category) &&
        (branch === 'All' || Number(product.branchId?.id) === Number(branch)))
    });

    const countByCategory = { 
      warehouse: 0,
      inHand: 0,
      branch: 0,
    };

    rrr?.forEach(product => {
      if (branch === 'All' || product.branchId.id === branch) {
        if (countByCategory.hasOwnProperty(product.location)) {
          countByCategory[product.location] += 1;
        }
      }
    });

    setProductCategories(prevCategories =>
      prevCategories?.map(cat => ({ ...cat, count: countByCategory[cat.key] || 0 }))
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* <View style={styles.dropdownContainer}>
        <BranchesDropdown branchName={setBranch} dropdownStyles={styles} onBranchChange={setBranch} />
      </View> */}

      <View style={styles.categoryContainer}>
        {productCategories.map(category => (
          <TouchableOpacity
            key={category.key}
            onPress={() => setSelectedCategory(category.key)}
            style={[styles.categoryCard, { backgroundColor: category.color }]}
          >
            <Text style={styles.categoryCount}>{category.count}</Text>
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.productCard}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.productInfo}>
                <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#333333" }}>{item.productName}</Text>
                <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#aaaaaa" }}>{item.imeiNumber}</Text>
                <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#333333" }}>{item.location}</Text>
                {item.branchId && <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#333333" }}>{item.branchId.branchName}</Text>}
                {item.staffId && <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#333333" }}>{item.staffId.name}-{item.staffId.staffId}</Text>}
                {item.staffId && <Text style={{ fontWeight: 700, fontSize: 15, padding: 5, color: "#333333" }}>{item.staffId.designation}</Text>}

                <TouchableOpacity onPress={() => {
                  dispatch(drawLabel("Products"));
                  navigation.navigate('ProductDetails', { productDetails: item });
                }}>
                  <Text style={styles.moreDetails}>More Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />

      {/* <FAB
        icon="plus" visible={hasAddProductPermission}
        label="Add Products"
        style={styles.fab}
        onPress={() => {
          dispatch(drawLabel("Products"));
          navigation.navigate('AddProduct');
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  dropdownContainer: { padding: 16 },
  dropdown: { backgroundColor: '#FFF', borderColor: '#DDD' },
  dropdownList: { backgroundColor: '#FFF' },
  categoryContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  categoryCard: { alignItems: 'center', padding: 16, borderRadius: 8 },
  categoryLabel: { color: '#FFF', fontWeight: 'bold' },
  productList: { paddingHorizontal: 16 },
  productCard: { marginBottom: 16, borderRadius: 8, backgroundColor: "#ffffff", width: "90%", alignSelf: "center" },
  productCardContent: { flexDirection: 'row', padding: 16 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productDetails: { marginLeft: 16, flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productBranch: { color: '#555' },
  productPrice: { color: '#000', fontWeight: 'bold', marginTop: 8 },
  input: { backgroundColor: '#fff', padding: 10, height: 48, borderRadius: 8, marginBottom: 12, elevation: 1 },
  moreDetails: { color: '#f3f3f3', margin: 8, backgroundColor: '#007BFF', borderRadius: 5, textAlign: 'center', padding: 5, fontWeight: 700 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#FFD700' },
});

export default Product;
