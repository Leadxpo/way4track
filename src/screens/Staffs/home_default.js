import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet, ScrollView, Linking, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Provider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../Api/api';
import Header from '../../components/userHeader';
import { loadData } from '../../Utils/appData';

const Home_Default = () => {
    const [permissions, setPermissions] = useState([{ name: 'voucher', view: true, add: true, edit: true, delete: true }]);
    const [showtab, setShowtab] = useState("")

    const [showStaffModal, setShowStaffModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [searchStaffData, setSearchStaffData] = useState({ name: '' });
    const [staffList, setStaffList] = useState([]);
    const [allStaffs, setAllStaffs] = useState([]);

    const [selectedClient, setSelectedClient] = useState(null);
    const [showClientModal, setShowClientModal] = useState(false);
    const [searchClientData, setSearchClientData] = useState({ name: '' });
    const [clientList, setClientList] = useState([]);
    const [allClients, setAllClients] = useState([]);


    const [loading, setLoading] = useState(false);
    const [selectedWork, setSelectedWork] = useState(null);
    const [showWorkModal, setShowWorkModal] = useState(false);
    const [searchWorkData, setSearchWorkData] = useState({ name: '' });
    const [allWorks, setAllWorks] = useState([]);
    const [workList, setWorkList] = useState([]);


    const [searchProductData, setSearchProductData] = useState({ name: '' });
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchPermissions = async () => {
            const fetchedRole = await loadData('role');
            const fetchedPermissions = await loadData('staffPermissions');
            console.log("Permissions:", fetchedPermissions); // <- debug
            setPermissions(fetchedPermissions || []);
            setRole(fetchedRole);
        };

        fetchPermissions();
    }, []);


    // staff
    const handleViewStaffDetails = (staff) => {
        setSelectedStaff(staff);
        setShowStaffModal(true);
    };

    const renderStaffItem = ({ item,index}) => (
        <Card key={index} style={{ flex:1,flexDirection: 'row',marginVertical: 12, marginHorizontal: 16, padding: 16 }}>
            <View style={{width:Dimensions.get('screen').width}}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                <Text>Staff ID: {item.staffId}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Phone: {item.phoneNumber}</Text>
                <Text>Description: {item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handleViewStaffDetails(item)} style={{flex:1,position:'absolute',top:0,right:5 }}>
                <MaterialCommunityIcons name="eye" size={24} color="#333" />
            </TouchableOpacity>
        </Card>
    );

    // client
    const handleViewClientDetails = (client) => {
        setSelectedClient(client);
        setShowClientModal(true);
    };

    const renderClientCard = ({ item,index}) => (
        <Card key={index} style={{flex:1,flexDirection: 'row', marginVertical: 8, marginHorizontal: 16, padding: 16 }}>
            <View style={{width:Dimensions.get('screen').width}}>

            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Client Id: {item.clientId}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
            <Text style={styles.cardText}>Phone: {item.phoneNumber}</Text>
            <Text style={styles.cardText}>Description: {item.description}</Text>
            </View>

            <TouchableOpacity
                onPress={() => handleViewClientDetails(item)}
                style={{flex:1,position:'absolute',top:0,right:5 }}
            >
                <MaterialCommunityIcons name="eye" size={24} color="#374151" />
            </TouchableOpacity>
        </Card>
    );

    //work

    const handleInputWorkChange = (e) => {
        setSearchWorkData({ ...searchWorkData, name: e.nativeEvent.text });
    };

    const handleWorkSearch = () => {
        const query = searchWorkData.name.trim().toLowerCase();
        if (!query) {
            return setWorkList(allWorks);
        }

        const filtered = allWorks.filter((work) => {
            return (
                (work.name && work.name.toLowerCase().includes(query)) ||
                (work.workId && work.workId.toLowerCase().includes(query)) ||
                (work.email && work.email.toLowerCase().includes(query)) ||
                (work.phoneNumber && work.phoneNumber.toLowerCase().includes(query)) ||
                (work.description && work.description.toLowerCase().includes(query))
            );
        });

        setWorkList(filtered);
    };

    const handleViewWorkDetails = (item) => {
        setSelectedWork(item);
        setShowWorkModal(true);
    };


    const renderWorkItem = ({ item,index }) => (
        <Card key={index} style={{ flex:1,flexDirection: 'row',marginVertical: 8, marginHorizontal: 16, padding: 16 }}>
           <View style={{width:Dimensions.get('screen').width}}>
             <View style={styles.cardRow}>
                <Text style={styles.label}>Work ID:</Text>
                <Text>{item.workId}</Text>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.label}>Name:</Text>
                <Text>{item.name}</Text>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.label}>Email:</Text>
                <Text>{item.email}</Text>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{item.phoneNumber}</Text>
            </View>
            <View style={styles.cardRow}>
                <Text style={styles.label}>Description:</Text>
                <Text>{item.description}</Text>
            </View>
            </View>

            <TouchableOpacity
                style={{flex:1,position:'absolute',top:0,right:5 }}
                onPress={() => handleViewWorkDetails(item)}
            >
                <MaterialCommunityIcons name="eye" size={20} color="#333" />
            </TouchableOpacity>
        </Card>
    );

    //product

    const handleInputProductChange = (e) => {
        setSearchProductData({ name: e.nativeEvent.text });
    };

    const handleViewProductDetails = (item) => {
        setSelectedProduct(item);
        setShowProductModal(true);
    };

    const handleProductSearch = () => {
        const query = searchProductData.name.trim().toLowerCase();
        if (!query) {
            return setProductList(allProducts);
        }

        const filtered = allProducts.filter((product) => {
            return (
                (product.name && product.name.toLowerCase().includes(query)) ||
                (product.productId && product.productId.toLowerCase().includes(query)) ||
                (product.category && product.category.toLowerCase().includes(query)) ||
                (product.brand && product.brand.toLowerCase().includes(query)) ||
                (product.description && product.description.toLowerCase().includes(query))
            );
        });

        setProductList(filtered);
    };

    const renderItem = ({ item,index }) => (
        <Card key={index} style={{flex:1, flexDirection:'row',marginVertical: 8, marginHorizontal: 16, padding: 16 }}>
            <Card.Content style={{width:Dimensions.get('screen').width}}>
                <View style={styles.cardRow}>
                    <Text style={styles.label}>Product ID:</Text>
                    <Text>{item.id}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text>{item.name}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Text style={styles.label}>Type:</Text>
                    <Text>{item.type}</Text>
                </View>
                </Card.Content>
                <TouchableOpacity
                     style={{flex:1,position:'absolute',top:0,right:0}}
                    onPress={() => handleViewProductDetails(item)}
                >
                    <MaterialCommunityIcons name="eye" size={24} color="#333" />
                </TouchableOpacity>
        </Card>
    );



    useEffect(() => {
        const fetchStaff = async () => {
            const branchName = await AsyncStorage.getItem('branchName');
            try {
                const res = await api.post('/staff/getStaffDetails');
                console.log('staff details:', res.data);
                const data = res.data.data || [];
                setStaffList(data);
                setAllStaffs(data);
            } catch (err) {
                console.error('Error fetching staff:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    const handleStaffSearch = () => {
        const query = searchStaffData.name.trim().toLowerCase();
        if (!query) {
            return setStaffList(allStaffs); // Changed from vehicleList
        }

        setStaffList(
            allStaffs.filter((s) => {
                // Changed from vehicleList
                return (
                    (s.name && s.name.toLowerCase().includes(query)) ||
                    (s.staffId && s.staffId.toLowerCase().includes(query)) ||
                    (s.email && s.email.toLowerCase().includes(query)) ||
                    (s.phoneNumber && s.phoneNumber.toLowerCase().includes(query)) ||
                    (s.description && s.description.toLowerCase().includes(query))
                );
            })
        );
    };

    const handleInputStaffChange = (e) => {
        setSearchStaffData({ ...searchStaffData, [e.target.name]: e.target.value });
    };

    // Fetch client data on component mount
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await api.post('/client/getClientDetails');
                console.log('client details:', res.data);
                const data = res.data.data || [];
                setClientList(data); // Populate clientList
                setAllClients(data); // Keep a backup of all client data
            } catch (err) {
                console.error('Error fetching clients:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    // Search clients based on input data
    const handleClientSearch = () => {
        const query = searchClientData.name.trim().toLowerCase();
        if (!query) {
            return setClientList(allClients); // Reset to all clients when search query is empty
        }

        // Filter the client list based on search query
        setClientList(
            allClients.filter((client) => {
                return (
                    (client.name && client.name.toLowerCase().includes(query)) ||
                    (client.clientId && client.clientId.toLowerCase().includes(query)) ||
                    (client.email && client.email.toLowerCase().includes(query)) ||
                    (client.phoneNumber &&
                        client.phoneNumber.toLowerCase().includes(query)) ||
                    (client.description &&
                        client.description.toLowerCase().includes(query))
                );
            })
        );
    };

    // Handle input field changes for search
    const handleInputClientChange = (e) => {
        setSearchClientData({
            ...searchClientData,
            [e.target.name]: e.target.value,
        });
    };

    // Fetch work data on component mount
    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const res = await api.post(
                    '/work-allocations/getWorkAllocationDetails'
                );
                console.log('work details:', res.data);
                const data = res.data.data || [];
                setWorkList(data); // Populate workList
                setAllWorks(data); // Keep a backup of all work data
            } catch (err) {
                console.error('Error fetching works:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);



    // const [loading, setLoading] = useState(true);

    // Fetch product data on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.post('/productType/getProductTypeDetails');
                console.log('product details:', res.data);
                const data = res.data.data || [];
                setProductList(data);
                setAllProducts(data); // Keep a backup of all product data
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    return (
        <Provider>

            <Header />
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                {permissions?.some((p) => p?.name === 'staff' && p?.view) && <Button mode={showtab !== "staff" ? 'outlined' : 'contained'} onPress={() => setShowtab("staff")} style={{ marginLeft: 10 }}>Staff</Button>}
                {permissions?.some((p) => p?.name === 'client' && p?.view) && <Button mode={showtab !== "client" ? 'outlined' : 'contained'} onPress={() => setShowtab("client")} style={{ marginLeft: 10 }}>Client</Button>}
                {permissions?.some((p) => p?.name === 'work-allocation' && p?.view) && <Button mode={showtab !== "work" ? 'outlined' : 'contained'} onPress={() => setShowtab("work")} style={{ marginLeft: 10 }}>Work</Button>}
                {permissions?.some((p) => p?.name === 'product' && p?.view) && <Button mode={showtab !== "product" ? 'outlined' : 'contained'} onPress={() => setShowtab("product")} style={{ marginLeft: 10 }}>Product</Button>}
            </View>
            <View style={{ flex: 1, paddingTop: 20 }}>
                {/* staff */}
                {showtab === 'staff' &&
                    Array.isArray(permissions) &&
                    permissions.some(p => p?.name === 'staff' && p?.view) && <>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Staff</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 16, marginVertical: 12 }}>
                            <TextInput
                                placeholder="Search"
                                value={searchStaffData.name}
                                onChangeText={(text) => handleInputStaffChange({ name: text })}
                                style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10 }}
                            />
                            <TouchableOpacity
                                onPress={handleStaffSearch}
                                style={{ backgroundColor: 'green', paddingHorizontal: 16, marginLeft: 8, justifyContent: 'center', borderRadius: 6 }}>
                                <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {/* client */}
                        {loading ? (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
                        ) : (
                            <FlatList
                                data={staffList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderStaffItem}
                            />
                        )}
                    </>
                }
                {(showtab === 'client' && permissions?.some((p) => p?.name === 'client' && p?.view)) &&
                    <>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>Client</Text>
                        </View>

                        <View style={styles.searchContainer}>
                            <TextInput
                                style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10 }}
                                placeholder="Search"
                                value={searchClientData.name}
                                onChangeText={(text) => handleInputClientChange({ target: { name: 'name', value: text } })}
                            />
                            <TouchableOpacity
                                onPress={handleClientSearch}
                                style={styles.searchButton}
                            >
                                <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <Text style={styles.loadingText}>Loading...</Text>
                        ) : (
                            <FlatList
                                data={clientList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderClientCard}
                                ListEmptyComponent={<Text style={styles.noDataText}>No Client found</Text>}
                            />
                        )}
                    </>
                }
                {/* work */}
                {(showtab === 'work' && permissions?.some((p) => p?.name === 'work-allocation' && p?.view)) &&
                    <>
                        <Text style={styles.title}>Work</Text>

                        <View style={styles.searchRow}>
                            <TextInput
                                placeholder="Search"
                                value={searchWorkData.name}
                                onChange={handleInputWorkChange}
                                style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10 }}
                            />
                            <TouchableOpacity onPress={handleWorkSearch} style={styles.searchBtn}>
                                <MaterialCommunityIcons name="magnify" size={22} color="white" />
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <ActivityIndicator size="large" color="#4CAF50" />
                        ) : (
                            <FlatList
                                data={allWorks}
                                keyExtractor={(item) => item.id}
                                renderItem={renderWorkItem}
                                ListEmptyComponent={
                                    <Text style={styles.noData}>No Work found</Text>
                                }
                            />
                        )}
                    </>
                }
                {/* product */}
                {(showtab === 'product' && permissions?.some((p) => p?.name === 'product' && p?.view)) &&
                    <>
                        <View style={styles.searchRow}>
                            <TextInput
                                placeholder="Search"
                                style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 10 }}
                                value={searchProductData.name}
                                onChange={handleInputProductChange}
                            />
                            <TouchableOpacity style={styles.searchButton} onPress={handleProductSearch}>
                                <MaterialCommunityIcons name="magnify" color="#fff" size={20} />
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <Text style={styles.loadingText}>Loading...</Text>
                        ) : (
                            <FlatList
                                data={productList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                ListEmptyComponent={<Text style={styles.noDataText}>No Product found</Text>}
                            />
                        )}
                    </>
                }
                {/* staff model */}
                <Modal visible={showStaffModal} animationType="slide" transparent>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 10, margin: 20, padding: 16, maxHeight: '90%' }}>
                            <ScrollView>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Staff Details</Text>

                                <Text style={{ fontWeight: 'bold' }}>Personnel Details</Text>
                                <Text>Staff Id: {selectedStaff?.staffId}</Text>
                                <Text>Name: {selectedStaff?.name}</Text>
                                <Text>Email: {selectedStaff?.email}</Text>
                                <Text>Phone: {selectedStaff?.phoneNumber}</Text>
                                <Text>Gender: {selectedStaff?.gender}</Text>
                                <Text>DOB: {selectedStaff?.dob}</Text>
                                <Text>Designation: {selectedStaff?.designation}</Text>
                                <Text>Status: {selectedStaff?.staffStatus}</Text>

                                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Education Details</Text>
                                {selectedStaff?.qualifications?.length ? selectedStaff.qualifications.map((q, index) => (
                                    <View key={index} style={{ marginVertical: 4 }}>
                                        <Text>- {q.qualificationName} - {q.marksOrCgpa}</Text>
                                        {q.file && (
                                            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(q.file)}>View File</Text>
                                        )}
                                    </View>
                                )) : <Text>N/A</Text>}

                                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Experience Before Joining</Text>
                                {selectedStaff?.experienceDetails?.length ? selectedStaff.experienceDetails.map((e, i) => (
                                    <View key={i} style={{ marginVertical: 4 }}>
                                        <Text>Company: {e.previousCompany}</Text>
                                        <Text>Designation: {e.previous_designation}</Text>
                                        <Text>Salary: ₹{e.previous_salary}</Text>
                                        <Text>Total Experience: {e.total_experience} years</Text>
                                    </View>
                                )) : <Text>N/A</Text>}

                                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Bank Details</Text>
                                <Text>Bank Name: {selectedStaff?.bankName}</Text>
                                <Text>Account No: {selectedStaff?.accountNumber ?? 'N/A'}</Text>
                                <Text>Type: {selectedStaff?.accountType}</Text>
                                <Text>Branch: {selectedStaff?.accountBranch}</Text>
                                <Text>IFSC: {selectedStaff?.ifscCode ?? 'N/A'}</Text>

                                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Employer Details</Text>
                                <Text>Department: {selectedStaff?.department}</Text>
                                <Text>Branch: {selectedStaff?.branchName}</Text>
                                <Text>Joining Date: {selectedStaff?.joiningDate}</Text>
                                <Text>Resignation Date: {selectedStaff?.resignationDate ?? 'N/A'}</Text>
                                <Text>Final Settlement Date: {selectedStaff?.finalSettlementDate ?? 'N/A'}</Text>
                                <Text>Salary Date: {selectedStaff?.salaryDate ?? 'N/A'}</Text>
                            </ScrollView>

                            <TouchableOpacity onPress={() => setShowStaffModal(false)} style={{ marginTop: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center', color: '#fff' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* client model */}
                <Modal
                    visible={showClientModal}
                    transparent
                    animationType="slide"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                <Text style={styles.modalTitle}>Client Details</Text>

                                <Text style={styles.sectionTitle}>Personal Details</Text>
                                <View style={styles.detailGrid}>
                                    <Text style={styles.detailText}>Client Id: {selectedClient?.clientId}</Text>
                                    <Text style={styles.detailText}>Name: {selectedClient?.name}</Text>
                                    <Text style={styles.detailText}>Email: {selectedClient?.email}</Text>
                                    <Text style={styles.detailText}>Phone: {selectedClient?.phoneNumber}</Text>
                                    <Text style={styles.detailText}>Gender: {selectedClient?.gender}</Text>
                                    <Text style={styles.detailText}>DOB: {selectedClient?.dob}</Text>
                                    <Text style={styles.detailText}>Occupation: {selectedClient?.occupation}</Text>
                                    <Text style={styles.detailText}>Status: {selectedClient?.clientStatus}</Text>
                                </View>

                                <Text style={styles.sectionTitle}>Additional Info</Text>
                                <View style={styles.detailGrid}>
                                    <Text style={styles.detailText}>Preferred Contact Time: {selectedClient?.contactTime ?? 'N/A'}</Text>
                                    <Text style={styles.detailText}>Registration Date: {selectedClient?.registrationDate}</Text>
                                    <Text style={styles.detailText}>Referral Source: {selectedClient?.referralSource ?? 'N/A'}</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setShowClientModal(false)}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                {/* work model */}

                <Modal
                    visible={showWorkModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowWorkModal(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Work Details</Text>

                            {selectedWork && (
                                <>
                                    <Text style={styles.modalSection}>General Info</Text>
                                    <Text><Text style={styles.label}>Work ID:</Text> {selectedWork.workId}</Text>
                                    <Text><Text style={styles.label}>Name:</Text> {selectedWork.name}</Text>
                                    <Text><Text style={styles.label}>Email:</Text> {selectedWork.email}</Text>
                                    <Text><Text style={styles.label}>Phone:</Text> {selectedWork.phoneNumber}</Text>
                                    <Text><Text style={styles.label}>Category:</Text> {selectedWork.category}</Text>
                                    <Text><Text style={styles.label}>Status:</Text> {selectedWork.status}</Text>

                                    <Text style={styles.modalSection}>Additional Info</Text>
                                    <Text><Text style={styles.label}>Start Date:</Text> {selectedWork.startDate}</Text>
                                    <Text><Text style={styles.label}>End Date:</Text> {selectedWork.endDate ?? 'N/A'}</Text>
                                    <Text><Text style={styles.label}>Assigned To:</Text> {selectedWork.assignedTo}</Text>
                                    <Text><Text style={styles.label}>Description:</Text> {selectedWork.description}</Text>
                                </>
                            )}

                            <TouchableOpacity
                                onPress={() => setShowWorkModal(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* product model */}
                <Modal visible={showProductModal} transparent animationType="slide">
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                onPress={() => setShowProductModal(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Product Details</Text>

                            {selectedProduct && (
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalContent}><Text style={styles.bold}>Product ID:</Text> {selectedProduct.id}</Text>
                                    <Text style={styles.modalContent}><Text style={styles.bold}>Name:</Text> {selectedProduct.name}</Text>
                                    <Text style={styles.modalContent}><Text style={styles.bold}>Type:</Text> {selectedProduct.type}</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                onPress={() => setShowProductModal(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </Provider>
    );
}
export default Home_Default;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    headerContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    headerText: { fontSize: 24, fontWeight: '600', color: '#1F2937' },
    downloadButton: { flexDirection: 'row', backgroundColor: '#047857', padding: 10, borderRadius: 8, alignItems: 'center' },
    downloadText: { color: '#fff', marginLeft: 6 },
    searchContainer: { flexDirection: 'row', marginBottom: 12,marginHorizontal:10 },
    input: { flex: 1, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, height: 48 },
    searchButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#047857', paddingHorizontal: 16, marginLeft: 8, borderRadius: 8 },
    searchText: { color: '#fff', marginLeft: 4 },
    loadingText: { textAlign: 'center', color: '#6B7280' },
    noDataText: { textAlign: 'center', paddingVertical: 20, color: '#6B7280' },
    card: { backgroundColor: '#F3F4F6', padding: 16, marginBottom: 10, borderRadius: 12 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
    cardText: { marginTop: 4, color: '#374151' },
    eyeButton: { marginTop: 10, alignSelf: 'flex-start' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', borderRadius: 10, width: '90%', maxHeight: '80%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', margin: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginLeft: 16, marginTop: 12 },
    detailGrid: { paddingHorizontal: 16, marginTop: 8 },
    detailText: { fontSize: 14, marginBottom: 6, color: '#374151' },
    closeButton: { backgroundColor: '#2563EB', margin: 16, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    closeButtonText: { color: '#fff', fontWeight: '500' },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    searchRow: {
        flexDirection: 'row',
        marginBottom: 16,marginHorizontal:10
    },
    searchBtn: {
        backgroundColor: '#2F855A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 8,marginLeft:5,
        height: 48,
    },
    btnText: {
        color: '#fff',
        marginLeft: 4,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    iconButton: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    noData: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    modalSection: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 4,
    },
    cardRow:{
        flex:1,flexDirection:'row'
    }
});
