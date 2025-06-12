import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Animated } from "react-native";
import { Card, Button, SegmentedButtons, Surface, Avatar } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from 'react-redux';
import { branchById, createBranch, fetchBranches } from "../../Redux/Actions/branchAction";

const BranchDetails = ({ navigation, route }) => {
  const { branchDetails } = route.params;  // Sample address data

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Assets"); // For SegmentedButtons Tabs
  const [assetsFilter, setAssetsFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All");
  const [productsFilter, setProductsFilter] = useState("All");
  const { loading:branchDetailsLoading, branch,error:branchDetailsError } = useSelector(state => state.branchDetailReducer);
  const [branchPayload, setBranchPayload] = useState({
    branchName: "",
    branchNumber: "",
    branchAddress: "",
    managerName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    branchOpening: "",
    email: "",
    branchPhotos: "",
    companyCode:"WAY4TRACK", unitCode:"WAY4"
  });
  const [showAssets, setShowAssets] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const animationValue = new Animated.Value(1);

  useEffect(() => {
    const branchDetailPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4",id:branchDetails.id}
    dispatch(branchById( branchDetailPayload))
  }, [dispatch])

  // Dummy Data
  const [assets, setAssets] = useState([
    { id: "1", name: "Motorbike", location: "Visakhapatnam", price: "₹50000/-", status: "2 EMI Pending", image: "https://s.alicdn.com/@sc04/kf/HTB1MNyTKeySBuNjy1zdq6xPxFXa9.jpg_720x720q50.jpg" },
    { id: "10", name: "Motorbike", location: "Visakhapatnam", price: "₹50000/-", status: "2 EMI Pending", image: "https://s.alicdn.com/@sc04/kf/HTB1MNyTKeySBuNjy1zdq6xPxFXa9.jpg_720x720q50.jpg" },
    { id: "11", name: "Motorbike", location: "Visakhapatnam", price: "₹50000/-", status: "2 EMI Pending", image: "https://s.alicdn.com/@sc04/kf/HTB1MNyTKeySBuNjy1zdq6xPxFXa9.jpg_720x720q50.jpg" },
    { id: "13", name: "Motorbike", location: "Visakhapatnam", price: "₹50000/-", status: "2 EMI Pending", image: "https://s.alicdn.com/@sc04/kf/HTB1MNyTKeySBuNjy1zdq6xPxFXa9.jpg_720x720q50.jpg" },
    { id: "2", name: "Boss Chair", location: "Hyderabad", price: "₹35000/-", status: "Payment Done", image: "https://urbancart.in/cdn/shop/products/5_5a468ae3-322d-47ab-8814-69ddc6841936.jpg" },
    { id: "3", name: "Chair & Table", location: "Kakinada", price: "₹70000/-", status: "Payment Done", image: "https://images-cdn.ubuy.ae/6350f643d0f8c921a46d0a24-modern-furniture-combination-office.jpg" },
  ]);
  const [staff, setStaff] = useState([
    { id: "1", name: "P. Chaitanya", role: "CEO", location: "Visakhapatnam", image: "https://files.prokerala.com/news/photos/imgs/1024/naga-chaitanya-1416516.jpg" },
    { id: "2", name: "P. Chaitanya", role: "CEO", location: "Visakhapatnam", image: "https://files.prokerala.com/news/photos/imgs/1024/naga-chaitanya-1416516.jpg" },
    { id: "3", name: "P. Chaitanya", role: "CEO", location: "Visakhapatnam", image: "https://files.prokerala.com/news/photos/imgs/1024/naga-chaitanya-1416516.jpg" },
    { id: "4", name: "P. Chaitanya", role: "CEO", location: "Visakhapatnam", image: "https://files.prokerala.com/news/photos/imgs/1024/naga-chaitanya-1416516.jpg" },
    { id: "5", name: "Srinu", role: "Manager", location: "Hyderabad", image: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/hjbi0zetm2ctqbagpus8" },
    { id: "6", name: "S. Ravi Krishna", role: "HR", location: "Kakinada", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHgC3OFs1b6WDWvUs7zHESPM9lKXsYFPqLWDzjaH-glpEano6H4NLYxEJvIB02AyKyJY&usqp=CAU" },
  ]);
  const [products, setProducts] = useState([
    { id: "1", name: "gpsTracker", tot_count: 10, onhand: 3, image: "https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/F/X/210863_1671027904.jpg" },
    { id: "2", name: "fuelControl", tot_count: 10, onhand: 3, image: "https://aerocontact.b-cdn.net/public/img/aviaexpo/produits/images/147/detail_APU-fuel-control-900x636.jpg" },
    { id: "3", name: "speedAnalizer", tot_count: 10, onhand: 3, image: "https://m.media-amazon.com/images/I/719L+Cnk9gL.jpg" },
  ]);

  useEffect(() => {
    if (branchDetails) {
      setBranchPayload((prevState) => ({
        ...prevState, // Preserve current state
        branchName: branch?.branchName,
        branchNumber: branch?.branchNumber,
        branchAddress: branch?.branchAddress,
        addressLine1: branch?.addressLine1,
        addressLine2: branch?.addressLine2,
        city: branch?.city,
        state: branch?.state,
        pincode: branch?.pincode,
        branchOpening: branch?.branchOpening,
        email: branch?.email,
        branchPhotos: branch?.branchPhotos
      }));
      setAssets(branch?.asserts)
      setStaff(branch?.staff)
      setProducts(branch?.product)
    }
  }, [branchDetails,dispatch]);


  // Animation Handler
  const handleFilterChange = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animationValue.setValue(0);
    });
  };

  // Conditional Rendering Function
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Assets":
        return (
          <>
            <DropDownPicker
              open={showAssets}
              value={assetsFilter}
              items={[
                { label: "All", value: "All" },
                { label: "Motorbike", value: "Motorbike" },
                { label: "Boss Chair", value: "Boss Chair" },
                { label: "Chair & Table", value: "Chair & Table" },
              ]}
              setValue={(val) => {
                setAssetsFilter(val);
                handleFilterChange();
                setShowAssets(false);
              }}
              style={styles.dropdown}
              onPress={() => setShowAssets(!showAssets)}
              placeholder="Select Asset"
            />
            <Animated.FlatList
              data={assetsFilter === "All" ? assets : assets.filter((a) => a.name === assetsFilter)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <View style={styles.row}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.location}</Text>
                      <Text>{item.price}</Text>
                    </View>
                  </View>
                </Card>
              )}
            />
          </>
        );
      case "Staff":
        return (
          <>
            <DropDownPicker
              open={showStaff}
              value={staffFilter}
              items={[
                { label: "All", value: "All" },
                { label: "CEO", value: "CEO" },
                { label: "Manager", value: "Manager" },
                { label: "HR", value: "HR" },
              ]}
              setValue={(val) => {
                setStaffFilter(val);
                handleFilterChange();
                setShowStaff(false)
              }}
              style={styles.dropdown}
              onPress={() => setShowStaff(!showStaff)}
              placeholder="Select Staff Role"
            />
            <Animated.FlatList
              data={staffFilter === "All" ? staff : staff.filter((s) => s.role === staffFilter)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <View style={styles.row}>
                   
                    <Image source={ item.staffPhoto ?{uri: item.staffPhoto } : require('../../utilities/images/way4tracklogo.png')} style={styles.image} />
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.designation}</Text>
                      <Text>{item.department}</Text>
                    </View>
                  </View>
                </Card>
              )}
            />
          </>
        );
      case "Products":
        return (
          <>
            <DropDownPicker
              open={showProducts}
              value={productsFilter}
              items={[
                { label: "All", value: "All" },
                { label: "gpsTracker", value: "gpsTracker" },
                { label: "fuelControl", value: "fuelControl" },
                { label: "speedAnalizer", value: "speedAnalizer" },
              ]}
              setValue={(val) => {
                setProductsFilter(val);
                handleFilterChange();
                setShowProducts(false)
              }}
              style={styles.dropdown}
              onPress={() => setShowProducts(!showProducts)}
              placeholder="Select Product"
            />
            <Animated.FlatList
              data={productsFilter === "All" ? products : products.filter((p) => p.name === productsFilter)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <View style={styles.row}>
                    <View>
                      <Text>{item.name}</Text>
                      <Text>Total Count: {item.tot_count}</Text>
                      <Text>On Hand: {item.onhand}</Text>
                    </View>
                  </View>
                </Card>
              )}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={{  flexDirection: "row", justifyContent: 'center',alignSelf:"center",padding:5, width: "95%", height:150, backgroundColor: "#ffffff" }}>
        <View style={{alignSelf:'center',width:"25%"}}>
        <Avatar.Image
          size={80}
          source={
            branchPayload.branchOpening ? { uri: branchPayload.branchPhotos } : require('../../utilities/images/way4tracklogo.png')
          }
          style={styles.avatar}
        />
        </View>
        <View style={{width:"70%",height:150,flexDirection:'column',padding:5,justifyContent:"space-around"}}>
          <Text> Branch Name : {branchPayload.branchName} </Text>
          <Text> Branch PhoneNumber : {branchPayload.branchNumber} </Text>
          <Text> Branch Email : {branchPayload.email} </Text>
          <Text> Branch Address : {branchPayload.branchAddress} </Text>
        </View>

      </Surface>
      <SegmentedButtons
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        buttons={[
          { value: "Assets", label: "Assets" },
          { value: "Staff", label: "Staff" },
          { value: "Products", label: "Products" },
        ]}
        style={styles.tabs}
      />
      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 10 },
  dropdown: { marginHorizontal: 16, marginBottom: 16, zIndex: 1000, width: "90%" },
  tabs: { marginHorizontal: 16, marginBottom: 10, marginTop: 20 },
  card: { marginHorizontal: 16, marginBottom: 10, padding: 10, elevation: 4, backgroundColor: "#ffffff" },
  row: { flexDirection: "row", alignItems: "center" },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  avatar: { backgroundColor: '#ffffff',},

});

export default BranchDetails;
