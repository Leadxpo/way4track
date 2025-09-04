import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Card, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsSummary = ({ PayableAmount, ReceivableAmount, SalesAmount, PurchaseCount, receivableTable, saleTable, payableTable, purchaseTable }) => {
  const [modalPayableVisible, setModalPayableVisible] = useState(false);
  const [modalSaleVisible, setModalSaleVisible] = useState(false);
  const [modalReceivableVisible, setModalReceivableVisible] = useState(false);
  const [modalPurchaseVisible, setModalPurchaseVisible] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    { title: 'Total Payable', value: PayableAmount, icon: 'cube', color: "#000000" },
    { title: 'Total Sale', value: SalesAmount, icon: 'ticket', color: "#E74C3C" },
    { title: 'Total Purchase', value: PurchaseCount, icon: 'currency-usd', color: "#27AE60" },
    { title: 'Total Receivable', value: ReceivableAmount, icon: 'shopping', color: "#3498DB" },
  ];

  const handleCardPress = (stat) => {
    console.log("state : ", stat.title)
    switch (stat.title) {
      case 'Total Payable':
        setModalPayableVisible(true);
        break;

      case 'Total Sale':
        setModalSaleVisible(true);
        break;

      case 'Total Receivable':
        setModalReceivableVisible(true);
        break;

      case 'Total Purchase':
        setModalPurchaseVisible(true);
        break;

      default:
        break;
    }
  };

  const handlePayableCloseModal = () => {
    setModalPayableVisible(false);
  };

  const handleSaleCloseModal = () => {
    setModalSaleVisible(false);
  };

  const handleReceivableCloseModal = () => {
    setModalReceivableVisible(false);
  };

  const handlePurchaseCloseModal = () => {
    setModalPurchaseVisible(false);
  };

  const renderPayableListItem = ({ item }) => {
    return (
      <Card key={item.id} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: Dimensions.get('screen').width / 1.3, padding: 10 }}>
          <Text style={{ fontSize: 16, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.voucherId}</Text>
          <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.date?.split("T")[0]}</Text>
        </View>
        <View style={styles.gridContainer}>
          {/* Vizag */}
          <View style={styles.gridItem}>
            <Card.Title title={item.branchName} titleNumberOfLines={2} titleStyle={{ width: "100%" }} subtitle={item.amount} subtitleNumberOfLines={2}></Card.Title>
            <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.paymentStatus}</Text>

          </View>
        </View>
      </Card>
    )
  };

  const renderSaleListItem = ({ item }) => {
    return (
      <Card key={item.id} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: Dimensions.get('screen').width / 1.3, padding: 10 }}>
          <Text style={{ fontSize: 16, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.vocher_id}</Text>
          <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.date.split("T")[0]}</Text>
        </View>
        <View style={styles.gridContainer}>
          {/* Vizag */}
          <View style={styles.gridItem}>
            <Card.Title title={item.voucherId} titleNumberOfLines={2} titleStyle={{ width: "100%" }} subtitle={item.branchName} subtitleNumberOfLines={2}></Card.Title>
            <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.amount}</Text>

          </View>
        </View>
      </Card>
    )
  };

  const renderReceivableListItem = ({ item }) => {
    return (
      <Card key={item.id} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: Dimensions.get('screen').width / 1.3, padding: 10 }}>
          <Text style={{ fontSize: 16, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.vocher_id}</Text>
          <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.date.split("T")[0]}</Text>
        </View>
        <View style={styles.gridContainer}>
          {/* Vizag */}
          <View style={styles.gridItem}>
            <Card.Title title={item.voucherId} titleNumberOfLines={2} titleStyle={{ width: "100%" }} subtitle={item.branchName} subtitleNumberOfLines={2}></Card.Title>
            <Text numberOfLines={3} style={{ fontSize: 16, color: '#aaaaaa', fontWeight: 600, marginLeft: 10 }}>{item.amount}</Text>

          </View>
        </View>
      </Card>
    )
  };

  const renderPurchaseListItem = ({ item }) => {
    return (
      <Card key={item.id} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopEndRadius: 5, borderTopStartRadius: 5, backgroundColor: '#27AE60', width: "100%", padding: 10 }}>
          <Text style={{ fontSize: 18, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginRight: 10, width: "60%" }}>{item.purchaseId}</Text>
          <Text style={{ fontSize: 14, color: '#f3f3f3', textTransform: "capitalize", fontWeight: 600, marginLeft: 10 }}>{item.generationDate.split("T")[0]}</Text>
        </View>
        <View style={styles.gridItem}>
          <Card.Title title={item.branchName} titleNumberOfLines={2} titleStyle={{ width: "100%", color: "#27AE60", fontSize: 16, fontFamily: "Parkinsans-SemiBold", textTransform: "capitalize", }} subtitle={item.amount} subtitleNumberOfLines={2} subtitleStyle={{ width: "100%", textTransform: "capitalize", }}></Card.Title>
        </View>
      </Card>
    )
  };

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
              {/* <View style={styles.textContainer}>
                <Text style={styles.change}>{stat.change} than last week</Text>
              </View> */}
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPayableVisible}
        onRequestClose={handlePayableCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handlePayableCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Payable Data
            </Text>
            <FlatList
              data={receivableTable}
              keyExtractor={(item) => item.id}
              renderItem={renderPayableListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSaleVisible}
        onRequestClose={handleSaleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleSaleCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Sale Data
            </Text>
            <FlatList
              data={saleTable}
              keyExtractor={(item) => item.id}
              renderItem={renderSaleListItem}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalReceivableVisible}
        onRequestClose={handleReceivableCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleReceivableCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Receivable Data
            </Text>
            <FlatList
              data={receivableTable}
              keyExtractor={(item) => item.id}
              renderItem={renderReceivableListItem}
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
              Purchase Data
            </Text>
            <FlatList
              data={purchaseTable}
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
    padding: 10, marginVertical: 20
  },
  card: {
    marginVertical: 10, backgroundColor: "#ffffff", elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
    padding: 10,
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
    backgroundColor: "#ffffff",
    padding: 6, flex: 1,
    borderRadius: 5,
    alignItems: "center",
    elevation: 2, // Adds shadow effect
  },
});

export default StatsSummary;
