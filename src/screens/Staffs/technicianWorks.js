import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Card, Provider, SegmentedButtons, Button } from "react-native-paper";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnicianWorks } from "../../Redux/Actions/TechnicianWork";
import { loadData } from "../../Utils/appData";
import { useFocusEffect } from '@react-navigation/native';

const TechnicianWorks = ({ navigation }) => {
  const dispatch = useDispatch();
  const { technicianWorks, loading } = useSelector(state => state.techWorksReducer);
  const [activeSegment, setActiveSegment] = useState("pending");
  const [permissions, setPermissions] = useState([]);
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalInstallDetailsVisible, setModalInstallDetailsVisible] = useState(false);
  const [modalSalesDetailsVisible, setModalSalesDetailsVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);


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

      if (staffId) {
        const payload = { companyCode: "WAY4TRACK", unitCode: "WAY4", staffId };
        dispatch(fetchTechnicianWorks(payload));
      }

    }, [staffId, dispatch])
  );

  /** Filtered Data for Search */
  const filteredData = technicianWorks.filter(item => {
    if (!searchQuery) return true;

    const clientName = item.clientName ? item.clientName.toLowerCase() : "";
    const workAllocationNumber = item.workAllocationNumber ? item.workAllocationNumber.toLowerCase() : "";
    const workStatus = item.workStatus ? item.workStatus.toLowerCase() : "";

    return clientName.includes(searchQuery.toLowerCase()) || workAllocationNumber.includes(searchQuery.toLowerCase()) || workStatus.includes(searchQuery.toLowerCase());
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
    return (
      <Card style={[styles.card, { backgroundColor: getStatusColor(item.workStatus) }]} key={index}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          setSelectedWork(item);
          setModalInstallDetailsVisible(true)
          console.log(modalInstallDetailsVisible)
        }}>
          <View style={styles.cardContent}>
            <Text style={styles.sectionTitle}>Client Details</Text>
            <Text style={styles.clientInfo}>Client Name: {item.clientName || "N/A"}</Text>
            <Text style={styles.clientInfo}>Phone: {item.phoneNumber || "N/A"}</Text>
            <Text style={styles.clientInfo}>DOA: {(item.date ? String(item.date).split("T")[0] : "N/A")
            }</Text>
            <Text style={{ color: "#ffffff", fontWeight: "700", backgroundColor: "#ffa9a8", borderRadius: 8, padding: 5, width: "40%", marginVertical: 10, justifyContent: 'center' }}>
              Status: {item.workStatus || "N/A"}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    )
  };

  const workStatusMap = useMemo(() => ({
    pending: filteredData.filter(item => item.workStatus === "pending"),
    workInstalled: filteredData.filter(item => item.workStatus === "install"),
    acceptWorks: filteredData.filter(item => item.workStatus === "accept"),
    activatedWorks: filteredData.filter(item => item.workStatus === "activate")
  }), [filteredData]);

  const data = workStatusMap[activeSegment] || [];

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

        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
            { value: 'pending', label: 'Pending', style: activeSegment === 'pending' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'workInstalled', label: 'Installed', style: activeSegment === 'workInstalled' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'acceptWorks', label: 'Accepted', style: activeSegment === 'acceptWorks' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'activatedWorks', label: 'Activated', style: activeSegment === 'activatedWorks' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
          ]}
          density="medium"
          style={styles.segmentContainer}
          theme={{
            colors: {
              primary: '#007AFF', // Active Tab Color
              onSurfaceVariant: '#fff', // Text color
            },
          }}
        />

        {/* Work List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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

        {/* Work Details Modal */}
        <Modal visible={modalInstallDetailsVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalInstallDetailsVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Work Allocation Details</Text>

              {selectedWork && (
                <Card style={styles.modalCard}>
                  <Text style={styles.sectionTitle}>Client Details</Text>
                  <Text style={styles.clientInfo}>Client Name: {selectedWork.clientName || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Phone: {selectedWork.phoneNumber || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Staff Details</Text>
                  <Text style={styles.clientInfo}>Staff Name : {selectedWork.staffName || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Work Allocation Details</Text>
                  <Text style={styles.clientInfo}>Work ID : {selectedWork.workAllocationNumber || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Work Status : {selectedWork.workStatus || "N/A"}</Text>
                  <Text style={styles.clientInfo}>productName : {selectedWork.productName || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Slot Date : {(selectedWork.date ? String(selectedWork.date).split("T")[0] : "N/A")}</Text>
                  <Text style={styles.clientInfo}>Description : {(selectedWork.description || "N/A")}</Text>
                  {selectedWork.workStatus === "pending" && (
                    <Button
                      mode="contained" style={{ margin: 10 }}
                      onPress={() => {
                        setModalInstallDetailsVisible(false); // Close modal
                        navigation.navigate("Home", {
                          screen: "DeviceInstall_ClientInfo",
                          params: { techWorkDetails: selectedWork }
                        });
                      }}
                    >
                      Start Installation
                    </Button>

                  )}
                </Card>
              )}
            </View>
          </View>
        </Modal>
        {/* <Modal visible={modalSalesDetailsVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalSalesDetailsVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Work Allocation Details</Text>

              {selectedWork && (
                <Card style={styles.modalCard}>
                  <Text style={styles.sectionTitle}>Client Details</Text>
                  <Text style={styles.clientInfo}>Client Name: {selectedWork.clientName || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Phone: {selectedWork.phoneNumber || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Staff Details</Text>
                  <Text style={styles.clientInfo}>Staff Name : {selectedWork.staffName || "N/A"}</Text>

                  <Text style={styles.sectionTitle}>Work Allocation Details</Text>
                  <Text style={styles.clientInfo}>Work ID : {selectedWork.workAllocationNumber || "N/A"}</Text>
                  <Text style={styles.clientInfo}>Work Status : {selectedWork.workStatus || "N/A"}</Text>
                   <Text style={styles.clientInfo}>Slot Date : {selectedWork.date.split("T")[0] || "N/A"}</Text> 
                  {selectedWork.workStatus === "pending" && (
                    <Button
                      mode="contained" style={{ margin: 10 }}
                      onPress={() => {
                        setModalSalesDetailsVisible(false); // Close modal
                        navigation.navigate("Sales_clientInfo", { saleWorkDetails: selectedWork });
                      }}
                    >
                      Start Installation
                    </Button>
                  )}
                </Card>
              )}
            </View>
          </View>
        </Modal> */}
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
  activeButton: {
    backgroundColor: '#28a745', // Active button background
    color: '#fff', // Active text color
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Inactive button background
    color: '#000', // Inactive text color
  },
  segmentContainer: {
    backgroundColor: '#F0F0F0', color: '#333333',
    borderRadius: 10, margin: 10,
    overflow: 'hidden',
  },
  listContainer: {
    paddingBottom: 16,
  },
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

export default TechnicianWorks;
