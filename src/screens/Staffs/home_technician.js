import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Modal, FAB, Avatar } from 'react-native-paper';
import Svg, { Rect } from "react-native-svg";
import { Calendar } from "react-native-calendars";
import Header from '../../components/userHeader';
import { staffDataHook } from '../../Utils/permissions';
import { intiateTechnician_dashboard } from '../../Redux/Actions/dashboard';
import api from '../../Api/api';
import { UpdateCurrentAddress } from '../../Utils/updateLocation';

const Home_Technician = ({ navigation }) => {
  const dispatch = useDispatch();
  const getTodayDate = (selectedDate) => {
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed

    return `${year}-${month < 10 ? `0${month}` : month}`;
  }

  const { Technician_homeInfo } = useSelector(state => state.Technician_homeInfoReducer);
  const [technicianData, setTechnicianData] = useState(null);
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);
  const [installedWorksCount, setInstalledWorksCount] = useState(0);
  const [acceptWorksCount, setAcceptWorksCount] = useState(0);
  const [activateWorksCount, setActivateWorksCount] = useState(0);
  const [paymentPendingWorksCount, setPaymentPendingWorksCount] = useState(0);
  const [paymentDonedWorksCount, setPaymentDonedWorksCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  // const [paymentWorkAllocation, setPaymentWorkAllocation] = useState(null);
  const [totalPendingAndSucessTickets, setTotalPendingAndSucessTickets] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendenceDate, setAttendenceData] = useState(getTodayDate(new Date()));



  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicianDetails = await staffDataHook();

        setTechnicianData(technicianDetails);

        const Technician_dashboardPayload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
          staffId: technicianDetails?.staffID,
          date: attendenceDate
        };
        dispatch(intiateTechnician_dashboard(Technician_dashboardPayload));
      } catch (error) {
        console.error('Error fetching technician data:', error);
      }
    };
    fetchData();
  }, [dispatch, isRefresh]);

  useEffect(() => {
    setTimeout(() => {
      UpdateCurrentAddress();
    }, 3000);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const technicianDetails = await staffDataHook();

        setTechnicianData(technicianDetails);

        const Technician_attendencePayload = {
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
          staffId: technicianDetails?.staffID,
          date: attendenceDate
        };
        const { data } = await api.post(`/dashboards/staffAttendanceDetails`, Technician_attendencePayload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setStaffAttendance(data.data);
        const marks = {};
        const today = new Date(); // Get current date
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // Months are 0-based in JS
        const currentDay = today.getDate();

        staffAttendance.forEach((entry) => {
          const [year, month, day] = entry.day.split("-").map(Number); // Convert "YYYY-MM-DD" to numbers

          // Only apply marking if the entry's date is before or equal to today
          if (year < currentYear || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day <= currentDay)) {
            marks[entry.day] = {
              dots: [{ key: entry.status, color: entry.status === "P" ? "green" : "red" }],
              selected: true,
              selectedColor: entry.status === "P" ? "#d4edda" : "#f8d7da",
            };
          }
        });
        setMarkedDates(marks);
        const totalDays = staffAttendance.length;
        const presentDays = staffAttendance.filter(record => record.status === "Present").length;
        setAttendancePercentage(totalDays > 0 ? (presentDays / totalDays) * 100 : 0);

      } catch (error) {
        console.error('Error fetching technician data:', error);
      }
    };

    fetchData();
  }, [attendenceDate, isRefresh]);

  useEffect(() => {
    if (Technician_homeInfo) {
      const { acceptWorks, activateWorks, installWorks, paymentPendingWorks, paymentDonedWorks, totalPendingAndSucessTickets } = Technician_homeInfo

      setInstalledWorksCount(installWorks);
      setAcceptWorksCount(acceptWorks);
      setActivateWorksCount(activateWorks);
      setPaymentPendingWorksCount(paymentPendingWorks);
      setPaymentDonedWorksCount(paymentDonedWorks);
      setTotalPendingAndSucessTickets(totalPendingAndSucessTickets);
    }
  }, [Technician_homeInfo]);
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 99 }} onPress={() => setIsRefresh(!isRefresh)}>

        <Avatar.Icon icon={"refresh"} size={40} color='#f3f3f3' style={{ backgroundColor: "green" }}></Avatar.Icon>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Calendar
            markedDates={markedDates}
            markingType="multi-dot"
            onMonthChange={(monthObj) => {
              const newDate = `${monthObj.year}-${monthObj.month < 10 ? `0${monthObj.month}` : monthObj.month}`;
              setAttendenceData(newDate);
            }}
            onDayPress={(day) => {
              const today = new Date();
              const selectedDate = new Date(day.dateString); // Convert selected date to Date object
              const selectedAttendence = getTodayDate(day.dateString);
              setAttendenceData(selectedAttendence);
              // Allow selection only for today or past dates
              if (selectedDate <= today) {
                const attendanceRecord = staffAttendance.find((item) => {
                  return (item.day === day.dateString)
                });
                console.log("inTime :", attendanceRecord);
                setSelectedDate(attendanceRecord || null);
              }
            }}
          />

        </View>

        <View style={[styles.cardPink, { flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Attendance</Text>
            <Text style={styles.dataText}>{attendancePercentage.toFixed(2)}%</Text>
          </View>
          {/* <View style={[styles.barChartContainer, { overflow: 'scroll' }]}>
            <Svg height={chartHeight} width={chartWidth} style={{ padding: 50 }} >
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
          </View> */}
        </View>

        <TouchableOpacity style={[styles.cardBeige, { height: 120, flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]} onPress={() => navigation.navigate("TechWorks")}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Work Assigned</Text>
            <Text style={styles.dataText}>{activateWorksCount ?? 0}/{parseInt(installedWorksCount ?? 0) + parseInt(acceptWorksCount ?? 0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 20 }}>🔵 {installedWorksCount ?? 0} Installed Works</Text>
            <Text style={{ marginBottom: 20 }}>🔵 {acceptWorksCount ?? 0} Accepted Works</Text>
            <Text style={{ marginBottom: 20 }}>🔵 {activateWorksCount ?? 0} Activate Works</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardGreen, { height: 120, flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginVertical: 10 }]} onPress={() => navigation.navigate("WorkPayment")}>
          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>Payments</Text>
            <Text style={styles.dataText}>{paymentPendingWorksCount ?? 0}/{parseInt(paymentDonedWorksCount ?? 0) + parseInt(paymentPendingWorksCount ?? 0)}</Text>
          </View>
          <View style={{ flex: 1 }}>

            <Text style={{ marginBottom: 20 }}>⚪ {paymentPendingWorksCount ?? 0} Payment Pending</Text>
            <Text style={{ marginBottom: 10 }}>🔵 {paymentDonedWorksCount ?? 0} Payment Done</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cardBeige, { flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 10, marginBottom: 50 }]} onPress={() => navigation.navigate("Tickets")}>
          <View style={{ flex: 1 }}>

            <Text style={styles.cardTitle}>Total Tickets</Text>
            <Text style={styles.dataText}>{totalPendingAndSucessTickets?.totalSuccessTickets ?? 0}/{totalPendingAndSucessTickets?.totalTickets ?? 0}</Text>
          </View>
          <View style={{ flex: 1 }}>

            <Text style={[styles.legendText, { marginBottom: 30, backgroundColor: '#5ce854', borderRadius: 15, padding: 5, color: '#f3f3f3', fontWeight: 600 }]}>🟢   {totalPendingAndSucessTickets?.totalSuccessTickets ?? 0} Done</Text>
            <Text style={[styles.legendText, { backgroundColor: '#d8e8db', borderRadius: 15, padding: 5, color: '#333333', fontWeight: 600 }]}>⚪ {totalPendingAndSucessTickets?.totalPendingTickets ?? 0} Pending</Text>
          </View>
        </TouchableOpacity>
        {/* Modal to show details */}
        <Modal visible={!!selectedDate} transparent animationType="slide" style={{flex:1}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Attendance Details</Text>
              {selectedDate ? (
                <>
                  <Text style={styles.modalText}>📅 Date: {selectedDate.day}</Text>
                  <Text style={styles.modalText}>⏰ In Time: {selectedDate.inTime}</Text>
                  <Text style={styles.modalText}>⏳ Out Time: {selectedDate.outTime}</Text>
                  <Text
                    style={[
                      styles.modalText,
                      { color: selectedDate.status === "P" ? "green" : "red" },
                    ]}
                  >
                    {selectedDate.status === "P" ? `✅ Status: ${selectedDate.status}` : `❌ Status: ${selectedDate.status}`}


                  </Text>
                </>
              ) : (
                <Text style={{ color: "red" }}>No Data Available</Text>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDate(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  fab: {
    backgroundColor: '#4CAF50',
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    padding: 10,
  },
  details: {
    marginLeft: 10,
  },
  modalContainer: {
    justifyContent: "center",height:"100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 10 },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: { color: "white", fontWeight: "bold" },
  barChartContainer: { width: "100%", flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 10 },
});

export default Home_Technician;
