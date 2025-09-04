import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, Keyboard } from 'react-native';
import { TextInput, Button, Card, Text, IconButton, Portal, Modal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';

const Dispatch = () => {
    const navigation = useNavigation();
    const [dispatches, setDispatches] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [transportId, setTransportId] = useState('');
    const [allDispatches, setAllDispatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [permissions, setPermissions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDispatch, setSelectedDispatch] = useState(null);
    const [deliveryDescription, setDeliveryDescription] = useState(null);
    const [updatedDispatchStatus, setUpdatedDispatchStatus] = useState('');
    const [role, setRole] = useState('');


    useEffect(() => {
        const getUserDetails = async () => {
            const storedRole = await AsyncStorage.getItem("role");
            setRole(storedRole);

            if (storedRole === "CEO") {
                setPermissions(true)
            } else {
                setPermissions(false)
            }
        };

        getUserDetails();
    }, [permissions]); // ← empty dependency array means this runs only once on mount

    useEffect(() => {
        fetchDispatches();
    }, [dateFrom, dateTo, transportId]);

    const fetchDispatches = async () => {
        try {
            const response = await api.post("/dispatch/getDispatchData", {
                fromDate: dateFrom,
                toDate: dateTo,
                transportId,
                companyCode: "WAY4TRACK",
                unitCode: "WAY4",
            });
            console.log("rrr:", response.data.data)
            if (response.data.status) {
                setDispatches(response.data.data || []);
                setAllDispatches(response.data.data || []);
            } else {
                console.error("Error: API response is invalid");
            }
        } catch (error) {
            console.error("Error fetching dispatch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        Keyboard.dismiss();
        fetchDispatches();
    };

    const handleDelete = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this dispatch?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await api.post("/dispatch/deleteDispatch", {
                                id,
                                companyCode: "WAY4TRACK",
                                unitCode: "WAY4",
                            });
                            Alert.alert("Dispatch deleted successfully!");
                            fetchDispatches();
                        } catch (error) {
                            console.error("Error deleting dispatch:", error);
                            Alert.alert("Failed to delete dispatch.");
                        }
                    },
                },
            ]
        );
    };

    const toggleDropdown = (id) => {
        setDropdownOpen((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const leadStatusUpdate = (item) => {
        setSelectedDispatch(item);
        setUpdatedDispatchStatus(item.status);
        setShowModal(true);
    };

    const handleSubmitDispatchUpdate = async () => {
        const staffName = await AsyncStorage.getItem("staffName")
        const staffId = await AsyncStorage.getItem("staffID")
        const User = staffName + "-" + staffId;
        const formPayload = new FormData();
        formPayload.append("id", selectedDispatch.id);
        formPayload.append("status", updatedDispatchStatus);
        if (updatedDispatchStatus === 'ON_THE_WAY') {
            formPayload.append("transDate", new Date());
            formPayload.append("transUpdateUser", User);
        };
        if (updatedDispatchStatus === 'DELIVERED') {
            formPayload.append("deliveredDate", new Date());
            formPayload.append("deliveredUpdateUser", User);
            formPayload.append("deliveryDescription", deliveryDescription);
        }
        if (selectedDispatch.dispatchPicks && selectedDispatch.dispatchPicks.length > 0) {
            await Promise.all(
                selectedDispatch.dispatchPicks.map(async (item) => {
                    const response = await fetch(item);
                    const blob = await response.blob();
                    const filename = item.split('/').pop();
                    const file = new File([blob], filename, { type: blob.type });
                    formPayload.append("dispatchBoximage", file);
                })
            );
        }

        try {
            const response = await api.post('/dispatch/handleDispatchDetails', formPayload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status) {
                Alert.alert("Updated successfully");
                navigation.navigate("Dispatch");
            }
        } catch (error) {
            console.error("error:", error);
        }
        setShowModal(false);
    };

    return (
        <Provider>
            <Header />
            <View style={styles.container}>
                <Button mode="contained" style={{ width: '3 0%', margin: 10, alignSelf: 'flex-end' }} buttonColor='#aaaaaa' onPress={() =>
                    navigation.navigate("Home", {
                        screen: "AddEditDispatch"
                    })
                }>Add Dispatch</Button>
                <Text variant="titleLarge" style={styles.title}>Dispatch</Text>
                <TextInput
                    mode="outlined"
                    placeholder="Search by date or transport ID"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    label={'search'}
                    right={<TextInput.Icon icon="magnify" size={18} color={"#333333"} onPress={handleSearch} />}
                    style={styles.searchInput}
                />
                <FlatList
                    data={dispatches?.filter(item => item?.transportId?.includes(searchQuery))}
                    keyExtractor={(item) => item.id.toString()}
                    refreshing={loading}
                    onRefresh={fetchDispatches}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <Card.Title
                                title={item.dispatchCompanyName}
                                subtitle={`Transport ID: ${item.transportId}`}
                                right={(props) => (
                                    <IconButton
                                        {...props}
                                        icon="dots-vertical" size={18} iconColor='#333333'
                                        onPress={() => toggleDropdown(item.id)}
                                    />
                                )}
                            />
                            <Card.Content>
                                <Text>Receiver: {item.receiverName}</Text>
                                <Text>From: {item.fromAddress}</Text>
                                <Text>To: {item.toAddress}</Text>
                                <Text>Date: {new Date(item.dispatchDate).toLocaleDateString('en-GB')}</Text>
                                <Text>Status: {item.status}</Text>
                                <Text>Package ID: {item.packageId}</Text>
                                {dropdownOpen[item.id] && (
                                    <View style={styles.actions}>
                                        <>
                                            <Button buttonColor='#d3d3d3' onPress={() => navigation.navigate("Home", {
                                                screen: "AddEditDispatch",
                                                params: {
                                                    dispatch: item,
                                                },
                                            })}>Edit</Button>
                                            <Button buttonColor='#d3d3d3' textColor="red" onPress={() => handleDelete(item.id)}>Delete</Button>
                                            <Button buttonColor='#d3d3d3' onPress={() => navigation.navigate("ShowDispatch", { dispatch: item })}>More Details</Button>
                                        </>
                                    </View>
                                )}
                            </Card.Content>
                        </Card>
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>No Dispatch found</Text>}
                />

                <Portal>
                    <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                        <Text variant="titleMedium">Update Dispatch Status</Text>
                        <TextInput
                            label="Dispatch Status"
                            mode="outlined"
                            value={updatedDispatchStatus}
                            onChangeText={setUpdatedDispatchStatus}
                        />
                        {updatedDispatchStatus === 'DELIVERED' && (
                            <>
                                <Text>Dispatch Description: {selectedDispatch?.dispatchDescription}</Text>
                                <TextInput
                                    label="Delivery Description"
                                    mode="outlined"
                                    value={deliveryDescription}
                                    onChangeText={setDeliveryDescription}
                                />
                            </>
                        )}
                        <View style={styles.modalActions}>
                            <Button mode="text" onPress={() => setShowModal(false)}>Cancel</Button>
                            <Button mode="contained" onPress={handleSubmitDispatchUpdate}>Submit</Button>
                        </View>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { marginBottom: 8 },
    searchInput: { marginBottom: 16 },
    card: { marginBottom: 10 },
    actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
    empty: { textAlign: 'center', marginTop: 20, color: 'gray' },
    modal: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8 },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
});

export default Dispatch;
