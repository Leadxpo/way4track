import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Card, SegmentedButtons } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loadData } from "../../Utils/appData";
import { fetchTechnicianWorks } from "../../Redux/Actions/TechnicianWork";
import api from "../../Api/api";

const UpcommingWorks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [technicianWorks, setTechnicianWorks] = useState([]);
  const [activeSegment, setActiveSegment] = useState("paymentPending");


  useFocusEffect(
    useCallback(() => {
      const loadStaffData = async () => {
        const technicianId = await loadData("staffID");
        setStaffId(technicianId || "");
      };
      loadStaffData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
    const getUpcommingWork = async () => {

      if (staffId) {
        const getAll_technicoianWorkPaylad = {
          staffId: staffId,
          companyCode: "WAY4TRACK",
          unitCode: "WAY4"
        }
        try {
          // Attempt to fetch TECH_WORKS
          const { data } = await api.post(`/technician/getUpCommingWorkAllocationDetails`, getAll_technicoianWorkPaylad, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log("getAll_technicoianWorkPaylad : ", data.data)

          setTechnicianWorks(data.data)
        } catch (error) {
          console.log("error : ", error)
        }
      }
    }
    getUpcommingWork();
  }, [staffId, dispatch])
  )
  const CurrentWeak = technicianWorks.filter(item => item.weekNumber ==="1");
  const Weak_one = technicianWorks.filter(item => item.weekNumber ==="2");
  const Weak_two = technicianWorks.filter(item => item.weekNumber ==="3");
  const Weak_three = technicianWorks.filter(item => item.weekNumber ==="4");

  const data = activeSegment === "Current Weak" ? CurrentWeak :  activeSegment === "Weak 2" ? Weak_one : activeSegment === "Weak 3" ? Weak_two :activeSegment === "Weak 4" ? Weak_three  :[];
  const getStatusColor = (status) => {
    switch (status) {
      case "1": return "#ffc4a8";
      case "2": return "#ffeeec";
      case "3": return "#ffa9a8";
      case "4": return "#e9f6ff";
      default: return "#f3f3f3";
    }
  };

  const renderWorkItem = ({ item,index }) => {

    return(
    <Card style={[styles.card, { backgroundColor: getStatusColor(item.weekNumber) }]} key={index}>
    <View style={styles.entryRow}>
      <View>
        <Text variant="labelLarge" style={styles.entryText}>Client Name: <Text variant="bodyLarge" style={styles.values}>{item.clientName || "N/A"}</Text></Text>

        <Text variant="labelLarge" style={styles.entryText}>Phone: <Text variant="bodyMedium" style={styles.values}>{item.phoneNumber || "N/A"}</Text></Text>

        <Text variant="labelLarge" style={styles.entryText}>DOA: <Text variant="bodyMedium" style={styles.values}>{item.date?.split("T")[0] || "N/A"}</Text></Text>

      </View>
      <TouchableOpacity onPress={() => navigation.navigate("WorkDetails", { workId: item.id })}>
        <MaterialCommunityIcons name="eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </Card>  )};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Works"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <SegmentedButtons
        value={activeSegment}
        onValueChange={setActiveSegment}
        buttons={[
          { value: 'Current Weak', label: 'Current Weak', style: activeSegment === 'Current Weak' ? styles.activeButton : styles.inactiveButton, },
          { value: 'Weak 2', label: 'Weak 2', style: activeSegment === 'Weak 2' ? styles.activeButton : styles.inactiveButton, },
          { value: 'Weak 3', label: 'Weak 3', style: activeSegment === 'Weak 3' ? styles.activeButton : styles.inactiveButton, },
          { value: 'Weak 4', label: 'Weak 4', style: activeSegment === 'Weak 4' ? styles.activeButton : styles.inactiveButton, },
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

export default UpcommingWorks;
