import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, BottomNavigation, Badge } from 'react-native-paper';
import BranchesDropdown from '../../components/branchDropdown';
import ClientDropdown from '../../components/clientDropdown';
import StaffDropdown from '../../components/staffDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../Redux/Actions/appointmentAction';

const AddAppointment = () => {
  const dispatch = useDispatch();
  const { loading: appointmentInfoLoading, appointmentInfo, error: appointmentInfoError } = useSelector(state => state.createAppointmentReducer);

  // State for dropdowns

  const [open, setOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState(null);
  const [title, setTitle] = useState("");
  const [typeItems, setTypeItems] = useState([
    { label: 'Service', value: 'service' },
    { label: 'Product', value: 'product' },
  ]);

  const formatDate = (date) => {
    const d = new Date(date);

    // Get date in YYYY-MM-DD format
    const formattedDate = d.toISOString().split('T')[0];

    // Get hours, minutes, and AM/PM
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12

    // Final formatted time
    const formattedTime = `${hours}:${minutes}`;

    return {
      date: formattedDate,  // e.g., "2025-02-06"
      time: formattedTime,   // e.g., "10:30"
      period: ampm,         // e.g., "AM" or "PM"
    };
  };
  // State for calendar
  const [appointmentDate, setAppointmentDate] = useState('');
  const [staffRole, setStaffRole] = useState("");
  const [branchID, setBranchID] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientData, setClientData] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [description, setDescription] = useState("");
  const [clientAddress, setClientAddress] = useState("");
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

  useEffect(() => {
    setClientId(clientData.clientId);
    setClientName(clientData.name);
    setClientAddress(clientData.address);
    setClientPhone(clientData.phoneNumber);
  }, [clientData])

  // State for time slot
  const [date, setDate] = useState(new Date());
  const [CompletDate, setCompletDate] = useState(new Date());
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [slotPeriod, setSlotPeriod] = useState('');
  const [dateOpen, setDateOpen] = useState(false);


  const submitAppointment = () => {
    const create_appointmentPayload = {
      appointmentType: appointmentType,
      name: title,
      assignedToId: assignedToId,
      date: slotDate,
      slot: slotTime,
      period: slotPeriod,
      branchId: branchID,
      clientId: clientId,
      description: description,
      companyCode: 'WAY4TRACK',
      unitCode: 'WAY4'

    }
    dispatch(createAppointment(create_appointmentPayload));
  }

  return (
    <View style={styles.container}>
      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        {/* Form */}
        {/* Dropdown for Type */}
        {/* Text Input for Enter Name */}
        <TextInput
          label="Enter Appointment Title"
          mode="outlined"
          style={styles.input}
          outlineStyle={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 8 }}
          value={title}
          onChangeText={setTitle}
        />

        <DropDownPicker
          open={typeOpen}
          value={appointmentType}
          items={typeItems}
          setOpen={setTypeOpen}
          dropDownDirection='TOP'
          setValue={setAppointmentType}
          setItems={setTypeItems}
          placeholder="Select Type"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

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
          branchId={branchID}  // Ensure it's correctly passed
          staffRole={staffRole}
          onStaffChange={(value) => setAssignedToId(value)}
          staffPlaceHolder={'assigned To'}
        />

        <ClientDropdown
          dropdownStyles={styles} clientId={clientId}
          onClientChange={setClientData}
        />

        {/* Text Inputs for Client Details */}
        <TextInput
          label="Client Phone Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={clientPhone}
          style={styles.input}
          outlineStyle={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 8 }}
          editable={false}
        />
        <TextInput
          label="Address"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={clientAddress}
          outlineStyle={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 8 }}
          style={styles.input}
          editable={false}
        />

        {/* Appointment Date */}
        <Text style={styles.dateLabel}>Appointment Date</Text>

        <TextInput
          placeholder="Slot Date"
          value={CompletDate}
          mode="outlined"
          outlineStyle={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 8 }}
          style={styles.input}
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
            setSlotDate(selectedSlot.date)
            setSlotTime(selectedSlot.time)
            setSlotPeriod(selectedSlot.period)
            setCompletDate(selectedSlot.date + ", " + selectedSlot.time + " " + selectedSlot.period)
          }}
          onCancel={() => {
            setDateOpen(false)
          }}
        />

        <TextInput
          label="Enter Description"
          mode="outlined"
          multiline
          value={description}
          numberOfLines={4}
          onChangeText={setDescription}
          outlineStyle={{ borderColor: '#aaaaaa', borderWidth: 1, borderRadius: 8 }}
          style={styles.input}
        />

        {/* Submit Button */}
        <Button mode="contained" style={styles.submitButton} onPress={submitAppointment}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  logo: { fontSize: 20, color: '#00b74a', fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notification: { position: 'relative', marginRight: 16 },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#ff0000', color: '#fff' },
  body: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  addButton: { backgroundColor: '#fdd835', borderRadius: 4 },
  addButtonText: { color: '#000', fontWeight: 'bold' },
  input: { marginBottom: 12, backgroundColor: '#eeeeee' },
  dropdown: { marginBottom: 12, backgroundColor: '#eeeeee', borderColor: "#aaaaaa", borderWidth: 1 },
  dropdownContainer: { backgroundColor: '#fff' },
  dateLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#444' },
  calendar: { marginBottom: 16, borderRadius: 8 },
  timeSlotRow: { width: "100%", flexDirection: 'row', marginBottom: 12 },
  timeSlotDropdown: { flex: 1, backgroundColor: '#eeeeee' },
  submitButton: { backgroundColor: '#00b74a', marginTop: 16 },
});

export default AddAppointment;
