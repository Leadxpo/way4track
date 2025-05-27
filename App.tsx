import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loadData, removeData } from "./src/Utils/appData";
import SplashScreen from 'react-native-splash-screen';
import { Linking } from 'react-native';
// Import Screens
import About from './src/screens/Staffs/about';
import Assets from './src/screens/Staffs/assets';
import AddAsset from './src/screens/Staffs/addAsset';
import EditAsset from './src/screens/Staffs/editAsset';
import AssetDetails from './src/screens/Staffs/assetDetails';
import Appointment from './src/screens/Staffs/appoinment';
import AppointmentDetails from './src/screens/Staffs/appointmentDetails';
import AddAppointment from './src/screens/Staffs/addApointment';
import WorkDetails from './src/screens/Staffs/WorkDetails';
// import EditAppointment from './src/screens/Staffs/editAppointment';
import Branch from './src/screens/Staffs/branch';
import AddBranch from './src/screens/Staffs/addBranch';
import EditBranch from './src/screens/Staffs/editBranch';
import BranchDetails from './src/screens/Staffs/branchDetails';
import Bank from './src/screens/Staffs/banks';
import AddBank from './src/screens/Staffs/addBank';
import EditBank from './src/screens/Staffs/editBank';
import TechWorks from './src/screens/Staffs/techWorks';
// import BankDetails from './src/screens/Staffs/bankDetails';
import Clients from './src/screens/Staffs/clients';
import AddClient from './src/screens/Staffs/addClient';
import EditClient from './src/screens/Staffs/editClient';
import ClientDetails from './src/screens/Staffs/clientDetails';
import Estimate from './src/screens/Staffs/estimats';
import AddEstimate from './src/screens/Staffs/createEstimation';
import EstimateDetails from './src/screens/Staffs/estimationDetails';
import EditEstimate from './src/screens/Staffs/editEstimation';
import Home from './src/screens/Staffs/home';
import Home_CEO from './src/screens/Staffs/home_CEO';
import Home_HR from './src/screens/Staffs/home_HR';
import Home_BranchManager from './src/screens/Staffs/home_branchManager';
import Home_WarehouseManager from './src/screens/Staffs/home_warhouseManager';
import Home_Technician from './src/screens/Staffs/home_technician';
import Home_SalesMen from './src/screens/Staffs/home_salesMan';
import Home_SubDealerStaff from './src/screens/Staffs/home_subdealerStaff';
import Branch_WarhouseManager from './src/screens/Staffs/branch_warhouseManager';
import Branch_HR from './src/screens/Staffs/branch_HR';
import Login from './src/screens/Staffs/login';
import Notification from './src/screens/Staffs/notification';
import Profile from './src/screens/Staffs/profile';
import ProfileSubStaff from './src/screens/Staffs/profileSubStaff';
import PaymentSubStaffWorks from './src/screens/Staffs/paymentSubStaffWorks';
import SubStaffWorks from './src/screens/Staffs/subStaffWorks';
import Products from './src/screens/Staffs/products';
import ProductDetails from './src/screens/Staffs/productDetails';
import AddProducts from './src/screens/Staffs/addProduct';
import EditProduct from './src/screens/Staffs/editProduct';
import ProductsAssign from './src/screens/Staffs/productAssign';
import ProductAssignDetails from './src/screens/Staffs/productAssignDetails';
import AddProductAssign from './src/screens/Staffs/addProductAssign';
// import EditProductAssign from './src/screens/Staffs/editProductAssign';
import Report from './src/screens/Staffs/reports';
import RequestRaise from './src/screens/Staffs/requestRaise';
import RequestRaiseDetails from './src/screens/Staffs/requestRaiseDetails';
import AddRequestRaise from './src/screens/Staffs/addRequest';
import EditRequestRaise from './src/screens/Staffs/editReqestRaise';
import RoleRedirector from './src/screens/Staffs/roleRedirector';
import Staff from './src/screens/Staffs/staff';
import AddStaff from './src/screens/Staffs/addStaff';
import EditStaff from './src/screens/Staffs/editStaff';
import StaffDetails from './src/screens/Staffs/staffDetails';
import SubDealers from './src/screens/Staffs/subdealer';
import AddSubDealer from './src/screens/Staffs/addSubdealer';
import EditSubDealer from './src/screens/Staffs/editSubdealer';
import Invoices from './src/screens/Staffs/invoice';
import AddInvoice from './src/screens/Staffs/createInvoice';
import InvoiceDetails from './src/screens/Staffs/invoiceDetails';
import Reciept from './src/screens/Staffs/reciept';
import RecieptDetails from './src/screens/Staffs/recieptDetails';
import SubDealerDetails from './src/screens/Staffs/subDealerDetails';
import Splash from './src/screens/Staffs/splash';
import Tickets from './src/screens/Staffs/tickets';
import AddTickets from './src/screens/Staffs/addTicket';
import UpcommingWorks from './src/screens/Staffs/upcommingWorks';
import WorkAllocation from './src/screens/Staffs/workAllocation';
import Hiring from './src/screens/Staffs/hiring';
import HiringDetails from './src/screens/Staffs/hiringDetails';
import AddHiring from './src/screens/Staffs/createHiring';
import EditHiring from './src/screens/Staffs/editHiring';
import EditSubdealer from './src/screens/Staffs/editSubdealer';
import AddProduct from './src/screens/Staffs/addProduct';
import Vendors from './src/screens/Staffs/vendors';
import AddVendor from './src/screens/Staffs/addVendor';
import EditVendor from './src/screens/Staffs/editVendor';
import VendorDetails from './src/screens/Staffs/vendorDetails';
import Voucher from './src/screens/Staffs/vouchers';
import VoucherDetails from './src/screens/Staffs/voucherDetails';
import CreateVoucher from './src/screens/Staffs/createVouchers';
import DayBook from './src/screens/Staffs/dayBook';
import Ledger from './src/screens/Staffs/ledger';
import Payments from './src/screens/Staffs/payments';
import WorkPayment from './src/screens/Staffs/paymentWorks';
import Purchase from './src/screens/Staffs/purchase';
import Attendence from './src/screens/Staffs/attendence';
import Payrole from './src/screens/Staffs/payrole';
import StaffPermission from './src/screens/Staffs/permision';
import Visit_ClientInfo from './src/screens/Staffs/visit_clientInfo';
import Visit_ProductInfo from './src/screens/Staffs/visit_productInfo';
import DeviceInstall_ClientInfo from './src/screens/Staffs/deviceInstall_clientInfo';
import DeviceInstall_ProductInfo from './src/screens/Staffs/deviceInstall_productInfo';
import DeviceInstall_VechileInfo from './src/screens/Staffs/deviceInstall_vechileInfo';
import ProductTech from './src/screens/Staffs/productTech';
import InstallationProcessing from './src/screens/Staffs/installingProcessing';
import InstallDeviceOverview from './src/screens/Staffs/installDeviceOverview';
import InstallSuccessfully from './src/screens/Staffs/installSuccessfully';
import SubdealerStaffWorks from './src/screens/Staffs/subdealerStaffWorks';
import SubStaffWorkDetails from './src/screens/Staffs/subStaffWorkDetails';
import VisitList from './src/screens/Staffs/visitList';
import VisitSuccessfully from './src/screens/Staffs/visitSuccessfully';
import SalesVisitOverview from './src/screens/Staffs/salesVisitOverview';
import PaymentScanner from './src/screens/Staffs/paymentScanner';
import TechnicianWorks from './src/screens/Staffs/technicianWorks';
import TrackingStaff from './src/screens/Staffs/trackingDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Avatar } from 'react-native-paper';

