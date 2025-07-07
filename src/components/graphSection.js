import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphSection = ({ monthWiseBalance }) => {
  let data = [];
  
  const transformBranchApiResponse = (apiResponse) => {
  
    // Define all months in order
    const allMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Juy", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Step 1: Group data by branchName
    const branchMap = new Map();
  
    apiResponse.forEach(item => {
      const { branchName, month, TotalSalesAmount } = item;
  
      if (!branchMap.has(branchName)) {
        branchMap.set(branchName, new Map());
      }
  
      branchMap.get(branchName).set(month, TotalSalesAmount);
    });
  
    // Step 2: Build transformed result
    const result = [];
  
    branchMap.forEach((monthDataMap, branchName) => {
      const completeData = allMonths.map((monthName, index) => {
        const monthNumber = index + 1;
        return {
          month: monthNumber,
          monthName,
          balanceAmount: monthDataMap.get(monthNumber) || 0
        };
      });
  
      result.push({
        branchName,
        data: {
          labels: completeData.map(item => item.monthName),
          datasets: [
            {
              data: completeData.map(item => item.balanceAmount),
              color: () => '#E74C3C'
            }
          ]
        }
      });
    });
  
    return result;
  };
  

  // Transform and log the output

  const redChartConfig = {
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#E74C3C',
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
  };
  const greenChartConfig = {
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#27AE60',
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
  };
  const blackChartConfig = {
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#333333',
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
  };
  const blueChartConfig = {
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#3498DB',
    color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(225, 225, 225, ${opacity})`,
  };

  if (monthWiseBalance?.length > 0) {
    data = transformBranchApiResponse(monthWiseBalance);
  } else {
    data = [
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
  }


  return (
    <ScrollView horizontal style={styles.container}>
      {data.map((data) => {
        return (
          <View style={[styles.chartWrapper, { backgroundColor: '#E74C3C' }]}>
            <LineChart
              data={data.data}
              width={450}
              height={200}
              chartConfig={redChartConfig}
              bezier
              style={styles.chart}
            />
            <Text style={{ color: "#fff", fontSize: 14, fontFamily: "Parkinsans-SemiBold", marginTop: 8 }}>{data.branchName}</Text>
            {/* <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Parkinsans-Regular", marginBottom: 5 }}>profit - 15 %</Text> */}
          </View>
        )
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  chartWrapper: {
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
  chart: {
    borderRadius: 8,
  },
});
export default GraphSection;
