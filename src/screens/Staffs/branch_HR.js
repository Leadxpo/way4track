import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import { Card, Menu, MD3Colors, Provider as PaperProvider, Icon, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/userHeader";
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const branchesData = [
    {
        name: "Visakhapatnam",
        roles: [
            { id: "1", role: "Accountant", phone: "+91 45534 58535", email: "Wey4track456@gmail.com", salary: "34,000/-", color: "#FF8A8A" },
            { id: "2", role: "Warehouse Manager", phone: "+91 45534 58535", email: "Wey4track456@gmail.com", salary: "34,000/-", color: "#8AFF8A" },
            { id: "3", role: "HR Manager", phone: "+91 45534 58535", email: "Wey4track456@gmail.com", salary: "34,000/-", color: "#A48AFF" },
        ],
    },
    {
        name: "Hyderabad",
        roles: [
            { id: "4", role: "Accountant", phone: "+91 12345 67890", email: "hyderabad@gmail.com", salary: "32,000/-", color: "#FF8A8A" },
            { id: "5", role: "Warehouse Manager", phone: "+91 12345 67890", email: "hyderabad@gmail.com", salary: "36,000/-", color: "#8AFF8A" },
        ],
    },
    {
        name: "Vijayawada",
        roles: [
            { id: "6", role: "HR Manager", phone: "+91 99999 99999", email: "vijayawada@gmail.com", salary: "33,000/-", color: "#A48AFF" },
        ],
    },
    {
        name: "Kakinada",
        roles: [],
    },
];

const Branch_HR = () => {
    const { loading: HR_homeInfoLoading, HR_homeInfo, error: HR_homeInfoError } = useSelector(state => state.HR_homeInfoReducer);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [activeTab, setActiveTab] = useState("Receipt"); // Manage active tab
    const [paymentActiveTab, setPaymentActiveTab] = useState("Receipt"); // Manage active tab
    const [paymentModeVisible, setPaymentModeVisible] = useState(false); // Manage payment dropdown visibility
    const [selectedPaymentMode, setSelectedPaymentMode] = useState(""); // Manage selected payment mode
    const [visibleMenu, setVisibleMenu] = useState(null); // Track which product's menu is open
    const [branches, setBranches] = useState([]); // Track which product's menu is open
    const [totals, setTotals] = useState({
        totalBranches: 0,
        totalTechnicians: 0,
        totalNonTechnicians: 0,
        totalSales: 0,
    });
    // const hasAddStaffPermission = getPermissions.some(p => p.name === "staff" && p.add);
    // const hasEditStaffPermission = getPermissions.some(p => p.name === "staff" && p.edit);
    // const hasDeleteStaffPermission = getPermissions.some(p => p.name === "staff" && p.delete);

    const renderStaff = ({ item }) => {
        return (
            <Card style={styles.card}>
                <View style={styles.row}>
                    {/* <Image source={{ uri: item.staffPhoto }} style={styles.image} /> */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.role}</Text>
                        <Text style={styles.role}>{item.phone}</Text>
                        <Text style={styles.location}>{item.email}</Text>
                    </View>
                    {/* <Menu
                        visible={visibleMenu === item.id}
                        onDismiss={() => setVisibleMenu(null)}
                        anchor={<TouchableOpacity onPress={() => setVisibleMenu(item.id)}>
                            <Icon
                                source="dots-vertical"
                                color={MD3Colors.neutral30}
                                size={20}

                            />
                        </TouchableOpacity>}
                    >
                        <Menu.Item titleStyle={{ color: "green" }} title='View' onPress={() => { navigation.navigate("StaffDetails", { staffDetails: item }) }} />
                        {hasEditStaffPermission && <Menu.Item titleStyle={{ color: "green" }} title='Edit' onPress={() => { navigation.navigate("EditStaff", { staffDetails: item }) }} />}
                        {hasDeleteStaffPermission && <Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
                            Alert.alert(`Delete ${item.name} Staff`, " Are you sure you want to delete this staff member from the database? Once deleted, you will no longer be able to access any records or perform operations related to this staff member.", [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Delete", onPress: () => {
                                        Alert.alert("Yes", `${item.name} with staffID ${item.client_id} was deleted`);
                                    }
                                }
                            ]);
                        }} />}
                    </Menu> */}
                </View>
            </Card>
        )
    };


    // Toggle branch visibility
    const toggleBranch = (branchName) => {
        setSelectedBranch(selectedBranch === branchName ? null : branchName);
        setSelectedRole(null); // Reset role selection when switching branch
    };

    // Toggle role visibility
    const toggleRole = (roleId) => {
        setSelectedRole(selectedRole === roleId ? null : roleId);
    };

    useFocusEffect(
        useCallback(() => {
            if (HR_homeInfo) {
                const branchData = HR_homeInfo.result;
                const staffData = HR_homeInfo.staff;
                // Process totals
                const totalBranches = branchData.reduce(
                    (total, branch) => total + parseInt(branch.totalStaff || 0, 10),
                    0
                );

                const totalTechnicians = branchData.reduce(
                    (sum, b) => sum + parseInt(b.totalTechnicians || 0),
                    0
                );
                const totalNonTechnicians = branchData.reduce(
                    (sum, b) => sum + parseInt(b.totalNonTechnicians || 0),
                    0
                );
                const totalSales = branchData.reduce(
                    (sum, b) => sum + parseInt(b.totalSales || 0),
                    0
                );

                // Process branches
                const processedBranches = branchData.map((branch) => {
                    const branchStaff = staffData.filter(
                        (s) => s.branchName === branch.branchName
                    );
                    return {
                        name: branch.branchName || 'Unknown',
                        managerName:
                            branchStaff.length > 0
                                ? branchStaff[0].branchManagerName || 'N/A'
                                : 'N/A',
                        managerPhone:
                            branchStaff.length > 0
                                ? branchStaff[0].branchManagerPhoneNumber || 'N/A'
                                : 'N/A',
                        staff: {
                            technicities: parseInt(branch.totalTechnicians || 0),
                            nonTechnicities: parseInt(branch.totalNonTechnicians || 0),
                            sales: parseInt(branch.totalSales || 0),
                            total: parseInt(branch.totalStaff || 0),
                        },
                    };
                });
                const filteredBranches = processedBranches.filter(
                    (branch) => branch.name !== 'Unknown'
                );

                setBranches(filteredBranches);
                setSelectedBranch(processedBranches[0] || null);
                setTotals({
                    totalBranches,
                    totalTechnicians,
                    totalNonTechnicians,
                    totalSales,
                });
            }
        }, [])
    )


    return (
        <PaperProvider>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Branch’s</Text>
                <Text style={{ color: '#333333', fontWeight: '700', fontSize: 16, padding: 8 }}>HR Manager</Text>

                {/* Branch List */}
                <FlatList
                    data={branches}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.buttonList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedBranch(item)}
                            style={[
                                styles.branchButton,
                                selectedBranch?.name === item.name && styles.selectedButton,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    selectedBranch?.name === item.name && styles.selectedText,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                {selectedBranch && (
                    <View style={styles.branchDetails}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                Branch Name: {selectedBranch.name}
                            </Text>
                        </View>

                        <View style={styles.detailBox}>
                            <Text>Branch Manager Name: {selectedBranch.managerName}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text>Branch Manager Phone: {selectedBranch.managerPhone}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text>Technicians: {selectedBranch.staff.technicities}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text>Non Technicians: {selectedBranch.staff.nonTechnicities}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text>Sales: {selectedBranch.staff.sales}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            <Text>Total Staff: {selectedBranch.staff.total}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 3,
        overflow: "hidden",
        backgroundColor: "#FFF",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },

    branchHeader: {
        backgroundColor: "#029D48",
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    role: {
        fontSize: 14,
        color: "#666",
        marginVertical: 4,
    },
    location: {
        fontSize: 14,
        color: "#888",
    },
    statBox: {
        backgroundColor: '#D1D5DB', // gray-300
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    statText: {
        fontSize: 18,
        fontWeight: '600', // equivalent to font-semibold
        color: '#111827', // gray-900
    },
    branchTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    roleCard: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    activeTab: {
        backgroundColor: "#009C41",
        borderColor: "#009C41",
        flex: 1,
        margin: 5,
    },
    buttonList: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    branchButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#D1D5DB', // gray-300
        marginRight: 10,
    },
    selectedButton: {
        backgroundColor: '#16A34A', // green-600
    },
    buttonText: {
        color: '#374151', // gray-700
        fontWeight: 'bold',
    },
    selectedText: {
        color: 'white',
    },
    branchDetails: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        paddingBottom: 16,
    },
    header: {
        backgroundColor: '#16A34A', // green-600
        padding: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailBox: {
        backgroundColor: '#D1D5DB', // gray-300
        padding: 12,
        margin: 8,
        borderRadius: 10,
    },
    activeTabText: {
        color: "#FFFFFF",
    },
    inactiveTabText: {
        color: "#000000",
    },
    activePaymentTabText: {
        color: "#FFFFFF",
    },
    inactivePaymentTabText: {
        color: "#000000",
    },
    roleDetails: {
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 3,
    },
    tabContainer: {
        flexDirection: "row",
        flexWrap: "wrap", height: 55,
        marginBottom: 20, width: 650,
        justifyContent: "space-between",
    },

    roleText: {
        fontSize: 14,
        marginBottom: 5, paddingLeft: 10, paddingBottom: 8
    },
    noRoles: {
        fontSize: 14,
        color: "#888",
        padding: 10,
    },
});

export default Branch_HR;
