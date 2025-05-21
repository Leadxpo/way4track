import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Picker } from "react-native";

const CustomerCareScreen = () => {
  const [selectedType, setSelectedType] = useState("");
  const [assignedPerson, setAssignedPerson] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#f5f5f5" }}>
      <View style={{ backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 2 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name: Praveen</Text>
        <Text>Phone Number: +91 99887 66554</Text>
        <Text>Address: *********************</Text>
        <Image source={{ uri: "https://via.placeholder.com/100" }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginVertical: 10 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={{ backgroundColor: "#ccc", padding: 10, borderRadius: 5, flex: 1, marginRight: 5 }}>
            <Text style={{ textAlign: "center" }}>Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "#28a745", padding: 10, borderRadius: 5, flex: 1 }}>
            <Text style={{ textAlign: "center", color: "#fff" }}>Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>Add Appointment</Text>
      
      <Text>Select Type</Text>
      <Picker selectedValue={selectedType} onValueChange={setSelectedType}>
        <Picker.Item label="Service / Product" value="" />
      </Picker>
      
      <Text>Enter Name</Text>
      <TextInput style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 }} placeholder="Service / Product" />
      
      <Text>Assign to</Text>
      <Picker selectedValue={assignedPerson} onValueChange={setAssignedPerson}>
        <Picker.Item label="Select Person" value="" />
      </Picker>
      
      <Text>Slot</Text>
      <TextInput style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 }} placeholder="Date" />
      
      <Text>Branch</Text>
      <Picker selectedValue={selectedBranch} onValueChange={setSelectedBranch}>
        <Picker.Item label="Select Branch" value="" />
      </Picker>
      
      <Text>Client Name</Text>
      <TextInput style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 }} placeholder="Enter Client Name" value={clientName} onChangeText={setClientName} />
      
      <Text>Client Phone Number</Text>
      <TextInput style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 }} placeholder="Enter Number" value={clientPhone} onChangeText={setClientPhone} keyboardType="phone-pad" />
      
      <Text>Address</Text>
      <TextInput style={{ backgroundColor: "#e9e9e9", padding: 10, borderRadius: 5, marginBottom: 10 }} value="21-27, Double road, Viman Nagar, Visakhapatnam" editable={false} />
      
      <Text>Description</Text>
      <TextInput style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, height: 80, marginBottom: 20 }} placeholder="Enter Description" multiline value={description} onChangeText={setDescription} />
      
      <TouchableOpacity style={{ backgroundColor: "#28a745", padding: 15, borderRadius: 5 }}>
        <Text style={{ textAlign: "center", color: "#fff", fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerCareScreen;
