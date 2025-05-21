import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Provider } from 'react-native-paper';
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { intiateHR_dashboard } from '../../Redux/Actions/dashboard';

const branches = [
    {
        name: 'Hyderabad',
        manager: 'Vijayawad',
        phone: '+91 84653 34445',
        technicities: 200,
        nonTechnicities: 50,
        marketing: 450,
        totalStaff: 500,
        requiredManPower: 10
    },
    {
        name: 'Vishakhapatnam',
        manager: 'Ravi Kumar',
        phone: '+91 98765 43210',
        technicities: 180,
        nonTechnicities: 70,
        marketing: 400,
        totalStaff: 500,
        requiredManPower: 10
    },
    {
        name: 'Vijayawada',
        manager: 'Arun Singh',
        phone: '+91 91234 56789',
        technicities: 190,
        nonTechnicities: 60,
        marketing: 420,
        totalStaff: 500,
        requiredManPower: 10
    },
    {
        name: 'Kakinada',
        manager: 'Suresh Reddy',
        phone: '+91 95432 67890',
        technicities: 210,
        nonTechnicities: 40,
        marketing: 460,
        totalStaff: 500,
        requiredManPower: 10
    },
];

const Home_HR = () => {
    const [selectedBranch, setSelectedBranch] = useState();
    const [branches, setBranches] = useState();
    const [totals, setTotals] = useState({
        totalTechnicians: 0,
        totalSales: 0,
        totalNonTechnicians: 0,
    });

    const dispatch = useDispatch();

    const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

    const { loading: HR_homeInfoLoading, HR_homeInfo, error: HR_homeInfoError } = useSelector(state => state.HR_homeInfoReducer);

    useEffect(() => {
        const HR_dashboardPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
        dispatch(intiateHR_dashboard(HR_dashboardPayload));
    }, [dispatch])


    useEffect(() => {
        // Extract branch data
        const branches = HR_homeInfo?.data;
        console.log("branchesss : ", branches);
        setBranches(branches);

        // Calculate totals
        const totalTechnicians = branches?.reduce(
            (sum, branch) => sum + branch.totalTechnicians,
            0
        );
        const totalSales = branches?.reduce(
            (sum, branch) => sum + branch.totalSales,
            0
        );
        const totalNonTechnicians = branches?.reduce(
            (sum, branch) => sum + branch.totalNonTechnicians,
            0
        );

        // Update state
        setTotals({
            totalTechnicians,
            totalSales,
            totalNonTechnicians,
        });
    }, [HR_homeInfo,dispatch]);


    return (
        <Provider>
            <Header />
            <ScrollView style={{ padding: 10 }}>
                <View style={[styles.roleCard, { backgroundColor: '#FF8A8A', flexDirection: 'row', flex: 1 }]}>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 3 }]}>Technician</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>:</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>{totals.totalTechnicians}</Text>
                </View>
                <View style={[styles.roleCard, { backgroundColor: '#8AFF8A', flexDirection: 'row', flex: 1 }]}>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 3 }]}>Non-Technician</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>:</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>{totals.totalNonTechnicians}</Text>
                </View>
                <View style={[styles.roleCard, { backgroundColor: '#A48AFF', flexDirection: 'row', flex: 1 }]}>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 3 }]}>Sales Man</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>:</Text>
                    <Text style={[styles.roleTitle, styles.roleCard, { flex: 1 }]}>{totals.totalSales}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                    {branches?.map((branch) => (
                        <TouchableOpacity
                            key={branch.branchName}
                            style={{
                                padding: 10, marginHorizontal: 3,
                                backgroundColor: selectedBranch?.branchName === branch.branchName ? 'green' : 'lightgray',
                                borderRadius: 5,
                            }}
                            onPress={() => setSelectedBranch(branch)}
                        >
                            <Text style={{ color: 'white' }}>{branch.branchName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Card style={{ elevation: 5, padding: 15, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Branch Name: {selectedBranch?.branchName}</Text>
                    {/* <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Manager: {selectedBranch?.branchManagerName}</Text>
                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Phone: {selectedBranch?.branchManagerPhoneNumber}</Text> */}
                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Technicities: {selectedBranch?.totalTechnicians}</Text>
                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Non-Technicities: {selectedBranch?.totalNonTechnicians}</Text>
                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Marketing: {selectedBranch?.totalSales}</Text>
                    <Text style={[styles.roleCard, { backgroundColor: '#029D4830', fontSize: 16, fontWeight: "bold", color: "#029D48", marginBottom: 8 }]}>Total Staff: {selectedBranch?.totalStaff}</Text>
                </Card>
            </ScrollView>
        </Provider>
    );
};

export default Home_HR;

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
        marginVertical: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    roleTitle: {
        fontSize: 20,
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
