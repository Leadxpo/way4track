import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
const CashSummary = ({solidLiquid,branchwise}) => {
  return (
    <View style={styles.container}>

      <View style={[styles.section,{flex:1,flexDirection:'row'}]}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%" style={{ padding: 10 }}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#2ecc71" stopOpacity="1" />
                <Stop offset="1" stopColor="#27ae60" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}
        <View style={{alignSelf:'center'}}>
          <Text style={styles.title}>Solid Cash</Text>
          <Text style={styles.amount}>₹ {solidLiquid?.solidCash}/-</Text>
        </View>
        <Divider style={{width:1,height:"100%",marginHorizontal:8,backgroundColor:"gray",borderRadius:5}}></Divider>
        <View style={[styles.breakdown, { flex: 2 }]}>
        {branchwise?.map((branch, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={[styles.statText, { color: "black", fontFamily: "Parkinsans-SemiBold", flex: 2, textAlign: "left" }]}>
                  {branch.branchName}
                </Text>
                <Text style={[styles.statText, { flex: 2, textAlign: "center" }]}>:</Text>
                <Text style={[styles.statText, { flex: 2, textAlign: "right", fontFamily: "Roboto-Black" }]}>{branch.solidCash}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.section,{flex:1,flexDirection:'row'}]}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground}>
          <Svg height="100%" width="100%" style={{ padding: 10 }}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#2ecc71" stopOpacity="1" />
                <Stop offset="1" stopColor="#27ae60" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>

        {/* Section Content */}
        <View style={{alignSelf:'center'}}>
          <Text style={styles.title}>Liquid Cash</Text>
          <Text style={styles.amount}>₹{ solidLiquid?.liquidCash} /-</Text>
        </View>
        <Divider style={{width:1,height:"100%",marginHorizontal:5,backgroundColor:"gray",borderRadius:5}}></Divider>
        <View style={[styles.breakdown, { flex: 2 }]}>
        {branchwise?.map((branch, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={[styles.statText, { color: "black", fontFamily: "Parkinsans-SemiBold", flex: 2, textAlign: "left" }]}>
                {branch.branchName}
                </Text>
                <Text style={[styles.statText, { flex: 2, textAlign: "center" }]}>:</Text>
                <Text style={[styles.statText, { flex: 2, textAlign: "right", fontFamily: "Roboto-Black" }]}>{branch.liquidCash}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  section: {
    borderRadius: 8,
    overflow: "hidden", // Ensures the gradient doesn't overflow
    margin: 10, padding: 10,
    position: "relative", // Allows stacking the gradient background
    elevation: 4, // Shadow for better visibility
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject, // Fills the section
    zIndex: -1, // Places it behind the content
  },
  title: {
    fontSize: 20,
    color: "#333", // Adjust text color for better contrast
    fontFamily: "Parkinsans-Bold",
  },
  amount: {
    fontSize: 18,justifyContent:'center',
    color: "#fff",alignSelf:'center',
    fontFamily: "Parkinsans-Bold",
  },
  breakdown: {
    marginTop: 8,
  },
  row: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    marginVertical: 3,
  },
  statText: {
    fontSize: 14,
    color: "#fff",
  },

  breakdown: {
    marginTop: 10,
  },
  breakdownText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default CashSummary;
