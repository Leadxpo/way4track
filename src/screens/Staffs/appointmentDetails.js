import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Button, Divider, Avatar, Menu } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AppointmentDetails = ({ navigation, route }) => {
  const { appointmentDetails } = route.params;  // Sample Address data

  const [assignee, setAssignee] = useState(""); // Default assigned person
  const [menuVisible, setMenuVisible] = useState(false); // Dropdown menu state
  const [type, setType] = useState("");
  const [branch, setBranch] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const saveDetails = () => {
    if (!clientName || !clientNumber || !address || !slotTime) {
      alert("Please fill all required fields!");
    } else {
      console.log("Appointment Details Saved", {
        assignee,
        type,
        branch,
        slotTime,
        clientName,
        clientNumber,
        address,
        description,
      });
      alert("Details Saved Successfully!");
    }
  };

  useEffect(()=>{
    const fetchData=()=>{
      setType(appointmentDetails.type)
      setSlotTime(appointmentDetails.slot)
      setDescription(appointmentDetails.Description)
      setClientNumber(appointmentDetails.ClientNumber)
      setClientName(appointmentDetails.assignPerson)
      setBranch(appointmentDetails.branch)
      setAssignee(appointmentDetails.Assignee)
      setAddress(appointmentDetails.Address)
    }
    
fetchData()
  },[appointmentDetails])
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{
            uri: "https://via.placeholder.com/100", // Replace with your image URL
          }}
          style={styles.avatar}
        />
      </View>

      {/* Appointment Information */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Assign to:{clientName}</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Text style={styles.menuTrigger}>{assignee}</Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => setAssignee("Prasad")} title="Prasad" />
            <Menu.Item onPress={() => setAssignee("Ravi")} title="Ravi" />
            <Menu.Item onPress={() => setAssignee("Anil")} title="Anil" />
          </Menu>
        </View>
        <Divider />
        <Text style={styles.infoInput}>Type: {type}</Text>
        <Divider />
        <Text style={styles.infoInput}>Branch: {branch}</Text>
      </View>

      {/* Appointment Slot */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Slot</Text>
        <TextInput
          style={styles.input}
          value={slotTime}
          onChangeText={setSlotTime}
        />
      </View>

      {/* Client Details */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Client Number</Text>
        <TextInput
          style={styles.input}
          value={clientNumber}
          onChangeText={setClientNumber}
        />

        <Text style={styles.label}>Client Name</Text>
        <TextInput
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          multiline
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={saveDetails} style={styles.saveButton}>
          Save
        </Button>
        <Button mode="outlined" onPress={() => console.log("Canceled")} style={styles.cancelButton}>
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: "#E0E0E0",
  },
  card: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 4,
  },
  menuTrigger: {
    fontSize: 14,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
  infoInput: {
    padding: 8,
    fontSize: 14,
    color: "#616161",
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: "#BDBDBD",
  },
});

export default AppointmentDetails;
