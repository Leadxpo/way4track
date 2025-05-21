import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import Header from '../../components/userHeader';
import { intiateBranchManager_dashboard } from '../../Redux/Actions/dashboard';
import { staffDataHook } from '../../Utils/permissions';

const Home_BranchManager = () => {
  const dispatch = useDispatch();
  const { BranchManager_homeInfo } = useSelector(state => state.BranchManager_homeInfoReducer);
  const [branchManagerData, setBranchManagerData] = useState(null);
  const [creditAndDebitPercentages, setCreditAndDebitPercentages] = useState({});
  const [productsData, setProductsData] = useState([]);
  const [staffData, setStaffData] = useState({});
  const [assertData, setAssertData] = useState({});



  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchManagerDetails = await staffDataHook();
        setBranchManagerData(branchManagerDetails);

        const BranchManager_dashboardPayload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
          branchName: branchManagerDetails?.branchName,
          branch: branchManagerDetails?.branchName,
        };
        dispatch(intiateBranchManager_dashboard(BranchManager_dashboardPayload));
      } catch (error) {
        console.error('Error fetching branch manager data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (BranchManager_homeInfo) {
      setCreditAndDebitPercentages(BranchManager_homeInfo?.CreditAndDebitPercentages?.[0] || {});
      setAssertData(BranchManager_homeInfo?.assertCard || {});
      setProductsData(BranchManager_homeInfo?.productByBranch?.products || []);
      setStaffData(BranchManager_homeInfo?.totalStaff?.result?.[0] || {});
    }
  }, [BranchManager_homeInfo]);

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.section}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#2ecc71" stopOpacity="1" />
                <Stop offset="1" stopColor="#27ae60" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}
        <View style={styles.employeeCard}>
          <Card.Cover
            source={
              branchManagerData?.staffPhoto
                ? { uri: branchManagerData.staffPhoto }
                : require("../../utilities/images/way4tracklogo.png")
            }
            style={styles.logo}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.empID}>Employee ID: {branchManagerData?.staffID || "N/A"}</Text>
            <Text style={styles.staffTitle}>Name: {branchManagerData?.staffName || "N/A"}</Text>
            <Text style={styles.infoText}>Designation: {branchManagerData?.role || "N/A"}</Text>
            <Text style={styles.infoText}>Branch: {branchManagerData?.branchId || "N/A"}</Text>
            <Text style={styles.infoText}>Phone: {branchManagerData?.phoneNumber || "N/A"}</Text>
          </View>
        </View>
      </View>


      <View style={styles.section}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="blue" stopOpacity="1" />
                <Stop offset="1" stopColor="#f3f3f3" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}
        <View >
          <View style={styles.infoCardBlue}>
            {productsData.map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoTitle}>{item.name}</Text>
                <Text style={styles.infoTitle}>:</Text>
                <Text style={styles.infoTitle}>{item.totalProducts}</Text>
              </View>
            ))}
          </View>

        </View>
      </View>

      <View style={styles.section}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="red" stopOpacity="1" />
                <Stop offset="1" stopColor="#f3f3f3" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}

        <View style={styles.infoCardRed}>
          <Text style={styles.infoTitle}>Total Staff: {staffData.totalStaff}</Text>
          <Text style={styles.infoTitle}>Technicians: {staffData.totalTechnicians}</Text>
          <Text style={styles.infoTitle}>Sales: {staffData.totalSales}</Text>
          <Text style={styles.infoTitle}>Non-Technicians: {staffData.totalNonTechnicians}</Text>
        </View>
      </View>

      <View style={styles.section}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#333333" stopOpacity="1" />
                <Stop offset="1" stopColor="#d3d3d3" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}

        <View style={styles.infoCardGreen}>
          <Text style={styles.infoTitle}>Office Assets: {assertData.officeAsserts}</Text>
          <Text style={styles.infoTitle}>Transport Assets: {assertData.transportAsserts}</Text>
          <Text style={styles.infoTitle}>Total Assets: {assertData.totalAsserts}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  employeeCard: { backgroundColor: '#ffffff00', padding: 15, margin: 10, borderRadius: 10, flexDirection: 'row' },
  logo: { width: 100, height: 100, alignSelf: 'center', backgroundColor: '#ffffff' },
  empID: { fontSize: 16, fontWeight: 'bold', color: 'green' },
  staffTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  card: { padding: 15, backgroundColor: '#fff', margin: 10, borderRadius: 10 },
  city: { fontSize: 18, fontWeight: 'bold' },
  profitText: { color: 'green', fontWeight: 'bold' },
  lossText: { color: 'red', fontWeight: 'bold' },
  progressBar: { height: 10, marginVertical: 5, borderRadius: 5 },
  infoCardBlue: { padding: 15, margin: 10, borderRadius: 10 },
  infoCardRed: { padding: 15, margin: 10, borderRadius: 10 },
  infoCardGreen: { padding: 15, margin: 10, borderRadius: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  section: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  employeeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  empID: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  staffTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34495e",
    marginVertical: 2,
  },
  infoText: {
    fontSize: 14,
    color: "#f3f3f3",
  },
});

export default Home_BranchManager;
