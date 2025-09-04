import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Card, Text, Avatar, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateDeviceInstall, uploadDeviceInstall } from '../../Redux/Actions/deviceInstallAction';
import store from '../../Redux/store';
import api from '../../Api/api';
import { getCurrentAddress } from '../../Utils/getCurrentAddress';
import { loadData } from '../../Utils/appData';

const InstallDeviceOverview = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { deviceInstallData } = useSelector(state => state.deviceInstallReducer);

    const handleSubmit = async () => {
        setIsLoading(true)
        const branchId = await loadData('branch_id');
        const role = await loadData('role');
        const currentDateTime = new Date().toISOString();
        const installedAddress = await getCurrentAddress();
        const createWorkFormData = new FormData();
        if (deviceInstallData.id) {
            createWorkFormData.append("id", deviceInstallData.id);
        }
        if (deviceInstallData.productIMEI) {
            createWorkFormData.append("imeiNumber", deviceInstallData.productIMEI);
        }
        if (deviceInstallData.productSIM) {
            createWorkFormData.append("simNumber", deviceInstallData.productSIM);
        }
        if (role === "sub dealer staff") {
            createWorkFormData.append("subDealerId", deviceInstallData.subDealerId);
            createWorkFormData.append("subDealerStaffId", deviceInstallData.subdealerStaffId);
        } else {
            createWorkFormData.append("staffId", deviceInstallData.staffId);
        }
        createWorkFormData.append("userName", deviceInstallData.userID);
        createWorkFormData.append("applicationId", deviceInstallData.applicationId);
        createWorkFormData.append("branchId", branchId);
        createWorkFormData.append("serviceId", deviceInstallData.serviceId);
        createWorkFormData.append("vehicleId", deviceInstallData.vehicleID);
        createWorkFormData.append("vehicleNumber", deviceInstallData.vehicleNumber);
        createWorkFormData.append("chassisNumber", deviceInstallData.chassisNumber);
        createWorkFormData.append("engineNumber", deviceInstallData.engineNumber);
        deviceInstallData.vehiclePhotos.map((item, index) => {
            console.log("item :", item)
            return (
                createWorkFormData.append(`photo${index + 1}`, {
                    uri: item.uri,  // Ensure it's a URI
                    name: item.name, // Assign a proper filename
                    type: item.type,  // Correct MIME type
                })
            )
        });
        createWorkFormData.append("startDate", currentDateTime);
        createWorkFormData.append("companyCode", "WAY4TRACK");
        createWorkFormData.append("unitCode", "WAY4");
        createWorkFormData.append("productName", deviceInstallData.productName);
        createWorkFormData.append("name", deviceInstallData.name);
        createWorkFormData.append("phoneNumber", deviceInstallData.phoneNumber);
        createWorkFormData.append("email", deviceInstallData.email);
        createWorkFormData.append("address", deviceInstallData.address);
        createWorkFormData.append("installationAddress", installedAddress);
        createWorkFormData.append("workStatus", "install");

        try {
            // Attempt to fetch branches
            const { data } = await api.post(`/technician/handleTechnicianDetails`, createWorkFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.status) {
                navigation.navigate('InstallSuccessfully');
                setIsLoading(false)
            } else {
                setIsLoading(false)
                Alert.alert('Error', 'Work creation not updated');
            }
        } catch (error) {
            console.log("error : ", error)
            setIsLoading(false)
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={deviceInstallData.name}
                    subtitle={`Phone: ${deviceInstallData.phoneNumber}`}
                    left={(props) => <Avatar.Icon {...props} icon='account' backgroundColor='#6200ea' />}
                />
                <Card.Content>
                    {renderInfo('Email', deviceInstallData.email)}
                    {renderInfo('Address', deviceInstallData.address)}
                    {renderInfo('Product', deviceInstallData.productName)}
                    {renderInfo('Service', deviceInstallData.service)}
                    {renderInfo('userID', deviceInstallData.userID)}
                    {renderInfo('applicationId', deviceInstallData.applicationId + "-" + deviceInstallData.applicationName)}
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title='Vehicle Details' left={() => <MaterialCommunityIcons name='car' size={24} color='black' />} />
                <Card.Content>
                    {renderInfo('Vehicle Type', deviceInstallData.vehicleType)}
                    {renderInfo('Vehicle No', deviceInstallData.vehicleNumber)}
                    {renderInfo('Chassis No', deviceInstallData.chassisNumber)}
                    {renderInfo('Engine No', deviceInstallData.engineNumber)}
                    {renderInfo('IMEI', deviceInstallData.productIMEI)}
                    {renderInfo('SIM', deviceInstallData.productSIM)}
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title='Vehicle Photos' left={() => <MaterialCommunityIcons name='image-multiple' size={24} color='black' />} />
                <Card.Content>
                    <View style={styles.imageContainer}>
                        {Array.isArray(deviceInstallData?.vehiclePhotos) && deviceInstallData?.vehiclePhotos.map((item, index) =>
                            item?.uri && (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image source={{ uri: item.uri }} style={styles.image} resizeMode='stretch' />
                                </View>
                            )
                        )}
                        {/* {deviceInstallData?.vehiclePhotos.map((item, index) => item?.uri && (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: item.uri }} style={styles.image} resizeMode='stretch' />
                            </View>
                        ))} */}
                    </View>
                </Card.Content>
            </Card>
            {isLoading ? (<ActivityIndicator size={'large'} color='green' style={{ marginBottom: 80 }} />) : (

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            )
            }
        </ScrollView>
    );
};

const renderInfo = (label, value) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
    card: { padding: 8, backgroundColor: '#ffffff', margin: 8 },
    infoRow: { flexDirection: 'row', marginBottom: 5 },
    label: { flex: 1, fontWeight: 'bold' },
    separator: { flex: 0.2 },
    value: { flex: 2 },
    imageContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
    imageWrapper: { width: Dimensions.get('screen').width / 3 - 10, height: 150, margin: 5 },
    image: { width: '100%', height: '100%', borderRadius: 10 },
    submitButton: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 20, marginBottom: 80 },
    submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default InstallDeviceOverview;
