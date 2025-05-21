import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import LevelCard from '../../components/levelCard'; // Assuming LevelCard is in a separate file.
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createHiring, updateHiring } from '../../Redux/Actions/hiringAction';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';

export default function EditHiring({ navigation, route }) {
  const dispatch = useDispatch();
  const { candidateDetails } = route.params;  // Sample Address data

  const [isUpdateBasicData, setIsUpdateBasicData] = useState(false);
  //update basic candidate data

  const [id, setId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [resumePath, setResumePath] = useState(null);
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

 

// Populate state when candidateDetails is available
useEffect(() => {
  if (candidateDetails) {
    setId(candidateDetails.id || "");
    setCandidateName(candidateDetails.candidateName || "");
    setResumePath(candidateDetails.resumePath || null);
    setPhoneNumber(candidateDetails.phoneNumber || "");
    setEmail(candidateDetails.email || "");
    setAddress(candidateDetails.address || "");
  }
}, [candidateDetails]);  // Runs when candidateDetails changes

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
    formData.append("id", id);
    formData.append("candidateName", candidateName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("hiringLevel", hiringLevel);
    formData.append("companyCode", companyCode);
    formData.append("unitCode", unitCode);

    // Append qualifications as JSON
    formData.append("qualifications", qualifications);
    if (resumePath) {
      formData.append("file", {
        uri: resumePath.uri,
        name: resumePath.name,
        type: resumePath.type, // e.g., "application/pdf"
      });
    }
    // Append resume file

    dispatch(createHiring(formData));

  };

  const [date_one, setDate_one] = useState(new Date());
  const [dateOpen_one, setDateOpen_one] = useState(false);
  const [date_two, setDate_two] = useState(new Date());
  const [dateOpen_two, setDateOpen_two] = useState(false);
  const [date_three, setDate_three] = useState(new Date());
  const [dateOpen_three, setDateOpen_three] = useState(false);
  const [date_four, setDate_four] = useState(new Date());
  const [dateOpen_four, setDateOpen_four] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [formData, setFormData] = useState({
    level1: { dateOfConductor: '', conductorBy: '', conductorPlace: '', result: '', review: '' },
    level2: { dateOfConductor: '', conductorBy: '', conductorPlace: '', result: '', review: '' },
    level3: { dateOfConductor: '', conductorBy: '', conductorPlace: '', result: '', review: '' },
  });

  const formatDate = (date) => {
    // return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    return new Date(date).toISOString().slice(0, 19).replace("T", " ");
  };

  const handleInputChange = (level, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [level]: { ...prev[level], [field]: value },
    }));
  };

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const handlelevel = (hiringLevel, dateOfConductor, conductorBy, conductorPlace, result, review) => {
    const levelWiseData = {
      dateOfConductor: dateOfConductor,
      conductorBy: conductorBy,
      conductorPlace: conductorPlace,
      result: result,
      review: review
    }

    const formData = new FormData();
    // Append text fields
    formData.append("id", id);
    formData.append("hiringLevel", hiringLevel);
    formData.append("levelWiseData", levelWiseData);
    formData.append("companyCode", companyCode);
    formData.append("unitCode", unitCode);

    // Append qualifications as JSON
    // Append resume file

    dispatch(updateHiring(formData));
  }

  return (
    <ScrollView style={styles.container}>

      {/* Hiring Details */}
      {isUpdateBasicData &&
        <View style={{ padding: 8 }}>
          <Text style={styles.heading}>Update Hiring</Text>
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
        </View>
      }
      {/* Hiring Details */}
      <View style={styles.hiringDetails}>
        <View style={[styles.hiringInfo]}>
          <TouchableOpacity onPress={() => setIsUpdateBasicData(true)} style={{ position: 'absolute', top: -10, right: 0 }}>
            <Avatar.Icon icon={'pencil'} size={35} style={{ margin: 8, backgroundColor: '#ffffff', borderColor: '#f9f9f9', borderWidth: 1, alignSelf: 'flex-end', padding: 5, elevation: 3 }}></Avatar.Icon>
          </TouchableOpacity>
          <Text style={styles.hiringName}>Name  : {candidateDetails?.candidateName ? candidateDetails.candidateName : ''}</Text>
          <Text style={styles.hiringEmail}>Email  : {candidateDetails?.email ? candidateDetails.email : ''}</Text>
          <Text style={styles.hiringPhone}>Phone Number  : {candidateDetails?.phoneNumber ? candidateDetails.phoneNumber : ''}</Text>
          <Text style={styles.hiringLevel}>Level  : {candidateDetails?.hiringLevel ? candidateDetails.hiringLevel : ''}</Text>
        </View>
      </View>
      {candidateDetails?.levelWiseData.map((item) => {
        <View style={styles.hiringDetails}>
          <View style={[styles.hiringInfo]}>
            <TouchableOpacity onPress={() => setIsUpdateBasicData(true)} style={{ position: 'absolute', top: -10, right: 0 }}>
              <Avatar.Icon icon={'pencil'} size={35} style={{ margin: 8, backgroundColor: '#ffffff', borderColor: '#f9f9f9', borderWidth: 1, alignSelf: 'flex-end', padding: 5, elevation: 3 }}></Avatar.Icon>
            </TouchableOpacity>
            <Text style={styles.hiringName}>conductorBy : {item.conductorBy}</Text>
            <Text style={styles.hiringEmail}>dateOfConductor  : {item.dateOfConductor}</Text>
            <Text style={styles.hiringPhone}>conductorPlace  : {item.conductorPlace}</Text>
            <Text style={styles.hiringLevel}>result  : {item.result}</Text>
            <Text style={styles.hiringLevel}>review  : {item.review}</Text>
          </View>
        </View>
      })}
      {/* Expandable Levels */}

      {(!candidateDetails?.hiringLevel || candidateDetails?.hiringLevel < 1) &&
        <LevelCard
          level="1"
          expanded={expandedLevel === 1}
          onToggle={() => toggleLevel(1)}
        >
          <View style={styles.form}>
            {/* Calendar */}
            <TextInput
              style={styles.input}
              placeholder="Slot Date"
              value={formData.level1.dateOfConductor}
              onPress={() => setDateOpen_one(true)}
            />
            <DatePicker
              modal
              open={dateOpen_one}
              date={date_one}
              mode='datetime'
              onConfirm={(date) => {
                setDateOpen_one(false)
                setDate_one(date)
                const selectedData = formatDate(date)
                handleInputChange('level1', 'dateOfConductor', selectedData)
              }}
              onCancel={() => {
                setDateOpen_one(false)
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor By"
              value={formData.level1.conductorBy}
              onChangeText={(text) => handleInputChange('level1', 'conductorBy', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor Place"
              value={formData.level1.conductorPlace}
              onChangeText={(text) => handleInputChange('level1', 'conductorPlace', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Result"
              value={formData.level1.result}
              onChangeText={(text) => handleInputChange('level1', 'result', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Review"
              value={formData.level1.review}
              onChangeText={(text) => handleInputChange('level1', 'review', text)}
            />
            <Button mode="outlined" textColor='#4CAF50' onPress={() => handlelevel(2,formData.level1.dateOfConductor, formData.level1.conductorBy, formData.level1.conductorPlace, formData.level1.result, formData.level1.review)} style={{ borderColor: "#aaaaaa", borderWidth: 1, marginVertical: 30 }}>
              Save
            </Button>
          </View>
        </LevelCard>
      }
      {(!candidateDetails?.hiringLevel || candidateDetails?.hiringLevel < 2) &&

        <LevelCard
          level="2"
          expanded={expandedLevel === 2}
          onToggle={() => toggleLevel(2)}
        >
          <View style={styles.form}>
            {/* Calendar */}
            <TextInput
              style={styles.input}
              placeholder="Slot Date"
              value={formData.level2.dateOfConductor}
              onPress={() => setDateOpen_two(true)}
            />
            <DatePicker
              modal
              open={dateOpen_two}
              date={date_two}
              mode='datetime'
              onConfirm={(date) => {
                setDateOpen_two(false)
                setDate_two(date)
                const selectedData = formatDate(date)
                handleInputChange('level2', 'dateOfConductor', selectedData)
              }}
              onCancel={() => {
                setDateOpen_two(false)
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor By"
              value={formData.level2.conductorBy}
              onChangeText={(text) => handleInputChange('level2', 'conductorBy', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor Place"
              value={formData.level2.conductorPlace}
              onChangeText={(text) => handleInputChange('level2', 'conductorPlace', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Result"
              value={formData.level2.result}
              onChangeText={(text) => handleInputChange('level2', 'result', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Review"
              value={formData.level2.review}
              onChangeText={(text) => handleInputChange('level2', 'review', text)}
            />
            <Button mode="outlined" textColor='#4CAF50' onPress={() => handlelevel(3,formData.level2.dateOfConductor, formData.level2.conductorBy, formData.level2.conductorPlace, formData.level2.result, formData.level2.review)} style={{ borderColor: "#aaaaaa", borderWidth: 1, marginVertical: 30 }}>
              Save
            </Button>
          </View>
        </LevelCard>
      }
      {(!candidateDetails?.hiringLevel || candidateDetails?.hiringLevel < 3) &&

        <LevelCard
          level="3"
          expanded={expandedLevel === 3}
          onToggle={() => toggleLevel(3)}
        >
          <View style={styles.form}>
            {/* Calendar */}
            <TextInput
              style={styles.input}
              placeholder="Slot Date"
              value={formData.level3.dateOfConductor}
              onPress={() => setDateOpen_three(true)}
            />
            <DatePicker
              modal
              open={dateOpen_three}
              date={date_three}
              mode='datetime'
              onConfirm={(date) => {
                setDateOpen_three(false)
                setDate_three(date)
                const selectedData = formatDate(date)
                handleInputChange('level3', 'dateOfConductor', selectedData)
              }}
              onCancel={() => {
                setDateOpen_three(false)
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor By"
              value={formData.level3.conductorBy}
              onChangeText={(text) => handleInputChange('level3', 'conductorBy', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Conductor Place"
              value={formData.level3.conductorPlace}
              onChangeText={(text) => handleInputChange('level3', 'conductorPlace', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Result"
              value={formData.level3.result}
              onChangeText={(text) => handleInputChange('level3', 'result', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Review"
              value={formData.level3.review}
              onChangeText={(text) => handleInputChange('level3', 'review', text)}
            />
            <Button mode="outlined" textColor='#4CAF50' onPress={() => handlelevel(4,formData.level3.dateOfConductor, formData.level3.conductorBy, formData.level3.conductorPlace, formData.level3.result, formData.level3.review)} style={{ borderColor: "#aaaaaa", borderWidth: 1, marginVertical: 30 }}>
              Save
            </Button>
          </View>
        </LevelCard>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, margin: 8,
    backgroundColor: '#f9f9f9',
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
  hiringDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  hiringInfo: {
    flex: 1, alignSelf: 'flex-start', justifyContent: 'flex-start'
  },
  hiringName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiringEmail: {
    fontSize: 14,
    color: '#666',
  },
  hiringPhone: {
    fontSize: 14,
    color: '#666',
  },
  hiringLevel: {
    fontSize: 14,
    color: '#444',
  },
  form: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});
