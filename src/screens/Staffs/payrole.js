import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { Card, Provider, Modal, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStaffs } from "../../Redux/Actions/staffAction";
import Header from '../../components/userHeader';

const branches = [
    { name: 'Hyderabad', manager: 'Vijayawad', phone: '+91 84653 34445', technicities: 200, nonTechnicities: 50, marketing: 450, totalStaff: 500, requiredManPower: 10 },
    { name: 'Vishakhapatnam', manager: 'Ravi Kumar', phone: '+91 98765 43210', technicities: 180, nonTechnicities: 70, marketing: 400, totalStaff: 500, requiredManPower: 10 },
    { name: 'Vijayawada', manager: 'Arun Singh', phone: '+91 91234 56789', technicities: 190, nonTechnicities: 60, marketing: 420, totalStaff: 500, requiredManPower: 10 },
    { name: 'Kakinada', manager: 'Suresh Reddy', phone: '+91 95432 67890', technicities: 210, nonTechnicities: 40, marketing: 460, totalStaff: 500, requiredManPower: 10 },
];

const PayRole = () => {

    const [selectedBranch, setSelectedBranch] = useState(branches[0]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [payRoll, setPayRoll] = useState("");
    const dispatch = useDispatch();
    const { staffs } = useSelector(state => state.staffs);
    const [permissions, setPermissions] = useState([]);
    
    useEffect(() => {
      const loadStaffloginData = async () => {
          const rrr = await loadData("staffPermissions")
          setPermissions(prev => prev = rrr ||permissions);
          console.log(permissions)
      };
      loadStaffloginData();
  }, []);
      useEffect(() => {
        const staffsPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
        dispatch(fetchStaffs(staffsPayload));
    }, [dispatch]);

    const renderStaff = ({ item }) => (
        <TouchableOpacity onPress={() => {

            setSelectedStaff(item);
            setModalVisible(true);

        }}>
            <Card style={styles.card}>
                <View style={styles.row}>
                    <Image source={{ uri: item.staffPhoto }} style={styles.image}  />
                    <View style={styles.detailsContainer} >
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.role}>Role : {item.designation}</Text>
                        <Text style={styles.role}>Exp : {item.beforeExperience}</Text>
                        <Text style={styles.role}>Salary : {item.basicSalary}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <Provider>
            <Header />
            <ScrollView style={{ padding: 10 }}>
                <View style={styles.branchContainer}>
                    {branches.map((branch) => (
                        <TouchableOpacity
                            key={branch.name}
                            style={[styles.branchTab, { backgroundColor: selectedBranch.name === branch.name ? 'green' : 'lightgray' }]}
                            onPress={() => setSelectedBranch(branch)}
                        >
                            <Text style={styles.branchText}>{branch.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View>
                    <FlatList
                        data={staffs}
                        keyExtractor={(item) => item.id}
                        renderItem={renderStaff}
                        contentContainerStyle={styles.listContainer}
                    />

                </View>

            </ScrollView>
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Image source={{ uri: selectedStaff.staffPhoto }} style={styles.modalImage} />
                    <Text style={styles.modalTitle}>{selectedStaff.name}</Text>
                    <Text style={styles.modalText}>Phone: {selectedStaff.phoneNumber}</Text>
                    <Text style={styles.modalText}>Email: {selectedStaff.email}</Text>
                    <Text style={styles.role}>Role : {selectedStaff.designation}</Text>
                    <Text style={styles.role}>Exp : {selectedStaff.beforeExperience}</Text>
                    <Text style={styles.role}>Salary : {selectedStaff.basicSalary}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Pay Roll"
                        value={payRoll}
                        onChangeText={setPayRoll}
                    />
                    <Button mode="contained" onPress={() => setModalVisible(false)}>Submit</Button>
                </View>
            </Modal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 16, borderRadius: 8, elevation: 3,backgroundColor:'#ffffff'  },
    row: { flexDirection: "row", alignItems: "center", padding: 16 },
    image: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
    detailsContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold", color: "#333" },
    role: { fontSize: 14, color: "#666" },
    branchContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    branchTab: { padding: 10, marginHorizontal: 3, borderRadius: 5 },
    branchText: { color: 'white' },
    modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 8, alignItems: 'center' },
    modalImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    modalText: { fontSize: 14, marginBottom: 5 },
    input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 }
});

export default PayRole;
