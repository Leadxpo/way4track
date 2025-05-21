import React, { useState, useEffect } from "react";
import { View,ActivityIndicator } from "react-native";
import { loadData } from "../../Utils/appData";
import Home_CEO from "./home_CEO";
import Home_HR from "./home_HR";
import Home_BranchManager from "./home_branchManager";
import Home_WarehouseManager from "./home_warhouseManager";
import Home_Technician from "./home_technician";
import Home_SalesMen from "./home_salesMan";

const Home = ({ navigation }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await loadData("role");
      setRole(fetchedRole);
    };
    fetchRole();
  }, []);

  const renderComponent = () => {
    switch (role) { 
      case "CEO":
        return <Home_CEO navigation={navigation} />;
      case "Accountant":
        return <Home_CEO navigation={navigation} />; 
      case "HR":
        return <Home_HR navigation={navigation} />;
      case "Branch Manager":
        return <Home_BranchManager navigation={navigation} />;
      case "Warehouse Manager":
        return <Home_WarehouseManager navigation={navigation} />;
      case "Technician":
        return <Home_Technician navigation={navigation} />;
      case "Salesman":
        return <Home_SalesMen navigation={navigation} />;
      default:
        return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View> // Can show a loading or default view
    }
  };

  return <View style={{flex:1}}>{renderComponent()}</View>;
};

export default Home;
