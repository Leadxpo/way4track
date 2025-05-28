import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Portal, Provider, SegmentedButtons, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loadData } from "../../Utils/appData";
import { fetchTechnicianWorks } from "../../Redux/Actions/TechnicianWork";
import Header from "../../components/userHeader";

const LeadWorks = ({ navigation }) => {
  const dispatch = useDispatch();
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [leadWork, setLeadWork] = useState([]);
  const [activeSegment, setActiveSegment] = useState("pending");
  const [modalInstallDetailsVisible, setModalInstallDetailsVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const { SalesMen_homeInfo } = useSelector(state => state.SalesMen_homeInfoReducer);

  useFocusEffect(
    useCallback(() => {
      const loadStaffData = async () => {
        const technicianId = await loadData("staffID");
        setStaffId(technicianId || "");
        setLeadWork(SalesMen_homeInfo?.totalLeadsData)
        console.log("rrr :", SalesMen_homeInfo.totalLeadsData)

      };
      loadStaffData();
    }, [])
  );

  const filteredData = useMemo(() => {
    return leadWork?.filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.name?.toLowerCase().includes(query) ||
        item.leadStatus?.toLowerCase().includes(query) ||
        item.visitingNumber?.toLowerCase().includes(query)
      );
    });
  }, [leadWork, searchQuery]);

  const workStatusMap = useMemo(() => ({
    leadPending: filteredData?.filter(item => item.leadStatus === "pending"),
    allocatedLead: filteredData?.filter(item => item.leadStatus === "allocated"),
    completedLead: filteredData?.filter(item => item.leadStatus === "completed")
  }), [filteredData]);

  const data = workStatusMap[activeSegment] || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "#e9f6ff";
      case "allocated": return "#ffeeec";
      default: return "#f3f3f3";
    }
  };

  const renderWorkItem = ({ item, index }) => (
    <Card style={[styles.card, { backgroundColor: getStatusColor(item.workStatus) }]} key={index}>
      <View style={styles.entryRow}>
        <View>
          <Text variant="labelLarge" style={styles.entryText}>Client Name: <Text variant="bodyLarge" style={styles.values}>{item.name || "N/A"}</Text></Text>

          <Text variant="labelLarge" style={styles.entryText}>Phone: <Text variant="bodyMedium" style={styles.values}>{item.phoneNumber || "N/A"}</Text></Text>

          <Text variant="labelLarge" style={styles.entryText}>Estimate Date: <Text variant="bodyMedium" style={styles.values}>{item.estimateDate?.split("T")[0] || "N/A"}</Text></Text>

        </View>
        <TouchableOpacity onPress={() => {
          setSelectedWork(item);
          setModalInstallDetailsVisible(true);
        }}
        >
          <MaterialCommunityIcons name="eye" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Works"
          placeholderTextColor="#aaaaaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
            { value: 'leadPending', label: 'Pending', style: activeSegment === 'leadPending' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'allocatedLead', label: 'Allocated', style: activeSegment === 'allocatedLead' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
            { value: 'completedLead', label: 'Completed', style: activeSegment === 'completedLead' ? styles.activeButton : styles.inactiveButton, checkedColor: "#ffffff", uncheckedColor: "#333333" },
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

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No Lead Generated Yet</Text>
              </Card>
            </View>
          )}
        />
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
                  <Text style={styles.clientInfo}>Services : {selectedWork.services || "N/A"}</Text>
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
    backgroundColor: '#F0F0F0', color: '#333333',
    borderRadius: 10, marginVertical: 10,
    overflow: 'hidden',
  },
  entryCard: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },

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
  card: { marginBottom: 10, borderRadius: 8, elevation: 3, width: "90%", alignSelf: "center" },
  cardContent: { padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333333", marginVertical: 10 },
  clientInfo: { fontSize: 14, color: "#555", marginVertical: 5 },
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
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContent: { padding: 20, backgroundColor: "#fff", borderRadius: 10, marginHorizontal: 20 },
  closeButton: { alignSelf: "flex-end" },
  closeButtonText: { fontSize: 18, color: "red" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalCard: { padding: 15, backgroundColor: "#ffffff", borderRadius: 10 }

});

export default LeadWorks;
