// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, Alert, Keyboard } from 'react-native';
// import { TextInput, Button, Card, Text, IconButton, Portal, Modal, Provider } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import api from '../../Api/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Header from '../../components/userHeader';

// const Dispatch = () => {
//     const navigation = useNavigation();
//     const [dispatches, setDispatches] = useState([]);
//     const [dateFrom, setDateFrom] = useState('');
//     const [dateTo, setDateTo] = useState('');
//     const [transportId, setTransportId] = useState('');
//     const [allDispatches, setAllDispatches] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [dropdownOpen, setDropdownOpen] = useState({});
//     const [searchQuery, setSearchQuery] = useState('');
//     const [permissions, setPermissions] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedDispatch, setSelectedDispatch] = useState(null);
//     const [deliveryDescription, setDeliveryDescription] = useState(null);
//     const [updatedDispatchStatus, setUpdatedDispatchStatus] = useState('');
//     const [role, setRole] = useState('');
//     const [staffId, setStaffId] = useState('');


//     useEffect(() => {
//         const getUserDetails = async () => {
//             const storedRole = await AsyncStorage.getItem("role");
//             const rawStaffId = await AsyncStorage.getItem("staffID");
// const staffId = rawStaffId.replace(/^"|"$/g, ""); // removes quotes if present
//             setRole(storedRole);
//             setStaffId(staffId);

//             if (storedRole === "CEO") {
//                 setPermissions(true)
//             } else {
//                 setPermissions(false)
//             }
//         };

//         getUserDetails();
//     }, []); // ← empty dependency array means this runs only once on mount

//     useEffect(() => {
//         fetchDispatches();
//     }, [dateFrom, dateTo, transportId]);

//     const fetchDispatches = async () => {
//         try {
//             const response = await api.post("/dispatch/getDispatchData", {
//                 fromDate: dateFrom,
//                 toDate: dateTo,
//                 transportId,
//                 companyCode: "WAY4TRACK",
//                 unitCode: "WAY4",
//             });
//             if (response.data.status) {
//                 const filteredData = response?.data?.data?.filter(item => {
//                     const receiver = `${item?.receiverName}`;
//                     const staffIdStr = String(staffId);

//                     return receiver === staffIdStr;
//                 });


//                 setDispatches(filteredData || []);
//                 setAllDispatches(filteredData || []);
//             } else {
//                 console.error("Error: API response is invalid");
//             }
//         } catch (error) {
//             console.error("Error fetching dispatch data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearch = () => {
//         Keyboard.dismiss();
//         fetchDispatches();
//     };

//     const handleDelete = async (id) => {
//         Alert.alert(
//             "Confirm Delete",
//             "Are you sure you want to delete this dispatch?",
//             [
//                 { text: "Cancel", style: "cancel" },
//                 {
//                     text: "OK",
//                     onPress: async () => {
//                         try {
//                             await api.post("/dispatch/deleteDispatch", {
//                                 id,
//                                 companyCode: "WAY4TRACK",
//                                 unitCode: "WAY4",
//                             });
//                             Alert.alert("Dispatch deleted successfully!");
//                             fetchDispatches();
//                         } catch (error) {
//                             console.error("Error deleting dispatch:", error);
//                             Alert.alert("Failed to delete dispatch.");
//                         }
//                     },
//                 },
//             ]
//         );
//     };

//     const toggleDropdown = (id) => {
//         setDropdownOpen((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const leadStatusUpdate = (item) => {
//         setSelectedDispatch(item);
//         setUpdatedDispatchStatus(item.status);
//         setShowModal(true);
//     };

//     const handleSubmitDispatchUpdate = async () => {
//         const staffName = await AsyncStorage.getItem("staffName")
//         const staffId = await AsyncStorage.getItem("staffID")
//         const User = staffName + "-" + staffId;
//         const formPayload = new FormData();
//         formPayload.append("id", selectedDispatch.id);
//         formPayload.append("status", updatedDispatchStatus);
//         if (updatedDispatchStatus === 'ON_THE_WAY') {
//             formPayload.append("transDate", new Date());
//             formPayload.append("transUpdateUser", User);
//         };
//         if (updatedDispatchStatus === 'DELIVERED') {
//             formPayload.append("deliveredDate", new Date());
//             formPayload.append("deliveredUpdateUser", User);
//             formPayload.append("deliveryDescription", deliveryDescription);
//         }
//         if (selectedDispatch.dispatchPicks && selectedDispatch.dispatchPicks.length > 0) {
//             await Promise.all(
//                 selectedDispatch.dispatchPicks.map(async (item) => {
//                     const response = await fetch(item);
//                     const blob = await response.blob();
//                     const filename = item.split('/').pop();
//                     const file = new File([blob], filename, { type: blob.type });
//                     formPayload.append("dispatchBoximage", file);
//                 })
//             );
//         }

