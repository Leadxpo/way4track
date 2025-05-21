import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar, Button, TextInput, List, Modal, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function StaffDetails({ navigation, route }) { 
  const { staffDetails } = route.params;  // Sample address data
  const [imageUri, setImageUri] = useState(staffDetails.staffPhoto); 
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);


  useEffect(()=>{
    setImageUri(staffDetails.staffPhoto);
  })
  const openImagePicker = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    if (type === 'camera') {
      launchCamera(options, (response) => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.assets[0]?.uri);
        }
      });
    } else if (type === 'gallery') {
      launchImageLibrary(options, (response) => {
        if (!response.didCancel && !response.error) { 
          console.log("image :", response.assets[0]?.uri)
          setImageUri(response.assets[0]?.uri);
        }
      });
    }

    setBottomSheetVisible(false);
  };

  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setBottomSheetVisible(true)}> 
            <Avatar.Image
              size={100}
              source={
                imageUri? { uri: imageUri } : require('../../utilities/images/way4tracklogo.png')
              }
              style={[styles.avatar, { backgroundColor: "#f3f3f3" }]}
            />
          </TouchableOpacity>
        </View>

        {/* Staff Details as Text Inputs */}
        <View style={styles.detailsContainer}>
          <DetailItem label="Name" value={staffDetails.name} />
          <DetailItem label="Number" value={staffDetails.phoneNumber} icon="phone" />
          <DetailItem label="Designation" value={staffDetails.designation} />
          <DetailItem label="Branch" value={staffDetails.branch?.id} />
          <DetailItem label="Date of Birth" value={staffDetails.dob} />
          <DetailItem label="Email ID" value={staffDetails.email} icon="email" />
          <DetailItem label="Aadhar Number" value={staffDetails.aadharNumber} />
          <DetailItem label="Address" value={staffDetails.address} multiline />
        </View>
      </ScrollView>

      {/* Bottom Sheet for Image Picker */}
      <Modal visible={bottomSheetVisible} onDismiss={() => setBottomSheetVisible(false)}>
        <Surface style={{backgroundColor:"#ffffff",width:"90%",borderRadius:10,alignSelf:"center",justifyContent:'center'}}>
          <View style={{backgroundColor: "#27AE60",borderTopEndRadius:10,borderEndStartRadius:10}}>

          <Text style={{fontFamily:"Parkinsans-SemiBold",fontSize:24,backgroundColor: "red",color:"#f3f3f3",borderTopEndRadius:10,borderEndStartRadius:10,padding:5}}>Image Pic</Text>
          </View>
        <List.Section>
          <List.Item
            title="Camera"
            left={(props) => <List.Icon {...props} icon="camera" />}
            onPress={() => openImagePicker('camera')}
          />
          <List.Item
            title="Gallery"
            left={(props) => <List.Icon {...props} icon="image" />}
            onPress={() => openImagePicker('gallery')}
          />
        </List.Section>
        </Surface>
      </Modal>
    </View>
  );
}

// A reusable component for displaying staff details as text
const DetailItem = ({ label, value, icon, multiline = false }) => (
  <View style={styles.detailItem}>
    <TextInput
      label={label}
      value={value}
      mode="outlined"
      style={styles.input}
      left={icon ? <TextInput.Icon name={() => <Icon name={icon} size={20} />} /> : null}
      multiline={multiline}
      editable={false}
    />
  </View>
);

// Styles for the components
const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f7f7f7', marginBottom: 5,
  },
};
