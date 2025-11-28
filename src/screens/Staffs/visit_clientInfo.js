import React, { useState, useEffect } from "react";
import { View, Text, TextInput,StyleSheet, TouchableOpacity, ScrollView, Image, Button, Alert, PermissionsAndroid } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Provider, ToggleButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import Header from "../../components/userHeader";
import { createSalesVisit } from "../../Redux/Actions/salesVisitAction";
import * as ImagePicker from "react-native-image-picker";

const Visit_ClientInfo = ({ navigation }) => {

  const dispatch = useDispatch();

  // States
  const [dateOpen, setDateOpen] = useState(false);
  const [visitDateOpen, setVisitDateOpen] = useState(false);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [leadStatus, setLeadStatus] = useState("pending");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [estimatedDate, setEstimatedDate] = useState("");
  const [visitingCard_pick, setVisitingCard_pick] = useState(null);
  const [client_pick, setClient_pick] = useState(null);
  const [visitingCardUpload_pick, setVisitingCardUpload_pick] = useState(null);
  const [clientUpload_pick, setClientUpload_pick] = useState(null);


  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestCameraPermission();
  })


  const handleVisitingCardPick = async () => {
    ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && !response.error) {
        setVisitingCard_pick(response.assets[0].uri);
        const imageupload = {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setVisitingCardUpload_pick(imageupload);
      }
    });
  };

  const handleClientPick = async () => {
    ImagePicker.launchCamera({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && !response.error) {
        setClient_pick(response.assets[0].uri);
        const imageupload = {
          uri: response.assets[0]["uri"],
          type: response.assets[0]["type"],
          name: response.assets[0]["fileName"]
        };
        setClientUpload_pick(imageupload);
      }
    });
  };

  const handleNext = () => {
    if (phoneNumber && name && address) {
      const salesVisit_payload = { name, phoneNumber, address, date, estimatedDate, visitingCardUpload_pick, clientUpload_pick, leadStatus };
      console.log("Payload:", salesVisit_payload);
      dispatch(createSalesVisit(salesVisit_payload));
      if (leadStatus==='pending') {
        navigation.navigate("Visit_ProductInfo");
      } else {
        navigation.navigate("SalesVisitOverview");
      }
    } else {
      Alert.alert("Please enter all required fields");
    }
  };


  return (
    <Provider>
      <Header />
      <ScrollView style={styles.container}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor={"#aaaaaa"}
          value={name}
          onChangeText={setName}
        />

        {/* Phone Number */}
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor={"#aaaaaa"}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Date */}
        <Text style={styles.label}> Visit Date</Text>
        <TouchableOpacity onPress={() => setVisitDateOpen(true)}>

          <TextInput
            style={styles.input}
            placeholderTextColor={"#aaaaaa"}
            value={date}
            editable={false}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          open={visitDateOpen}
          date={new Date()}
          mode="date"
          onConfirm={(selectedVisitDate) => {
            setDateOpen(false);
            const formattedVisitDate = selectedVisitDate.toISOString().split('T')[0];
            setDate(formattedVisitDate);
          }}
          onCancel={() => setVisitDateOpen(false)}
        />

        {/* Estimated Date Picker */}
        <Text style={styles.label}>Estimated Date</Text>
        <TouchableOpacity onPress={() => setDateOpen(true)}>
          <TextInput
            style={styles.input}
            placeholder="Select Date"
            placeholderTextColor={"#aaaaaa"}
            value={estimatedDate}
            editable={false}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          open={dateOpen}
          date={new Date()}
          mode="date"
          onConfirm={(selectedDate) => {
            setDateOpen(false);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setEstimatedDate(formattedDate);
          }}
          onCancel={() => setDateOpen(false)}
          style={styles.input}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Address"
          placeholderTextColor={"#aaaaaa"}
          value={address}
          multiline
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Visiting Card Pick</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleVisitingCardPick}>
          {visitingCard_pick ? (
            <Image source={{ uri: visitingCard_pick }} resizeMode={"stretch"} style={styles.vehicleImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Select Visiting Card</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Client Pick</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={handleClientPick}>
          {client_pick ? (
            <Image source={{ uri: client_pick }} resizeMode={"stretch"} style={styles.vehicleImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Client Pick</Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>

          <Text style={[styles.label, { marginHorizontal: 20 }]}>Interest Status</Text>
          <ToggleButton.Row
            onValueChange={(value) => setLeadStatus(value)}
            value={leadStatus}
            style={styles.toggleGroup}
          >
            <ToggleButton icon="thumb-up" value="pending"
              style={[
                styles.button,
                leadStatus === 'pending' && styles.selectedButton,
              ]}
              iconColor={leadStatus === 'pending' ? 'white' : '#4CAF50'}>
              Interested
            </ToggleButton>
            <ToggleButton icon="thumb-down" value="notinterested"
              style={[
                styles.button,
                leadStatus === 'notinterested' && styles.selectedButton,
              ]}
              iconColor={leadStatus === 'notinterested' ? 'white' : '#4CAF50'}>
              Not Interested
            </ToggleButton>
          </ToggleButton.Row>
        </View>

        {/* Next Button */}
        <View style={[styles.buttonContainer, { marginBottom: 70 }]}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </Provider>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 16,
    backgroundColor: "#fff",
  },
  button: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "#333",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  productSelect: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaaaaa",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    backgroundColor: "#d3d3d3",
    marginRight: 10,
  },
  label: {
    marginTop: 8,marginBottom:4,
    fontSize: 14,color:"#333333",
    fontWeight: '500',
  },
  toggleGroup: {
    justifyContent: 'center'
  },
  productText: {
    fontSize: 15,color:"#333333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  buttonContainer: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  imagePlaceholder: { color: "gray" },
  vehicleImage: { width: "100%", height: "100%", borderRadius: 5 },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaaaaa",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyCard: {
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Visit_ClientInfo;