//         try {
//             const response = await api.post('/dispatch/handleDispatchDetails', formPayload, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             if (response.status) {
//                 Alert.alert("Updated successfully");
//                 navigation.navigate("Dispatch");
//             }
//         } catch (error) {
//             console.error("error:", error);
//         }
//         setShowModal(false);
//     };

//     return (
//         <Provider>
//             <Header />
//             <View style={styles.container}>
//                 <Button mode="contained" style={{ width: '30%', margin: 10, alignSelf: 'flex-end' }} buttonColor='#aaaaaa' onPress={() =>
//                     navigation.navigate("Home", {
//                         screen: "AddEditDispatch"
//                     })
//                 }>Add Dispatch</Button>
//                 <Text variant="titleLarge" style={styles.title}>Dispatch</Text>
//                 <TextInput
//                     mode="outlined"
//                     placeholder="Search by date or transport ID"
//                     value={searchQuery}
//                     onChangeText={setSearchQuery}
//                     label={'search'}
//                     right={<TextInput.Icon icon="magnify" size={18} color={"#333333"} onPress={handleSearch} />}
//                     style={styles.searchInput}
//                 />
//                 <FlatList
//                     data={dispatches?.filter(item => item?.transportId?.toLowerCase().includes(searchQuery.toLowerCase()))}
//                     keyExtractor={(item) => item.id.toString()}
//                     refreshing={loading}
//                     onRefresh={fetchDispatches}
//                     renderItem={({ item }) => {
//                         return (<Card style={styles.card}>
//                             <Card.Title
//                                 title={item.dispatchCompanyName}
//                                 subtitle={`Transport ID: ${item.transportId}`}
//                                 right={(props) => (
//                                     <IconButton
//                                         {...props}
//                                         icon="dots-vertical" size={18} iconColor='#333333'
//                                         onPress={() => toggleDropdown(item.id)}
//                                     />
//                                 )}
//                             />
//                             <Card.Content>
//                                 <Text>Receiver: {item.receiverName}</Text>
//                                 <Text>From: {item.fromAddress}</Text>
//                                 <Text>To: {item.toAddress}</Text>
//                                 <Text>Date: {new Date(item.dispatchDate).toLocaleDateString('en-GB')}</Text>
//                                 <Text>Status: {item.status}</Text>
//                                 <Text>Package ID: {item.packageId}</Text>
//                                 {dropdownOpen[item.id] && (
//                                     <View style={styles.actions}>
//                                             <Button buttonColor='#d3d3d3' onPress={() => navigation.navigate("Home", {
//                                                 screen: "AddEditDispatch",
//                                                 params: {
//                                                     dispatch: item,
//                                                 },
//                                             })}>Edit</Button>
//                                             <Button buttonColor='#d3d3d3' textColor="red" onPress={() => handleDelete(item.id)}>Delete</Button>
//                                             <Button buttonColor='#d3d3d3' onPress={() => navigation.navigate("ShowDispatch", { dispatch: item })}>More Details</Button>
//                                     </View>
//                                 )}
//                             </Card.Content>
//                         </Card>)
//                     }}
//                     ListEmptyComponent={<Text style={styles.empty}>No Dispatch found</Text>}
//                 />

//                 <Portal>
//                     <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
//                         <Text variant="titleMedium">Update Dispatch Status</Text>
//                         <TextInput
//                             label="Dispatch Status"
//                             mode="outlined"
//                             value={updatedDispatchStatus}
//                             onChangeText={setUpdatedDispatchStatus}
//                         />
//                         {updatedDispatchStatus === 'DELIVERED' && (
//                             <>
//                                 <Text>Dispatch Description: {selectedDispatch?.dispatchDescription}</Text>
//                                 <TextInput
//                                     label="Delivery Description"
//                                     mode="outlined"
//                                     value={deliveryDescription}
//                                     onChangeText={setDeliveryDescription}
//                                 />
//                             </>
//                         )}
//                         <View style={styles.modalActions}>
//                             <Button mode="text" onPress={() => setShowModal(false)}>Cancel</Button>
//                             <Button mode="contained" onPress={handleSubmitDispatchUpdate}>Submit</Button>
//                         </View>
//                     </Modal>
//                 </Portal>
//             </View>
//         </Provider>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16 },
//     title: { marginBottom: 8 },
//     searchInput: { marginBottom: 16 },
//     card: { marginBottom: 10 },
//     actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
//     empty: { textAlign: 'center', marginTop: 20, color: 'gray' },
//     modal: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8 },
//     modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
// });

