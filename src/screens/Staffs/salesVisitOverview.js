import React, { useEffect,useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { uploadSalesVisit } from "../../Redux/Actions/salesVisitAction";
import { Card } from "react-native-paper";
import { loadData } from "../../Utils/appData";

const SalesVisitOverview = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [staffId, setStaffId] = useState("")
    const { loading: salesVisitDataLoading, salesVisitData, error: salesVisitDataError } = useSelector(state => state.salesVistReducer);
    useEffect(() => {
        const fetchStaffData = async () => {
            const staffId = await loadData("ID");
            setStaffId(staffId);
        }
        fetchStaffData()
    }, [])
    return (
        <ScrollView style={styles.container}>
            {/* Header Details */}
            <Text style={styles.title}>Details</Text>
            <View style={styles.section}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{salesVisitData?.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{salesVisitData?.address}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <Text style={styles.value}>{salesVisitData?.phoneNumber}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{salesVisitData?.date}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.label}>Estimated Completion:</Text>
                    <Text style={styles.value}>{salesVisitData?.estimatedDate}</Text>
                </View>
            </View>

            {/* Product List */}
            <Text style={styles.sectionTitle}>Products</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 5, backgroundColor: 'green' }}>
                <Text style={[styles.label, { fontSize: 16, flex: 2, color: '#fefefe' }]}>Product</Text>
                <Text style={[styles.label, { fontSize: 16, flex: 1, color: '#fefefe' }]}>QTY</Text>
            </View>
            {salesVisitData?.products.length > 0 ? (
                salesVisitData?.products.map((product, index) => {
                    console.log("product : ", product);
                    return (
                        <View key={index} style={[styles.item, { flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 5, }]}>
                            <Text style={[styles.value, { flex: 1 }]}>
                                {product.name ? product.name : product.productId}
                            </Text>
                            <Text style={[styles.value, { flex: 1 }]}>
                                {product.quantity}
                            </Text>
                        </View>
                    )
                })
            ) : (
                <Text style={styles.emptyText}>No products added</Text>
            )}

            {/* Service List */}
            <Text style={styles.sectionTitle}>Services</Text>

            {salesVisitData?.services.length > 0 ? (
                salesVisitData?.services.map((service, index) => (
                    <View key={index} style={styles.item}>

                        <Text style={[styles.value, { fontWeight: 700, fontSize: 16, color: '#333333' }]}>
                            {service.serviceName}
                        </Text>
                        <Text style={{ fontSize: 13, paddingVertical: '5', color: '#333333' }}>
                            Description
                        </Text>
                        <Card style={{ backgroundColor: '#f3f3ff', padding: 8, marginBottom: 5 }}>
                            <Text style={styles.value}>
                                {service.serviceDescription}
                            </Text>
                        </Card>
                    </View>
                ))
            ) : (
                <Text style={styles.emptyText}>No services added</Text>
            )}
            <View style={[styles.imagePicker, { marginVertical: 10 }]}>
                <Image source={{ uri: salesVisitData.clientUpload_pick?.uri }} resizeMode={"stretch"} style={styles.vehicleImage} />

            </View>
            <View style={[styles.imagePicker, { marginVertical: 10 }]}>
                <Image source={{ uri: salesVisitData.visitingCardUpload_pick?.uri }} resizeMode={"stretch"} style={styles.vehicleImage} />

            </View>
            <TouchableOpacity style={[styles.nextButton, { marginBottom: 70 }]} onPress={() => {

                dispatch(uploadSalesVisit(salesVisitData,staffId));
                navigation.navigate("VisitSuccessfully");
            }}>
                <Text style={styles.nextButtonText} >Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    section: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
    label: { fontWeight: "bold", },
    value: { fontSize: 16, color: "#555", marginBottom: 5 },
    item: { paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#eee", marginBottom: 5 },
    emptyText: { fontSize: 14, color: "gray", fontStyle: "italic", textAlign: "center", marginTop: 5 },
    nextButton: { backgroundColor: "green", padding: 15, alignItems: "center", borderRadius: 5, marginTop: 20 },
    nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
    vehicleImage: { width: "100%", height: "100%", borderRadius: 5 },
    imagePicker: {
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginTop: 5,
    }
});

export default SalesVisitOverview;
