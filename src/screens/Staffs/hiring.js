import React, { useState,useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView, } from "react-native";
import { Avatar, Card, FAB, Button, Provider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHirings } from "../../Redux/Actions/hiringAction";
import { drawLabel } from "../../Redux/Actions/drawAction";
import Header from '../../components/userHeader';

const Hiring = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);
  const hasAddHiringPermission = permissions.some(p => p.name === "hiring" && p.add);
  const hasEditHiringPermission = permissions.some(p => p.name === "hiring" && p.edit);
  const hasDeleteHiringPermission = permissions.some(p => p.name === "hiring" && p.delete);

  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading:hiringLoading, hirings, error:hiringError } = useSelector(state => state.hiringsReducer);



  useEffect(() => {
    const hiringPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchHirings(hiringPayload));
  }, [dispatch])

  const filteredData = hirings?.filter((item) =>
    item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const renderItem = ({ item }) => {
    const statusColor = {
      Pending: 'blue',
      Rejected: 'red',
      Qualified: 'green',
      APPLIED: 'greenyellow',
    }[item.status] || 'gray';
    
    return(
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.candidateName}>{item.candidateName}</Text>
          <Text style={styles.candidateInfo}>
            Phone: {item.phoneNumber}
          </Text>
          <Text style={styles.candidateInfo}>Address: {item.address}</Text>
          <Text
            style={[
              styles.status,
              { color: statusColor},
            ]}
          >
            Status: {item.status}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {
            setSelectedCandidate(item);
            setModalVisible(true);
          }}>
            <Avatar.Icon size={30} icon={'eye'} />
          </TouchableOpacity>

        {/* <Menu
          visible={menuVisible && selectedItem === item.id}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(true);
                setSelectedItem(item.id);
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item  onPress={() => { navigation.navigate("HiringDetails", { hiringDetails: item }) }} title="View" />
         { hasEditHiringPermission && <Menu.Item onPress={() => { navigation.navigate("EditHiring", { hiringDetails: item }) }} title="Edit" />}
          {hasDeleteHiringPermission && <Menu.Item onPress={() => {
            Alert.alert(`Delete ${item.name} Hiring`, " Are you sure you want to delete this Hiring candidate from the database? Once deleted, you will no longer be able to access any records or perform operations related to this  Hiring process to this candidate.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.candidateName} with candiate ID ${item.id} was deleted`);
                }
              }
            ]);
          }} title="Delete" />}
        </Menu> */}
      </View>
    </Card>
  )};

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Candidate Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
      {/* <FAB icon="plus" label="AddHiring Candidate" visible={hasAddHiringPermission} style={styles.fab} onPress={() => {
        dispatch(drawLabel("Hiring"));
        navigation.navigate('AddHiring');
      }} /> */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <ScrollView>
        <Text style={styles.modalTitle}>Candidate Details</Text>
        {selectedCandidate && (
          <>
            <Text style={styles.modalText}>Candidate Name: {selectedCandidate.candidateName}</Text>
            <Text style={styles.modalText}>Phone: {selectedCandidate.phoneNumber}</Text>
            <Text style={styles.modalText}>Email: {selectedCandidate.email}</Text>
            <Text style={styles.modalText}>Address: {selectedCandidate.address}</Text>
            <Text style={styles.modalText}>Hiring Level: {selectedCandidate.hiringLevel}</Text>
            <Text style={styles.modalText}>Status: {selectedCandidate.status}</Text>
            <Text style={styles.modalText}>Company Code: {selectedCandidate.companyCode}</Text>
            <Text style={styles.modalText}>Unit Code: {selectedCandidate.unitCode}</Text>
            <Text style={styles.modalText}>Driving Licence: {selectedCandidate.drivingLicence}</Text>
            <Text style={styles.modalText}>Driving Licence No: {selectedCandidate.drivingLicenceNumber || "N/A"}</Text>

            {/* Joining Date, Notice Period, Date of Upload */}
            <Text style={styles.modalText}>
              Joining Date: {selectedCandidate.joiningDate ? new Date(selectedCandidate.joiningDate).toLocaleDateString() : "N/A"}
            </Text>
            <Text style={styles.modalText}>
              Notice Period End: {selectedCandidate.noticePeriod ? new Date(selectedCandidate.noticePeriod).toLocaleDateString() : "N/A"}
            </Text>
            <Text style={styles.modalText}>
              Date of Upload: {selectedCandidate.dateOfUpload ? new Date(selectedCandidate.dateOfUpload).toLocaleDateString() : "N/A"}
            </Text>

            {/* Qualification Details */}
            <Text style={[styles.modalTitle, { marginTop: 16 }]}>Qualifications</Text>
            {selectedCandidate.qualifications && selectedCandidate.qualifications.map((q, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.modalText}>Qualification: {q.qualificationName}</Text>
                <Text style={styles.modalText}>Marks: {q.marks}</Text>
                <Text style={styles.modalText}>Year of Pass: {q.yearOfPass}</Text>
              </View>
            ))}

            {/* Resume Link */}
            {selectedCandidate.resumePath && (
              <TouchableOpacity onPress={() => Linking.openURL(selectedCandidate.resumePath)}>
                <Text style={[styles.modalText, { color: 'blue', textDecorationLine: 'underline' }]}>
                  View Resume
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <Button
          mode="contained"
          onPress={() => setModalVisible(false)}
          style={{ marginTop: 16 }}
        >
          Close
        </Button>
      </ScrollView>
    </View>
  </View>
</Modal>

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8, borderColor: "#f3f3f3",
    paddingHorizontal: 15, borderWidth: 1,
    fontSize: 16,
    elevation: 3,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  candidateInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Hiring;
