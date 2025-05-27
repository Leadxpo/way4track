import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Card, Provider, Button } from "react-native-paper";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from "../../Utils/appData";
import { useFocusEffect } from '@react-navigation/native';

const VisitList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { SalesMen_homeInfo } = useSelector(state => state.SalesMen_homeInfoReducer);

  const [permissions, setPermissions] = useState([]);
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalInstallDetailsVisible, setModalInstallDetailsVisible] = useState(false);
  const [modalSalesDetailsVisible, setModalSalesDetailsVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [leadsData,setLeadsData]=useState([]);


  /** Fetch Technician Works Whenever Staff ID is Available */
  useFocusEffect(
    useCallback(() => {
      const loadStaffData = async () => {
        const technicianId = await loadData("staffID");
        const staffPermissions = await loadData("staffPermissions");

        setPermissions(staffPermissions || []);
        setStaffId(technicianId || "");
      };

      loadStaffData();
      setLeadsData(SalesMen_homeInfo?.totalLeadsData);
console.log("rrr : ",SalesMen_homeInfo.totalLeadsData)
    }, [staffId, dispatch])
  );

  /** Filtered Data for Search */
  const filteredData = leadsData?.filter(item => {
    if (!searchQuery) return true;

    const clientName = item.name ? item.name.toLowerCase() : "";
    const clientPhoneNumber = item.phoneNumber ? item.phoneNumber.toLowerCase() : "";
    const leadStatus = item.leadStatus ? item.leadStatus.toLowerCase() : "";

    return clientName.includes(searchQuery.toLowerCase()) || clientPhoneNumber.includes(searchQuery.toLowerCase()) || leadStatus.includes(searchQuery.toLowerCase());
  });

  /** Work Status Color Mapping */
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "#ffc4a8";
      case "allocated": return "blue";
      case "completed": return "#ffa9a8";
      case "incomplete": return "#d3d3d3";
      case "install": return "#c1e1c1"; // light green
      case "accept": return "#add8e6";  // light blue
      case "activate": return "#90ee90"; // light green
      case "processing": return "#fdfd96"; // light yellow
      default: return "#f3f3f3";
    }
  };
  
  /** Render Technician Work Item */
  const renderItem = ({ item, index }) => {
    return(
    <Card style={[styles.card, { backgroundColor: getStatusColor(item.leadStatus) }]} key={index}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        setSelectedWork(item);
          setModalInstallDetailsVisible(true)
          console.log(modalInstallDetailsVisible)
      }}>
        <View style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Client Details</Text>
          <Text style={styles.clientInfo}>Client Name: {item.name || "N/A"}</Text>
          <Text style={styles.clientInfo}>Phone: {item.phoneNumber || "N/A"}</Text>
          <Text style={styles.clientInfo}>Vist Date: {(item.date ? String(item.date).split("T")[0] : "N/A")
          }</Text>
          <Text style={{ color: "#ffffff", fontWeight: "700", backgroundColor: "#ffa9a8", borderRadius: 8, padding: 5, width: "40%", marginVertical: 10, justifyContent: 'center' }}>
            Status: {item.leadStatus || "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  )};

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Works"
          value={searchQuery}
          placeholderTextColor="#aaaaaa"
          onChangeText={setSearchQuery}
        />

        {/* Work List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No Works Assigned Yet</Text>
              </Card>
            </View>
          )}
        />

        {/* Work Details Modal */}
        <Modal visible={modalInstallDetailsVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalInstallDetailsVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Lead Details</Text>

              {selectedWork && (
                <Card style={styles.modalCard}>
                  <Text style={styles.sectionTitle}>Client Details</Text>
                  <Text style={styles.clientInfo}>Client Name: {selectedWork.name || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Phone: {selectedWork.phoneNumber || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Staff Details</Text>
                  <Text style={styles.clientInfo}>Staff Name : {selectedWork.staffName || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Staff Phone No. : {selectedWork.staffPhoneNumber || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Staff Branch Name : {selectedWork.branchName || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Visit Details</Text>
                  <Text style={styles.clientInfo}>Lead ID : {selectedWork.id || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Work Status : {selectedWork.leadStatus || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Requirements : {selectedWork.requirementDetails || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Estimate Date : {(selectedWork.estimateDate ? String(selectedWork.estimateDate).split("T")[0] : "N/A")}</Text>
                </Card>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  searchInput: {
    width: "90%", alignSelf: "center", borderRadius: 10, borderColor: "#f3f3f3",
    borderWidth: 1, margin: 10, height: 50, backgroundColor: "#fff", padding: 10, elevation: 3
  },
  card: { marginBottom: 10, borderRadius: 8, elevation: 3, width: "90%", alignSelf: "center" },
  cardContent: { padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333333", marginVertical: 10 },
  clientInfo: { fontSize: 14, color: "#555", marginVertical: 5 },

  emptyContainer: { alignItems: "center", marginTop: 20 },
  emptyCard: { padding: 20, backgroundColor: "#f8d7da", borderRadius: 10 },
  emptyText: { color: "#721c24", fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContent: { padding: 20, backgroundColor: "#fff", borderRadius: 10, marginHorizontal: 20 },
  closeButton: { alignSelf: "flex-end" },
  closeButtonText: { fontSize: 18, color: "red" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalCard: { padding: 15, backgroundColor: "#ffffff", borderRadius: 10 }
});

export default VisitList;
