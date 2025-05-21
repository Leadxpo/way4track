import React, { useState, useEffect } from "react";
import { View,ActivityIndicator } from "react-native";
import { loadData } from "../../Utils/appData";
import Branch_WarhouseManager from './branch_warhouseManager';
import Branch_HR from './branch_HR';
import Branch from './branch';

const Branches = ({ navigation }) => {
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
        return <Branch navigation={navigation} />;
      case "Accountant":
        return <Branch navigation={navigation} />;
      case "HR":
        return <Branch_HR navigation={navigation} />;
      case "Branch Manager":
        return <Branch navigation={navigation} />;
      case "Warehouse Manager":
        return <Branch_WarhouseManager navigation={navigation} />;
      case "Technician":
        return <Branch navigation={navigation} />;
      case "Salesman":
        return <Branch navigation={navigation} />;
      default:
        return  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View> // Can show a loading or default view
    }
  };

  return <View style={{flex:1}}>{renderComponent()}</View>;
};

export default Branches;
