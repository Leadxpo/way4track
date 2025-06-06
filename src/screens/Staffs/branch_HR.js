import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Image, ScrollView } from "react-native";
import { Card, Menu, MD3Colors, Provider as PaperProvider, Icon, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/userHeader";
import { permissions } from "../../Utils/permissions";

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
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [activeTab, setActiveTab] = useState("Receipt"); // Manage active tab
    const [paymentActiveTab, setPaymentActiveTab] = useState("Receipt"); // Manage active tab
    const [paymentModeVisible, setPaymentModeVisible] = useState(false); // Manage payment dropdown visibility
    const [selectedPaymentMode, setSelectedPaymentMode] = useState(""); // Manage selected payment mode
    const [visibleMenu, setVisibleMenu] = useState(null); // Track which product's menu is open

    const hasAddStaffPermission = permissions.some(p => p.name === "staff" && p.add);
    const hasEditStaffPermission = permissions.some(p => p.name === "staff" && p.edit);
    const hasDeleteStaffPermission = permissions.some(p => p.name === "staff" && p.delete);
  
    const renderStaff = ({ item }) => {
        console.log("staff item : ", item)
        return (
            <Card style={styles.card}>
                <View style={styles.row}>
                    {/* <Image source={{ uri: item.staffPhoto }} style={styles.image} /> */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.role}</Text>
                        <Text style={styles.role}>{item.phone}</Text>
                        <Text style={styles.location}>{item.email}</Text>
                    </View>
                    <Menu
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
                    </Menu>
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

    return (
        <PaperProvider>
            <Header />
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Branch’s</Text>
                <Card style={styles.roleDetails}>
                    <Text style={[styles.roleTitle, styles.roleCard, { backgroundColor: '#FF8A8A' }]}>Accountant</Text>
                    <Text style={styles.roleText}>Branch:{"ravi"}</Text>
                    <Text style={styles.roleText}>Phone: {"999999999"}</Text>
                    <Text style={styles.roleText}>Email: {"ravi@gmail.com"}</Text>
                    <Text style={styles.roleText}>Salary: {"35000"}</Text>
                </Card>

                <Card style={styles.roleDetails}>
                    <Text style={[styles.roleTitle, styles.roleCard, { backgroundColor: '#8AFF8A' }]}>Warehouse Manager</Text>
                    <Text style={styles.roleText}>Branch:{"ravi"}</Text>
                    <Text style={styles.roleText}>Phone: {"999999999"}</Text>
                    <Text style={styles.roleText}>Email: {"ravi@gmail.com"}</Text>
                    <Text style={styles.roleText}>Salary: {"35000"}</Text>
                </Card>

                <Card style={styles.roleDetails}>
                    <Text style={[styles.roleTitle, styles.roleCard, { backgroundColor: '#A48AFF' }]}>HR Manager</Text>
                    <Text style={styles.roleText}>Branch:{"ravi"}</Text>
                    <Text style={styles.roleText}>Phone: {"999999999"}</Text>
                    <Text style={styles.roleText}>Email: {"ravi@gmail.com"}</Text>
                    <Text style={styles.roleText}>Salary: {"35000"}</Text>
                </Card>

                <Text style={{ color: '#333333', fontWeight: '700', fontSize: 16, padding: 8 }}>HR Manager</Text>

                {/* Branch List */}
                {branchesData.map((branch) => (
                    <View key={branch.name}>
                        {/* Branch Name */}
                        <TouchableOpacity onPress={() => toggleBranch(branch.name)} style={styles.branchHeader}>
                            <Text style={styles.branchTitle}>{branch.name}</Text>
                            <MaterialCommunityIcons name={selectedBranch === branch.name ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'} size={20} color="#ffffff" />
                        </TouchableOpacity>

                        {/* Show roles only if branch is selected */}
                        {selectedBranch === branch.name && (
                            <View>
                                <View>
                                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>PhoneNumber : 999999999</Text>
                                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", arginBottom: 8 }]}>Email:{branch.name}@gmail.com</Text>
                                    {/* Role Name */}
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.tabContainer}
                                    >
                                        {["Technician", "NonTechnetian", "SaleMan"].map((tab, index) => (
                                            <Button
                                                key={index}
                                                mode="outlined"
                                                onPress={() => {
                                                    setPaymentModeVisible(false);
                                                    setSelectedPaymentMode(tab);
                                                    setPaymentActiveTab(tab)
                                                }}
                                                style={paymentActiveTab === tab ? styles.activeTab : styles.inactiveTab}
                                                labelStyle={paymentActiveTab === tab ? styles.activePaymentTabText : styles.inactivePaymentTabText}
                                            >
                                                {tab}
                                            </Button>
                                        ))}

                                    </ScrollView>
                                    {/* Smooth Animated Payment Form */}
                                    <View>
                                        <FlatList
                                            data={branch.roles}
                                            keyExtractor={(item) => item.id}
                                            renderItem={renderStaff}
                                            contentContainerStyle={styles.listContent}
                                        />
                                    </View>

                                </View>
                            </View>
                        )}
                    </View>
                ))}
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
    inactiveTab: {
        backgroundColor: "#FFFFFF",
        borderColor: "#CCCCCC",
        flex: 1,
        margin: 5,
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