import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert, Keyboard } from 'react-native';
import { TextInput, Button, Card, Text, IconButton, Portal, Modal, Divider, Provider, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../Api/api';
import Header from '../../components/userHeader';
import { useFocusEffect } from '@react-navigation/native';

const Dispatch = () => {
  const navigation = useNavigation();

  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [transportId, setTransportId] = useState('');

  const [dropdownOpenMap, setDropdownOpenMap] = useState({}); // track which card’s menu is open
  const [searchQuery, setSearchQuery] = useState('');

  const [role, setRole] = useState('');
  const [staffId, setStaffId] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [updatedDispatchStatus, setUpdatedDispatchStatus] = useState('');
  const [deliveryDescription, setDeliveryDescription] = useState('');

  // Load user details once
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        let rawStaffId = await AsyncStorage.getItem('staffID');
        if (rawStaffId == null) rawStaffId = '';
        // Remove wrapping quotes if stored incorrectly
        const cleanedStaffId = rawStaffId.replace(/^"|"$/g, '');

        setRole(storedRole || '');
        setStaffId(cleanedStaffId);
      } catch (err) {
        console.error('Error reading user details:', err);
      }
    };

    getUserDetails();
  }, []);

  // Fetch dispatches whenever filters change
  useFocusEffect(
    useCallback(() => {
      fetchDispatches();
    }, [dateFrom, dateTo, transportId, staffId]) // include staffId so filter updates when it's set
  )

  const fetchDispatches = async () => {
    setLoading(true);
    try {
      const response = await api.post('/dispatch/getDispatchData', {
        fromDate: dateFrom,
        toDate: dateTo,
        transportId,
        companyCode: 'WAY4TRACK',
        unitCode: 'WAY4',
      });

      if (response.data?.status) {
        const rawList = Array.isArray(response.data.data) ? response.data.data : [];

        // Filter based on staffId and searchQuery
        const filtered = rawList.filter(item => {
          // Convert receiverName to string
          const receiver = String(item?.receiverName || '');
          const staffStr = String(staffId || '');

          // First, match staff
          if (staffStr && receiver !== staffStr) {
            return false;
          }

          // Then, match searchQuery in transportId (case-insensitive)
          if (searchQuery) {
            return String(item.transportId || '')
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }

          return true;
        });

        setDispatches(filtered);
      } else {
        console.error('Invalid API response:', response.data);
        setDispatches([]);
      }
    } catch (err) {
      console.error('Error fetching dispatch data:', err);
      setDispatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDispatches();
  };

  const toggleDropdown = (id) => {
    setDropdownOpenMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this dispatch?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await api.post('/dispatch/deleteDispatch', {
                id,
                companyCode: 'WAY4TRACK',
                unitCode: 'WAY4',
              });
              Alert.alert('Success', 'Dispatch deleted successfully.');
              fetchDispatches();
            } catch (err) {
              console.error('Error deleting dispatch:', err);
              Alert.alert('Error', 'Failed to delete dispatch.');
            }
          },
        },
      ]
    );
  };

  const openUpdateModal = (item) => {
    setSelectedDispatch(item);
    setUpdatedDispatchStatus(item.status || '');
    setDeliveryDescription('');
    setShowModal(true);
  };

  const handleSubmitDispatchUpdate = async () => {
    if (!selectedDispatch) {
      Alert.alert('Error', 'No dispatch selected');
      return;
    }

    try {
      const staffName = (await AsyncStorage.getItem('staffName')) || '';
      const rawStaffId = (await AsyncStorage.getItem('staffID')) || '';
      const cleanedStaffId = rawStaffId.replace(/^"|"$/g, '');
      const userLabel = `${staffName}-${cleanedStaffId}`;
      const formPayload = new FormData();
      formPayload.append('id', selectedDispatch.id);
      formPayload.append('status', updatedDispatchStatus);

      if (updatedDispatchStatus === 'ON_THE_WAY') {
        formPayload.append('transDate', new Date().toISOString());
        formPayload.append('transUpdateUser', userLabel);
      }
      if (updatedDispatchStatus === 'DELIVERED') {
        formPayload.append('deliveredDate', new Date().toISOString());
        formPayload.append('deliveredUpdateUser', userLabel);
        formPayload.append('deliveryDescription', deliveryDescription || '');
      }

      // If there are images in dispatchPicks (assuming they are URLs)
      if (Array.isArray(selectedDispatch.dispatchPicks)) {
        for (let url of selectedDispatch.dispatchPicks) {
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const filename = url.split('/').pop();
            // In React Native, File may not exist; you’d need to handle differently (see warning below)
            const file = new File([blob], filename, { type: blob.type });
            formPayload.append('dispatchBoximage', file);
          } catch (err) {
            console.warn('Error fetching image:', err);
          }
        }
      }
      console.log("DELIVERED:::", formPayload)
      const response = await api.post('/dispatch/handleDispatchDetails', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("DELIVERED:::", response.data)

      if (response.data?.status) {
        Alert.alert('Success', 'Dispatch updated successfully.');
        setShowModal(false);
        fetchDispatches();
      } else {
        console.error('Error in update response:', response.data);
        Alert.alert('Error', 'Update failed');
      }
    } catch (err) {
      console.error('Error updating dispatch:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <Button
          mode="contained"
          style={{ width: '30%', margin: 10, alignSelf: 'flex-end' }}
          buttonColor="#29AB87"
          textColor='#f3f3f3'
          onPress={() =>
            navigation.navigate('Home', {
              screen: 'AddEditDispatch',
            })
          }
        >
          Add Dispatch
        </Button>

        <Text variant="titleLarge" style={styles.title}>
          Dispatch
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Search by transport ID"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          right={
            <TextInput.Icon
              icon="magnify"
              size={18}
              color="#333"
              onPress={() => {
                Keyboard.dismiss();
                fetchDispatches();
              }}
            />
          }
        />

        <FlatList
          data={dispatches}
          keyExtractor={(item) => String(item.id)}
          refreshing={loading}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <Card style={styles.card} >
              <Card.Title
                title={item.dispatchCompanyName}
                subtitle={`Transport ID: ${item.transportId}`}
                titleStyle={{color:'#333333',fontWeight:'bold'}}
                subtitleStyle={{color:'#333333',}}
                right={(props) => (
                  <Menu
                    visible={dropdownOpenMap[item.id] || false}
                    onDismiss={() => toggleDropdown(item.id)}
                    anchor={
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        onPress={() => toggleDropdown(item.id)}
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        toggleDropdown(item.id);
                        navigation.navigate('Home', {
                          screen: 'AddEditDispatch',
                          params: { dispatch: item },
                        });
                      }}
                      title="Edit"
                      leadingIcon="pencil"
                    />
                    <Menu.Item
                      onPress={() => {
                        toggleDropdown(item.id);
                        handleDelete(item.id);
                      }}
                      title="Delete"
                      leadingIcon="delete"
                    />
                    <Menu.Item
                      onPress={() => {
                        toggleDropdown(item.id);
                        navigation.navigate('ShowDispatch', { dispatch: item });
                      }}
                      title="More Details"
                      leadingIcon="information"
                    />
                    <Menu.Item
                      onPress={() => {
                        toggleDropdown(item.id);
                        openUpdateModal(item);
                      }}
                      title="Update"
                      leadingIcon="update"
                    />
                  </Menu>
                )}
              />
              <Divider />

              <Card.Content style={{ paddingTop: 8 }}>
                <Text style={styles.label}><Text style={styles.bold}>Receiver:</Text> {item.receiverName}</Text>
                <Text style={styles.label}><Text style={styles.bold}>From:</Text> {item.fromAddress}</Text>
                <Text style={styles.label}><Text style={styles.bold}>To:</Text> {item.toAddress}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Date:</Text> {new Date(item.dispatchDate).toLocaleDateString('en-GB')}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Status:</Text> {item.status}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Package ID:</Text> {item.packageId}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No Dispatch found</Text>}
        />

        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => setShowModal(false)}
            contentContainerStyle={styles.modal}
          >
            <Text variant="titleMedium">Update Dispatch Status</Text>

            <TextInput
              label="Status"
              mode="outlined"
              value={updatedDispatchStatus}
              onChangeText={setUpdatedDispatchStatus}
              style={{ marginTop: 12 }}
            />

            {updatedDispatchStatus === 'DELIVERED' && (
              <>
                <Text style={{ marginTop: 12 }}>
                  Dispatch Description: {selectedDispatch?.dispatchDescription}
                </Text>
                <TextInput
                  label="Delivery Description"
                  mode="outlined"
                  value={deliveryDescription}
                  onChangeText={setDeliveryDescription}
                  style={{ marginTop: 12 }}
                />
              </>
            )}

            <View style={styles.modalActions}>
              <Button mode="text" onPress={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button mode="contained" onPress={handleSubmitDispatchUpdate}>
                Submit
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,color:'#29AB87',fontWeight:'bold'
  },
  searchInput: {
    marginBottom: 16,backgroundColor:'#ffffff',elevation:3
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,backgroundColor:'#D0F0C0'
  },

  label: {
    marginVertical: 2,
    fontSize: 14,
    color: '#333333',
  },

  bold: {
    fontWeight: '600',
    color: '#333333',
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '333333',
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Dispatch;
