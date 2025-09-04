import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, KeyboardAvoidingView, FlatList, Dimensions } from "react-native";
import { TextInput, Text, Button, Surface, Modal, Card, Avatar } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { loadData } from "../../Utils/appData";
import { useDispatch, useSelector } from 'react-redux';
import { createRaiseRequest, fetchRaiseRequests } from "../../Redux/Actions/raiseRequestAction";
import api from "../../Api/api";
import DatePicker from 'react-native-date-picker'
import { launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

const AddRequest = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading: raiseRequestInfoLoading, raiseRequestInfo, error: raiseRequestInfoError } = useSelector(state => state.addRequests);
  const [staffData, setStaffData] = useState([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isStaffDDVisible, setIsStaffDDVisible] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [fromOpen, setFromOpen] = useState(false)
  const [role, setRole] = useState("");
  const [toOpen, setToOpen] = useState(false)
  const [imagePreviews, setImagePreviews] = useState([]);
  const [dropdownRequestType, setDropdownRequestType] = useState([
    { label: 'Assert', value: 'assets' },
    { label: 'Money', value: 'money' },
    { label: 'Product', value: 'products' },
    { label: 'Personal', value: 'personal' },
    { label: 'LeaveRequest', value: 'leaveRequest' },
  ]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS auto-requests via Info.plist
  };

  const handleFileChange = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Camera access is required');
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        selectionLimit: 1, // 0 = unlimited selection
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Image pick failed');
          console.log('Error', response.errorMessage || 'Image pick failed');
          return;
        }

        const selectedFiles = response.assets || [];

        const newFiles = selectedFiles.map((item) => ({
          uri: item.uri,
          name: item.fileName,
          type: item.type,
        }));

        const newPreviews = selectedFiles.map((item) => item.uri);

        setFormData((prev) => ({
          ...prev,
          photo: [...prev.photo, ...newFiles],
        }));

        setImagePreviews((prev) => [...prev, ...newPreviews]);
      }
    );
  };

  const handleReplaceImage = (index) => {
    launchCamera(
      {
        mediaType: 'photo',
        selectionLimit: 5,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Image pick failed');
          return;
        }

        const item = response.assets?.[0];
        if (item) {
          const newFile = {
            uri: item.uri,
            name: item.fileName,
            type: item.type,
          };

          setFormData((prev) => {
            const updated = [...prev.photo];
            updated[index] = newFile;
            return { ...prev, photo: updated };
          });

          setImagePreviews((prev) => {
            const updated = [...prev];
            updated[index] = item.uri;
            return updated;
          });
        }
      }
    );
  };
  useEffect(() => {
    const getStaff = async () => {

      const { data } = await api.post(`/staff/getStaffDetails`, { companyCode: "WAY4TRACK", unitCode: "WAY4" }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setStaffData(data.data)
    }
    getStaff();
  }, []);

  useEffect(() => {
    const getProductTypes = async () => {
      const { data } = await api.post(`/productType/getProductTypeNamesDropDown`, { companyCode: "WAY4TRACK", unitCode: "WAY4" }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProductTypes(data?.data || []);
    }
    getProductTypes();
  }, []);

  // State management for form fields
  const [formData, setFormData] = useState({
    requestToName: "",
    requestType: "",
    requestFrom: null,
    branch: '',
    requestFor: '',
    requestTo: '',
    createdDate: '',
    photo: [],
    status: '',
    fromDate: new Date(),
    toDate: new Date(),
    products: [{ productType: "", quantity: "" }],
    companyCode: 'WAY4TRACK',
    unitCode: 'WAY4',
  });

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productType: "", quantity: "" }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };


  useEffect(() => {
    const getStaffData = async () => {
      const branch = await loadData('branch_id');
      const requestFrom = await loadData('ID');
      const role = await loadData('role');

      setBackgroundMessageHandler(role);
      setFormData(prev => ({
        ...prev,
        requestFrom,
        branch,
      }));

      // Store role if used elsewhere
      setRole(role);
    };

    getStaffData();
  }, []);

  // Error state for validation
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let isValid = true;

    const newErrors = {};
    if (!formData.requestType) {
      newErrors.requestType = "Request type is required.";
      isValid = false;
    }
    if (!formData.requestTo) {
      newErrors.requestTo = "Request to is required.";
      isValid = false;
    }
    setErrors(newErrors);
    console.log("error:", errors)
    return isValid;
  };


  // Save button handler
  const handleSave = async () => {
    const formattedFromDate = formData.fromDate?.toISOString().split("T")[0];
    const formattedToDate = formData.toDate?.toISOString().split("T")[0];
    const updatedFormData = {
      ...formData,
      fromDate: formattedFromDate,
      toDate: formattedToDate,
      requestFrom: formData.requestFrom, // fallback if needed
      branch: formData.branch,
    };

    if (validateForm(updatedFormData)) {
      dispatch(createRaiseRequest(updatedFormData))
      const staffId = await loadData("ID");
      const requestPayload = {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
        id: staffId,
      };
      dispatch(fetchRaiseRequests(requestPayload));

      navigation.navigate("RequestRaise");

    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.form}>
          {/* Request Type */}
          <DropDownPicker
            open={requestOpen}
            value={formData.requestType} // The selected role value
            items={dropdownRequestType} // Dropdown items
            setOpen={setRequestOpen} // Toggle the dropdown open state
            setValue={(callback) => setFormData(prev => ({ ...prev, requestType: callback(prev.requestType) }))}
            setItems={setDropdownRequestType} // Update the roles if needed
            dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
            placeholder="Select Request Type"
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

          {errors.requestType && (
            <Text style={styles.errorText}>{errors.requestType}</Text>
          )}

          {/* Request By */}

          <View>
            {formData.requestType !== "products" ? (
              <TextInput
                label="Request For"
                value={formData.description}
                outlineColor="#cccccc"
                mode="outlined"
                activeOutlineColor="#cccccc"
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                outlineStyle={[styles.input, { height: 50, borderRadius: 8, borderWidth: 1 }]}
                style={{ backgroundColor: '#ffffff', marginVertical: 8 }}
              />
            ) :
              (
                formData.products?.map((item, index) => (
                  <Surface key={index} style={styles.surfaceContainer}>
                    <View style={[styles.rowContainer, { flex: 1 }]}>
                      <View style={{ flex: 3 }}>

                        <TouchableOpacity
                          style={styles.dropdownBtn}
                          onPress={() => {
                            setSelectedItemIndex(index);
                            setShowProductModal(true);
                          }}
                        >
                          <Card.Cover source={require('../../utilities/images/way4tracklogo.png')} style={styles.icon} />
                          <Text style={styles.dropdownText}>{item.productType}</Text>
                        </TouchableOpacity>

                      </View>
                      <TextInput
                        placeholder="Qty"
                        value={item.quantity}
                        outlineColor="#cccccc"
                        mode="outlined"
                        activeOutlineColor="#cccccc"
                        outlineStyle={[styles.input, { height: 48, flex: 1, marginTop: 10, borderRadius: 8, borderWidth: 1 }]}
                        style={{ backgroundColor: '#ffffff', marginLeft: 5, flex: 1 }}
                        onChangeText={(text) => {
                          setFormData((prev) => {
                            const updatedItems = [...prev.products];
                            updatedItems[index] = {
                              ...updatedItems[index],
                              quantity: text,
                            };
                            return { ...prev, products: updatedItems };
                          });
                        }}
                      />
                    </View>
                    <View style={styles.rowContainer}>
                      {index === 0 ? (
                        <TouchableOpacity style={styles.addButton} onPress={addItem}>
                          <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                          <MaterialCommunityIcons name="minus" size={20} color="#fff" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </Surface>
                ))
              )}
          </View>

          {formData.requestType === "leaveRequest" && (
            <View>
              {/* From Date */}
              <View style={styles.rowContainer}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>From Date</Text>
                  <TouchableOpacity onPress={() => setFromOpen(true)}>
                    <TextInput
                      style={styles.input}
                      placeholder="Select From Date"
                      value={formData.fromDate ? formData.fromDate.toISOString().split('T')[0] : ''}
                      editable={false}
                    />
                  </TouchableOpacity>

                  <DatePicker
                    modal
                    open={fromOpen}
                    date={formData.fromDate}
                    mode="date"
                    onConfirm={(date) => {
                      setFromOpen(false);
                      setFormData((prev) => ({ ...prev, fromDate: date }));
                    }}
                    onCancel={() => setFromOpen(false)}
                  />
                </View>
              </View>

              {/* To Date */}
              <View style={styles.rowContainer}>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.label}>To Date</Text>
                  <TouchableOpacity onPress={() => setToOpen(true)}>
                    <TextInput
                      style={styles.input}
                      placeholder="Select To Date"
                      value={formData.toDate ? formData.toDate.toISOString().split('T')[0] : ''}
                      editable={false}
                    />
                  </TouchableOpacity>

                  <DatePicker
                    modal
                    open={toOpen}
                    date={formData.toDate}
                    mode="date"
                    onConfirm={(date) => {
                      setToOpen(false);
                      setFormData((prev) => ({ ...prev, toDate: date }));
                    }}
                    onCancel={() => setToOpen(false)}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Request To */}

          <TextInput
            label="Request To"
            mode="outlined"
            onFocus={() => setIsStaffDDVisible(true)}
            value={formData.requestToName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, requestTo: text, }))}
            error={!!errors.requestTo}
            outlineStyle={[styles.input, { height: 50, borderRadius: 8, borderWidth: 1 }]}
            style={{ backgroundColor: '#ffffff', marginVertical: 8, color: "red" }}
          />
          {errors.requestTo && (
            <Text style={styles.errorText}>{errors.requestTo}</Text>
          )}
          <View>
            <Button mode="contained" onPress={handleFileChange}>
              Select Images
            </Button>

            <ScrollView horizontal style={{ marginVertical: 10 }}>
              {imagePreviews.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => handleReplaceImage(index)}>
                  <Image
                    source={{ uri }}
                    style={{ width: 100, height: 100, marginRight: 10, borderRadius: 8 }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              buttonColor="#28a745"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => Alert.alert("Cancelled")}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
      <Modal visible={showProductModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity onPress={() => setShowProductModal(false)} style={{ alignSelf: "flex-end" }}>
            <Avatar.Icon icon="close" style={styles.closeIcon} size={30} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <FlatList
              data={productTypes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setFormData((prev) => {
                        const updatedItems = [...prev.products];
                        updatedItems[selectedItemIndex] = {
                          ...updatedItems[selectedItemIndex],
                          productType: item.name,
                        };
                        return { ...prev, products: updatedItems };
                      });
                      setShowProductModal(false);
                    }}

                  >
                    <Card.Cover
                      source={item.productPhoto ? { uri: item.productPhoto } : require('../../utilities/images/way4tracklogo.png')}
                      style={{ width: 30, height: 30, }}
                    />
                    <Text variant="bodyMedium" style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }}
              ListEmptyComponent={() => (
                <Card style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No items available</Text>
                </Card>
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={isStaffDDVisible} onDismiss={() => setIsStaffDDVisible(false)} contentContainerStyle={{ backgroundColor: "#ffffff", paddingVertical: 20 }}>
        <FlatList
          data={staffData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={{ width: Dimensions.get("screen").width / 1.2, justifyContent: 'center', alignSelf: 'center', margin: 5, backgroundColor: '#f3f3f3' }} onPress={() => {
              setFormData(prev => ({ ...prev, requestTo: item.id.toString(), requestToName: item.name.toString() }))
              console.log("staff ID : ", item.id)
              setIsStaffDDVisible(false)
            }}>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Image source={{ uri: item.assetPhoto }} style={{ width: 30, height: 30, }} />
                <View style={{ justifyContent: "center", alignSelf: "center" }}>
                  <Text variant="bodyMedium">{item.name} - {item.designation}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </Modal>
      {/* <Modal visible={isProductDDVisible} onDismiss={() => setIsProductDDVisible(false)} contentContainerStyle={{ backgroundColor: "#ffffff", paddingVertical: 20 }}>
        <FlatList
          data={productData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={{ width: Dimensions.get("screen").width / 1.2, justifyContent: 'center', alignSelf: 'center', margin: 5, backgroundColor: '#f3f3f3' }} onPress={() => {
              setFormData(prev => ({ ...prev, requestTo: item.item.product.toString() }))
              console.log("staff ID : ", item.id)
              setIsStaffDDVisible(false)
            }}>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Image source={{ uri: item.assetPhoto }} style={{ width: 30, height: 30, }} />
                <View style={{ justifyContent: "center", alignSelf: "center" }}>
                  <Text variant="bodyMedium">{item.name} - {item.quantity}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </Modal> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#aaa",
    marginTop: 10, borderRadius: 8, borderWidth: 1, height: 50,
    padding: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5, padding: 5,
    marginBottom: 16, backgroundColor: '#f9f9f9',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },

  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 8,
  },
  surfaceContainer: { borderColor: "#dddddd", borderWidth: 1, padding: 5, backgroundColor: "#ffffff", borderRadius: 5, marginVertical: 8 },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5, width: 40,
    padding: 8,
    marginLeft: 4,
  },
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center", height: Dimensions.get("screen").height,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  thumbnail: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ffffff",
  },

  itemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyCard: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  closeIcon: {
    backgroundColor: "green",
    margin: 10,
    alignSelf: "flex-end",
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 5, width: 40,
    padding: 8,
    marginLeft: 4,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default AddRequest;
