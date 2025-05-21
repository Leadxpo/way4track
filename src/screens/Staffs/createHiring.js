import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Card } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createHiring } from '../../Redux/Actions/hiringAction';


const CreateHiring = ({ navigation }) => {
  const dispatch = useDispatch();

  const [candidateName, setCandidateName] = useState("");
  const [resumePath, setResumePath] = useState(null);
  // const [resume, setResume] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const hiringLevel = 1;
  const companyCode = 'WAT4TRACK';
  const unitCode = 'WAY4';
  const [qualifications, setQualifications] = useState([{ id: Date.now(), qualificationName: '', marks: '', yearOfPass: '' }]);

  const addQualification = () => {
    setQualifications([...qualifications, { id: Date.now(), qualificationName: '', marks: '', yearOfPass: '' }]);
  };

  const removeQualification = (id) => {
    setQualifications(qualifications.filter((item) => item.id !== id));
  };

  const updateQualification = (id, field, value) => {
    setQualifications(
      qualifications.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setResumePath(result);
      Alert.alert('File Selected', `File Name: ${result.name}`);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'No file selected.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!candidateName || !phoneNumber || !email) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    // Append text fields
    formData.append("candidateName", candidateName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("hiringLevel", hiringLevel);
    formData.append("companyCode", companyCode);
    formData.append("unitCode", unitCode);

    // Append qualifications as JSON
    formData.append("qualifications", qualifications);

    // Append resume file
    formData.append("file", {
      uri: resumePath.uri,
      name: resumePath.name,
      type: resumePath.type, // e.g., "application/pdf"
    });

    dispatch(createHiring(formData));

  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Create Hiring</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Candidate Name" value={candidateName} onChangeText={setCandidateName} />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={[styles.input]} placeholder="Address" multiline value={address} onChangeText={setAddress} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addQualification}>
        <MaterialCommunityIcons name="plus-circle" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.subHeading}>Qualification</Text>

      {qualifications.map((qualification) => (
        <Card key={qualification.id} style={styles.card}>
          <View style={styles.cardContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter Qualification Name"
              value={qualification.qualificationName}
              onChangeText={(text) => updateQualification(qualification.id, 'qualificationName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Marks"
              keyboardType="numeric"
              value={qualification.marks}
              onChangeText={(text) => updateQualification(qualification.id, 'marks', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Year of Pass"
              keyboardType="numeric"
              value={qualification.yearOfPass}
              onChangeText={(text) => updateQualification(qualification.id, 'yearOfPass', text)}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeQualification(qualification.id)}
            >
              <MaterialCommunityIcons name="minus-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </Card>
      ))}

      <TouchableOpacity onPress={pickDocument} style={styles.bulkUploadBox}>
        <MaterialCommunityIcons name="file-upload" size={40} color="#ccc" />
        <Text style={styles.bulkUploadText}>{resumePath ? resumePath.name : 'Upload Bulk File'}</Text>
      </TouchableOpacity>

      <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
        Submit
      </Button>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  bulkUploadText: { color: '#777' },
  bulkUploadBox: { alignItems: 'center', padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginVertical: 10 },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    width: 50, height: 50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  card: {
    marginBottom: 16,
    elevation: 4, backgroundColor: "#ffffff"
  },
  cardContent: {
    padding: 16,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  uploadButton: {
    backgroundColor: 'green',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'green',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
});

export default CreateHiring;
