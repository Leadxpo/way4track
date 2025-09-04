import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BranchSummary = ({branchSales}) => {
  const renderbranchSaleItem=({item, index})=>{
   return(
      <Card key={index} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Image source={require('../utilities/images/way4tracklogo.png')} style={styles.logo} />
          <Text style={styles.branchName}>{item.branchName}</Text>
        </View>
        <View style={styles.stats}>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Other Sales Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black" }]}>{item.otherSalesAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Product SalesAmount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.productSalesAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Rectifications Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.rectificationsAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Renewables Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.renewablesAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Replacements Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.replacementsAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Service Sales Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.serviceSalesAmount}</Text>
          </View>
          <View style={{ width: "100%", flex: 1, flexDirection: 'row',marginVertical:3 }}>
            <Text style={[styles.statText, {color:'black',fontFamily:"Roboto-Regular", flex: 2, textAlign: 'left', }]}>Total Sales Amount</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'center', }]}>:</Text>
            <Text style={[styles.statText, { flex: 2, textAlign: 'right',fontFamily:"Roboto-Black"}]}>{item.totalSalesAmount}</Text>
          </View>
        </View>
      </View>
    </Card>
)
  }
  return (
    <View style={styles.container}>

<FlatList
          data={branchSales}
          keyExtractor={(item) => item.id}
          renderItem={renderbranchSaleItem}
          horizontal={true}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 40,
    height: 42,
  },

  card: {
    margin: 5,width:Dimensions.get('screen').width/1.2,
    elevation: 3,backgroundColor:'#f3f3f3'
  },
  cardContent: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  branchName: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily:"Parkinsans-SemiBold",
    color: '#000',
  },
  stats: {
    flexDirection: 'column',
  },
  statText: {
    fontSize: 16,
    color: '#555',
  },
});

export default BranchSummary;
