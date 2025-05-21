import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../Api/api';

const RemarksSection = ({ userName, userId, data, userRemarks,setUserRemarks }) => {
  const [newRemark, setNewRemark] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [remarks, setRemarks] = useState(userRemarks);
  const [workRecord, setWorkRecord] = useState(null);
  const [editedRecord, setEditedRecord] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return Object.values(granted).every((status) => status === 'granted');
    }
    return true;
  };

  useEffect(() => {
    setRemarks(userRemarks);
    setWorkRecord(data)
  },[userRemarks])


  const handlePickFile = async () => {
    const hasPermission = await requestPermissions();
    // if (!hasPermission) {
    //   Alert.alert('Permission denied');
    //   return;
    // }

    Alert.alert(
      'Select Media',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'mixed',
                cameraType: 'back',
                saveToPhotos: true,
              },
              (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                  Alert.alert('Error', response.errorMessage);
                  return;
                }
                if (response.assets?.[0]) {
                  setSelectedFile(response.assets[0]);
                }
              }
            );
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'mixed' }, (response) => {
              if (response.didCancel) return;
              if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
                return;
              }
              if (response.assets?.[0]) {
                setSelectedFile(response.assets[0]);
              }
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const fetchRecords = async () => {
    if (!data?.id) {
      console.error('No valid ID found for API call.');
      return;
    }

    try {
      console.log('Fetching work details for ID:', data.id);
      const response = await api.post(
        '/technician/getTechnicianDetailsById',
        {
          id: data.id,
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        }
      );

      if (response?.data) {
        console.log("remarks : ",response.data.data.remark)
        setWorkRecord(response.data.data);
        setEditedRecord(response.data.data);
        setRemarks(response.data.data.remark);
        setUserRemarks=response.data.data.remark;
      } else {
        setWorkRecord(null);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecord(null);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [data]);

  const handleSend = async () => {
    if (newRemark.trim() === '' && !selectedFile) return;

    try {
      let fileTypeLabel = null;
      let fileKey = null;

      if (selectedFile) {
        const mimeType = selectedFile.type;
        if (mimeType.startsWith('image/')) {
          fileTypeLabel = 'Image';
          fileKey = 'image';
        } else if (mimeType.startsWith('video/')) {
          fileTypeLabel = 'Video';
          fileKey = 'videos';
        } else {
          fileTypeLabel = 'File';
          fileKey = 'file';
        }
      }

      const newRemarkObj = {
        staffId: userId,
        name: userName,
        date: new Date(),
        desc: newRemark,
        file: selectedFile ? { name: fileTypeLabel } : null,
        image: fileTypeLabel === 'Image' ? selectedFile.uri : null,
        video: fileTypeLabel === 'Video' ? selectedFile.uri : null,
      };
console.log("remark : ",newRemarkObj);
      const formData = new FormData();
      formData.append('id', workRecord.id);
      formData.append('companyCode', "WAY4track");
      formData.append('unitCode', "WAY4");
      formData.append('remark', JSON.stringify([newRemarkObj]));

      if (selectedFile && fileKey) {
        formData.append(fileKey, {
          uri: selectedFile.uri,
          name: selectedFile.fileName,
          type: selectedFile.type,
        });
      }
      console.log("formdata : ", formData);
      const response = await api.post(
        '/technician/handleTechnicianDetails',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (response?.data) {
        fetchRecords(); // Refresh after sending
        setSelectedFile(null);
      }
    } catch (err) {
      console.error('Error sending remark:', err);
    }

    setNewRemark('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Remarks</Text>

      {/* <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        overScrollMode='always'
        
      > */}
        {remarks?.map((remark, index) => {
          const isLoggedInUser = remark.name === userName;
          const isImage = remark?.file?.name === 'Image' && remark.image;
          const isVideo = remark?.file?.name === 'Video' && remark.video;
          return (
            <View
              key={index}
              style={[
                styles.messageContainer,
                isLoggedInUser ? styles.alignRight : styles.alignLeft,
              ]}
            >
              <View
                style={[
                  styles.messageBox,
                  isLoggedInUser ? styles.userBox : styles.otherBox,
                ]}
              >
                <Text style={styles.messageText}>{remark.desc}</Text>

                {isImage && (
                  <FastImage
                    source={{ uri: remark.image }}
                    style={styles.imagePreview}
                    resizeMode={FastImage.resizeMode.cover}
                  />

                )}

                {isVideo && (
                  <Video
                    source={{ uri: remark.video }}
                    style={styles.videoPreview}
                    controls
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={styles.metaText}>
                {remark.name} • {new Date(remark.date).toLocaleString()}
              </Text>
            </View>
          );
        })}
      {/* </ScrollView> */}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter your remark..."
          placeholderTextColor="#aaaaaa"
          value={newRemark}
          onChangeText={setNewRemark}
        />
        <TouchableOpacity onPress={handlePickFile} style={styles.iconButton}>
          <MaterialCommunityIcons name="paperclip" size={20} color="#555" />
        </TouchableOpacity>
        {

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default RemarksSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,flex:1,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,paddingBottom:100,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scrollView: {
    maxHeight: 350,
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 10,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  messageBox: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '75%',
    marginBottom: 4,
  },
  userBox: {
    backgroundColor: '#dbeafe',
  },
  otherBox: {
    backgroundColor: '#f3f4f6',
  },
  messageText: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 10,
    color: '#666',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  sendButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  imagePreview: {
    width: 200,
    height: 100,
    marginTop: 8,
    borderRadius: 6,
  },
  videoPreview: {
    width: 250,
    height: 200,
    marginTop: 8,
    borderRadius: 6,
  },
});
