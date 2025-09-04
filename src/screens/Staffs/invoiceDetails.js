import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, Button, estimateDetailsTable, BottomNavigation, Badge, Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';

const InvoiceDetails = ({ navigation, route }) => {
  
  const { estimateDetails } = route.params;  // Sample address data
  console.log("rrr :", estimateDetails)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  let totalCost = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  let totalTDS = 0;

  const cgstPercentage = (Number(estimateDetails.CGST) / Number(estimateDetails.totalAmount)) * 100
  const scstPercentage = (Number(estimateDetails.SCST) / Number(estimateDetails.totalAmount)) * 100
  const tdsPercentage = (Number(estimateDetails.TDS) / Number(estimateDetails.totalAmount)) * 100

  const cgstRate = cgstPercentage / 100;
  const sgstRate = scstPercentage / 100;
  const tdsRate = tdsPercentage / 100;

  estimateDetails.products?.forEach(item => {
    totalCost += item.totalAmount;
    totalCGST += item.totalAmount * cgstRate;
    totalSGST += item.totalAmount * sgstRate;
    totalTDS += item.totalAmount * tdsRate;
  });

  const totalAmount = (parseInt(totalCost) + parseInt(totalCGST) + parseInt(totalSGST) + parseInt(totalTDS))

  const accountDetails = estimateDetails.branchAccount?.find(
    (account) => {
      return (Number(account.id) === Number(estimateDetails.accountId))
    }
  ) || {};

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        {/* Body */}
        <ScrollView contentContainerStyle={styles.body}>
          {/* Estimate Card */}
          <View style={styles.pageBorder}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../utilities/images/way4tracklogo.png')}
                  style={styles.logo}
                />
                <View>
                  <Text style={styles.companyName}>SHARON TELEMATICS PRIVATE LIMITED</Text>
                  <Text style={styles.companyDetails}>Company ID: {estimateDetails.branchCIN}</Text>
                  <Text style={[styles.companyDetails,{width:150}]}> {estimateDetails.branchAddress}</Text>
                  <Text style={styles.companyDetails}>GSTIN: {estimateDetails.branchGST}</Text>
                </View>
              </View>

              <View style={styles.invoiceTitleContainer}>
                <Text style={styles.invoiceTitle}>Invoice</Text>
              </View>
            </View>

            {/* Details Row */}
            <View style={styles.detailsRow}>
              <View style={styles.detailsColumnLeft}>
                <Text style={styles.detailsText}>Quotation No.: {estimateDetails.invoiceId}</Text>
                <Text style={styles.detailsText}>Pro Forma Quotation Date: {formatDate(estimateDetails.estimateDate)}</Text>
              </View>
              <View style={styles.detailsColumnRight}>
                <Text style={styles.detailsText}>Place of Supply: {estimateDetails.supplyState}</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.detailsColumnLeft}>
                <Text style={styles.detailsText}>Bill To</Text>
                <Text style={styles.detailsText}>{estimateDetails.clientName}</Text>
                <Text style={styles.detailsText}>{estimateDetails.buildingAddress}</Text>
              </View>
              <View style={styles.detailsColumnRight}>
                <Text style={styles.detailsText}>Shipping To</Text>
                <Text style={styles.detailsText}>{estimateDetails.clientName}</Text>
                <Text style={styles.detailsText}>{estimateDetails.shippingAddress}</Text>
              </View>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableColSN}>#</Text>
              <Text style={styles.tableCol}>Items</Text>
              <Text style={styles.tableCol}>HSN/SAC</Text>
              <Text style={styles.tableCol}>Qty</Text>
              <Text style={styles.tableCol}>Rate</Text>
              <View style={styles.tableHeader}></View>
              {
                estimateDetails.isTDS &&
                (
                  <>
                    <Text style={styles.tableColTax}>TDS%</Text>
                    <Text style={styles.tableColTax}>TDS Amt</Text>
                  </>
                )
              }
              {estimateDetails.isGST &&
                (estimateDetails.taxableState !== estimateDetails.supplyState ? (
                  <>
                    <Text style={styles.tableColTax}>IGST%</Text>
                    <Text style={styles.tableColTax}>IGST Amt</Text>

                  </>
                ) : (
                  <>
                    <Text style={styles.tableColTax}>CGST%</Text>
                    <Text style={styles.tableColTax}>CGST Amt</Text>

                    <Text style={styles.tableColTax}>SGST%</Text>
                    <Text style={styles.tableColTax}>SGST Amt</Text>
                  </>
                ))
              }
              <Text style={styles.tableCol}>Amount</Text>
            </View>

            {/* Table Rows */}
            {estimateDetails?.products?.map((item, index) => {
              const cgst = (item.totalCost * parseFloat(cgstPercentage)) / 100;
              const sgst = (item.totalCost * parseFloat(scstPercentage)) / 100;
              const tds = (item.totalCost * parseFloat(tdsPercentage)) / 100;
              const total = item.totalCost + cgst + sgst + tds;
              return (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableColSN}>{index + 1}</Text>
                  <Text style={styles.tableCol}>{item.name}{"\n"}
                    <Text style={{ fontSize: 8, color: "#333333" }}>{item.description}</Text>
                  </Text>
                  <Text style={styles.tableCol}>{item.hsnCode}</Text>
                  <Text style={styles.tableCol}>{item.quantity}</Text>
                  <Text style={styles.tableCol}>{item.costPerUnit}</Text>
                  {
                    estimateDetails.isTDS &&

                    (
                      <>
                        <Text style={styles.tableColTax}>{tdsPercentage}%</Text>
                        <Text style={styles.tableColTax}>{tds.toFixed(2)}</Text>
                      </>
                    )
                  }
                  {estimateDetails.isGST &&
                    (estimateDetails.taxableState === estimateDetails.supplyState ? (
                      <>
                        <Text style={styles.tableColTax}>{cgstPercentage}%</Text>
                        <Text style={styles.tableColTax}>{cgst.toFixed(2)}</Text>
                        <Text style={styles.tableColTax}>{scstPercentage}%</Text>
                        <Text style={styles.tableColTax}>{sgst.toFixed(2)}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.tableColTax}>{cgstPercentage}%</Text>
                        <Text style={styles.tableColTax}>{cgst.toFixed(2)}</Text>
                      </>
                    )
                    )
                  }
                  <Text style={styles.tableCol}>{total.toFixed(2)}</Text>
                </View>
              );
            })}

            {/* Totals Row */}
            {/* <View style={styles.tableRow}>
            <Text style={styles.tableColSN}></Text>
            <Text style={styles.tableColDesc}>Totals</Text>
            <Text style={styles.tableCol}></Text>
            <Text style={styles.tableCol}>{estimateDetails.quantity}</Text>
            <Text style={styles.tableCol}></Text>
            {estimateDetails.isTDS &&
              <>
                <Text style={styles.tableColTax}>{estimateDetails.tdsPercentage}%</Text>
                <Text style={styles.tableColTax}>
                  {(estimateDetails.totalAmount * parseFloat(estimateDetails.tdsPercentage) / 100).toFixed(2)}
                </Text>
              </>
            }
            {estimateDetails.isGST &&
              <>
                <Text style={styles.tableColTax}>{estimateDetails.cgstPercentage}%</Text>
                <Text style={styles.tableColTax}>
                  {(estimateDetails.totalAmount * parseFloat(estimateDetails.cgstPercentage) / 100).toFixed(2)}
                </Text>
              </>
            }
            {
              (estimateDetails.taxableState === estimateDetails.supplyState && estimateDetails.isGST) &&
              <>
                <Text style={styles.tableColTax}>{estimateDetails.scstPercentage}%</Text>
                <Text style={styles.tableColTax}>
                  {(estimateDetails.totalAmount * parseFloat(estimateDetails.scstPercentage) / 100).toFixed(2)}
                </Text>
              </>
            }
            <Text style={styles.tableCol}>{totalAmount.toFixed(2)}</Text>
          </View> */}

            {/* Total in Words + Bank Details */}
            <View style={styles.footerBlock}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerTitle}>Total Amount</Text>
                {estimateDetails.isTDS && <Text style={styles.footerTitle}>Total TDS</Text>}
                {(estimateDetails.taxableState !== estimateDetails.supplyState && estimateDetails.isGST) && <Text style={styles.footerTitle}>Total IGST</Text>}
                {(estimateDetails.taxableState === estimateDetails.supplyState && estimateDetails.isGST) &&
                  <>
                    <Text style={styles.footerTitle}>Total CGST</Text>
                    <Text style={styles.footerTitle}>Total SGST</Text>
                  </>}
                {/* <Text style={[styles.footerTitle, { fontSize: 10 }]}>Total In Words :</Text>
              <Text style={styles.footerText}>
                {toWords.convert(totalAmount, { currency: false })}
              </Text> */}

                <Text style={styles.footerTitle}>Notes</Text>
                <Text style={styles.footerText}>Looking forward</Text>

                <Text style={styles.footerTitle}>Bank Details:</Text>
                <Text style={styles.footerText}>
                  Payment To: Sharon Telematics Pvt Ltd., Visakhapatnam
                </Text>
                <Text style={styles.footerText}>
                  Payment Mode: By Cash / NEFT / RTGS / Cheque
                </Text>
                <Text style={styles.footerText}>
                  A/c No: {accountDetails?.accountNumber || 'N/A'}
                </Text>
                <Text style={styles.footerText}>
                  Bank: {accountDetails?.name || 'N/A'}, {accountDetails?.address || 'N/A'}
                </Text>
                <Text style={styles.footerText}>
                  IFSC: {accountDetails?.ifscCode || 'N/A'}
                </Text>
              </View>

              <View style={styles.footerRight}>
                <Text style={styles.footerTitle}>{parseFloat(estimateDetails.totalAmount).toFixed(2)} RS</Text>
                {estimateDetails.isTDS && <Text style={styles.footerTitle}>{(estimateDetails.totalAmount * parseFloat(tdsPercentage) / 100).toFixed(2)} Rs</Text>}
                {(estimateDetails.taxableState !== estimateDetails.supplyState && estimateDetails.isGST) && <Text style={styles.footerTitle}>{(estimateDetails.totalAmount * parseFloat(cgstPercentage) / 100).toFixed(2)} Rs</Text>}
                {(estimateDetails.taxableState === estimateDetails.supplyState && estimateDetails.isGST) &&
                  <>
                    <Text style={styles.footerTitle}>{(estimateDetails.totalAmount * parseFloat(cgstPercentage) / 100).toFixed(2)} Rs</Text>
                    <Text style={styles.footerTitle}>{(estimateDetails.totalAmount * parseFloat(scstPercentage) / 100).toFixed(2)} Rs</Text>
                  </>}

                <Text style={styles.amountDue}>Amount Due: {totalAmount.toFixed(2)} RS</Text>

                <View style={styles.signatureBlock}>
                  <Text>For SHARON TELEMATICS PVT LTD</Text>
                  <Image src="/signature.png" style={styles.signatureImage} />
                  <Text style={styles.signatureText}>Authorised Signatory</Text>
                </View>
              </View>
            </View>

            {/* Terms */}
            <View style={styles.termsBlock}>
              <Text style={styles.footerTitle}>Terms & Conditions</Text>
              <Text style={styles.footerText}>{estimateDetails.description}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  pageBorder: {
    border: '1px solid black',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyDetails: {
    fontSize: 10, marginBottom: 3
  },
  invoiceTitleContainer: {
    justifyContent: 'center',
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    paddingVertical: 5,
  },
  detailsColumnLeft: {
    flex: 1,
    paddingRight: 10,
    borderRight: '1px solid black',
  },
  detailsColumnRight: {
    flex: 1,
    paddingLeft: 10,
  },
  detailsText: {
    marginBottom: 2,
  },
  billTo: {
    marginVertical: 10,
  },
  billToTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  billToName: {
    fontSize: 10,
  },
  billToGST: {
    fontSize: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 5, justifyContent: 'space-between',
    borderBottom: '1px solid black',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5, justifyContent: 'space-between',
    borderBottom: '1px solid #ddd',
  },
  tableColSN: {
    width: '4%',
    textAlign: 'center',
  },
  tableColDesc: {
    width: '22%',
  },
  tableCol: {
    width: '10%',
    textAlign: 'center',
  },
  tableColTax: {
    width: '8%',
    textAlign: 'center',
  },
  footerBlock: {
    flexDirection: 'row',
    marginTop: 10,
    borderTop: '1px solid black',
    paddingTop: 10,
  },
  footerLeft: {
    flex: 2,
    paddingRight: 10,
  },
  footerRight: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
  },
  footerText: {
    marginBottom: 3,
  },
  totalDueText: {
    fontSize: 10,
    marginBottom: 4,
  },
  amountDue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureBlock: {
    marginTop: 10,
    alignItems: 'center',
  },
  signatureImage: {
    width: 80,
    height: 40,
    marginVertical: 5,
  },
  signatureText: {
    fontSize: 9,
    marginTop: 3,
  },
  termsBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1px solid black',
  },
});

export default InvoiceDetails;
