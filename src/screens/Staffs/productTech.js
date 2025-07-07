import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Provider, SegmentedButtons } from "react-native-paper";
import { loadData } from "../../Utils/appData";
import { fetchProducts } from "../../Redux/Actions/productAction";
import Header from "../../components/userHeader";

const ProductTech = ({ navigation }) => {
  const dispatch = useDispatch();
  const [staffId, setStaffId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSegment, setActiveSegment] = useState("products");

  const { products } = useSelector((state) => state.products);

  useFocusEffect(
    useCallback(() => {
      const loadStaffData = async () => {
        const technicianId = await loadData("staffID");
        setStaffId(technicianId || "");
      };
      loadStaffData();
    }, [])
  );

  useEffect(() => {
    if (staffId) {
      dispatch(
        fetchProducts({
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        })
      );
    }
  }, [dispatch, staffId]);

  const filteredData = useMemo(() => {
    return products?.filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return item.productName?.toLowerCase().includes(query);
    }) || [];
  }, [products, searchQuery]);



  // Products that have been installed or used (i.e., out of stock)
  const techProductInstalled = useMemo(() => {
    return filteredData.filter(item => item.productStatus === "outOfStock" && item.staffId === staffId);
  }, [filteredData]);
  
  // Products that are still available (i.e., not yet installed)
  const techProductRemaining = useMemo(() => {
    return filteredData.filter(item => item.productStatus === "available" && item.staffId === staffId);
  }, [filteredData]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "#ffc4a8";
      case "outOfStock":
        return "blue";
      default:
        return "#f3f3f3";
    }
  };

  const renderWorkItem = ({ item }) => (
    <Card
      style={[
        styles.card,
        { backgroundColor: getStatusColor(item.productStatus),padding:10 },
      ]}
    >
      <View style={styles.entryRow}>
        <View>
          <Text style={styles.entryText}>
            Product Name :{" "}
            <Text style={styles.values}>{item.productName || "N/A"}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Clicked quantity")}>
          <Text style={styles.entryText}>
            IMEI Number :{" "}
            <Text style={styles.values}>{item.imeiNumber || 0}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.entryRow}>
        <View>
          <Text style={styles.entryText}>
            Basket Name :{" "}
            <Text style={styles.values}>{item.basketName || "N/A"}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Clicked quantity")}>
          <Text style={styles.entryText}>
          SIM Number :{" "}
            <Text style={styles.values}>{item.simNumber || 'N/A'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.entryRow}>
        <View>
          <Text style={styles.entryText}>
          Product Type :{" "}
            <Text style={styles.values}>{item.productType || "N/A"}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Clicked quantity")}>
          <Text style={styles.entryText}>
          Location :{" "}
            <Text style={styles.values}>{item.location || 'N/A'}</Text>
          </Text>
        </TouchableOpacity>
      </View>

    </Card>
  );

  const getSegmentData = () => {
    switch (activeSegment) {
      // case "products":
      //   return techProduct;
      case "productInstalled":
        return techProductInstalled;
      case "productsRemaining":
        return techProductRemaining;
      default:
        return [];
    }
  };

  return (
    <Provider>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}  
          placeholder="Search Products"
          placeholderTextColor="#aaaaaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <SegmentedButtons
          value={activeSegment}
          onValueChange={setActiveSegment}
          buttons={[
           
            {
              value: "productInstalled",
              label: "Installed",checkedColor:"#ffffff",uncheckedColor:"#333333",
              style:
                activeSegment === "productInstalled"
                  ? styles.activeButton
                  : styles.inactiveButton,
            },
            {
              value: "productsRemaining",
              label: "Available",checkedColor:"#ffffff",uncheckedColor:"#333333",
              style:
                activeSegment === "productsRemaining"
                  ? styles.activeButton
                  : styles.inactiveButton,
            },
          ]}
          style={styles.segmentContainer}
          theme={{
            colors: {
              primary: "#007AFF",
              onSurfaceVariant: "#fff",
            },
          }}
        />

        <FlatList
          data={getSegmentData()}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderWorkItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No Products Found</Text>
              </Card>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  activeButton: {
    backgroundColor: '#28a745', // Active button background
    color: '#fff', // Active text color
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Inactive button background
    color: '#000', // Inactive text color
  },
  searchInput: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#f3f3f3",
    borderWidth: 1,
    margin: 10,
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 3,
  },
  segmentContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  entryCard: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  card: { marginBottom: 10, borderRadius: 8, elevation: 3, width: "90%", alignSelf: "center" },
  cardContent: { padding: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333333", marginVertical: 10 },
  clientInfo: { fontSize: 14, color: "#555", marginVertical: 5 },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryText: {
    color: '#333',
    marginBottom: 4,
  },
  values: {
    color: '#000000',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f3f3',
    marginVertical: 5,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyCard: {
    padding: 20,
    backgroundColor: "#f8d7da",
    borderRadius: 10,
  },
  emptyText: {
    color: "#721c24",
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
});

export default ProductTech;
