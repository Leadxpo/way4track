import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const AttendanceCalendar = ({ navigation, route }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const { attendenceData } = route.params;  // Sample Address data
  // Convert attendance data to Calendar Markings
  useEffect(() => {
    const marks = {};
    attendenceData.forEach((entry) => {
      marks[entry.day] = {
        dots: [{ key: entry.status, color: entry.status === "PRESENT" ? "green" : "red" }],
        selected: true,
        selectedColor: entry.status === "PRESENT" ? "#d4edda" : "#f8d7da",
      };
    });
    setMarkedDates(marks);
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        markingType="multi-dot"
        onDayPress={(day) => setSelectedDate(attendenceData.find((item) => item.day === day.dateString))}
      />

      {/* Modal to show details */}
      <Modal visible={!!selectedDate} transparent animationType="slide">
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
                    { color: selectedDate.status === "PRESENT" ? "green" : "red" },
                  ]}
                >
                  ✅ Status: {selectedDate.status}
                </Text>
              </>
            ) : (
              <Text>No Data Available</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDate(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 10 },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: { color: "white", fontWeight: "bold" },
});

export default AttendanceCalendar;
