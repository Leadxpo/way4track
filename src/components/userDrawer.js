
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loadData, removeData } from "../Utils/appData";
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../Redux/Actions/drawAction";

export default function CustomStaffDrawerContent({ role, permissions, ...props }) {
    const dispatch = useDispatch();
    const { selectedLabel } = useSelector(state => state.selectedDrawLabel);

    const allDrawerItems = [
        { icon: "home", label: "Home", navigateTo: "BottomHome", name: "home" },
        { icon: "account-group", label: "Branch's", navigateTo: "Branch", name: "branch" },
        { icon: "account-group", label: "Asserts", navigateTo: "Assets", name: "assets" },
        { icon: "account-group", label: "Staff", navigateTo: "Staff", name: "staff" },
        { icon: "account-circle", label: "Clients", navigateTo: "Clients", name: "client" },
        { icon: "store", label: "Vendors", navigateTo: "Vendors", name: "vendor" },
        { icon: "storefront-outline", label: "SubDealers", navigateTo: "SubDealers", name: "subdealer" },
        { icon: "package-variant", label: "Products", navigateTo: "Products", name: "product" },
        { icon: "clipboard-arrow-right", label: "Product Assign", navigateTo: "ProductAssign", name: "productassign" },
        { icon: "briefcase", label: "Hiring", navigateTo: "Hiring", name: "hiring" },
        { icon: "file-document", label: "Report", navigateTo: "Report", name: "Report" },
        { icon: "file-document", label: "Voucher", navigateTo: "Voucher", name: "voucher" },
        { icon: "bank", label: "Bank A/C", navigateTo: "Bank", name: "bank" },
        { icon: "briefcase", label: "Payrole", navigateTo: "Payrole", name: "payrole" },
        { icon: "ticket", label: "Tickets", navigateTo: "Tickets", name: "tickets" },
        { icon: "calendar-check", label: "Appointments", navigateTo: "Appointments", name: "appointments" },
        { icon: "clipboard-check-outline", label: "Work Allocation", navigateTo: "WorkAllocation", name: "work-allocation" },
        { icon: "file-account-outline", label: "Estimate", navigateTo: "Estimate", name: "estimate" },
        { icon: "notebook", label: "Day Book", navigateTo: "DayBook", name: "daybook" },
        { icon: "chart-bar", label: "Analysis", navigateTo: "Analysis", name: "analysis" },
        { icon: "account", label: "Ledger", navigateTo: "Ledger", name: "ledger" },
        { icon: "credit-card", label: "Payments", navigateTo: "Payments", name: "payments" },
        { icon: "receipt", label: "Reciept", navigateTo: "Reciept", name: "reciept" },
        { icon: "cart-outline", label: "Purchase", navigateTo: "Purchase", name: "purchase" }
    ];

    let allowedItems = permissions.filter(p => p.view).map(p => p.name);

    const hasVoucherPermission = permissions.some(p => p.name === "voucher" && p.view);
    const hasStaffPermission = permissions.some(p => p.name === "staff" && p.view);

    if (permissions.some(p => p.name === "voucher" && p.view && role != "Technician" && role != "Technician" && role != "Branch Manager" && role != "Salesman")) {
        allowedItems = [...new Set([...allowedItems, "daybook", "analysis", "ledger", "payments", "receipt", "purchase"])];
    }
    if (permissions.some(p => p.name === "staff" && p.view)) {
        allowedItems = [...new Set([...allowedItems, "payroll"])];
    }
    allowedItems = [...new Set([...allowedItems, "Report"])];
    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: "#333333" }}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderTitle}>Sharon Telematics</Text>
                <Text style={styles.drawerHeaderText}>{role}</Text>
            </View>

            <View style={styles.drawerItems}>
                <TouchableOpacity
                    key={"Home"}
                    style={[styles.drawerItem, selectedLabel === 'Home' && styles.selectedDrawerItem]}
                    onPress={() => {
                        dispatch(drawLabel("Home"));
                        props.navigation.navigate('BottomHome');
                    }}
                >
                    <MaterialCommunityIcons
                        name={'home'}
                        size={22}
                        color={selectedLabel === "Home" ? "#FFD700" : "#fff"}
                    />
                    <Text
                        style={[styles.drawerItemText, selectedLabel === 'Home' && styles.selectedDrawerItemText]}
                    >
                        {"Home"}
                    </Text>
                </TouchableOpacity>
                {allDrawerItems
                    .filter(item => allowedItems.includes(item.name))
                    .map(item => (
                        <TouchableOpacity
                            key={item.label}
                            style={[styles.drawerItem, selectedLabel === item.label && styles.selectedDrawerItem]}
                            onPress={() => {
                                dispatch(drawLabel(item.label));
                                props.navigation.navigate(item.navigateTo);
                            }}
                        >
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={22}
                                color={selectedLabel === item.label ? "#FFD700" : "#fff"}
                            />
                            <Text
                                style={[styles.drawerItemText, selectedLabel === item.label && styles.selectedDrawerItemText]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </View>

            <View style={styles.logoutSection}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => props.navigation.navigate('Login')}
                // onPress={() =>
                //     Alert.alert("Logout", "Are you sure you want to log out?", [
                //         { text: "Cancel", style: "cancel" },
                //         {
                //             text: "Logout",
                //             onPress: async () => {
                //                 

                //                 // Delay navigation slightly to ensure the alert is dismissed properly
                //                 setTimeout(() => {
                //                     props.navigation.reset({
                //                         index: 0,
                //                         routes: [{ name: "Login" }],
                //                     });
                //                 }, 500);
                //             }
                //         }
                //     ])
                // }
                >
                    <MaterialCommunityIcons name="logout" size={22} color="#fff" />
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};


const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        backgroundColor: "#444",
        alignItems: "center",
    },
    drawerHeaderTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    drawerHeaderText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Parkinsans-SemiBold"
    },
    drawerItems: {
        marginVertical: 10,
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    selectedDrawerItem: {
        backgroundColor: "#555",
    },
    drawerItemText: {
        marginLeft: 15,
        color: "#fff", fontFamily: "Parkinsans-SemiBold",

        fontSize: 16,
    },
    selectedDrawerItemText: {
        color: "#FFD700", fontFamily: "Parkinsans-SemiBold",
    },
    logoutSection: {
        marginTop: 20,
        alignItems: "center",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#555",
        borderRadius: 5,
    },
    logoutText: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 16,
    },
});
