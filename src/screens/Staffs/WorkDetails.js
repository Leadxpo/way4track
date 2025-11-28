import React, { useState,useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RemarksSection from '../../components/remarkSection';

const WorkDetails = ({ navigation, route }) => {
    const { workDetails } = route.params;  // Sample address data
    const [remark, setRemark] = useState(workDetails.remark);
    const [staffName, setStaffName] = useState(workDetails.staffName);
    const [staffId, setStaffId] = useState(workDetails.staffId);

    return (
        <ScrollView style={styles.container}>
            {/* Client & Work Details */}
            <Card style={styles.card}>
                <Card.Title
                    title={workDetails.clientName || "N/A"}
                    subtitle={`Phone: ${workDetails.phoneNumber || "N/A"}`}
                    left={(props) => <Avatar.Icon {...props} icon='account' backgroundColor='#6200ea' />}
                />
                <Card.Content>
                    {renderInfo('Address', workDetails.address)}
                    {renderInfo("UserID", workDetails.userName)}
                    {renderInfo("application", workDetails.applicationName)}
                    {renderInfo('Product', workDetails.productName)}
                    {renderInfo('Service', workDetails.service || "N/A")}
                    {renderInfo('Start Date', workDetails.startDate ? new Date(workDetails.startDate).toLocaleString() : "N/A")}
                    {renderInfo("Work Status", workDetails.workStatus || "N/A")}

                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Technician Installed Address" left={() => <MaterialCommunityIcons name="account-tie" size={24} color="black" />} />
                <Card.Content>
                    {renderInfo('Address', workDetails.installationAddress)}
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Title title="Staff Details" left={() => <MaterialCommunityIcons name="account-tie" size={24} color="black" />} />
                <Card.Content>
                    {renderInfo("Staff Name", workDetails.staffName)}
                    {renderInfo("Designation", workDetails.staff_designation)}
                    {renderInfo("Branch", workDetails.staff_branch_name)}
                    {renderInfo("Department", workDetails.staff_department)}
                    {renderInfo("Phone", workDetails.staff_phone_number || "N/A")}
                    {renderInfo("Email", workDetails.staff_email || "N/A")}
                </Card.Content>
            </Card>

            {/* Vehicle Details */}
            <Card style={styles.card}>
                <Card.Title title='Vehicle Details' left={() => <MaterialCommunityIcons name='car' size={24} color='black' />} />
                <Card.Content>
                    {renderInfo('Vehicle Type', workDetails.vehicleType || "N/A")}
                    {renderInfo('Vehicle No', workDetails.vehicleNumber)}
                    {renderInfo('Chassis No', workDetails.chassisNumber)}
                    {renderInfo('Engine No', workDetails.engineNumber)}
                    {renderInfo('IMEI', workDetails.imeiNumber || "N/A")}
                    {renderInfo('SIM', workDetails.simNumber || "N/A")}
                </Card.Content>
            </Card>


            {/* Vehicle Photos */}
            <Card style={styles.card}>
                <Card.Title title='Vehicle Photos' left={() => <MaterialCommunityIcons name='image-multiple' size={24} color='black' />} />
                <Card.Content>
                    <View style={styles.imageContainer}>
                        {[...Array(10).keys()].map((rrr) => {
                            const photoKey = `vehiclePhoto${rrr + 1}`; // Create dynamic key
                            const photoUri = workDetails[photoKey];

                            return photoUri ? (
                                <View key={rrr} style={styles.imageWrapper}>
                                    <Image source={{ uri: photoUri }} style={styles.image} resizeMode="stretch" />
                                </View>
                            ) : null;
                        })}
                    </View>
                </Card.Content>
            </Card>
            {(workDetails.workStatus === "accept" || workDetails.workStatus === "activate") &&
                <Card style={styles.card}>
                    <Card.Title title="BackEnd Support Details" left={() => <MaterialCommunityIcons name="account-tie" size={24} color="black" />} />
                    <Card.Content>
                        {renderInfo("Staff Name", workDetails.st_name)}
                        {renderInfo("Designation", workDetails.st_designation)}
                        {renderInfo("Branch", workDetails.st_branch_name)}
                        {renderInfo("Department", workDetails.st_department)}
                        {renderInfo("Phone", workDetails.st_phone_number || "N/A")}
                        {renderInfo("Email", workDetails.st_email || "N/A")}
                        {renderInfo("Accept Data", workDetails.acceptStartDate || "N/A")}
                        {renderInfo("Active Data", workDetails.activateDate || "N/A")}
                    </Card.Content>
                </Card>
            }
            {workDetails.screenShot &&
                <View >
                    <Card.Title title="uploded Bill" left={() => <MaterialCommunityIcons name="account-tie" size={24} color="black" />} />
                    <Image source={{ uri: workDetails.screenShot }} style={{resizeMode:'stretch', width: Dimensions.get('screen').width/2,alignSelf:"center",justifyContent:'center', height: 300,marginBottom:10, borderRadius: 8 }} resizeMode="stretch" />
                </View>
            }
            {workDetails.amount &&
                <Card style={styles.card}>
                    <Card.Title title="PaymentData" left={() => <MaterialCommunityIcons name="account-tie" size={24} color="black" />} />
                    <Card.Content>
                        {renderInfo("amount", workDetails.amount || "N/A")}
                        {renderInfo("paid Amount", workDetails.paidAmount || "N/A")}
                        {renderInfo("Remaining Amount", (parseInt(workDetails.amount) - parseInt(workDetails.paidAmount))|| "N/A")}
                        {renderInfo("Description", workDetails.description)}
                        {renderInfo("Payment Status", workDetails.paymentStatus || "N/A")}
                    </Card.Content>
                </Card>
            }
            <RemarksSection data={workDetails}  userId={staffId} userName={staffName} userRemarks={remark} setUserRemarks={setRemark}/>

            {/* Submit Button - Only visible if workStatus is 'install' */}
            {(workDetails.workStatus === "activate" && workDetails.paymentStatus === "PENDING") && (

                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("PaymentScanner", { paymentData: workDetails })}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            )}
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
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10, marginBottom: 40 },
    card: { padding: 8, backgroundColor: '#ffffff', margin: 8 },
    infoRow: { flexDirection: 'row', marginBottom: 5 },
    label: { flex: 1, fontWeight: 'bold',color:"#333333" },
    separator: { flex: 0.2 },
    value: { flex: 2,color:"#333333" },
    imageContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
    imageWrapper: { width: Dimensions.get('screen').width / 3 - 10, height: 150, margin: 3 },
    image: { width: '100%', height: '100%', borderRadius: 10 },
    submitButton: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 20, marginBottom: 50 },
    submitButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default WorkDetails;
