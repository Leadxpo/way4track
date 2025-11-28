import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';

const Home_SubDealer = ({ navigation }) => {
  const [selected, setSelected] = useState('totalworks');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [branchStock, setBranchStock] = useState([]);
  const [subdealerWorks, setSubdealerWorks] = useState([]);
  const [workCards, setWorkCards] = useState([]);
  if (branchStock) {
    console.log("++++++++ R", branchStock)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const [filters, setFilters] = useState({
    staffId: "",
    staffName: "",
    productName: "",
    fromDate: "",
    toDate: "",
  });


  const [selectedBranch, setSelectedBranch] = useState('');
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchData, setSearchData] = useState({
    productId: '',
    productName: '',
    location: '',
  });
  const [productCounts, setProductCounts] = useState({
    totalAssignedQty: 0,
    totalInHandsQty: 0,
    totalQty: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  
  const fetchData = async (branchName) => {
    try {
      const payload = {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
        role: await AsyncStorage.getItem('role'),
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (
        payload.role === 'Technician' || payload.role === 'Sales Man'
      ) {
        payload.staffId = await AsyncStorage.getItem('userId');
      }

      if (branchName && branchName !== 'All') {
        payload.branch = branchName;
      }

      const res = await ApiService.post(
        '/dashboards/getProductAssignmentSummary',
        payload
      );
      if (res.status) {
        const { groupedBranches, totalAssignedQty, totalInHandsQty, totalQty } =
          res.data;

        setBranches([
          { branchName: 'All' },
          ...groupedBranches.map((b) => ({ branchName: b.branchName })),
        ]);
        setProductCounts({
          totalAssignedQty,
          totalInHandsQty,
          totalQty,
        });
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const getSearchDetailProduct = useCallback(async () => {
    try {
      const payload = {
        ...searchData,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
        role: await AsyncStorage.getItem('role'),
      };

      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = await AsyncStorage.getItem('userId');
      }

      let response;
      if (payload.staffId) {
        response = await ApiService.post('/dashboards/getSearchDetailProductAssign', payload);
      } else {
        response = await ApiService.post('/products/getSearchDetailProduct', payload);
      }

      if (response?.status) {
        const filteredData = response.data.map((item) => ({
          productId: item.id,
          productName: item.productName || 'N/A',
          productDescription: item.productDescription || 'N/A',
          vendorName: item.vendorName || (item.vendorId?.name ?? 'N/A'),
          imeiNumber: item.imeiNumber || 'N/A',
          presentStock: item.quantity || 0, // Assuming stock is quantity
        }));

        setTableData(filteredData);
        setColumns(Object.keys(filteredData[0] || {})); // Corrected empty object
        setProducts(response.data || []);
      } else {
        alert(response?.data?.internalMessage || 'Failed to fetch product details.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details.');
    }
  }, [searchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();

    if (searchQuery === "") {
      setBranchStock(branchStock); // Reset to original data
    } else {
      const filteredData = branchStock.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      setBranchStock(filteredData);
    }
  };

  useEffect(() => {
    getSearchDetailProduct();
  }, [getSearchDetailProduct]);

  // const handleSearch = async () => {
  //   getSearchDetailProduct();
  // };

  // Navigate to details page
  const handleMoreDetails = () => {
    navigate('/product-details');
  };
  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';

  // Check role and conditionally render the cards

  const fetchWorkCards = async () => {
    const role = await AsyncStorage.getItem('role');
    const id = Number(AsyncStorage.getItem('id'));
    try {
      const response = await ApiService.post("/technician/getWorkStatusCards", {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
        subDealerId: id
      });

      if (response.data?.subDealer?.length > 0) {
        console.log("work cardsss", response.data?.subDealer);
        const subdealerID = await AsyncStorage.getItem("userId");
        const rrr = response.data?.subDealer.find((item) => item.subDealerId === subdealerID.toString());
        if (rrr) {
          console.log("exist :", rrr)
          setWorkCards(rrr);
        } else {
          console.log("not exist :", rrr)

          const aaa = {
            "subDealerId": subdealerID,
            "totalInstallWork": "0",
            "totalAcceptWork": "0",
            "totalActivateWork": "0",
            "totalPendingWork": "0",
            "totalCompletedWork": "0"
          }
          setWorkCards(aaa);
        }
      } else {
        console.error("No subDealer data found");
      }
    } catch (error) {
      console.error("Error fetching work status cards:", error);
    }
  };

  const fetchSubdealerWorks = async () => {
    const idSub = AsyncStorage.getItem('userId');
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          subDealerId: idSub,
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        }
      );
      setSubdealerWorks(response.data || []);
      console.log("sub delar works ,>", response.data)
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setSubdealerWorks([]);
    }
  };

  useEffect(() => {
    fetchWorkCards();
    fetchSubdealerWorks();
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const renderCard = (title, value, key, bgColor = '#ffffff') => (
    <TouchableOpacity
      key={key}
      onPress={() => setSelected(key)}
      style={[styles.card, { backgroundColor: bgColor }]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value || 0}</Text>
    </TouchableOpacity>
  );

  const filteredWorks = subdealerWorks?.filter(item => {
    switch (selected) {
      case 'totalworks': return item.workStatus === 'install';
      case 'workinprograss': return item.workStatus === 'activate';
      case 'totalAcceptWork': return item.workStatus === 'accept';
      case 'pendingworks': return item.workStatus === 'pending';
      case 'completedworks': return item.workStatus === 'completed';
      default: return false;
    }
  });

  const renderWorkItem = ({ item, index }) => (
    <Card key={index} style={styles.itemCard}>
      <View style={styles.itemRow}>
        <Text style={styles.label}>S.No:</Text>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.label}>Service:</Text>
        <Text>{item.service}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.label}>Back Supporter:</Text>
        <Text>{item.backSupportterName}</Text>
      </View>

      {selected !== 'completedworks' && (
        <TouchableOpacity
          onPress={() => toggleDropdown(index)}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#333" />
          {dropdownOpen === index && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownItem}>Edit</Text>
              <Text style={styles.dropdownItem}>Delete</Text>
              <Text style={styles.dropdownItem}>More Details</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </Card>
  );

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Sub Dealer Home</Text>

        <View style={styles.cardGrid}>
          {renderCard('Total Install Works', workCards.totalInstallWork, 'totalworks')}
          {renderCard('Work In Progress', workCards.totalActivateWork, 'workinprograss', '#e0f2ff')}
          {renderCard('Total Accept Works', workCards.totalAcceptWork, 'totalAcceptWork', '#e0f2ff')}
          {renderCard('Pending Works', workCards.totalPendingWork, 'pendingworks', '#fef3c7')}
          {renderCard('Completed Works', workCards.totalCompletedWork, 'completedworks', '#d1fae5')}
        </View>

        <FlatList
          data={filteredWorks}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No Details found</Text>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </Provider>
  );
}

export default Home_SubDealer;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1f2937',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginTop: 8,
  },
  itemCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
    color: '#4b5563',
  },
  iconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 4,
    padding: 8,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: '#1f2937',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#9ca3af',
  },
});
