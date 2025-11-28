import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadData, saveData } from '../../Utils/appData'
import { useDispatch } from 'react-redux';
import store from '../../Redux/store';
import { getStaffById } from '../../Redux/Actions/userAction';
import { fetchTickets } from '../../Redux/Actions/ticketAction';
import { staffById } from '../../Redux/Actions/staffAction';

const Splash = () => {
    const [progress, setProgress] = useState(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    console.log("aaa")
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const login = await loadData("isLogin");
                const staffId = await loadData("staffID");
                console.log("login Auth -", login);
                console.log("login Auth -", staffId);
                if (login) {
                    await saveData('isLogin', true);
                    // const staffByIdPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4", staffId: staffId  }
                    // await dispatch(staffById(staffByIdPayload));
                    // const state = store.getState(); // Assuming you have access to the Redux store
                    // const { staffByIdInfo } = state.staffDetails;
                    // if (staffByIdInfo) {
                    //     await saveData('role', staffByIdInfo.designation);
                    //     await saveData('staffID', staffByIdInfo.staffId);
                    //     await saveData('ID', staffByIdInfo.id);
                    //     await saveData('branchId', staffByIdInfo.id);
                    //     await saveData('staffName', staffByIdInfo.name);
                    //     await saveData('staffPhoto', staffByIdInfo.staffPhoto);
                    //     await saveData('phoneNumber', staffByIdInfo.phoneNumber);
                    //     await saveData('staffPhoto', staffByIdInfo.email);
                    //     await saveData('latitude', staffByIdInfo.latitude);
                    //     await saveData('longitude', staffByIdInfo.longitude);
                    //     await saveData('staffPermissions', staffByIdInfo.permissions[0].permissions);

                    // }
                    setTimeout(() => {
                        navigation.navigate('RoleRedirector');
                    }, 3000);
                } else {
                    // If not logged in, navigate to login
                    setTimeout(() => {
                        navigation.navigate('Login');
                    }, 3000);
                }
            } catch (e) {
                console.error('Failed to retrieve login status', e);
            }
        };
        checkLoginStatus(); // Once all dispatches are done, check login status
    }, [dispatch]);

    // const fetchStaffData = async (userId) => {
    //     try {
    //         await Promise.all([
    //             dispatch(getStaffById(userId)),
    //             dispatch(fetchPermisions(userId)),
    //             dispatch(fetchNotifications(userId)),
    //             dispatch(fetchTickets(userId)),
    //         ]);
    //     } catch (error) {
    //         console.error('Failed to fetch data:', error);
    //     }
    // };



    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.logoContainer}>
                <Image source={require('../../utilities/images/way4tracklogo.png')} style={styles.logo} />
                <ActivityIndicator size="small" color="#fa9521" style={{ marginTop: 16 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    loader: {
        marginTop: 20,
    },
});

export default Splash;
