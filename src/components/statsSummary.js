import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Card, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsSummary = ({ productCount, purchaseCount, TicketCount, expancesCount, productData, expencesData, purchaseData, ticketData }) => {
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [modalTicketVisible, setModalTicketVisible] = useState(false);
  const [modalExpencesVisible, setModalExpencesVisible] = useState(false);
  const [modalPurchaseVisible, setModalPurchaseVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    { title: 'Total Products', value: productCount?.last30DaysProducts, icon: 'cube', color: "#000000", change: `+${productCount?.percentageChange}%` },
    { title: 'Total Tickets', value: TicketCount?.last30DaysTickets, icon: 'ticket', color: "#E74C3C", change: `+${TicketCount?.percentageChange}%` },
    { title: 'Total Expenses', value: expancesCount?.last30DaysExpenses, icon: 'currency-usd', color: "#27AE60", change: `+${expancesCount?.percentageChange}%` },
    { title: 'Total Purchases', value: purchaseCount?.last30DaysPurchases, icon: 'shopping', color: "#3498DB", change: `+${purchaseCount?.percentageChange}%` },
  ];

  console.log("stats : ", productCount)
  console.log("stats : ", stats)

  // const productData = [
  //   { id: '1', name: "GPS_Tracker", count: 1600, branch: { "vizag": 300, "hydrabad": 300, "vijaywada": 400, "kakinada": 600 } },
  //   { id: '2', name: "Fuel_Tracker", count: 1700, branch: { "vizag": 400, "hydrabad": 500, "vijaywada": 500, "kakinada": 300 } },
  //   { id: '3', name: "Speed_Tracker", count: 1800, branch: { "vizag": 500, "hydrabad": 400, "vijaywada": 600, "kakinada": 300 } },
  //   { id: '4', name: "LocationRoute_Tracker", count: 1900, branch: { "vizag": 600, "hydrabad": 300, "vijaywada": 300, "kakinada": 700 } },
  // ];
  // const ticketData = [
  //   { id: 'ticket_001', name: "ravi kumar", date: "16/12/2024", branch:  "vizag", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { id: 'ticket_003', name: "Speed_Tracker", date: "16/11/2024", branch: "hydrabad", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { id: 'ticket_004', name: "thanusha", date: "16/2/2024",branch: "hydrabad", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", }
  // ];

  // const expencesData = [
  //   { vocher_id: 'exp_001', title: "ravi kumar", date: "16/12/2024",branch:  "vizag", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { vocher_id: 'exp_003', title: "Speed_Tracker", date: "16/11/2024", branch: "hydrabad",description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { vocher_id: 'exp_004', title: "thanusha", date: "16/2/2024",branch: "kakinada", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", }
  // ];
  // const purchaseData = [
  //   { vocher_id: 'pur_001', title: "product kumar",type:"product", date: "16/12/2024",branch:  "vizag", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { vocher_id: 'pur_003', title: "product",type:"product", date: "16/11/2024", branch: "hydrabad",description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", },
  //   { vocher_id: 'pur_004', title: "product",type:"product", date: "16/2/2024",branch: "kakinada", description: "Is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.", }
  // ];

  const handleCardPress = (stat) => {
    console.log("state : ", stat.title)
    switch (stat.title) {
      case 'Total Products':
        setModalProductVisible(true);
        break;

      case 'Total Tickets':
        setModalTicketVisible(true);
        break;

      case 'Total Expenses':
        setModalExpencesVisible(true);
        break;

      case 'Total Purchases':
        setModalPurchaseVisible(true);
        break;

      default:
        break;
    }
  };

  const handleProductCloseModal = () => {
    setModalProductVisible(false);
  };

  const handleTicketCloseModal = () => {
    setModalTicketVisible(false);
  };

  const handleExpencesCloseModal = () => {
    setModalExpencesVisible(false);
  };
  const handlePurchaseCloseModal = () => {
    setModalPurchaseVisible(false);
  };

  const renderProductListItem = ({ item }) => {
    const totalProductsSum = item.products.reduce((sum, product) => sum + (product.totalProducts || 0), 0);
    
    return (

      <Card style={[styles.card, { borderColor: "#27AE60", borderWidth: 1, }]}>
        <Card.Content>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={{ fontSize: 16, color: '#27AE60', fontWeight: 600, marginRight: 10 }}>{item.branchName}</Text>
            <Text style={{ fontSize: 16, color: '#27AE60', fontWeight: 600, marginLeft: 10 }}>:</Text>
            <Text style={{ fontSize: 16, color: '#27AE60', fontWeight: 600, marginLeft: 10 }}>{totalProductsSum}</Text>
          </View>

          <View style={styles.gridContainer}>
            {
              item.products.map((product) => {
                <View style={[styles.gridItem, { width: "48%" ,backgroundColor:"red"}]}>
                  <Card.Title title={product.name}>
                    <Text style={{ fontSize: 16, color: '#27AE60', fontWeight: 600, marginLeft: 10 }}>totalInHandsQty: {product.totalInHandsQty}</Text>
                  </Card.Title>
                </View>
              })
            }

          </View>
        </Card.Content>
      </Card>
    )
  };

  const renderTicketListItem = ({ item }) => {
    console.log("tickets item",item)
    return(
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: "100%", padding: 10 }}>
        <Text style={{ fontSize: 16, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.id}</Text>
        <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.date}</Text>
      </View>
      <View style={styles.gridContainer}>
        {/* Vizag */}
        <View style={styles.gridItem}>
          <Card.Title title={item.name} titleNumberOfLines={2} titleStyle={{ width: "100%" }} subtitle={item.branch} subtitleNumberOfLines={2}></Card.Title>
          <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.description}</Text>

        </View>
      </View>
    </Card>
  )};

  const renderExpencesListItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: "100%", padding: 10 }}>
        <Text style={{ fontSize: 16, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.vocher_id}</Text>
        <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.branch}</Text>
      </View>
      <View style={styles.gridContainer}>
        {/* Vizag */}
        <View style={styles.gridItem}>
          <Card.Title title={item.title} titleNumberOfLines={2} titleStyle={{ width: "100%" }} subtitle={item.branch} subtitleNumberOfLines={2}></Card.Title>
          <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.description}</Text>

        </View>
      </View>
    </Card>
  );

  const renderPurchaseListItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: "100%", padding: 10 }}>
        <Text style={{ fontSize: 18, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.vocher_id}</Text>
        <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.branch}</Text>
      </View>
      <View style={styles.gridContainer}>
        {/* Vizag */}
        <View style={styles.gridItem}>
          <Card.Title title={item.title} titleNumberOfLines={2} titleStyle={{ width: "100%", color: "#27AE60", fontSize: 16, fontFamily: "Parkinsans-SemiBold", textTransform: "capitalize", }} subtitle={item.branch + " / " + item.type} subtitleNumberOfLines={2} subtitleStyle={{ width: "100%", textTransform: "capitalize", }}></Card.Title>
          <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.description}</Text>

        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <TouchableOpacity key={index} onPress={() => handleCardPress(stat)}>
          <Card mode="elevated" style={[styles.card, { marginVertical: 30 }]}>
            <View style={styles.cardContent}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card style={{ backgroundColor: stat.color, width: 80, height: 80, marginVertical: 20, justifyContent: 'center', padding: 20, position: 'relative', top: -60 }}>
                  <MaterialCommunityIcons name={stat.icon} size={40} color="#f3f3f3" />
                </Card>
                <View style={{ width: "70%" }}>
                  <Text style={styles.title}>{stat.title}</Text>
                  <Text style={styles.value}>{stat.value}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.change}>{stat.change} than last week</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProductVisible}
        onRequestClose={handleProductCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleProductCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Product Overview
            </Text>
            <FlatList
              data={productData}
              keyExtractor={(item) => item.id}
              renderItem={renderProductListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTicketVisible}
        onRequestClose={handleTicketCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleTicketCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Tickets Overview
            </Text>
            <FlatList
              data={ticketData}
              keyExtractor={(item) => item.id}
              renderItem={renderTicketListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalExpencesVisible}
        onRequestClose={handleExpencesCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleExpencesCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Expenses Overview
            </Text>
            <FlatList
              data={expencesData}
              keyExtractor={(item) => item.id}
              renderItem={renderExpencesListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPurchaseVisible}
        onRequestClose={handlePurchaseCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handlePurchaseCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Expenses Overview
            </Text>
            <FlatList
              data={purchaseData}
              keyExtractor={(item) => item.id}
              renderItem={renderPurchaseListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, marginTop: 20
  },
  card: {
    marginVertical: 10, backgroundColor: "#ffffff", elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
    padding: 15,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20, fontFamily: "Parkinsans-SemiBold",
    textAlign: "right",
    color: '#000', padding: 5,
  },
  value: {
    fontSize: 20, textAlign: "right",
    padding: 5,
    color: '#27AE60', fontFamily: "Roboto-Black",
  },
  change: {
    fontSize: 12,
    color: '#27AE60',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#E74C3C',
    borderRadius: 20,
    width: 30, zIndex: 99,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#f3f3f3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18, width: "100%", paddingTop: 80, paddingBottom: 10,
    fontWeight: 'bold', backgroundColor: "#000000",
    marginVertical: 10, color: "#27AE60", textAlign: 'center',
  },
  listContainer: {
    width: '100%', marginBottom: 100,
    marginTop: 10, padding: 18,
  },
  listItem: {
    padding: 10, width: 300,
    borderBottomWidth: 1, backgroundColor: "#aaaaaa",
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping of items to the next line
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#f9f9f9",
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    elevation: 2, // Adds shadow effect
  },
});

export default StatsSummary;
