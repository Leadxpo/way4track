import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Menu, Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BranchesDropdown from '../../components/branchDropdown';
import ClientDropdown from '../../components/clientDropdown';
import StaffDropdown from '../../components/staffDropdown';
import DynamicInputRows from '../../components/dynamicInputRows';
import BankAccountsDropdown from '../../components/bankAccountDropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { createVoucher } from '../../Redux/Actions/vouchersAction';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceById } from '../../Redux/Actions/estimatesAction';
import VendorDropdown from '../../components/vendorDropdown';
import SubdealerDropdown from '../../components/subdealerDropdown';

const CreateVoucher = ({ navigation }) => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Receipt"); // Manage active tab
  const [paymentActiveTab, setPaymentActiveTab] = useState("Receipt"); // Manage active tab
  const [paymentModeVisible, setPaymentModeVisible] = useState(false); // Manage payment dropdown visibility
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(""); // Manage selected payment mode

  const [dropdown_branchID, setDropdown_branchID] = useState("");
  const [branchId, setBranchId] = useState(null);
  const [dropdown_staffID, setDropdown_staffID] = useState("");
  const [staffId, setStaffId] = useState("");
  const [dropdown_bankID, setDropdown_bankID] = useState("");
  const [bankId, setBankId] = useState("");
  const [dropdown_clientID, setDropdown_clientID] = useState("");
  const [clientId, setClientId] = useState("");
  const [dropdown_vendorID, setDropdown_vendorID] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [dropdown_subdealerID, setDropdown_subdealerID] = useState("");
  const [subdealerId, setSubdealerId] = useState("");
  const [invoiceID, setInvoiceID] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staff, setStaff] = useState("");
  const [purpose, setPurpose] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [paymentTo, setPaymentTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [cashAmount, setCashAmount] = useState(0);
  const [EMIamount, setEMIamount] = useState(0);
  const [bankAmount, setBankAmount] = useState(0);
  const [UPIamount, setUPIamount] = useState(0);
  const [checkAmount, setCheckAmount] = useState(0);
  const [cardAmount, setCardAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [fromBank, setFromBank] = useState(null);
  const [toBank, setToBank] = useState(null);
  const [bank, setBank] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");  //payment
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);
  const [customerRole, setCustomerRole] = useState(null);
  const [EMIcode, setEMIcode] = useState(null);
  const [rowsData, setRowsData] = useState([]);
  const [amountTo, setAmountTo] = useState(null);
  const [requestFrom, setRequestFrom] = useState(null);
  const [bankFrom, setBankFrom] = useState(null);
  const [bankTo, setBankTo] = useState(null);
  const [receiptTo, setReceiptTo] = React.useState('');
  const [open, setOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const handleRowsChange = (updatedRows) => {
    setRowsData(updatedRows);
  };

  const handleSave = () => {
    const create_voucherPayload = {
      name, branchId, role, purpose, creditAmount, amount, remainingAmount, paymentType: selectedPaymentMode, staffId, accountNumber, voucherType, generationDate, expireDate, shippingAddress,
      buildingAddress, hsnCode, GSTORTDS, SCST, CGST, clientId, subDealerId, vendorId, initialPayment, numberOfEmi, emiNumber, emiAmount, ifscCode, bankAccountNumber, paymentStatus, productType, companyCode,
      unitCode, voucherId, fromAccount, toAccount, createdAt, updatedAt, upiId, checkNumber, cardNumber
    }

    switch (activeTab) {
      case "Receipt":
        console.log("reciept")
        create_voucherPayload = {
          name: name

        }
        break;
      case "Payment":
        console.log("payment")
        create_voucherPayload = {

        }
        break;
      
      case "Journal":
        console.log("journal")
        create_voucherPayload = {

        }
        break;
      case "Contra":
        console.log("contra")
        create_voucherPayload = {

        }
        break;

      case "Purchase":
        console.log("Purchase")
        create_voucherPayload = {

        }
        break;

      default:
        create_voucherPayload = {

        }
        break;
    }

    dispatch(createVoucher(create_voucherPayload))
  };

  const getInvoicedata = (invoiceID) => {
    const fetchInvoice_payload = { id: invoiceID, companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(invoiceById(invoiceID));

  }

  useEffect(() => {
    setRemainingAmount(parseInt(amount) - (parseInt(cashAmount) + parseInt(EMIamount) + parseInt(bankAmount) + parseInt(UPIamount) + parseInt(checkAmount) + parseInt(cardAmount)));
  }, [cashAmount, EMIamount, bankAmount, UPIamount, checkAmount, cardAmount, amount])
  // DropDownPicker state
  const [dropdownRoles, setDropDownRoles] = useState([
    { label: 'CEO', value: 'CEO' },
    { label: 'HR', value: 'HR' },
    { label: 'Accountant', value: 'Accountant' },
    { label: 'Warehouse Manager', value: 'Warehouse Manager' },
    { label: 'Branch Manager', value: 'Branch Manager' },
    { label: 'Sub Dealer', value: 'Sub Dealer' },
    { label: 'Technician', value: 'Technician' },
    { label: 'Sales Man', value: 'Sales Man' },
    { label: 'Call Center', value: 'Call Center' },
  ]);

  const [dropdownCustomerRoles, setDropDownCustomerRoles] = useState([
    { label: 'vendor', value: 'vendor' },
    { label: 'subDealer', value: 'subDelear' },
    { label: 'client', value: 'client' },
  ]);

  useEffect(() => {
    setReceiptTo(dropdown_clientID);
    setBranchId(dropdown_branchID);  // Ensure this is updated
    setStaff(dropdown_staffID);
    setFromBank(dropdown_bankID);
    setToBank(dropdown_bankID);
    setRole(staffRole);
  }, [staffRole, dropdown_branchID, dropdown_clientID, dropdown_staffID, dropdown_bankID]);  // Forms for each tab

  const forms = {
    Receipt: (
      <View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            label="Invoice ID"
            placeholder='Invoice ID'
            placeholderTextColor={"#aaaaaa"}
            outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
            mode="outlined"
            style={[styles.input, { flex: 6, marginEnd: 10, }]}
            value={invoiceID}
            onChangeText={setInvoiceID}
          />
          <Button textColor='#f3f3f3' style={{ flex: 1, alignSelf: "center", backgroundColor: "#009C41" }} onPress={() => getInvoicedata(invoiceID)}>Get</Button>
        </View>
        <View style={{ marginBottom: 15 }}>
          <BranchesDropdown
            dropdownStyles={styles}
            onBranchChange={setDropdown_branchID} // Pass handleInputChange function to update branch
          />
        </View>
        <TextInput
          label="Title"
          mode="outlined"
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          placeholder='Voucher Title'
          placeholderTextColor={"#aaaaaa"}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <DropDownPicker
          open={open}
          value={staffRole} // The selected role value
          items={dropdownRoles} // Dropdown items
          setOpen={setOpen} // Toggle the dropdown open state
          setValue={setStaffRole} // Update the staffRole state
          setItems={setDropDownRoles} // Update the roles if needed
          dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
          placeholder="Select Staff Role"
          placeholderStyle={{ color: "#aaaaaa" }}
          style={[
            styles.input,
            { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
          ]}
          dropDownContainerStyle={{
            alignSelf: "center",
            borderColor: "#cccccc",
            borderWidth: 1,
            borderRadius: 8,
          }}
          listMode="MODAL" // Use MODAL mode for better UX
          modalAnimationType="slide" // Modal animation
          closeOnBackPressed={true} // Close modal on back button press
          modalProps={{
            // transparent: true, // Modal with transparency
            animationType: "slide", // Fade effect for smooth appearance
          }}
          modalContentContainerStyle={{
            marginVertical: 100, // Center the modal in the screen
            marginHorizontal: 30,
            width: "90%", // Modal width
            height: 200, // Modal height
            backgroundColor: "#ffffff", // Modal background
            padding: 20, // Set a fixed height for the modal
            borderRadius: 12,
            elevation: 5, // Add shadow for Android
            shadowColor: "#000", // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
          modalTitleStyle={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 10,
          }}
          modalTitle="Select Staff Role" // Optional: Custom modal title
        />


        <View style={{ marginBottom: 15 }}>
        <StaffDropdown
          dropdownStyles={styles}
          branchId={branchId}  // Ensure it's correctly passed
          staffRole={staffRole}
          onStaffChange={setDropdown_staffID}
          staffPlaceHolder={"Recipt Issude By"}
        />
        </View>

        <View style={{ marginBottom: 15 }}>
          <ClientDropdown
            dropdownStyles={styles}
            onClientChange={setDropdown_clientID} // Pass handleInputChange function to update branch
          />
        </View>

        <TextInput
          label="Purpose"
          placeholder='Purpose'
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          placeholderTextColor={"#aaaaaa"}
          mode="outlined"
          style={styles.input}
          value={purpose}
          onChangeText={setPurpose}
        />
        <TextInput
          label="Credit Amount"
          placeholder='Credit Amount'
          placeholderTextColor={"#aaaaaa"}
          mode="outlined"
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
    ),
    Payment: (
      <View style={styles.container}>
        <TextInput
          label="Title"
          mode="outlined"
          placeholder='Voucher Title'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          style={[styles.input, { flex: 6, marginEnd: 10, }]}
          value={name}
          onChangeText={setName}
        />

        <View style={{ marginBottom: 15 }}>
          <BranchesDropdown
            dropdownStyles={styles}
            onBranchChange={(branch) => {
              setDropdown_branchID(branch); // Ensure this updates correctly
            }}
          />
        </View>

        <DropDownPicker
          open={open}
          value={staffRole} // The selected role value
          items={dropdownRoles} // Dropdown items
          setOpen={setOpen} // Toggle the dropdown open state
          setValue={setStaffRole} // Update the staffRole state
          setItems={setDropDownRoles} // Update the roles if needed
          dropDownDirection="TOP" // Dropdown direction (optional, for small containers)
          placeholder="Select Staff Role"
          placeholderStyle={{ color: "#aaaaaa" }}
          style={[
            styles.input,
            { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
          ]}
          dropDownContainerStyle={{
            alignSelf: "center",
            borderColor: "#cccccc",
            borderWidth: 1,
            borderRadius: 8,
          }}
          listMode="MODAL" // Use MODAL mode for better UX
          modalAnimationType="slide" // Modal animation
          closeOnBackPressed={true} // Close modal on back button press
          modalProps={{
            // transparent: true, // Modal with transparency
            animationType: "slide", // Fade effect for smooth appearance
          }}
          modalContentContainerStyle={{
            marginVertical: 100, // Center the modal in the screen
            marginHorizontal: 30,
            width: "90%", // Modal width
            height: 200, // Modal height
            backgroundColor: "#ffffff", // Modal background
            padding: 20, // Set a fixed height for the modal
            borderRadius: 12,
            elevation: 5, // Add shadow for Android
            shadowColor: "#000", // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
          modalTitleStyle={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 10,
          }}
          modalTitle="Select Staff Role" // Optional: Custom modal title
        />
        <StaffDropdown
          dropdownStyles={styles}
          branchId={branchId}  // Ensure it's correctly passed
          staffRole={staffRole}
          onStaffChange={setDropdown_staffID}
          staffPlaceHolder={'Payment By'}
        />
        <TextInput
          label="Purpose"
          mode="outlined"
          placeholder='Purpose Of Voucher'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          style={[styles.input, { flex: 6, marginEnd: 10, }]}
          value={purpose}
          onChangeText={setPurpose}
        />

        <TextInput
          label="Debit Amount"
          mode="outlined"
          placeholder='Debit Amount'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          style={[styles.input, { flex: 6, marginEnd: 10, }]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <DropDownPicker
          open={customerOpen}
          value={customerRole} // The selected role value
          items={dropdownCustomerRoles} // Dropdown items
          setOpen={setCustomerOpen} // Toggle the dropdown open state
          setValue={setCustomerRole} // Update the staffRole state
          setItems={setDropDownCustomerRoles} // Update the roles if needed
          placeholder="Select Customer Role"
          placeholderStyle={{ color: "#aaaaaa" }}
          style={[
            styles.input,
            { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
          ]}
          dropDownContainerStyle={{
            alignSelf: "center",
            borderColor: "#cccccc",
            borderWidth: 1,
            borderRadius: 8,
          }}
          listMode="MODAL" // Use MODAL mode for better UX
          modalAnimationType="slide" // Modal animation
          closeOnBackPressed={true} // Close modal on back button press
          modalProps={{
            // transparent: true, // Modal with transparency
            animationType: "slide", // Fade effect for smooth appearance
          }}
          modalContentContainerStyle={{
            marginVertical: 100, // Center the modal in the screen
            marginHorizontal: 30,
            width: "90%", // Modal width
            height: 200, // Modal height
            backgroundColor: "#ffffff", // Modal background
            padding: 20, // Set a fixed height for the modal
            borderRadius: 12,
            elevation: 5, // Add shadow for Android
            shadowColor: "#000", // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
          modalTitleStyle={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 10,
          }}
          modalTitle="Select Customer Role" // Optional: Custom modal title
        />
        {customerRole === "vendor" ?
          <View style={{ marginBottom: 15 }}>
            <VendorDropdown
              dropdownStyles={styles}
              onVendorChange={setDropdown_vendorID} // Pass handleInputChange function to update branch
            />
          </View> : customerRole === "subDelear" ?
            <View style={{ marginBottom: 15 }}>
              <SubdealerDropdown
                dropdownStyles={styles}
                onSubdealerChange={setDropdown_subdealerID} // Pass handleInputChange function to update branch
              />
            </View> :
            <View style={{ marginBottom: 15 }}>
              <ClientDropdown
                dropdownStyles={styles}
                onClientChange={setDropdown_clientID} // Pass handleInputChange function to update branch
              />
            </View>
        }

      </View>
    ),
    Journal: (
      <View style={styles.container}>
        <TextInput
          label="Title"
          mode="outlined"
          placeholder='Voucher title'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          label="Purpose"
          mode="outlined"
          placeholder='Purpose of Voucher'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          value={purpose}
          onChangeText={setPurpose}
        />

        <View style={{ marginBottom: 15 }}>
          <StaffDropdown
            dropdownStyles={styles}
            onStaffChange={setRequestFrom} // Pass handleInputChange function to update branch
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <StaffDropdown
            dropdownStyles={styles}
            onStaffChange={setAmountTo} // Pass handleInputChange function to update branch
          />
        </View>


        <TextInput
          label="Amount"
          mode="outlined"
          placeholder='Amount'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
    ),
    Contra: (
      <View>
        {/* Name Input */}
        <TextInput
          label="Title"
          value={name}
          onChangeText={setName}
          mode="outlined"
          placeholder='Voucher Title'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
        />

        {/* Purpose Input */}
        <TextInput
          label="Purpose"
          value={purpose}
          onChangeText={setPurpose}
          mode="outlined"
          placeholder='Purpose od Voucher'
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1 }]}
        />
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBankFrom} />
        </View>
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBankTo} />
        </View>
        <TextInput label="Amount" mode="outlined" style={styles.input} keyboardType="numeric" />
      </View>
    ),
    Purchase: (
      <View style={styles.container}>
        {/* Name Input */}
        <TextInput
          label="Title"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        {/* Purpose Input */}
        <TextInput
          label="Purpose"
          value={purpose}
          onChangeText={setPurpose}
          mode="outlined"
          style={styles.input}
        />

        {/* Transform By Dropdown */}
        <ClientDropdown dropdownStyles={styles} onClientChange={setDropdown_clientID} />

        <DynamicInputRows onRowsChange={handleRowsChange} />
      </View>
    )
  };

  // Forms for payment modes
  const paymentForms = {
    Cash: (
      <View style={styles.container}>
        {/* Amount TextInput */}
        <TextInput
          label="Cash Amount"
          value={cashAmount}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setCashAmount(text);
          }}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="Enter Cash Amount"
        />

      </View>
    ),
    EMI: (
      <View style={styles.container}>
        {/* Amount TextInput */}
        <TextInput
          label="EMI Code"
          value={EMIcode}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setEMIamount(text);
          }}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="Enter EMI code"
        />

        {/* Remaining Amount TextInput */}
        <TextInput
          label="EMI Amount"
          value={EMIamount}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setEMIamount(text);
          }}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="Enter EMI Amount"
        />
      </View>
    ),
    UPI: (
      <View style={styles.container}>
        {/* UPI ID */}
        <TextInput
          label="UPI ID"
          value={upiId}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setUPIamount(text);
          }}
          style={styles.input}
          mode="outlined"
        />

        {/* Bank Dropdown */}
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBank} />
        </View>

        {/* Amount */}
        <TextInput
          label="Amount"
          value={UPIamount}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setUPIamount(text);
          }}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

      </View>
    ),
    Bank: (
      <View style={styles.container}>
        {/* Bank Name Dropdown */}
        <Text style={styles.label}>Bank Name</Text>
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBank} />
        </View>

        {/* Other Inputs */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          label="Amount"
          value={bankAmount}
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          onChangeText={(text) => {
            setBankAmount(text);
          }}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />
      </View>
    ),
    Check: (
      <View style={styles.container}>
        {/* Cheque Number */}
        <Text style={styles.label}>Check Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter cheque number"
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          value={chequeNumber}
          onChangeText={(text) => {
            setCheckAmount(text);
          }}
          keyboardType="default"
        />

        {/* Bank Dropdown */}
        <Text style={styles.label}>Bank</Text>
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBank} />
        </View>

        {/* Amount */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor={"#aaaaaa"}
          outlineStyle={[styles.input, { borderColor: "#cccccc", borderWidth: 1, }]}
          value={checkAmount}
          onChangeText={(text) => {
            setCheckAmount(text);
          }}
          keyboardType="numeric"
        />
      </View>
    ),
    Card: (
      <View style={styles.container}>
        {/* Card Number */}
        <TextInput
          label="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          mode="outlined"
          style={styles.input}
        />

        {/* Bank Dropdown */}
        <View style={{ zIndex: 1000 }}>
          <Text style={styles.label}>Bank</Text>
          <BankAccountsDropdown dropdownStyles={styles} onBankAccountChange={setBank} />
        </View>
        {/* Amount */}
        <TextInput
          label="Amount"
          value={cardAmount}
          onChangeText={(text) => {
            setCardAmount(text);
          }}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

      </View>
    ),
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {["Receipt", "Payment", "Journal", "Contra", "Purchase"].map((tab, index) => (
          <Button
            key={index}
            mode="outlined"
            onPress={() => setActiveTab(tab)}
            style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
            labelStyle={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}
          >
            {tab}
          </Button>
        ))}
      </ScrollView>

      {/* Active Form */}
      <ScrollView contentContainerStyle={styles.content}>
        {forms[activeTab]}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {["Cash", "UPI", "Bank", "Check", "Card", "EMI"].map((tab, index) => (
            <Button
              key={index}
              mode="outlined"
              onPress={() => {
                setPaymentModeVisible(false);
                setSelectedPaymentMode(tab);
                setPaymentActiveTab(tab)
              }}
              style={paymentActiveTab === tab ? styles.activeTab : styles.inactiveTab}
              labelStyle={paymentActiveTab === tab ? styles.activePaymentTabText : styles.inactivePaymentTabText}
            >
              {tab}
            </Button>
          ))}
        </ScrollView>

        {/* Smooth Animated Payment Form */}
        {selectedPaymentMode && (
          <View>
            {paymentForms[selectedPaymentMode]}
          </View>
        )}
        {/* Remaining Amount TextInput */}
        <Text
          style={[styles.input, { borderColor: "#cccccc", borderWidth: 1, color: "#aaaaaa", textAlign: 'center', fontSize: 24, fontWeight: '700', verticalAlign: "middle" }]}
        >Remaining Amount : {remainingAmount}</Text>

        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
          <Button mode="contained" style={{paddingHorizontal:20}} textColor='#f3f3f3' buttonColor='#009C41' onPress={handleSave}>
            Save
          </Button>
          <Button mode="outlined" style={{paddingHorizontal:20}} onPress={() => Alert.alert('Cancelled')}>
            Cancel
          </Button>
        </View>      
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#009C41",
    fontWeight: "bold",
    marginLeft: 10,
  },
  notificationBadge: {
    backgroundColor: "#FF0000",
    borderRadius: 10,
    paddingHorizontal: 5,
    position: "absolute",
    right: 40,
    top: 10,
  },
  notificationText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap", height: 55,
    marginBottom: 20, width: 650,
    justifyContent: "space-between",
  },
  activeTab: {
    backgroundColor: "#009C41",
    borderColor: "#009C41",
    flex: 1,
    margin: 5,
  },
  inactiveTab: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CCCCCC",
    flex: 1,
    margin: 5,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  inactiveTabText: {
    color: "#000000",
  },
  activePaymentTabText: {
    color: "#FFFFFF",
  },
  inactivePaymentTabText: {
    color: "#000000",
  },
  input: {
    marginBottom: 15, height: 48,
    backgroundColor: "#FFFFFF", borderRadius: 8
  },
  paymentButton: {
    backgroundColor: "#009C41",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  paymentModeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#009C41",
  },
  paymentForm: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
  },
  addVoucher: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 20,
    borderRadius: 10,
  },
  content: {
    padding: 20,
  },
});

export default CreateVoucher;
