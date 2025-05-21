import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Divider, Surface } from 'react-native-paper';

const AnalysisSection = ({ monthWiseAmount, CreditAndDebitPercentages }) => {
  let data = [];
  let accountData = {};
  const [modalCraditVisible, setModalCraditVisible] = useState(false);
  const [modalDebitVisible, setModalDebitVisible] = useState(false);

  const overall = (data) => {
    // Summing up data for each month
    const overallData = data[0].data.labels.map((label, index) =>
      data.reduce((sum, branch) => sum + branch.data.datasets[0].data[index], 0)
    );

    return {
      labels: data[0].data.labels,
      datasets: [
        {
          data: overallData,
          color: () => '#3498DB' // Different color for overall data
        }
      ]
    };
  };

  if (monthWiseAmount?.length > 0) {
    const monthwisedata = transformBranchApiResponse(monthWiseAmount);
    data = overall(monthwisedata)
  } else {

    const monthwisedata = [
      {
        "branchName": "Downtown Branch",
        "data": {
          "labels": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          "datasets": [
            {
              "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15000],
              "color": () => '#E74C3C'
            }
          ]
        }
      },
      {
        "branchName": "Central Office",
        "data": {
          "labels": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          "datasets": [
            {
              "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120000],
              "color": () => '#E74C3C'
            }
          ]
        }
      }
    ];

    data = overall(monthwisedata)
  }

  const calculateAveragesAndTotals = (data) => {
    const fields = [
      "expansesDebitPercentage",
      "expansesTotalDebitAmount",
      "productCreditPercentage",
      "productTotalCreditAmount",
      "salariesDebitPercentage",
      "salariesTotalDebitAmount",
      "salesCreditPercentage",
      "salesTotalCreditAmount",
      "serviceCreditPercentage",
      "serviceTotalCreditAmount",
      "totalCreditAmount",
      "totalDebitAmount"
    ];
  
    let totals = {};
    let count = {};
  
    // Initialize totals and count
    fields.forEach(field => {
      totals[field] = 0;
      count[field] = 0;
    });
  
    // Calculate sum and count non-null values
    data.forEach(entry => {
      fields.forEach(field => {
        if (entry[field] !== null) {
          totals[field] += entry[field];
          count[field]++;
        }
      });
    });
  
    // Compute averages for percentage fields
    const result = {};
    fields.forEach(field => {
      result[field] = field.includes("Percentage")
        ? (count[field] > 0 ? totals[field] / count[field] : null)
        : totals[field];
    });
  
    return result;
  };
  
  // Sample data  
  const defaultData = [
    {
      "branchAddress": "goa",
      "branchId": 5,
      "branchName": "Goa",
      "branchNumber": "9999999995",
      "date": "2025-01-31T18:30:00.000Z",
      "expansesDebitPercentage": null,
      "expansesTotalDebitAmount": 0,
      "productCreditPercentage": 100,
      "productTotalCreditAmount": 7000,
      "salariesDebitPercentage": null,
      "salariesTotalDebitAmount": 0,
      "salesCreditPercentage": 0,
      "salesTotalCreditAmount": 0,
      "serviceCreditPercentage": 0,
      "serviceTotalCreditAmount": 0,
      "totalCreditAmount": 7000,
      "totalDebitAmount": 0
    }
  ];
  
   accountData = CreditAndDebitPercentages?.length > 0
    ? calculateAveragesAndTotals(CreditAndDebitPercentages)
    : calculateAveragesAndTotals(defaultData);
  
  console.log(accountData);
  


  const width = Dimensions.get('screen').width;
  const chartConfig = {
    backgroundGradientFrom: '#F3F3F3',
    backgroundGradientTo: '#27AE60',
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [{ data: [10, 20, 15, 30, 40, 25], color: () => '#27AE60' }],
  // };



  const openCraditModal = () => {
    setModalDebitVisible(false);
    setModalCraditVisible(true)};
  const closeCraditModal = () => setModalCraditVisible(false);
  const openDebitModal = () => {
    setModalCraditVisible(false);
    setModalDebitVisible(true)};
  const closeDebitModal = () => setModalDebitVisible(false);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis for All Branches</Text>
      <LineChart
        data={data}
        width={width / 1.1}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
      <View style={styles.legend}>
        <View>
          <Text style={styles.sectionTitle}>Credits</Text>
          <Text style={styles.legendText}>Sales - {accountData.salesCreditPercentage} %</Text>
          <Text style={styles.legendText}>Serves - {accountData.serviceCreditPercentage} %</Text>
          <Text style={styles.legendText}>product - {accountData.productCreditPercentage} %</Text>
          <Button mode="outlined" onPress={openCraditModal}>
            More Info
          </Button>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Debits</Text>
          <Text style={styles.legendText}>Salaries - {accountData.salariesDebitPercentage} %</Text>
          <Text style={styles.legendText}>Expances - {accountData.expansesDebitPercentage} %</Text>
          <Button mode="outlined" onPress={openDebitModal}>
            More Info
          </Button>
        </View>
      </View>

      {/* Modal for detailed info */}
      <Modal
        transparent={true}
        visible={modalCraditVisible}
        animationType="fade"
        onRequestClose={closeCraditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Total Credit Amount: {accountData.totalCreditAmount} /-</Text>
            <ScrollView horizontal={true}>
              <Surface style={styles.modalContentRow}>
                <View style={styles.modalColumn}>
                  <Text style={styles.modalSectionTitle}>Sales : {accountData.salesCreditPercentage} % - {accountData.salesTotalCreditAmount} Rs</Text>
                  {CreditAndDebitPercentages?.map((item) => (<Text style={styles.modalText}>{item.branchName} : {item.salesCreditPercentage}%</Text>))}
                </View>
                <Divider style={{ height: "100%", width: 2, backgroundColor: "#27AE6050", borderRadius: 2, marginTop: 5 }}></Divider>
                <View style={styles.modalColumn}>
                  <Text style={styles.modalSectionTitle}>Services :  {accountData.serviceCreditPercentage} % - {accountData.serviceTotalCreditAmount} Rs</Text>
                  {CreditAndDebitPercentages?.map((item, index) => (<Text key={index} style={styles.modalText}>{item.branchName} : {item.serviceCreditPercentage}%</Text>))}
                </View>
                <Divider style={{ height: "100%", width: 2, backgroundColor: "#27AE6050", borderRadius: 2, marginTop: 5 }}></Divider>
                <View style={styles.modalColumn}>
                  <Text style={styles.modalSectionTitle}>Products :  {accountData.productCreditPercentage} % - {accountData.productTotalCreditAmount} Rs</Text>
                  {CreditAndDebitPercentages?.map((item, index) => (<Text key={index} style={styles.modalText}>{item.branchName} : {item.productCreditPercentage}%</Text>))}
                </View>
              </Surface>
            </ScrollView>
            <Button mode="contained" onPress={closeCraditModal} style={styles.okButton} textColor="#f3f3f3" buttonColor='#27AE60'>
              OK
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalDebitVisible}
        animationType="fade"
        onRequestClose={closeDebitModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Total Debit Amount: {accountData.totalDebitAmount} /-</Text>
              <Surface style={styles.modalContentRow}>
                <View style={styles.modalColumn}>
                  <Text style={styles.modalSectionTitle}>Salary : {accountData.salariesDebitPercentage} % - {accountData.salariesTotalDebitAmount} Rs</Text>
                  {CreditAndDebitPercentages?.map((item) => (<Text style={styles.modalText}>{item.branchName} : {item.salariesDebitPercentage}%</Text>))}
                </View>
                <Divider style={{ height: "100%", width: 2, backgroundColor: "#27AE6050", borderRadius: 2, marginTop: 5 }}></Divider>
                <View style={styles.modalColumn}>
                  <Text style={styles.modalSectionTitle}>Expances :  {accountData.expansesDebitPercentage} % - {accountData.expansesTotalDebitAmount} Rs</Text>
                  {CreditAndDebitPercentages?.map((item, index) => (<Text key={index} style={styles.modalText}>{item.branchName} : {item.expansesDebitPercentage}%</Text>))}
                </View>
              </Surface>
            </ScrollView>
            <Button mode="contained" onPress={closeDebitModal} style={styles.okButton} textColor="#f3f3f3" buttonColor='#27AE60'>
              OK
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 80,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Parkinsans-Bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 8,
    alignSelf: 'center',
  },
  legend: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'green',
    fontFamily: 'Parkinsans-SemiBold',
    fontSize: 21,
    marginVertical: 8,
    alignSelf: 'center',
  },
  legendText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Parkinsans-Bold',
    color: '#27AE60',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContentRow: {
    flexDirection: 'row', backgroundColor: "#f3f3f3", borderColor: "#27AE60",
    justifyContent: 'space-between', paddingBottom: 10, borderWidth: 1,
  },
  modalContent: {
     backgroundColor: "#f3f3f3", borderColor: "#27AE60",
    justifyContent: 'space-between', marginBottom: 10, borderWidth: 1,
  },
  modalColumn: {
    flex: 1, width: "100%"
  },
  modalSectionTitle: {
    fontSize: 16, textAlign: "center",
    fontWeight: 'bold', backgroundColor: "#27AE60",
    marginBottom: 10, color: "#f3f3f3"
  },
  modalText: {
    fontSize: 14, margin: 5,
    marginBottom: 5, textAlign: "center"
  },
  okButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default AnalysisSection;
