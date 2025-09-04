import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    ScrollView,
    TouchableOpacity,
    Modal,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../Api/api";
import { loadData } from "../../Utils/appData";

export default function TicketFormScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const editingData = route.params?.ticketData || null;

    const [designationValue, setDesignationValue] = useState(null);

    const [reportingStaffOpen, setReportingStaffOpen] = useState(false);
    const [reportingStaffValue, setReportingStaffValue] = useState(null);
    const [reportingStaffItems, setReportingStaffItems] = useState([]);

    const [formData, setFormData] = useState({
        problem: "",
        date: new Date(),
        reportingStaffId:"",
        designationRelation: null,
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const getReportingStaff = useCallback(async () => {
        const payload={
            companyCode: "WAY4TRACK",
            unitCode: "WAY4",
          }
        try {
            const response = await api.post("/staff/getStaffNamesDropDown",payload);
            if (response.data.status && Array.isArray(response.data.data)) {
                const staffItems = response.data.data
                    .filter((d) => d.id && d.staffId)
                    .map((d) => ({
                        label: d.staffId+"-"+d.name+"-"+d?.designationRelation?.designation,
                        value: d.id+"-"+d?.designationRelation?.id,
                    }));
                setReportingStaffItems(staffItems);
            }
        } catch (error) {
            console.error("Failed to fetch designations:", error);
        }
    }, []);

    useEffect(() => {
        getReportingStaff();
    }, [reportingStaffOpen]);

    useEffect(() => {
        if (editingData) {
            const parsedDate = new Date(editingData.date);

            setFormData({
                problem: editingData.problem || "",
                date: isNaN(parsedDate) ? new Date() : parsedDate,
                reportingStaffId: editingData.reportingStaffId || null,
            });
            setDesignationValue(editingData.designationRelation || null);
            setReportingStaffValue(editingData?.reportingStaffId+"-"+ editingData?.de_id|| null);
        }
    }, [editingData]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            designationRelation: designationValue,
        }));
    }, [designationValue]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const staffId = await loadData("ID");
        const branchId = await loadData("branch_id");
        const role = await loadData("role");
        let subDealerId = "";
        let subDealerStaffId = "";
        let id = "";
        if (role === "sub dealer staff") {
            subDealerId = await loadData("subDealerPrmId");
            subDealerStaffId = await loadData("subDealerstaffPrmId");
        }
        const commonPayload = {
            problem: formData.problem,
            branchId: branchId,
            date: formData.date.toISOString().split("T")[0],
            designationRelation: formData.designationRelation,
            reportingStaffId: Number(formData.reportingStaffId),
            companyCode: "WAY4TRACK",
            unitCode: "WAY4",
        };

        let payload = role === "sub dealer staff"
            ? { ...commonPayload, subDealerId, subDealerStaffId }
            : { ...commonPayload, staffId };

        if (editingData && editingData.id) {
            id = editingData.id;
            console.log("eee:",id)
            payload = { ...payload,id:id };
        }
        console.log("payload with id : ", payload)

        try {
            const response = await api.post('/tickets/handleTicketDetails', payload, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status) {
                Alert.alert("Success", editingData ? "Ticket updated!" : "Ticket submitted!");
                navigation.navigate("Tickets");
            }
        } catch (error) {
            console.error("Error submitting ticket:", error);
            Alert.alert("Error", "Failed to submit ticket.");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.heading}>
                {editingData ? "Edit Ticket" : "Add Ticket"}
            </Text>

            <View style={styles.pickerWrapper}>
                <DropDownPicker
                    open={reportingStaffOpen}
                    value={reportingStaffValue}
                    items={reportingStaffItems}
                    setOpen={setReportingStaffOpen}
                    setValue={setReportingStaffValue}
                    setItems={setReportingStaffItems}
                    placeholder="Select a Reporting Staff"
                    listMode="MODAL" 
                    onSelectItem={(data) => {
                        console.log("eee :", data);
                        const rrr = data.value.split("-");
                        setFormData(prev => ({
                            ...prev,
                            reportingStaffId: rrr[0],
                            designationRelation: rrr[1],
                        }));
                    }}
                    zIndex={1000}
                    modalTitle="Select Reporting Staff"
                    modalAnimationType="slide"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    modalContentContainerStyle={styles.modalContent}
                    modalTitleStyle={styles.modalTitle}
                />
            </View>

            <Text style={styles.label}>Problem</Text>
            <TextInput
                placeholder="Enter problem"
                value={formData.problem}
                onChangeText={(text) => handleChange("problem", text)}
                style={[styles.input, { height: 100 }]}
                multiline
            />

            <Text style={styles.label}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{formData.date.toISOString().split("T")[0]}</Text>
            </TouchableOpacity>

            <Modal visible={showDatePicker} transparent animationType="slide">
                <View style={styles.dateModal}>
                    <DatePicker
                        date={formData.date}
                        mode="date"
                        onDateChange={(date) => handleChange("date", date)}
                    />
                    <Button title="Done" onPress={() => setShowDatePicker(false)} />
                </View>
            </Modal>

            <Button title={editingData ? "Update" : "Submit"} onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = {
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 6,
    },
    pickerWrapper: {
        marginBottom: 15,
        zIndex: 1000,
    },
    dropdown: {
        borderColor: "#ccc",
    },
    dropdownContainer: {
        borderColor: "#ccc",
    },
    modalContent: {
        padding: 20,
        marginVertical: 100,
        marginHorizontal: 30,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    dateModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
};
