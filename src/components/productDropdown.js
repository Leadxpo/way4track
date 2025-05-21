import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDropDown } from "../Redux/Actions/productAction";

const ProductDropdown = ({ dropdownStyles,productId, onProductChange }) => {
  const dispatch = useDispatch();
  const [openProductDropdown, setOpenProductDropdown] = useState(false);

  // Fetch products from Redux store
  const { productsDropdown, isLoading, error } = useSelector(
    (state) => state.productsDropdownReducer
  );

  // Fetch product list when component mounts
  useEffect(() => {
    dispatch(fetchProductsDropDown({ companyCode: "WAY4TRACK", unitCode: "WAY4" }));
  }, [dispatch]);

  // Memoized dropdown items to prevent unnecessary recalculations
  const dropdownItems = useMemo(() => {
    return productsDropdown
      .filter((product) => product.id) // Ensure valid product IDs
      .map((product) => ({
        label: product.productName || "Unnamed Product",
        value: product.id, // Store only productId to avoid unnecessary re-renders
      }));
  }, [productsDropdown]);

  // Callback to handle product selection
  const handleProductChange = useCallback((value) => {
      // Ensure proper comparison
      const productData = productsDropdown.find(
        (item) => {
          return(item?.id?.toString().trim() === value?.toString().trim())}
      );
      if (productData) {
        onProductChange?.(productData);
      }
  }, [productId, onProductChange, productsDropdown]);
      
  return (
    <View style={{ marginVertical: 10 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: "red" }}>Error: {error}</Text>
      ) : (
        <DropDownPicker
          open={openProductDropdown}
          value={productId}
          items={dropdownItems}
          setOpen={setOpenProductDropdown}
          setValue={(callback) => {
            const newValue = callback();
            handleProductChange(newValue);  // Ensure proper state update
        }} // Using memoized function to avoid unnecessary re-renders
          placeholder="Select Product"
          // onChangeValue={(val) => handleProductChange(val)}
          placeholderStyle={{ color: "#aaaaaa" }}
          style={[
            dropdownStyles?.input || {},
            { alignSelf: "center", borderColor: "#cccccc", borderRadius: 8 },
          ]}
          dropDownContainerStyle={{
            alignSelf: "center",
            borderColor: "#cccccc",
            borderWidth: 1,
            borderRadius: 8,
          }}
          listMode="MODAL"
          modalAnimationType="slide"
          closeOnBackPressed={true}
          modalProps={{
            animationType: "slide",
          }}
          modalContentContainerStyle={{
            marginVertical: 100,
            marginHorizontal: 30,
            width: "90%",
            height: 200,
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 12,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
          // renderListItem={}
          modalTitleStyle={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: 10,
          }}
          modalTitle="Select Product"
        />
      )}
    </View>
  );
};


const styles = {
  container: {
    backgroundColor: "#f3f3f3", // Change to any background color you prefer
  },
  dropdownList: {
    borderColor: "#ccc",
  },
};

export default ProductDropdown;
