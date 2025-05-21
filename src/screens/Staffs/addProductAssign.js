import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, } from "react-native";
import { Button, Avatar, Modal } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SegmentedButtons } from 'react-native-paper';
import BranchesDropdown from '../../components/branchDropdown';
import StaffDropdown from '../../components/staffDropdown';
import { loadData } from "../../Utils/appData";

const AddProductAssign = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("Branch"); // Tracks the active tab
    const [open, setOpen] = useState(false);
    const [staffRole, setStaffRole] = useState("");
    const [branchName, setBranchName] = useState("");
    const [dropdownRoles, setDropDownRoles] = useState([
        { label: 'CEO', value: 'CEO' },
        { label: 'HR', value: 'HR' },
        { label: 'Accountant', value: 'Accountant' },
        { label: 'Warehouse Manager', value: 'Warehouse Manager' },
        { label: 'Branch Manager', value: 'Branch Manager' },
        { label: 'Sub Dealer', value: 'Sub Dealer' },
        { label: 'Technician', value: 'Technician' },
        { label: 'Sales Man', value: 'Sales Man' },
        { label: 'Call Center', value: 'Call Center' },
    ]);


    useEffect(() => {
        const getStaffData = async () => {
            const staffId = await loadData('staffID')
            handleInputChange("staffId", staffId)
        }

        getStaffData()
    })

    // Form fields for both Branch and Person
    const [branchForm, setBranchForm] = useState({
        staffId: '',
        branchId: '',
        requestId: '',
        imeiNumberFrom: '',
        imeiNumberTo: '',
        branchOrPerson: '',
        productAssignPhoto: '',
        productType: '',
    });

    const [personForm, setPersonForm] = useState({
        staffId: '',
        branchId: '',
        requestId: '',
        branchOrPerson: '',
        numberOfProducts: '',
        productAssignPhoto: '',
        assignTo: '',
        productType: '',
    });

    // Validation logic
    const validateForm = (form) => {
        for (let field in form) {
            if (!form[field].trim()) {
                return `${field.replace(/([A-Z])/g, " $1")} is required.`; // Format field name
            }
        }
        return null;
    };

    // Save Handler
    const handleSave = () => {
        var Add_productAssignPayload = {};
        if (activeTab === 'Branch') {
            Add_productAssignPayload = {
                staffId,
                branchId,
                requestId,
                imeiNumberFrom,
                imeiNumberTo,
                branchOrPerson,
                productAssignPhoto,
                companyCode,
                unitCode,
                productType,
            }
        } else {
            Add_productAssignPayload = {
                staffId,
                branchId,
                requestId,
                branchOrPerson,
                numberOfProducts,
                productAssignPhoto,
                companyCode,
                unitCode,
                assignTo,
                productType,
            }
        }

        Alert.alert("Success", "Product assignment saved successfully.");
        console.log({ form, selectedImage });
    };

    // Image Picker Handler
    const handleImagePicker = (type) => {
        const options = {
            mediaType: "photo",
            quality: 1,
        };

        if (type === "gallery") {
            launchImageLibrary(options, (response) => {
                if (response.assets && response.assets.length > 0) {
                    setSelectedImage(response.assets[0].uri);
                }
            });
        } else if (type === "camera") {
            launchCamera(options, (response) => {
                if (response.assets && response.assets.length > 0) {
                    setSelectedImage(response.assets[0].uri);
                }
            });
        }

        setBottomSheetVisible(false);
    };

    // Handle Input Change
    const handleInputChange = (key, value) => {
        if (activeTab === "Branch") {
            setBranchForm({ ...branchForm, [key]: value });
        } else {
            setPersonForm({ ...personForm, [key]: value });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Product Assign</Text>

            {/* Avatar for Image Selection */}
            <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
                <Avatar.Image
                    size={120}
                    source={
                        selectedImage
                            ? { uri: selectedImage }
                            : require("../../utilities/images/way4tracklogo.png")
                    }
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <View style={styles.photoButtons}>
                <Button
                    mode="outlined"
                    style={styles.photoButton}
                    onPress={() => setBottomSheetVisible(true)}
                >
                    Add Photo
                </Button>
                <Button
                    mode="outlined"
                    style={styles.photoButton}
                    onPress={() => setSelectedImage(null)}
                >
                    Remove
                </Button>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <SegmentedButtons
                    value={activeTab}
                    onValueChange={(value) => {
                        setActiveTab(value);
                    }}
                    density="small"
                    buttons={[
                        { value: 'Branch', label: 'Branch', checkedColor: "#f3f3f3", style: { backgroundColor: activeTab === 'Branch' ? "#28a745" : '#f3f3f3' } },
                        { value: 'Person', label: 'Person', checkedColor: "#f3f3f3", style: { backgroundColor: activeTab === 'Branch' ? '#f3f3f3' : "#28a745" } }
                    ]}
                    style={{ marginVertical: 20, borderColor: "#f3f3f3", borderWidth: 1 }}
                />
            </View>

            {/* Form */}
            <ScrollView style={styles.form}>

                <View style={{ marginBottom: 15 }}>
                    <BranchesDropdown
                        dropdownStyles={styles}
                        branchName={(val) => setBranchName(val)}
                        onBranchChange={(value) => branchForm.branchId = value}
                    />
                </View>

                <DropDownPicker
                    open={open}
                    value={staffRole} // The selected role value
                    items={dropdownRoles} // Dropdown items
                    setOpen={setOpen} // Toggle the dropdown open state
                    setValue={setStaffRole} // Update the staffRole state
                    setItems={setDropDownRoles} // Update the roles if needed
                    dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
                    placeholder="Select Staff Role"
                    placeholderStyle={{ color: "#aaaaaa" }}
                    style={[
                        styles.input,
                        { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
                    ]}
                    dropDownContainerStyle={{
                        alignSelf: "center",
                        borderColor: "#cccccc",
                        borderWidth: 1,
                        borderRadius: 8,
                    }}
                    listMode="MODAL" // Use MODAL mode for better UX
                    modalAnimationType="slide" // Modal animation
                    closeOnBackPressed={true} // Close modal on back button press
                    modalProps={{
                        // transparent: true, // Modal with transparency
                        animationType: "slide", // Fade effect for smooth appearance
                    }}
                    modalContentContainerStyle={{
                        marginVertical: 100, // Center the modal in the screen
                        marginHorizontal: 30,
                        width: "90%", // Modal width
                        height: 200, // Modal height
                        backgroundColor: "#ffffff", // Modal background
                        padding: 20, // Set a fixed height for the modal
                        borderRadius: 12,
                        elevation: 5, // Add shadow for Android
                        shadowColor: "#000", // Shadow color for iOS
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                    modalTitleStyle={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#333",
                        textAlign: "center",
                        marginBottom: 10,
                    }}
                    modalTitle="Select Staff Role" // Optional: Custom modal title
                />
                <StaffDropdown
                    dropdownStyles={styles}
                    branchId={branchForm.branchId}  // Ensure it's correctly passed
                    staffRole={staffRole}
                    onStaffChange={(value) => personForm.staffId = value}
                    staffPlaceHolder={'Assigned By'}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter Request ID"
                    value={branchForm.requestId}
                    onChangeText={(text) => handleInputChange("requestId", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Contact Number"
                    keyboardType="numeric"
                    value={personForm.contactNumber}
                    onChangeText={(text) => handleInputChange("contactNumber", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Product Type"
                    value={
                        activeTab === "Branch"
                            ? branchForm.productType
                            : personForm.productType
                    }
                    onChangeText={(text) => handleInputChange("productType", text)}
                />
                {activeTab === "Branch" ? (
                    <>
                        <View style={styles.imeiInputs}>
                            <TextInput
                                style={[styles.input, styles.imeiInput]}
                                placeholder="From"
                                value={branchForm.imeiFrom}
                                onChangeText={(text) => handleInputChange("imeiFrom", text)}
                            />
                            <TextInput
                                style={[styles.input, styles.imeiInput]}
                                placeholder="To"
                                value={branchForm.imeiTo}
                                onChangeText={(text) => handleInputChange("imeiTo", text)}
                            />
                        </View>


                    </>
                ) : (
                    <>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter Number of Products"
                            value={
                                activeTab === "Branch"
                                    ? branchForm.numberOfProducts
                                    : personForm.numberOfProducts
                            }
                            keyboardType="numeric"
                            onChangeText={(text) => handleInputChange("numberOfProducts", text)}
                        />
                    </>
                )}

            </ScrollView>

            {/* Save and Cancel Buttons */}
            <View style={styles.actionButtons}>
                <Button mode="contained" onPress={handleSave}>
                    Save
                </Button>
                <Button
                    mode="outlined"
                    style={styles.cancelButton}
                    onPress={() => console.log("Cancel clicked")}
                >
                    Cancel
                </Button>
            </View>

            {/* Bottom Sheet for Image Selection */}
            <Modal visible={bottomSheetVisible} onDismiss={() => setBottomSheetVisible(false)}>
                <View style={styles.bottomSheet}>
                    <Button
                        icon="image"
                        mode="contained"
                        onPress={() => handleImagePicker("gallery")}
                        style={styles.bottomSheetButton}
                    >
                        Open Gallery
                    </Button>
                    <Button
                        icon="camera"
                        mode="contained"
                        onPress={() => handleImagePicker("camera")}
                        style={styles.bottomSheetButton}
                    >
                        Open Camera
                    </Button>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F5F5F5",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    avatar: {
        alignSelf: "center",
        marginBottom: 16,
        backgroundColor: '#f3f3f3'
    },
    photoButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    photoButton: {
        flex: 1,
        marginHorizontal: 8,
    },
    toggleButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    imeiInputs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    imeiInput: {
        flex: 1,
        marginHorizontal: 8,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    cancelButton: {
        backgroundColor: "black",
    },
    bottomSheet: {
        padding: 16,
        backgroundColor: "white",
    },
    bottomSheetButton: {
        marginBottom: 8,
    },
});

export default AddProductAssign;
