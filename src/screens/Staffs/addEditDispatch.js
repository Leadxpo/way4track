import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { PermissionsAndroid, Platform } from 'react-native';

const AddEditDispatch = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatchData = route.params?.dispatch || null;

    const [formData, setFormData] = useState({
        fromAddress: dispatchData?.fromAddress || '',
        toAddress: dispatchData?.toAddress || '',
        id: dispatchData?.id || null,
        dispatchCompanyName: dispatchData?.dispatchCompanyName || '',
        dispatchDate: dispatchData?.dispatchDate?.split("T")[0] || '',
        arrivalDate: dispatchData?.arrivalDate?.split("T")[0] || '',
        status: dispatchData?.status || 'DISPATCHED',
        transportId: dispatchData?.transportId || '',
        packageId: dispatchData?.packageId || '',
        assignedProductsId: dispatchData?.assignedProductsId || '',
        receiverName: dispatchData?.receiverName || '',
        dispatcherName: dispatchData?.dispatcherName || '',
        trackingURL: dispatchData?.trackingURL || '',
        dispatchDescription: dispatchData?.dispatchDescription || '',
        dispatchBoxImage: dispatchData?.dispatchPicks || [],
        companyCode: 'WAY4TRACK',
        unitCode: 'WAY4',
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [openDispatch, setOpenDispatch] = useState(false);
    const [openArrival, setOpenArrival] = useState(false);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission to take photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS auto-requests via Info.plist
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            companyCode: "WAY4TRACK",
            unitCode: "WAY4",
        }));

        if (dispatchData?.dispatchPicks) {
            setImagePreviews(dispatchData.dispatchPicks.map(img => ({ uri: img })));
        }
    }, [dispatchData]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImagePick = async (source) => {
        const options = {
            mediaType: 'photo',
            selectionLimit: 10, // allow multiple for gallery
        };

        let result;
        if (source === 'camera') {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                Alert.alert('Permission denied', 'Camera access is required');
                return;
            }
            result = await launchCamera(options);
        } else if (source === 'gallery') {
            result = await launchImageLibrary(options);
        }

        if (!result.didCancel && result.assets) {
            const newImages = result.assets.map((asset) => ({
                uri: asset.uri,
                name: asset.fileName,
                type: asset.type,
            }));

            setFormData((prev) => ({
                ...prev,
                dispatchBoxImage: [...prev.dispatchBoxImage, ...newImages],
            }));

            setImagePreviews((prev) => [...prev, ...newImages]);
        }
    };

    const openChoiceDialog = () => {
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => handleImagePick('camera') },
                { text: 'Gallery', onPress: () => handleImagePick('gallery') },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const handleSubmit = async () => {
        const payload = new FormData();
        // for (const [key, value] of Object.entries(formData)) {
        //     if (key === 'dispatchBoxImage') {
        //         const photos = formData.dispatchBoxImage;
        
        //         for (let i = 0; i < photos.length; i++) {
        //             const item = photos[i];
        
        //             if (typeof item === "string") {
        //                 // Remote URL
        //                 try {
        //                     const response = await fetch(item);
        //                     const blob = await response.blob();
        //                     const filename = item.split("/").pop();
        //                     const mimeType = blob.type || "image/jpeg";
        
        //                     payload.append("dispatchBoxImage", {
        //                         uri: item,
        //                         name: filename,
        //                         type: mimeType,
        //                     });
        //                 } catch (err) {
        //                     console.warn("Failed to fetch image:", item, err);
        //                 }
        //             } else if (item?.uri && item?.name && item?.type) {
        //                 // Local image
        //                 payload.append("dispatchBoxImage", {
        //                     uri: item.uri,
        //                     name: item.name,
        //                     type: item.type,
        //                 });
        //             }
        //         }
        
        //     } else {
        //         if (value !== null && value !== undefined) {
        //             payload.append(key, value);
        //         }
        //     }
        // }

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'dispatchBoxImage') {
                value.forEach((file) => {
                    if (file.uri) payload.append('dispatchBoximage', {
                        uri: file.uri,
                        name: file.name || 'image.jpg',
                        type: file.type || 'image/jpeg'
                    });
                });
            } else {
                if (value !== null && value !== undefined) {
                    payload.append(key, value);
                }
            }
        });

        const ID = await AsyncStorage.getItem("staffID");
        const role = await AsyncStorage.getItem("role");
        const cleanedID = ID?.replace(/^"|"$/g, ''); // Remove starting and ending quotes if present

        if (role === "sub_dealer") {
            payload.append("subDealerId", cleanedID);
        } else {
            payload.append("staffId", cleanedID);
        }
        console.log("rrr", payload)
        try {
            const response = await api.post('/dispatch/handleDispatchDetails', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status) {
                Alert.alert('Success', formData.id ? 'Dispatch updated!' : 'Dispatch created!');
                navigation.navigate('Dispatch');
            } else {
                Alert.alert('Error', 'Failed to save dispatch details.');
            }
        } catch (error) {
            console.error('Save error:', error);
            Alert.alert('Error', 'An error occurred while saving dispatch.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="titleLarge">{formData.id ? 'Edit Dispatch' : 'Create Dispatch'}</Text>

            <TouchableOpacity onPress={() => setOpenDispatch(true)}>
                <TextInput
                    label="Dispatch Date"
                    mode="outlined"
                    value={formData.dispatchDate}
                    editable={false}
                    style={[styles.input, { marginVertical: 10 }]}
                />
            </TouchableOpacity>

            <DatePicker
                modal
                open={openDispatch}
                date={formData.dispatchDate ? new Date(formData.dispatchDate) : new Date()}
                mode="date"
                onConfirm={(date) => {
                    setOpenDispatch(false);
                    handleChange('dispatchDate', date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
                }}
                onCancel={() => {
                    setOpenDispatch(false);
                }}
            />

            {/* Arrival Date Picker */}
            <TouchableOpacity onPress={() => setOpenArrival(true)}>
                <TextInput
                    label="Arrival Date"
                    mode="outlined"
                    value={formData.arrivalDate}
                    editable={false}
                    style={[styles.input, { marginVertical: 10 }]}
                />
            </TouchableOpacity>

            <DatePicker
                modal
                open={openArrival}
                date={formData.arrivalDate ? new Date(formData.arrivalDate) : new Date()}
                mode="date"
                onConfirm={(date) => {
                    setOpenArrival(false);
                    handleChange('arrivalDate', date.toISOString().split('T')[0]);
                }}
                onCancel={() => {
                    setOpenArrival(false);
                }}
            />

            <TextInput
                label="From Address"
                mode="outlined"
                value={formData.fromAddress}
                onChangeText={(text) => handleChange('fromAddress', text)}
                style={styles.input}
            />

            <TextInput
                label="To Address"
                mode="outlined"
                multiline
                value={formData.toAddress}
                onChangeText={(text) => handleChange('toAddress', text)}
                style={styles.input}
            />

            <TextInput
                label="Dispatch Company Name"
                mode="outlined"
                value={formData.dispatchCompanyName}
                onChangeText={(text) => handleChange('dispatchCompanyName', text)}
                style={styles.input}
            />

            <TextInput
                label="Receiver Name"
                mode="outlined"
                value={formData.receiverName}
                onChangeText={(text) => handleChange('receiverName', text)}
                style={styles.input}
            />

            <TextInput
                label="Dispatcher Name"
                mode="outlined"
                value={formData.dispatcherName}
                onChangeText={(text) => handleChange('dispatcherName', text)}
                style={styles.input}
            />

            <TextInput
                label="Tracking URL"
                mode="outlined"
                value={formData.trackingURL}
                onChangeText={(text) => handleChange('trackingURL', text)}
                style={styles.input}
            />

            <TextInput
                label="Transport ID"
                mode="outlined"
                value={formData.transportId}
                onChangeText={(text) => handleChange('transportId', text)}
                style={styles.input}
            />

            <TextInput
                label="Package ID"
                mode="outlined"
                value={formData.packageId}
                onChangeText={(text) => handleChange('packageId', text)}
                style={styles.input}
            />

            <TextInput
                label="Description"
                mode="outlined"
                multiline
                value={formData.dispatchDescription}
                onChangeText={(text) => handleChange('dispatchDescription', text)}
                style={styles.input}
            />
            <Button icon="camera" mode="outlined" onPress={openChoiceDialog} style={{ marginTop: 10 }}>
                Upload Images
            </Button>

            <ScrollView horizontal style={{ marginTop: 10 }}>
                {imagePreviews.map((img, index) => (
                    <TouchableOpacity key={index} onPress={handleImagePick} style={styles.imageContainer}>
                        <Image source={{ uri: img.uri }} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Button mode="contained" onPress={handleSubmit} style={styles.submitBtn}>
                {formData.id ? 'Update Dispatch' : 'Create Dispatch'}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    input: { marginVertical: 8, backgroundColor: '#ffffff' },
    image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
    imageContainer: { marginRight: 8 },
    submitBtn: { marginTop: 20 },
});

export default AddEditDispatch;
