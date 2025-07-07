import React,{useState,useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import Header from '../../components/userHeader';
import BranchSummary from '../../components/branchSummary';
import CashSummary from '../../components/cashSummary';
import GraphSection from '../../components/graphSection';
import StatsSummary from '../../components/statsSummary';
import AnalysisSection from '../../components/analysisSection';
import { intiateCEO_dashboard } from '../../Redux/Actions/dashboard';

const Home_CEO = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);

  const { loading:CEO_homeInfoLoading, CEO_homeInfo, error:CEO_homeInfoError } = useSelector(state => state.CEO_homeInfoReducer);

  useEffect(() => {
    const CEO_dashboardPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(intiateCEO_dashboard(CEO_dashboardPayload)); 
  }, [dispatch])
  return ( 
    <SafeAreaView>
        <Header />
      <ScrollView>
        <BranchSummary branchSales={CEO_homeInfo?.ProductAndServiceSales} />
        <CashSummary solidLiquid={CEO_homeInfo?.solidLiquid} branchwise={CEO_homeInfo?.branchWiseSolidLiquidCash}/>
        <GraphSection monthWiseBalance={CEO_homeInfo?.monthWiseBalance}/>
        <StatsSummary
        PayableAmount={CEO_homeInfo?.amountDetails.PayableAmount} 
        ReceivableAmount={CEO_homeInfo?.amountDetails.ReceivableAmount} 
        SalesAmount={CEO_homeInfo?.amountDetails.SalesAmount} 
        PurchaseCount={CEO_homeInfo?.PurchaseCount.last30DaysPurchases}
        receivableTable={CEO_homeInfo?.receivableTable}  
        saleTable={CEO_homeInfo?.saleTable} 
        payableTable={CEO_homeInfo?.payableTable} 
        purchaseTable={CEO_homeInfo?.purchaseData} 
        />
        {/* <AnalysisSection yearWiseAmount={CEO_homeInfo?.branchWiseYearlySales} CreditAndDebitPercentages={CEO_homeInfo?.ProductTypeCreditAndDebitPercentages}/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
});

export default Home_CEO;
