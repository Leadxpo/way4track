import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import api from '../../Api/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Modal, Portal, Provider } from 'react-native-paper';
import BranchesDropdown from '../../components/branchDropdown';
import ClientDropdown from '../../components/clientDropdown';
import downloadExcel from '../../Utils/downloadExcel';

const Report = ({ route }) => {

  const [openBranch, setOpenBranch] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  const [daybookModalView, setDaybookModalView] = useState(false);
  const [ledgerModalView, setLedgerModalView] = useState(false);
  const [purchaseModalView, setPurchaseModalView] = useState(false);
  const [invoiceModalView, setInvoiceModalView] = useState(false);
  const [estimateModalView, setEstimateModalView] = useState(false);
  const [receiptModalView, setReceiptModalView] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const [daybookDateFromOpen, setDaybookDateFromOpen] = useState(false);
  const [daybookDateToOpen, setDaybookDateToOpen] = useState(false);
  const [ledgerDateFromOpen, setLedgerDateFromOpen] = useState(false);
  const [ledgerDateToOpen, setLedgerDateToOpen] = useState(false);
  const [purchaseDateFromOpen, setPurchaseDateFromOpen] = useState(false);
  const [purchaseDateToOpen, setPurchaseDateToOpen] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');
  const [clientID, setClientID] = useState('');
  const [branchId, setBranchId] = useState('');
  const [branchID, setBranchID] = useState('');
  const [branchName, setBranchName] = useState('');

  const [estimateId, setEstimateId] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [receiptId, setReceiptId] = useState('');
  const [date, setDate] = useState(new Date());
  const [daybookDateFrom, setDaybookDateFrom] = useState('');
  const [daybookDateTo, setDaybookDateTo] = useState("");
  const [ledgerDateFrom, setLedgerDateFrom] = useState('');
  const [ledgerDateTo, setLedgerDateTo] = useState([]);
  const [purchaseDateFrom, setPurchaseDateFrom] = useState('');
  const [purchaseDateTo, setPurchaseDateTo] = useState([]);

  const formatDate = date => date.toISOString().split('T')[0];
  useEffect(() => {
    setBranchID(branchId);
    setClientId(selectedClient?.clientId);
  }, [branchId, selectedClient])

  const generateExcelFile = async (data, columns, fileName) => {
    try {
      const headers = [columns.map(col => col.header)];
      const rows = data.map(item => columns.map(col => item[col.key] || ''));

      const worksheet = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
      worksheet["!cols"] = columns.map(col => ({ wch: col.width }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

      const excelBase64 = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;

      await RNFS.writeFile(filePath, excelBase64, 'base64');
      return filePath;
    } catch (error) {
      console.error('Error generating Excel file:', error);
      Alert.alert('Error', 'Failed to generate Excel file.',error);
      return null;
    }
  };

  const exportReportExcel = async (name, fromDate, toDate, branchName) => {
    let apiUrl = '', columns = [], fileName = '';

    switch (name) {
      case 'Day Book':
        apiUrl = '/dashboards/getDayBookDataForReport';
        fileName = 'DayBook';
        columns = [
          { header: 'Date', key: 'date', width: 15 },
          { header: 'Title', key: 'title', width: 20 },
          { header: 'Voucher Type', key: 'voucherType', width: 20 },
          { header: 'Credit Amount', key: 'creditAmount', width: 20 },
          { header: 'Debit Amount', key: 'debitAmount', width: 20 },
          { header: 'Balance Amount', key: 'balanceAmount', width: 20 },
        ];
        break;
      case 'Ledger':
        apiUrl = '/dashboards/getLedgerDataForReport';
        fileName = 'Ledger';
        columns = [
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Voucher ID', key: 'voucherId', width: 20 },
          { header: 'Voucher Type', key: 'voucherType', width: 20 },
          { header: 'Title', key: 'title', width: 20 },
          { header: 'Generation Date', key: 'generationDate', width: 15 },
          { header: 'Credit Amount', key: 'creditAmount', width: 20 },
          { header: 'Debit Amount', key: 'debitAmount', width: 20 },
        ];
        break;
      case 'Purchase':
        apiUrl = '/dashboards/getTotalPurchaseForReport';
        fileName = 'Purchase';
        columns = [
          { header: 'Branch Name', key: 'branchName', width: 20 },
          { header: 'Voucher ID', key: 'voucherId', width: 20 },
          { header: 'Title', key: 'title', width: 20 },
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Date', key: 'date', width: 15 },
          { header: 'Amount', key: 'amount', width: 25 },

        ];
        break;
    }

    const reportPayload={
      branchName,
      // client: selectedClient,
      fromDate,
      toDate,
      companyCode: "WAY4TRACK",
      unitCode: "WAY4",
    }
    console.log("reportPayload : ", reportPayload)

    try {
      const response = await api.post(apiUrl, {
        branchName,
        // client: selectedClient,
        fromDate,
        toDate,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      });

      const filePath = await generateExcelFile(response.data.data, columns, fileName);
      if (filePath) shareFile(filePath, `${fileName}.xlsx`);
      // if (filePath) downloadExcel(filePath, `${fileName}.xlsx`);
    } catch (error) {
      console.error(`Error exporting ${name}:`, error);
    }
  };

  const triggerDownloadAPI = async (name,id) => {
    let apiUrl = '';

    switch (name) {
      case 'Estimate':
        apiUrl = '/reports/downloadEstimate';
        break;
      case 'Receipt':
        apiUrl = '/reports/downloadReceipt';
        break;
      case 'Invoice':
        apiUrl = '/reports/downloadInvoice';
        break;
    }

    try {
      const response = await api.post(apiUrl, {
        id,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",  
      });

      if (response.data?.downloadUrl) {
        downloadFile(response.data.estimatepdfUrl, `${name}.pdf`);
      } else {
        Alert.alert('Error', 'Failed to get download URL');
      }
    } catch (error) {
      console.error(`Error downloading ${name}:`, error);
    }
  };

  const downloadFile = async (url, fileName) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      const downloadResult = await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;

      if (downloadResult.statusCode === 200) {
        shareFile(path, fileName);
      } else {
        Alert.alert('Error', 'Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const shareFile = async (filePath, fileName) => {
    try {
      await Share.open({
        url: `file://${filePath}`,
        type: fileName.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        failOnCancel: false,
      });
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  return (
    <Provider>
      <View style={{ padding: 20 }}>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setDaybookModalView(true)}>
          <Text style={styles.downloadText}>Day Book</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setLedgerModalView(true)}>
          <Text style={styles.downloadText}>Ledger</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setPurchaseModalView(true)}>
          <Text style={styles.downloadText}>Purchase</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setInvoiceModalView(true)}>
          <Text style={styles.downloadText}>Invoices</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setEstimateModalView(true)}>
          <Text style={styles.downloadText}>Estimate</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadContainer} onPress={() => setReceiptModalView(true)}>
          <Text style={styles.downloadText}>Receipt</Text>
          <Icon name="download" size={24} color="red" />
        </TouchableOpacity>

        <Portal>
          <Modal visible={estimateModalView} onDismiss={() => setEstimateModalView(false)} contentContainerStyle={styles.modalContainer}>
            <TextInput
              placeholder="Enter Estimate ID"
              value={estimateId}
              onChangeText={setEstimateId}
              style={styles.input}
            />
            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              triggerDownloadAPI('Estimate',estimateId,);
              setEstimateModalView(false)
            }} >Download Estimate</Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={invoiceModalView} onDismiss={() => setInvoiceModalView(false)} contentContainerStyle={styles.modalContainer}>
            <TextInput
              placeholder="Enter invoice ID"
              value={invoiceId}
              onChangeText={setInvoiceId}
              style={styles.input}
            />
            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              triggerDownloadAPI('Invoice',invoiceId);
              setInvoiceModalView(false)
            }} >Download Invoice</Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={receiptModalView} onDismiss={() => setReceiptModalView(false)} contentContainerStyle={styles.modalContainer}>
            <TextInput
              placeholder="Enter receipt ID"
              value={receiptId}
              onChangeText={setReceiptId}
              style={styles.input}
            />
            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              triggerDownloadAPI('Receipt',receiptId)
              setReceiptModalView(false)
            }} >Download Receipt</Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={daybookModalView} onDismiss={() => setDaybookModalView(false)} contentContainerStyle={styles.modalContainer}>
            <BranchesDropdown branchName={setBranchName} dropdownStyles={styles} onBranchChange={setBranchId} />
            <TextInput
              placeholder="From"
              value={daybookDateFrom}
              style={styles.input}
              onPress={() => setDaybookDateFromOpen(true)}
            />

            <DatePicker
              modal
              open={daybookDateFromOpen}
              date={dateFrom}
              mode='date'
              onConfirm={(date) => {
                setDaybookDateFromOpen(false);
                setDateFrom(date);
                const selectedData = formatDate(date);
                setDaybookDateFrom(selectedData);
              }}
              onCancel={() => {
                setDaybookDateFromOpen(false)
              }}
            />


            <TextInput
              placeholder="To"
              value={daybookDateTo}
              onPress={() => setDaybookDateToOpen(true)}
              style={styles.input}
            />

            <DatePicker
              modal
              open={daybookDateToOpen}
              date={dateTo}
              mode='date'
              onConfirm={(date) => {
                setDaybookDateToOpen(false);
                setDateTo(date);
                const selectedData = formatDate(date);
                setDaybookDateTo(selectedData);
              }}
              onCancel={() => {
                setDaybookDateToOpen(false)
              }}
            />

            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              // exportReportExcel('Day Book',daybookDateFrom,daybookDateTo,branchName);
              exportReportExcel('Day Book',branchName,daybookDateFrom,daybookDateTo);
              setDaybookModalView(false)
            }} >Download Daybook</Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={ledgerModalView} onDismiss={() => setLedgerModalView(false)} contentContainerStyle={styles.modalContainer}>

            <ClientDropdown clientId={clientId} dropdownStyles={styles} onClientChange={setSelectedClient} />

            <TextInput
              placeholder="From"
              value={ledgerDateFrom}
              style={styles.input}
              onPress={() => setLedgerDateFromOpen(true)}
            />

            <DatePicker
              modal
              open={ledgerDateFromOpen}
              date={dateFrom}
              mode='date'
              onConfirm={(date) => {
                setLedgerDateFromOpen(false);
                setDateFrom(date);
                const selectedData = formatDate(date);
                setLedgerDateFrom(selectedData);
              }}
              onCancel={() => {
                setLedgerDateFromOpen(false)
              }}
            />

            <TextInput
              placeholder="To"
              value={ledgerDateTo}
              style={styles.input}
              onPress={() => setLedgerDateToOpen(true)}
            />

            <DatePicker
              modal
              open={ledgerDateToOpen}
              date={dateTo}
              mode='date'
              onConfirm={(date) => {
                setLedgerDateToOpen(false);
                setDateTo(date);
                const selectedData = formatDate(date);
                setLedgerDateTo(selectedData);
              }}
              onCancel={() => {
                setLedgerDateToOpen(false)
              }}
            />

            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              exportReportExcel('Ledger',clientId,ledgerDateFrom,ledgerDateTo);
              setLedgerModalView(false)
            }} >Download Ledger</Button>
          </Modal>
        </Portal>
        <Portal>
          <Modal visible={purchaseModalView} onDismiss={() => setPurchaseModalView(false)} contentContainerStyle={styles.modalContainer}>
            <TextInput
              placeholder="From"
              value={purchaseDateFrom}
              style={styles.input}
              onPress={() => setPurchaseDateFromOpen(true)}
            />

            <DatePicker
              modal
              open={purchaseDateFromOpen}
              date={dateFrom}
              mode='date'
              onConfirm={(date) => {
                setPurchaseDateFromOpen(false);
                setDateFrom(date);
                const selectedData = formatDate(date);
                setPurchaseDateFrom(selectedData);
              }}
              onCancel={() => {
                setPurchaseDateFromOpen(false)
              }}
            />

            <TextInput
              placeholder="To"
              value={purchaseDateTo}
              style={styles.input}
              onPress={() => setPurchaseDateToOpen(true)}
            />

            <DatePicker
              modal
              open={purchaseDateToOpen}
              date={dateTo}
              mode='date'
              onConfirm={(date) => {
                setPurchaseDateToOpen(false);
                setDateTo(date);
                const selectedData = formatDate(date);
                setPurchaseDateTo(selectedData);
              }}
              onCancel={() => {
                setPurchaseDateToOpen(false)
              }}
            />
            <Button textColor='#f3f3f3' buttonColor='#009C41' style={{ marginHorizontal: 30 }} onPress={() => {
              exportReportExcel('Purchase',purchaseDateFrom,purchaseDateTo)
              setPurchaseModalView(false)
            }} >Download Purchase</Button>
          </Modal>
        </Portal>
      </View>

    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    borderRadius: 10,
    padding: 16,
    elevation: 4,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardCount: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardGrowth: {
    fontSize: 14,
    color: '#fff',
  },
  downloadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 8,
  },
  downloadText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Report;
