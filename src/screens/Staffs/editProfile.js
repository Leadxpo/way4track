import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfile = ({ navigation, route }) => {
    const [name, setName] = useState('Chaitanya');
    const [phone, setPhone] = useState('9849444329');
    const [email, setEmail] = useState('Chaitanya@gmail.com');
    const [password, setPassword] = useState('********');
    const [profilePic, setProfilePic] = useState('********');
    const [error, setError] = useState('');

    const handleEditProfilePicture = (type) => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
        };

        if (type === 'camera') {
            ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    setProfilePic(response.assets[0].uri);
                }
            });
        } else if (type === 'gallery') {
            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    setProfilePic(response.assets[0].uri);
                }
            });
        }
    };

    const handleSaveChanges = () => {
        // Input Validation Logic
        if (!name.trim()) {
            Alert.alert('Validation Error', 'Name is required.');
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            Alert.alert('Validation Error', 'Phone Number must be 10 digits.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
            return;
        }

        // Success message
        Alert.alert('Success', 'Profile updated successfully!');
        console.log('Updated Profile:', { name, phone, email, password });
    };

    return (
        <View style={styles.container}>
            {/* Profile Image Section */}
            <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                <View style={styles.imageContainer}>
                    <Image
                        source={
                            profile.profileImage
                                ? { uri: profilePic}
                                : require('../../utilities/images/way4tracklogo.png')
                        } style={styles.profileImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Text style={styles.cameraIcon}>📷</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {/* Input Fields */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="numeric"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <Text style={styles.label}>E - Mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.label}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            {/* Save Changes Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
            </TouchableOpacity>

            <View>
                <View style={styles.bottomSheet}>
                    <Button
                        icon="camera"
                        mode="contained"
                        onPress={() => {
                            bottomSheet.current.close();
                            handleEditProfilePicture('camera');
                        }}
                        style={styles.bottomButton}
                    >
                        Take Photo
                    </Button>
                    <Button
                        icon="image"
                        mode="contained"
                        onPress={() => {
                            bottomSheet.current.close();
                            handleEditProfilePicture('gallery');
                        }}
                        style={styles.bottomButton}
                    >
                        Choose from Gallery
                    </Button>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#27AE60',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 120,
        backgroundColor: '#27AE60',
        borderRadius: 20,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        fontSize: 18,
        color: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    saveButton: {
        width: '100%',
        backgroundColor: '#27AE60',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    bottomSheet: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        marginVertical: 10,
        width: '80%',
        backgroundColor: '#4CAF50',
    },

});

export default EditProfile;
