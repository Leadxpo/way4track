import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BranchesDropdown from '../../components/branchDropdown';
import Header from '../../components/userHeader';
import { loadData } from '../../Utils/appData';
import { staffDataHook } from '../../Utils/permissions';
import { intiateWarhouse_dashboard } from '../../Redux/Actions/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";

const branches = [
    {
        branchName: 'Visakhapatnam',
        color: '#003366',
        requests: ['Bike GPS Tracker Request : 10', 'Fuel Monitoring System Request : 34'],
        products: [
            { id: '1', branch: 'Visakhapatnam', product: 'Bike GPS Tracker', type: 'Tracker', total: 2029, onHand: 2999, status: 'Available' },
            { id: '2', branch: 'Visakhapatnam', product: 'Fuel Monitoring System', type: 'Monitoring', total: 1200, onHand: 900, status: 'Available' },
        ],
    },
    {
        branchName: 'Vijayawada',
        color: '#029D48',
        requests: ['Car GPS Tracker Request : 20'],
        products: [
            { id: '3', branch: 'Vijayawada', product: 'Car GPS Tracker', type: 'Tracker', total: 1800, onHand: 1700, status: 'Available' },
        ],
    },
    {
        branchName: 'Hyderabad',
        color: '#D65A1B',
        requests: ['Bike GPS Tracker Request : 45'],
        products: [
            { id: '4', branch: 'Hyderabad', product: 'Bike GPS Tracker', type: 'Tracker', total: 2500, onHand: 2400, status: 'Available' },
        ],
    },
    {
        branchName: 'Kakinada',
        color: '#F4A024',
        requests: ['AIS 140 VLTD Tracker Request : 30'],
        products: [
            { id: '5', branch: 'Kakinada', product: 'AIS 140 VLTD', type: 'Transport', total: 800, onHand: 750, status: 'Available' },
        ],
    },
];

// Collect all products initially
const allProducts = branches.flatMap(branch => branch.products);

const Home_WarehouseManager = () => {
    const dispatch = useDispatch();

    const [expandedBranch, setExpandedBranch] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchId, setBranchId] = useState(null);
    const [menuVisible, setMenuVisible] = useState(null);
    const [branches, setBranches] = useState(null);
    const [allProducts, setAllProducts] = useState(null);
    const [warhouseManagerData, setWarhouseManagerData] = useState(null);
    const { loading: WarehouseManager_homeInfoLoading, WarehouseManager_homeInfo, error: WarehouseManager_homeInfoError } = useSelector(state => state.WarehouseManager_homeInfoReducer);

    useEffect(() => {
        const rrr = async () => {
            const warhouseManagerDetails = await staffDataHook();
            setWarhouseManagerData(warhouseManagerDetails)
        }
        rrr();
    }, [])

    useEffect(() => {
        const Warehouse_dashboardPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
        dispatch(intiateWarhouse_dashboard(Warehouse_dashboardPayload));
    }, [dispatch])

    useEffect(() => {
        if (WarehouseManager_homeInfo) {
            console.log("WarehouseManager_homeInfo : ",WarehouseManager_homeInfo);
            setBranches(WarehouseManager_homeInfo.requestData);
            setAllProducts(WarehouseManager_homeInfo.productByBranch);
        } 
    }, [dispatch])


    // Filter products based on selected branch, else show all
    const filteredProducts = selectedBranch
        ? allProducts.filter(product => product.branch === selectedBranch)
        : allProducts;

    const toggleBranch = (branchName) => {
        setExpandedBranch(expandedBranch === branchName ? null : branchName);
    };

    const toggleMenu = (id) => {
        setMenuVisible(menuVisible === id ? null : id);
    };

    return (
        <Provider>
            <Header />
            <ScrollView style={styles.container}>
                <View>

                    {/* User Profile Card */}
                    <Card style={styles.profileCard}>
                        <View style={styles.profileContainer}>
                            <Avatar.Image size={70} source={!warhouseManagerData ? require('../../utilities/images/way4tracklogo.png') : { uri: warhouseManagerData.staffPhoto }} style={{ backgroundColor: '#ffffff' }} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>Name : {warhouseManagerData?.staffName}</Text>
                                <Text style={styles.userDetail}>Phone : {warhouseManagerData?.phoneNumber}</Text>
                                <Text style={styles.userDetail}>Email :{warhouseManagerData?.email}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Requests Section */}
                    <Text style={styles.sectionTitle}>Requests</Text>

                    {branches?.map((branch, index) => (
                        <View key={index} style={styles.branchContainer}>
                            <View style={[styles.branchHeader, { backgroundColor: branch.color }]}>
                                <TouchableOpacity onPress={() => toggleBranch(branch.location)} style={styles.branchToggle}>
                                    <Text style={styles.branchTitle}>{branch.location}</Text>
                                    <MaterialCommunityIcons name={expandedBranch === branch.location ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'} size={24} color="#f3f3f3" />
                                </TouchableOpacity>
                            </View>

                            {expandedBranch === branch.location && (
                                <Card style={styles.requestCard}>
                                    {branch.requests?.map((req, idx) => (
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text key={idx} style={styles.requestText}>{req.name}</Text>
                                            <Text key={idx} style={styles.requestText}>{req.count}</Text>
                                        </View>
                                    ))}
                                </Card>
                            )}
                        </View>
                    ))}

                    {/* Branch Dropdown Selection */}
                    <Text style={styles.sectionTitle}>Branch Name :</Text>
                    <Card style={styles.dropdown}>
                        <TouchableOpacity onPress={() => setSelectedBranch(null)}>
                            <Text style={styles.dropdownText}>
                                {selectedBranch ? `Showing: ${selectedBranch}` : 'All Branches'}
                            </Text>
                        </TouchableOpacity>
                        <BranchesDropdown branchName={setSelectedBranch} dropdownStyles={styles} onBranchChange={setBranchId} />
                    </Card>

                    {/* Product List */}
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Card style={styles.productCard}>
                                <View style={styles.productHeader}>
                                    <Text style={styles.productNumber}>No.{item.id}</Text>
                                </View>

                                <Text style={styles.productText}><Text style={styles.bold}>Product :</Text> {item.product}</Text>
                                <Text style={styles.productText}><Text style={styles.bold}>Type :</Text> {item.type}</Text>
                                <Text style={styles.productText}><Text style={styles.bold}>Total Items :</Text> {item.total}</Text>
                                <Text style={styles.productText}><Text style={styles.bold}>ON Hand :</Text> {item.onHand}</Text>
                                <Text style={styles.productText}><Text style={styles.bold}>Status :</Text> {item.status}</Text>
                            </Card>
                        )}
                    />
                </View>
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#fff',
        flex: 1,
    },
    profileCard: {
        padding: 15,
        borderRadius: 8, backgroundColor: '#ffffff',
        elevation: 4,
        marginBottom: 15,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        marginLeft: 15,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userDetail: {
        fontSize: 14,
        color: '#555',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    branchContainer: {
        marginBottom: 10,
    },
    branchHeader: {
        padding: 15,
        borderRadius: 5,
    },
    branchToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    branchTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    requestCard: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 3,
    },
    requestText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    dropdown: {
        padding: 12,
        borderRadius: 5,
        elevation: 2,
        backgroundColor: '#f1f1f1',
    },
    dropdownText: {
        fontSize: 16,
        color: '#555',
    },
    productCard: {
        padding: 15,
        borderRadius: 5, backgroundColor: "#ffffff",
        elevation: 3,
        margin: 10,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    productNumber: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    productText: {
        fontSize: 14,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default Home_WarehouseManager;
