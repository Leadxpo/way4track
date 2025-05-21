import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Provider, SegmentedButtons } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loadData } from "../../Utils/appData";
import { fetchTechnicianWorks } from "../../Redux/Actions/TechnicianWork";
import Header from "../../components/userHeader";

const PaymentWorks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSegment, setActiveSegment] = useState("paymentPending");

  const { technicianWorks, loading } = useSelector((state) => state.techWorksReducer);

  useFocusEffect(
    useCallback(() => {
      const loadStaffData = async () => {
        const technicianId = await loadData("staffID");
        setStaffId(technicianId || "");
      };
      loadStaffData();
    }, [])
  );

  useEffect(() => {
    if (staffId) {
      dispatch(fetchTechnicianWorks({ companyCode: "WAY4TRACK", unitCode: "WAY4", staffId }));
    }
  }, [staffId, dispatch]);

  const filteredData = useMemo(() => {
    return technicianWorks.filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.clientName?.toLowerCase().includes(query) ||
        item.workAllocationNumber?.toLowerCase().includes(query)
      );
    });
  }, [technicianWorks, searchQuery]);

  const paymentPendingWorks = useMemo(() => filteredData.filter((item) => item.paymentStatus === "PENDING" && item.workStatus === "activate"), [filteredData]);
  const paymentPartiallyWorks = useMemo(() => filteredData.filter((item) => item.paymentStatus === "PARTIALLY_PAID" && item.workStatus === "activate"), [filteredData]);
  const paymentUnpaidWorks = useMemo(() => filteredData.filter((item) => item.paymentStatus === "UNPAID" && item.workStatus === "activate"), [filteredData]);
  const paymentDonedWorks = useMemo(() => filteredData.filter((item) => item.paymentStatus === "COMPLETED" && item.workStatus === "activate"), [filteredData]);
  console.log("pendingWorks : ", filteredData)

  var data = [];


  switch (activeSegment) {
    case "paymentPending":
      data = paymentPendingWorks;
      break;
    case "paymentPartially":
      data = paymentPartiallyWorks;
      break;
    case "paymentUnpaid":
      data = paymentUnpaidWorks;
      break;
    case "paymentDonedWorks":
      data = paymentDonedWorks;
      break;

    default:
      data = []
      break;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "#ffc4a8";
      case "allocated": return "blue";
      case "COMPLETED": return "#ffa9a8";
      case "incomplete": return "#d3d3d3";
      default: return "#f3f3f3";
    }
  };

  const renderWorkItem = ({ item, index }) => (
    <Card style={[styles.card, { backgroundColor: getStatusColor(item.paymentStatus) }]} key={index}>
      <View style={styles.entryRow}>
        <View>
          <Text variant="labelLarge" style={styles.entryText}>Client Name: <Text variant="bodyLarge" style={styles.values}>{item.clientName || "N/A"}</Text></Text>

          <Text variant="labelLarge" style={styles.entryText}>Phone: <Text variant="bodyMedium" style={styles.values}>{item.phoneNumber || "N/A"}</Text></Text>

          <Text variant="labelLarge" style={styles.entryText}>DOA: <Text variant="bodyMedium" style={styles.values}>{item.startDate?.split("T")[0] || "N/A"}</Text></Text>

        </View>
        <TouchableOpacity onPress={() => navigation.navigate("WorkDetails", { workDetails: item })}>
          <MaterialCommunityIcons name="eye" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Card>);

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Work ID"
          placeholderTextColor="#aaaaaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
            { value: 'paymentPending', label: 'Pending', style: activeSegment === 'paymentPending' ? styles.activeButton : styles.inactiveButton,checkedColor:"#ffffff",uncheckedColor:"#333333" },
            { value: 'paymentPartially', label: 'Partially', style: activeSegment === 'paymentPartially' ? styles.activeButton : styles.inactiveButton,checkedColor:"#ffffff",uncheckedColor:"#333333" },
            { value: 'paymentDonedWorks', label: 'Done', style: activeSegment === 'paymentDonedWorks' ? styles.activeButton : styles.inactiveButton,checkedColor:"#ffffff",uncheckedColor:"#333333" },
            { value: 'paymentUnpaid', label: 'Unpaid', style: activeSegment === 'paymentUnpaid' ? styles.activeButton : styles.inactiveButton,checkedColor:"#ffffff",uncheckedColor:"#333333" },
          ]}
          style={styles.segmentContainer}
          theme={{
            colors: {
              primary: '#007AFF', // Active Tab Color
              onSurfaceVariant: '#fff', // Text color
            },
          }}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No Works Assigned Yet</Text>
              </Card>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  activeButton: {
    backgroundColor: '#28a745', // Active button background
    color: '#fff', // Active text color
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Inactive button background
    color: '#000', // Inactive text color
  },
  searchInput: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#f3f3f3",
    borderWidth: 1,
    margin: 10,
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 3,
  },
  segmentContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  entryCard: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  card: { marginBottom: 10, borderRadius: 8, elevation: 3, width: "90%", alignSelf: "center" },
  cardContent: { padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333333", marginVertical: 10 },
  clientInfo: { fontSize: 14, color: "#555", marginVertical: 5 },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  entryText: {
    color: '#333',
    marginBottom: 4,
  },
  values: {
    color: '#000000',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f3f3',
    marginVertical: 5,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyCard: {
    padding: 20,
    backgroundColor: "#f8d7da",
    borderRadius: 10,
  },
  emptyText: {
    color: "#721c24",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default PaymentWorks;
