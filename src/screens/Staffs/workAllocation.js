import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TextInput, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Modal, ScrollView } from "react-native";
import { DataTable, Card, Button, Menu, Provider, FAB } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import ClientDropdown from "../../components/clientDropdown";
import BranchesDropdown from '../../components/branchDropdown';
import StaffDropdown from '../../components/staffDropdown';
import DatePicker from 'react-native-date-picker';
import { createWorkAllocation, fetchWorkAllocations, updateWorkAllocation } from "../../Redux/Actions/workAllocationAction";
import DynamicWorkInputRows from "../../components/dynamicWorkInputRows";

const WorkAllocation = ({ navigation }) => {

  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  const { loading: workAllocationsLoading, workAllocations, error: workAllocationeError } = useSelector(state => state.workAllocations);
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    const loadStaffloginData = async () => {
        const rrr = await loadData("staffPermissions")
        setPermissions(prev => prev = rrr ||permissions);
        console.log(permissions)
    };
    loadStaffloginData();
}, []);

  const hasAddWorkAllocationPermission = permissions.some(p => p.name === "work-allocation" && p.add);
  const hasEditWorkAllocationPermission = permissions.some(p => p.name === "work-allocation" && p.edit);
  const hasDeleteWorkAllocationPermission = permissions.some(p => p.name === "work-allocation" && p.delete);


  const [branchId, setBranchId] = useState(null);
  const [workAllocationData, setWorkAllocationData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAllocate, setOpenAllocate] = useState(false);
  const [staffRole, setStaffRole] = useState("");
  const [branchID, setBranchID] = useState("");
  const [branchName, setBranchName] = useState("");
  const [clientName, setClientName] = useState("");
  const [dropdownRoles, setDropDownRoles] = useState([
    { label: 'CEO', value: 'CEO' },
    { label: 'HR', value: 'HR' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Warehouse Manager', value: 'Warehouse Manager' },
    { label: 'Branch Manager', value: 'Branch Manager' },
    { label: 'Sub Dealer', value: 'Sub Dealer' },
    { label: 'Technician', value: 'Technician' },
    { label: 'Sales Man', value: 'Sales Man' },
    { label: 'Call Center', value: 'Call Center' },
  ]);

  ; // Convert string to Date object
  const formatDate = (date) => {
    // return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    return new Date(date).toISOString().slice(0, 19).replace("T", " ");
  };

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    allocateTo: "",
    clientName: "",
    service: "",
    slotDate: "",
    description: '',
    productDetails: ""
  });

  useEffect(() => {
    const workAllocationPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchWorkAllocations(workAllocationPayload));
  }, [dispatch]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, allocateTo: branchID }))

  }, [branchID]);

  // Handle Form Submission
  const handleSend = () => {
    dispatch(createWorkAllocation(formData))
  };

  const handleUpdate = () => {
    dispatch(updateWorkAllocation(formData))
  };


  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardContent}>
          <View style={styles.details}>
              <Text style={{ fontSize: 18, fontWeight: 700, color: '#333333' }}>CLient Details</Text>
              <Text style={styles.clientName}>client Name : {item.clientName}</Text>
              <Text style={styles.clientInfo}> Phone: {item.clientPhoneNumber} </Text>
            <Text style={styles.clientInfo}>DOA: {item.date}</Text>
            <Text
              style={[
                styles.status,
                { color: item.status === "Accepted" ? "green" : "red" },
              ]}
            >
              Status: {item.status}
            </Text>
          </View>
        </View>
        <Menu
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
          <Menu.Item onPress={() => {

            setWorkAllocationData(item)
            setModalDetailsVisible(true)
          }} title="View" />
          {hasEditWorkAllocationPermission &&<Menu.Item onPress={() => {
            setFormData({

              id: item.id,
              description: item.otherInformation,
              slotDate: item.date,
              clientName: item.clientId,
              allocateTo: item.staffId,
              productDetails: item.products
            })
            setModalEditVisible(true)
          }} title="Edit" />}
          {hasDeleteWorkAllocationPermission &&<Menu.Item onPress={() => {
            Alert.alert(`Delete ${item.name} workAssign`, " Are you sure you want to delete this work Assign from the database? Once deleted, you will no longer be able to access any records or perform operations related to this Work Assign.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete", onPress: () => {
                  Alert.alert("Yes", `${item.name} with workAssign ${item.client_id} was deleted`);
                }
              }
            ]);
          }} title="Delete" />}
        </Menu>
      </View>
    </Card>
  );

  return (
    <Provider>
      <Header />
      <View style={styles.container}>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Client Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* FlatList */}
        <FlatList
          data={workAllocations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />

        <Modal visible={modalAddVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalAddVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <ScrollView style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Add Work Allocation</Text>

                  <View style={{ marginTop: 8 }}>
                    <BranchesDropdown
                      dropdownStyles={styles} branchName={setBranchName}
                      onBranchChange={(value) => setBranchID(value)}
                    />
                  </View>

                  <DropDownPicker
                    open={open}
                    value={staffRole} // The selected role value
                    items={dropdownRoles} // Dropdown items
                    setOpen={setOpen} // Toggle the dropdown open state
                    setValue={setStaffRole} // Update the staffRole state
                    setItems={setDropDownRoles} // Update the roles if needed
                    dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
                    placeholder="Select Staff Role"
                    placeholderStyle={{ color: "#aaaaaa" }}
                    style={[
                      styles.input,
                      { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
                    ]}
                    dropDownContainerStyle={{
                      alignSelf: "center",
                      borderColor: "#cccccc",
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    listMode="MODAL" // Use MODAL mode for better UX
                    modalAnimationType="slide" // Modal animation
                    closeOnBackPressed={true} // Close modal on back button press
                    modalProps={{
                      // transparent: true, // Modal with transparency
                      animationType: "slide", // Fade effect for smooth appearance
                    }}
                    modalContentContainerStyle={{
                      marginVertical: 100, // Center the modal in the screen
                      marginHorizontal: 30,
                      width: "90%", // Modal width
                      height: 200, // Modal height
                      backgroundColor: "#ffffff", // Modal background
                      padding: 20, // Set a fixed height for the modal
                      borderRadius: 12,
                      elevation: 5, // Add shadow for Android
                      shadowColor: "#000", // Shadow color for iOS
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    }}
                    modalTitleStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                    modalTitle="Select Staff Role" // Optional: Custom modal title
                  />
                  {/* Request To */}

                  <StaffDropdown
                    dropdownStyles={styles}
                    branchId={branchId}  // Ensure it's correctly passed
                    staffRole={staffRole}
                    onStaffChange={(value) => setBranchID(value)}
                    staffPlaceHolder={'Requested To'}
                  />
                  <ClientDropdown
                    dropdownStyles={styles} clientId={formData.clientName}
                    onClientChange={(value) => setFormData((prev) => ({ ...prev, clientName: value.clientId }))}
                  />

                  <DynamicWorkInputRows onRowsChange={(value) => setFormData((prev) => ({ ...prev, productDetails: value }))} />

                  {/* Calendar */}
                  <TextInput
                    placeholder="Slot Date"
                    value={formData.slotDate}
                    onPress={() => setDateOpen(true)}
                  />
                  <DatePicker
                    modal
                    open={dateOpen}
                    date={date}
                    mode='datetime'
                    onConfirm={(date) => {
                      setDateOpen(false)
                      setDate(date)
                      const selectedSlot = formatDate(date)
                      setFormData((prev) => ({ ...prev, slotDate: selectedSlot }))
                    }}
                    onCancel={() => {
                      setDateOpen(false)
                    }}
                  />

                  <Text style={styles.error}>{validationError}</Text>

                  <TextInput
                    placeholder="Other Info"
                    value={formData.description}
                    onChangeText={val => setFormData((prev) => ({ ...prev, description: val }))}
                  />
                  <Button mode="contained" onPress={handleSend}>
                    Send
                  </Button>
                </ScrollView>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Edit Modal */}
        <Modal visible={modalEditVisible} transparent animationType="slide">
          <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Work Allocation</Text>

            <View style={{ marginTop: 8 }}>
              <BranchesDropdown
                dropdownStyles={styles} branchName={setBranchName}
                onBranchChange={(value) => setBranchID(value)}
              />
            </View>

            <DropDownPicker
              open={open}
              value={staffRole} // The selected role value
              items={dropdownRoles} // Dropdown items
              setOpen={setOpen} // Toggle the dropdown open state
              setValue={setStaffRole} // Update the staffRole state
              setItems={setDropDownRoles} // Update the roles if needed
              dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
              placeholder="Select Staff Role"
              placeholderStyle={{ color: "#aaaaaa" }}
              style={[
                styles.input,
                { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
              ]}
              dropDownContainerStyle={{
                alignSelf: "center",
                borderColor: "#cccccc",
                borderWidth: 1,
                borderRadius: 8,
              }}
              listMode="MODAL" // Use MODAL mode for better UX
              modalAnimationType="slide" // Modal animation
              closeOnBackPressed={true} // Close modal on back button press
              modalProps={{
                // transparent: true, // Modal with transparency
                animationType: "slide", // Fade effect for smooth appearance
              }}
              modalContentContainerStyle={{
                marginVertical: 100, // Center the modal in the screen
                marginHorizontal: 30,
                width: "90%", // Modal width
                height: 200, // Modal height
                backgroundColor: "#ffffff", // Modal background
                padding: 20, // Set a fixed height for the modal
                borderRadius: 12,
                elevation: 5, // Add shadow for Android
                shadowColor: "#000", // Shadow color for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
              modalTitleStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: 10,
              }}
              modalTitle="Select Staff Role" // Optional: Custom modal title
            />
            {/* Request To */}

            <StaffDropdown
              dropdownStyles={styles}
              branchId={branchId}  // Ensure it's correctly passed
              staffRole={staffRole}
              onStaffChange={(value) => setBranchID(value)}
              staffPlaceHolder={'Requested To'}
            />
            <ClientDropdown
              dropdownStyles={styles} clientId={formData.clientName}
              onClientChange={(value) => setFormData((prev) => ({ ...prev, clientName: value.clientId }))}
            />

            <DynamicWorkInputRows onRowsChange={(value) => setFormData((prev) => ({ ...prev, productDetails: value }))} />

            {/* Calendar */}
            <TextInput
              placeholder="Slot Date"
              value={formData.slotDate}
              onPress={() => setDateOpen(true)}
            />
            <DatePicker
              modal
              open={dateOpen}
              date={date}
              mode='datetime'
              onConfirm={(date) => {
                setDateOpen(false)
                setDate(date)
                const selectedSlot = formatDate(date)
                setFormData((prev) => ({ ...prev, slotDate: selectedSlot }))
              }}
              onCancel={() => {
                setDateOpen(false)
              }}
            />

            <Text style={styles.error}>{validationError}</Text>

            <TextInput
              placeholder="Other Info"
              value={formData.description}
              onChangeText={val => setFormData((prev) => ({ ...prev, description: val }))}
            />
            <Button mode="contained" onPress={handleUpdate}>
              Send
            </Button>
          </ScrollView>
        </Modal>

        {/* Details Modal */}
        <Modal visible={modalDetailsVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalDetailsVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Work Allocation Details</Text>
              <Card style={{ backgroundColor: '#ffffff' }}>
                <Text style={{ fontSize: 18, fontWeight: 700, color: '#333333' }}>CLient Details</Text>
                <Text style={styles.clientName}>client Name : {workAllocationData.clientName}</Text>
                <Text style={styles.clientInfo}> Phone: {workAllocationData.clientPhoneNumber} </Text>
                <Text style={{ fontSize: 18, fontWeight: 700, color: '#333333' }}>Staff Details</Text>
                <Text style={styles.clientName}>client Name : {workAllocationData.staffId}</Text>
                <Text style={styles.clientInfo}> Phone: {workAllocationData.staffName} </Text>
              </Card>
              <Text>Slot Date: {workAllocationData.date}</Text>

              <ScrollView horizontal>
                <DataTable>
                  {/* Table Header */}
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>product</DataTable.Title>
                    <DataTable.Title>IMEI</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                  </DataTable.Header>

                  {/* Table Rows */}
                  {workAllocationData.products?.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell>{item.productName}</DataTable.Cell>
                      <DataTable.Cell>{item.imeiNumber}</DataTable.Cell>
                      <DataTable.Cell>{item.install}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      <FAB
        icon="plus" visible={hasAddWorkAllocationPermission}
        label="Create Work Allocation"
        style={styles.fab}
        onPress={() => setModalAddVisible(true)}
      />

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  createButton: { margin: 10, backgroundColor: "#007bff" },
  searchInput: { width: "90%", alignSelf: 'center', borderRadius: 10, borderColor: "#f3f3f3", borderWidth: 1, margin: 10, height: 50, backgroundColor: "#fff", padding: 10, elevation: 3 },
  card: {
    marginBottom: 10,
    borderRadius: 8, backgroundColor: "#ffffff",
    elevation: 3, width: "90%", alignSelf: "center"
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    padding: 10,
  },
  details: {
    marginLeft: 10,
  },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalContainer: { flex: 1, margin: 20, padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalContent: { padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  closeButton: { alignSelf: "flex-end" },
  closeButtonText: { fontSize: 18, color: "red" },
  error: { color: "red", marginVertical: 10 },
  input: {
    marginBottom: 16, borderColor: "#aaaaaa", borderWidth: 1,
    borderRadius: 5, padding: 5, height: 50
  },
});

export default WorkAllocation;
