import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card,Modal } from 'react-native-paper';
import Svg, { Rect } from "react-native-svg";

import Header from '../../components/userHeader';
import { staffDataHook } from '../../Utils/permissions';
import { intiateTechnician_dashboard } from '../../Redux/Actions/dashboard';


const HomeSalesMan = ({ navigation }) => {
  const dispatch = useDispatch();
  const { Technician_homeInfo } = useSelector(state => state.Technician_homeInfoReducer);
  const attendanceData = [
    { day: 1, status: "Absent" },
    { day: 2, status: "Absent" },
    { day: 3, status: "Present" },
    { day: 4, status: "Absent" },
    { day: 5, status: "Absent" },
  ];

  const [technicianData, setTechnicianData] = useState(null);
  const [totalWorkAllocation, setTotalWorkAllocation] = useState({ totalAppointments: 0, totalSuccessAppointments: 0 });
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [paymentWorkAllocation, setPaymentWorkAllocation] = useState(null);
  const [upCommingWorkAllocation, setUpCommingWorkAllocation] = useState(null);
  const [totalPendingAndSucessTickets, setTotalPendingAndSucessTickets] = useState(null);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-based, so we add 1
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}`; // Adding a leading zero if month is less than 10
    console.log("formattedDate : ", formattedDate)
    return formattedDate
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicianDetails = await staffDataHook();

        setTechnicianData(technicianDetails);

        const Technician_dashboardPayload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
          StaffId: technicianDetails?.staffID,
          date: getTodayDate()
        };

        dispatch(intiateTechnician_dashboard(Technician_dashboardPayload));
      } catch (error) {
        console.error('Error fetching technician data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (Technician_homeInfo) {
      const workAllocationResult = Technician_homeInfo?.totalWorkAllocation?.reduce((acc, curr) => {
        acc.totalAppointments += parseInt(curr.totalAppointments || 0, 10);
        acc.totalSuccessAppointments += parseInt(curr.totalSuccessAppointments || 0, 10);
        return acc;
      }, { totalAppointments: 0, totalSuccessAppointments: 0 });

      setTotalWorkAllocation(workAllocationResult);
      setPaymentWorkAllocation(Technician_homeInfo?.paymentWorkAllocation);
      setUpCommingWorkAllocation(Technician_homeInfo?.upCommingWorkAllocation);
      setTotalPendingAndSucessTickets(Technician_homeInfo?.totalPendingAndSucessTickets);

      const transformedAttendance = Technician_homeInfo?.staffAttendance?.map(item => ({
        day: new Date(item.day).getDate(),
        status: item.status
      })) || attendanceData;
      setStaffAttendance(transformedAttendance);

      const totalDays = transformedAttendance.length;
      const presentDays = transformedAttendance.filter(record => record.status === "Present").length;
      setAttendancePercentage(totalDays > 0 ? (presentDays / totalDays) * 100 : 0);
    }
  }, [Technician_homeInfo]);

  const chartHeight = 50; // Total SVG height
  const attendenceBarWidth = 6;
  const upcommingBarWidth = 20;
  const barSpacing = 10;
  const chartWidth = staffAttendance.length * (attendenceBarWidth + barSpacing);
  const upcommingChartWidth = 4 * (upcommingBarWidth + barSpacing);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate("Attendence")} style={[styles.cardPink,{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]}>
          <View style={{flex:1}}> 
          <Text style={styles.cardTitle}>Attendance</Text>
          <Text style={styles.dataText}>{attendancePercentage.toFixed(2)}%</Text>
          </View>
          <View style={[styles.barChartContainer, { overflow: 'scroll' }]}>
            <Svg height="100" width={100}>
              {staffAttendance.map((item, index) => (
                <Rect
                  key={index}
                  x={index * (attendenceBarWidth + barSpacing)}
                  y={20}
                  width={attendenceBarWidth}
                  height={30}
                  fill={item.status === "Present" ? "#ff88b8" : "#ffc5dd"}
                  rx="3"
                />
              ))}
            </Svg>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardBeige, {height:120, flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]} onPress={() => navigation.navigate("TechnicianWorks")}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Visits</Text>
            <Text style={styles.dataText}>{totalWorkAllocation?.totalSuccessAppointments ?? 0}/{totalWorkAllocation?.totalAppointments ?? 0}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 20 }}>⚪ {totalWorkAllocation?.totalPendingAppointments ?? 0} Pending Leads</Text>
            <Text style={{ marginBottom: 10 }}>🔵 {totalWorkAllocation?.totalSuccessAppointments ?? 0} Generated Leads</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.cardGreen, { height:120,flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]}>
          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>Payments</Text>
            <Text style={styles.dataText}>{paymentWorkAllocation?.totalSuccessPayment ?? 0}/{parseInt(paymentWorkAllocation?.totalPendingPayment ?? 0) + parseInt(paymentWorkAllocation?.totalSuccessPayment ?? 0)}</Text>
          </View>
          <View style={{ flex: 1 }}>

            <Text style={{ marginBottom: 20 }}>⚪ {paymentWorkAllocation?.totalPendingPayment ?? 0} Payment Pending</Text>
            <Text style={{ marginBottom: 10 }}>🔵 {paymentWorkAllocation?.totalSuccessPayment ?? 0} Payment Done</Text>
          </View>
        </View>

        {/* <View style={[styles.cardBlue, {flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]}>

          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { flex: 2 }]}>Upcoming Works</Text>
            <Text style={[styles.dataText, { flex: 1 }]}>{upCommingWorkAllocation?.totalWorks ?? 0}</Text>
          </View>
          <View style={{flex:1, overflow: 'scroll' }}>
            <Svg height="100" width={upcommingChartWidth}>
              {[20,40,10,50,100].map((item, index) => (
                <Rect
                  key={index}
                  x={index * (upcommingBarWidth + barSpacing)} 
                  y={20}
                  width={upcommingBarWidth}
                  height={item}
                  fill={"#4caf50"}
                  rx="8"
                />
              ))}
            </Svg>
          </View>
        </View>
 */}
        <View style={[styles.cardBeige, { flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]}>
          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>Total Tickets</Text>
            <Text style={styles.dataText}>{totalPendingAndSucessTickets?.totalSuccessTickets ?? 0}/{totalPendingAndSucessTickets?.totalTickets ?? 0}</Text>
          </View>
          <View style={{ flex: 1 }}>

            <Text style={[styles.legendText,{marginBottom:30,backgroundColor:'#5ce854',borderRadius:15,padding:5,color:'#f3f3f3',fontWeight:600}]}>🟢   {totalPendingAndSucessTickets?.totalSuccessTickets ?? 0} Done</Text>
            <Text style={[styles.legendText,{backgroundColor:'#d8e8db',borderRadius:15,padding:5,color:'#333333',fontWeight:600}]}>⚪ {totalPendingAndSucessTickets?.totalPendingTickets ?? 0} Pending</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  buttonGreen: { backgroundColor: 'green', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 },
  buttonGray: { backgroundColor: '#d3d3d3', padding: 10, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },

  cardPink: { backgroundColor: '#ffe5f6', paddingTop: 15, paddingLeft: 15, borderRadius: 5, marginBottom: 10 },
  cardBeige: { backgroundColor: '#ffeeec', padding: 15, borderRadius: 5, marginBottom: 10 },
  cardGreen: { backgroundColor: '#ecffeb', padding: 15, borderRadius: 5, marginBottom: 10 },
  cardBlue: { backgroundColor: '#e9f6ff', padding: 15, borderRadius: 5, marginBottom: 10 },
  dataText: { fontSize: 30, fontWeight: 'bold' },
  legendText: { fontSize: 14, marginBottom: 10 },
  ticketContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  ticketDone: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  ticketPending: { fontSize: 14, color: '#D3D3D3', fontWeight: 'bold' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  attendanceText: { fontSize: 24, fontWeight: 'bold', color: '#d63384' },
  dataText: { fontSize: 30, fontWeight: 'bold' },
  card: {
    marginVertical: 15,
    borderRadius: 8, backgroundColor: "#ffffff",
    elevation: 3, width: "90%", alignSelf: "center"
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    padding: 10,
  },
  details: {
    marginLeft: 10,
  },


  barChartContainer: { width: "100%", flexDirection: 'row',flex:1, justifyContent: 'center', marginTop: 10 },
});


export default HomeSalesMan;
