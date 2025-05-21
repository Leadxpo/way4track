import React, { useState,useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Card, Menu, Badge, FAB, Provider, Surface, } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments} from "../../Redux/Actions/appointmentAction";
import { drawLabel } from "../../Redux/Actions/drawAction";

const Appointment = ({ navigation }) => {
    const dispatch = useDispatch();

    const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  
    const { loading:appointmentLoading, appointments, error:appointmentError } = useSelector(state => state.appointmentsReducer);
    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
      const loadStaffloginData = async () => {
          const rrr = await loadData("staffPermissions")
          setPermissions(prev => prev = rrr ||permissions);
          console.log(permissions)
      };
      loadStaffloginData();
  }, []);
  

    const [menuVisible, setMenuVisible] = useState(false);
    const [visibleMenus, setVisibleMenus] = useState({});
    const [selectedItem, setSelectedItem] = useState("All");
    const [branch, setBranch] = useState("");

    const hasAddAppointmentsPermission = permissions.some(p => p.name === "appointments" && p.add);
    const hasEditAppointmentsPermission = permissions.some(p => p.name === "appointments" && p.edit);
    const hasDeleteAppointmentsPermission = permissions.some(p => p.name === "appointments" && p.delete);
  
    const tabs = [
        { id: 1, name: 'All', count: 15 },
        { id: 2, name: 'Visakhapatnam', count: 5 },
        { id: 3, name: 'Hyderabad', count: 10 },
        { id: 4, name: 'Vijayawada', count: 3 },
        { id: 5, name: 'Kakinada', count: 2 },
    ];

    const toggleMenu = (id) => {
        setVisibleMenus((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const closeMenu = (id) => {
        setVisibleMenus((prevState) => ({
            ...prevState,
            [id]: false,
        }));
    };

    const handleMenuAction = (action, id) => {
        closeMenu(id);
        console.log(`${action} clicked for appointment ${id}`);
    };

    const filteredData = appointments.filter((item) =>
        item.branch.toLowerCase() === branch.toLowerCase()
    );


    const renderAppointment = ({ item, index }) => (
        <Card style={styles.card} key={index}>
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.titleText}>No.{index + 1}</Text>
                    <Text style={styles.infoText}>Branch: {item.branch}</Text>
                    <Text style={styles.infoText}>Appointment Time: {item.appointmentTitle}</Text>
                    <Text style={styles.infoText}>Type: {item.type}</Text>
                    <Text style={styles.infoText}>Assign Person: {item.assignPerson}</Text>
                    <Text style={styles.infoText}>Slot: {item.slot}</Text>
                    <Text style={styles.infoText}>Status: {item.status}</Text>
                </View>
                <Menu
                    visible={menuVisible && selectedItem === item.id}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <TouchableOpacity
                            onPress={() => {
                                setMenuVisible(true);
                                setSelectedItem(item.id);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="dots-vertical"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    }
                >
                    {hasEditAppointmentsPermission &&<Menu.Item
                        onPress={() => navigation.navigate("EditApointment")}
                        title="Edit"
                    />}
                    {hasDeleteAppointmentsPermission &&<Menu.Item titleStyle={{ color: "green" }} title='Delete' onPress={() => {
                        Alert.alert(`Delete ${item.name} Ticket`, " Are you sure you want to delete this ticket from the database? Once deleted, you will no longer be able to access any records or perform operations related to this Ticket.", [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Delete", onPress: () => {
                                    Alert.alert("Yes", `${item.name} with clienID ${item.subdealer_id} deleted`);
                                }
                            }
                        ]);
                    }} />}
                    <Menu.Item
                        onPress={() => navigation.navigate("AppointmentDetails", { appointmentDetails: item })}
                        title="Details"
                    />
                </Menu>
            </View>
        </Card>
    );

    return (
        <Provider>
            <Header />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Appointment</Text>
                    <FAB
                        icon="plus" visible={hasAddAppointmentsPermission}
                        style={styles.fab}
                        onPress={() => navigation.navigate("AddAppointment")}
                        label="Add Appointment"
                    />
                </View>

                {/* Tabs */}
                <Surface style={styles.tabsContainer}>

                    <FlatList
                        data={tabs}
                        style={{ paddingVertical: 8 }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.id} style={styles.tabItem} onPress={() => setBranch(item.name)}>
                                <Text style={[styles.tabText, index === 0 && styles.activeTab]}>
                                    {item.name}
                                </Text>
                                {item.count > 0 && (
                                    <Badge style={styles.badge} size={24}>{item.count}</Badge>
                                )}
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />


                </Surface>

                {/* Appointment List */}
                <FlatList
                    data={branch != "All" ? filteredData : appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAppointment}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    fab: {
        backgroundColor: '#4CAF50',
        elevation: 4,
    },
    tabsContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 8, justifyContent: "center",
        marginBottom: 16, height: 50
    },
    tabText: {
        fontSize: 14,
        color: '#333333',
    },
    activeTab: {
        color: '#4CAF50',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#4CAF50',
    },
    listContainer: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        elevation: 4,
        padding: 16,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 18,
        color: '#4CAF50', fontFamily: "Parkinsans-SemiBold",
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 4,
    },
    tabItem: {
        flexDirection: 'row', height: 40,
        alignItems: 'center', marginHorizontal: 3,
    },
    tabText: {
        fontSize: 14,
        color: '#333',
        marginRight: 4, // Space between text and badge
    },
    activeTab: {
        color: '#4CAF50',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#4CAF50',
    },
    badge: {
        backgroundColor: '#FF5722', // Badge background color (orange-red)
        color: '#FFFFFF',          // Badge text color
        fontSize: 10, width: 24, height: 24,
        left: -15, top: -15, verticalAlign: "middle",
        alignItems: 'center', textAlign: "center",
        justifyContent: 'center',
    },

});

export default Appointment;