import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import CustomStaffDrawerContents from './src/components/CustomStaffDrawerContents';

// Initialize Navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const NAVIGATION_IDS = ["Home", "tracking"];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === "tracking") {
    return 'way4track://TrackingStaff';
  }
  if (navigationId === "home") {
    return 'way4track://BottomHome';
  }

  return null
}

const linking = {
  prefixes: ['way4track://'],  // Ensure this matches AndroidManifest.xml
  config: {
    screens: {
      TrackingStaff: 'tracking',  // Matches "host" in AndroidManifest.xml
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);

    });
    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
}
const StackNavigator = () => {
  const [role, setRole] = useState("CEO"); // Initial role  useEffect(() => {
  // const navigation=useNavigation()
  //   useEffect(() => {
  //     const checkRole = async () => {
  //       const fetchedRole = await loadData("role");
  //       setRole(fetchedRole);
  //       if (fetchedRole === "Technician") {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "BottomHome" }],
  //         });
  //       } else if (fetchedRole === "SalesMan") {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "BottomHome" }],
  //         });
  //       } else {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "Login" }],
  //         });
  //       }
  //     };

  //     checkRole();
  //   }, []);


  return (
    <Stack.Navigator initialRouteName="Splash"
      screenListeners={{
        state: async (e) => {
          // Log navigation changes if needed
          const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
          setRole(fetchedRole);

        },
      }}
    >
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="RoleRedirector" component={RoleRedirector} options={{ headerShown: false }} />
      <Stack.Screen name="TechBottomStack" component={TechnicianBottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SalesBottomStack" component={SaleBottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SubdealerStaffBottomStack" component={SubdealerStaffBottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SubdealerStaffWorks" component={SubdealerStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Attendence" component={Attendence} options={{ headerShown: false }} />
      <Stack.Screen name="WorkPayment" component={WorkPayment} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ClientInfo" component={Visit_ClientInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ProductInfo" component={Visit_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="WorkDetails" component={WorkDetails} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ClientInfo" component={DeviceInstall_ClientInfo} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ProductInfo" component={DeviceInstall_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="SalesVisitOverview" component={SalesVisitOverview} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_VechileInfo" component={DeviceInstall_VechileInfo} options={{ headerShown: true }} />
      <Stack.Screen name="InstallDeviceOverview" component={InstallDeviceOverview} options={{ headerShown: true }} />
      <Stack.Screen name="ProductTech" component={ProductTech} options={{ headerShown: true }} />
      <Stack.Screen name="InstallationProcessing" component={InstallationProcessing} options={{ headerShown: true }} />
      <Stack.Screen name="InstallSuccessfully" component={InstallSuccessfully} options={{ headerShown: true }} />
      <Stack.Screen name="VisitSuccessfully" component={VisitSuccessfully} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileSubStaff" component={ProfileSubStaff} options={{ headerShown: false }} />
      <Stack.Screen name="UpcommingWorks" component={UpcommingWorks} options={{ headerShown: true }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="WorkAllocation" component={WorkAllocation} options={{ headerShown: false }} />
      <Stack.Screen name="TechWorks" component={TechWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Tickets" component={Tickets} options={{ headerShown: false }} />
      <Stack.Screen name="AddTickets" component={AddTickets} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentSubStaffWorks" component={PaymentSubStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="SubStaffWorks" component={SubStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="SubStaffWorkDetails" component={SubStaffWorkDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }} />
      <Stack.Screen name="Purchase" component={Purchase} options={{ headerShown: false }} />
      <Stack.Screen name="Work" component={TechnicianWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Stack.Screen name="RequestRaiseDetails" component={RequestRaiseDetails} options={{ headerShown: true }} />
      <Stack.Screen name="RequestRaise" component={RequestRaise} options={{ headerShown: false }} />
      <Stack.Screen name="AddRequestRaise" component={AddRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="EditRequestRaise" component={EditRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="TechnicianWork" component={TechnicianWorks} options={{ headerShown: true }} />
      <Stack.Screen name="TrackingStaff" component={TrackingStaff} options={{ headerShown: true }} />
      <Stack.Screen name="PaymentScanner" component={PaymentScanner} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const SalesStackNavigator = () => {
  const [role, setRole] = useState("")
  const [permissions, setPermissions] = useState([])
  return (
    <Stack.Navigator initialRouteName="SaleHome"
      screenListeners={{
        state: async (e) => {
          // Log navigation changes if needed
          const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
          setRole(fetchedRole);
        },
      }}
    >
      <Stack.Screen name="SaleHome" component={Home_SalesMen} options={{ headerShown: false }} />
      <Stack.Screen name="Attendence" component={Attendence} options={{ headerShown: false }} />
      <Stack.Screen name="WorkPayment" component={WorkPayment} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ClientInfo" component={Visit_ClientInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ProductInfo" component={Visit_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="VisitSuccessfully" component={VisitSuccessfully} options={{ headerShown: true }} />
      <Stack.Screen name="SalesVisitOverview" component={SalesVisitOverview} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="WorkAllocation" component={WorkAllocation} options={{ headerShown: false }} />
      <Stack.Screen name="TechWorks" component={TechWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Tickets" component={Tickets} options={{ headerShown: false }} />
      <Stack.Screen name="AddTickets" component={AddTickets} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }} />
      <Stack.Screen name="Work" component={TechnicianWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Stack.Screen name="RequestRaiseDetails" component={RequestRaiseDetails} options={{ headerShown: true }} />
      <Stack.Screen name="RequestRaise" component={RequestRaise} options={{ headerShown: false }} />
      <Stack.Screen name="AddRequestRaise" component={AddRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="EditRequestRaise" component={EditRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="TechnicianWork" component={TechnicianWorks} options={{ headerShown: true }} />
      <Stack.Screen name="TrackingStaff" component={TrackingStaff} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const TechnicianBottomNavigator = () => {

  return (
    <BottomTab.Navigator
      initialRouteName='StackHome'
      // screenListeners={{
      //   state: async (e) => {
      //     // Log navigation changes if needed
      //     const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
      //     setRole(fetchedRole);

      //   },
      // }}
      screenOptions={{
        tabBarShowLabel: true, headerTitleStyle: { fontSize: 18, },
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <BottomTab.Screen
        name='StackHome'

        component={TechnicianStackNavigator}
        options={{
          headerShown: false, title: "Home", tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Work"
        component={TechnicianWorks}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lead-pencil" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name=" "
        component={DeviceInstall_ClientInfo}
        options={{
          headerShown: false,
          tabBarStyle: { elevation: 3 },
          tabBarIcon: ({ color, size }) => (
            <Avatar.Icon icon={"plus"} size={40} color='#f3f3f3' style={{ backgroundColor: "green", top: 10 }} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RequestRaise"
        component={RequestRaise}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff", title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const SubdealerStaffBottomNavigator = () => {

  return (
    <BottomTab.Navigator
      initialRouteName='StackHome'
      // screenListeners={{
      //   state: async (e) => {
      //     // Log navigation changes if needed
      //     const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
      //     setRole(fetchedRole);

      //   },
      // }}
      screenOptions={{
        tabBarShowLabel: true, headerTitleStyle: { fontSize: 18, },
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <BottomTab.Screen
        name='StackHome'

        component={SubdealerStaffStackNavigator}
        options={{
          headerShown: false, title: "Home", tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Work"
        component={SubStaffWorks}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",title:'Works',

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lead-pencil" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name=" "
        component={DeviceInstall_ClientInfo}
        options={{
          headerShown: false,
          tabBarStyle: { elevation: 3 },
          tabBarIcon: ({ color, size }) => (
            <Avatar.Icon icon={"plus"} size={40} color='#f3f3f3' style={{ backgroundColor: "green", top: 10 }} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProductTech"
        component={ProductTech}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff", title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileProfileSubStaff"
        component={ProfileSubStaff}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",title:"Profile",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TechnicianStackNavigator = () => {
  const [role, setRole] = useState("")
  const [permissions, setPermissions] = useState([])
  return (
    <Stack.Navigator initialRouteName="TechHome"
      screenListeners={{
        state: async (e) => {
          // Log navigation changes if needed
          const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
          setRole(fetchedRole);


        },
      }}
    >
      <Stack.Screen name="TechHome" component={Home_Technician} options={{ headerShown: false }} />
      <Stack.Screen name="Attendence" component={Attendence} options={{ headerShown: false }} />
      <Stack.Screen name="WorkPayment" component={WorkPayment} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ClientInfo" component={Visit_ClientInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ProductInfo" component={Visit_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="WorkDetails" component={WorkDetails} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ClientInfo" component={DeviceInstall_ClientInfo} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ProductInfo" component={DeviceInstall_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_VechileInfo" component={DeviceInstall_VechileInfo} options={{ headerShown: true }} />
      <Stack.Screen name="InstallDeviceOverview" component={InstallDeviceOverview} options={{ headerShown: true }} />
      <Stack.Screen name="ProductTech" component={ProductTech} options={{ headerShown: true }} />
      <Stack.Screen name="InstallationProcessing" component={InstallationProcessing} options={{ headerShown: true }} />
      <Stack.Screen name="InstallSuccessfully" component={InstallSuccessfully} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="UpcommingWorks" component={UpcommingWorks} options={{ headerShown: true }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="WorkAllocation" component={WorkAllocation} options={{ headerShown: false }} />
      <Stack.Screen name="TechWorks" component={TechWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Tickets" component={Tickets} options={{ headerShown: false }} />
      <Stack.Screen name="AddTickets" component={AddTickets} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }} />
      <Stack.Screen name="Purchase" component={Purchase} options={{ headerShown: false }} />
      <Stack.Screen name="Work" component={TechnicianWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Stack.Screen name="RequestRaiseDetails" component={RequestRaiseDetails} options={{ headerShown: true }} />
      <Stack.Screen name="RequestRaise" component={RequestRaise} options={{ headerShown: false }} />
      <Stack.Screen name="AddRequestRaise" component={AddRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="EditRequestRaise" component={EditRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="TechnicianWork" component={TechnicianWorks} options={{ headerShown: true }} />
      <Stack.Screen name="TrackingStaff" component={TrackingStaff} options={{ headerShown: true }} />
      <Stack.Screen name="PaymentScanner" component={PaymentScanner} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const SubdealerStaffStackNavigator = () => {
  const [role, setRole] = useState("")
  const [permissions, setPermissions] = useState([])
  return (
    <Stack.Navigator initialRouteName="SubdealerStaffHome"
      screenListeners={{
        state: async (e) => {
          // Log navigation changes if needed
          const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
          setRole(fetchedRole);
        },
      }}
    >
      <Stack.Screen name="SubdealerStaffHome" component={Home_SubDealerStaff} options={{ headerShown: false }} />
      <Stack.Screen name="Attendence" component={Attendence} options={{ headerShown: false }} />
      <Stack.Screen name="WorkPayment" component={WorkPayment} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ClientInfo" component={Visit_ClientInfo} options={{ headerShown: false }} />
      <Stack.Screen name="Visit_ProductInfo" component={Visit_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="WorkDetails" component={WorkDetails} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ClientInfo" component={DeviceInstall_ClientInfo} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_ProductInfo" component={DeviceInstall_ProductInfo} options={{ headerShown: true }} />
      <Stack.Screen name="DeviceInstall_VechileInfo" component={DeviceInstall_VechileInfo} options={{ headerShown: true }} />
      <Stack.Screen name="InstallDeviceOverview" component={InstallDeviceOverview} options={{ headerShown: true }} />
      <Stack.Screen name="ProductTech" component={ProductTech} options={{ headerShown: true }} />
      <Stack.Screen name="InstallationProcessing" component={InstallationProcessing} options={{ headerShown: true }} />
      <Stack.Screen name="InstallSuccessfully" component={InstallSuccessfully} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileSubStaff" component={ProfileSubStaff} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentSubStaffWorks" component={PaymentSubStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="SubStaffWorks" component={SubStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="SubStaffWorkDetails" component={SubStaffWorkDetails} options={{ headerShown: false }} />
      <Stack.Screen name="UpcommingWorks" component={UpcommingWorks} options={{ headerShown: true }} />
      <Stack.Screen name="About" component={About} options={{ headerShown: true }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="WorkAllocation" component={WorkAllocation} options={{ headerShown: false }} />
      <Stack.Screen name="TechWorks" component={TechWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Tickets" component={Tickets} options={{ headerShown: false }} />
      <Stack.Screen name="AddTickets" component={AddTickets} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }} />
      <Stack.Screen name="Purchase" component={Purchase} options={{ headerShown: false }} />
      <Stack.Screen name="Work" component={TechnicianWorks} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Stack.Screen name="RequestRaiseDetails" component={RequestRaiseDetails} options={{ headerShown: true }} />
      <Stack.Screen name="RequestRaise" component={RequestRaise} options={{ headerShown: false }} />
      <Stack.Screen name="AddRequestRaise" component={AddRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="EditRequestRaise" component={EditRequestRaise} options={{ headerShown: true }} />
      <Stack.Screen name="TechnicianWork" component={TechnicianWorks} options={{ headerShown: true }} />
      <Stack.Screen name="SubdealerStaffWorks" component={SubdealerStaffWorks} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentScanner" component={PaymentScanner} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const SaleBottomNavigator = () => {

  return (
    <BottomTab.Navigator
      initialRouteName='StackHome'
      // screenListeners={{
      //   state: async (e) => {
      //     // Log navigation changes if needed
      //     const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
      //     setRole(fetchedRole);

      //   },
      // }}
      screenOptions={{
        tabBarShowLabel: true, headerTitleStyle: { fontSize: 18, },
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <BottomTab.Screen
        name='StackHome'

        component={SalesStackNavigator}
        options={{
          headerShown: false, title: "Home", tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Sales"
        component={VisitList}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lead-pencil" color={color} size={size} />
          ),
        }}
      />

      <BottomTab.Screen
        name=" "
        component={Visit_ClientInfo}
        options={{
          headerShown: false,
          tabBarStyle: { elevation: 3 },
          tabBarIcon: ({ color, size }) => (
            <Avatar.Icon icon={"plus"} size={40} color='#f3f3f3' style={{ backgroundColor: "green", top: 10 }} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RequestRaise"
        component={RequestRaise}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff", title: 'Requests',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false, tabBarActiveTintColor: '#f3f3f3', tabBarActiveBackgroundColor: "green",
          tabBarInactiveTintColor: '#808080', tabBarInactiveBackgroundColor: "#ffffff",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const DrawerNavigator = () => {
  const [role, setRole] = useState("")
  const [permissions, setPermissions] = useState([])
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomStaffDrawerContents {...props} />}
      screenListeners={{
        state: async (e) => {
          // Log navigation changes if needed
          const fetchedRole = await loadData("role"); // Replace with your role-fetching logic
          const rrr = await loadData("staffPermissions")
          setPermissions(prev => prev = rrr || []);
          setRole(fetchedRole);
        },
      }} screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#FFE5E5', // background color for selected item
        drawerActiveTintColor: '#FF4D4D',       // text color for selected item
        drawerInactiveTintColor: '#222222',        // optional: text color for non-selected items
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false, title: "HOME" }} />
      {role === "sub dealer staff" &&
        <Drawer.Screen name="SubdealerStaffWorks" component={SubdealerStaffWorks} options={{ headerShown: false, title: "StaffWork" }} />
      }
      <Drawer.Screen name="NewWork" component={DeviceInstall_ClientInfo} options={{ headerShown: false }} />
      {role === "sub dealer staff" &&
        <Drawer.Screen name="PaymentSubStaffWorks" component={PaymentSubStaffWorks} options={{ headerShown: false, title: "Payments" }} />
      }
      {role === "sub dealer staff" &&
        <Drawer.Screen name="SubStaffWorks" component={SubStaffWorks} options={{ headerShown: false, title: "Works" }} />
      }
      {role === "Technician" &&
        <Drawer.Screen name="TechWorks" component={TechWorks} options={{ headerShown: false, title: "Payments" }} />
      }
      <Drawer.Screen name="Tickets" component={Tickets} options={{ headerShown: false }} />
      {role === "Technician" &&
        <Drawer.Screen name="RequestRaise" component={RequestRaise} options={{ headerShown: false }} />
      }
            {role === "Technician" &&
      <Drawer.Screen name="TechnicianWork" component={TechnicianWorks} options={{ headerShown: false,title:'Works'}} />
            }

      <Drawer.Screen name="ProductTech" component={ProductTech} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

// Main App Component
export default function App() {

  useEffect(() => {
    async function requestUserPermission() {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM token:', token);
      }
    };

    requestUserPermission()
  }, [])

  useEffect(() => {
    // Hide splash screen once React Native is ready
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator animating />}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}