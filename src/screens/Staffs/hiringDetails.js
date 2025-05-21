import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import LevelCard from '../../components/levelCard'; // Assuming LevelCard is in a separate file.

export default function HiringDetailsScreen({ navigation }) {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [formData, setFormData] = useState({
    level1: { type: '', date: '', conductor: '', place: '', result: '', review: '' },
    level2: { details: '' },
    level3: { details: '' },
  });

  const handleInputChange = (level, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [level]: { ...prev[level], [field]: value },
    }));
  };

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hiring Details */}
      <View style={styles.hiringDetails}>
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with dynamic image URL
          style={styles.profileImage}
        />
        <View style={styles.hiringInfo}>
          <Text style={styles.hiringName}>Name: Sai Kumar</Text>
          <Text style={styles.hiringEmail}>Email: way4teack@gmail.com</Text>
          <Text style={styles.hiringPhone}>Phone Number: +91 45645 64556</Text>
          <Text style={styles.hiringLevel}>Level: 2</Text>
        </View>
      </View>

      {/* Expandable Levels */}
      <LevelCard
        level="1"
        expanded={expandedLevel === 1}
        onToggle={() => toggleLevel(1)}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Type"
            value={formData.level1.type}
            onChangeText={(text) => handleInputChange('level1', 'type', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Conductor"
            value={formData.level1.date}
            onChangeText={(text) => handleInputChange('level1', 'date', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Conductor By"
            value={formData.level1.conductor}
            onChangeText={(text) => handleInputChange('level1', 'conductor', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Conductor Place"
            value={formData.level1.place}
            onChangeText={(text) => handleInputChange('level1', 'place', text)}
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
        </View>
      </LevelCard>

      <LevelCard
        level="2"
        expanded={expandedLevel === 2}
        onToggle={() => toggleLevel(2)}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter details for Level 2"
            value={formData.level2.details}
            onChangeText={(text) => handleInputChange('level2', 'details', text)}
          />
        </View>
      </LevelCard>

      <LevelCard
        level="3"
        expanded={expandedLevel === 3}
        onToggle={() => toggleLevel(3)}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter details for Level 3"
            value={formData.level3.details}
            onChangeText={(text) => handleInputChange('level3', 'details', text)}
          />
        </View>
      </LevelCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
    flex: 1,
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
