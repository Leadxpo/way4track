import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/userHeader';
import { useDispatch, useSelector } from 'react-redux';
import { drawLabel } from "../../Redux/Actions/drawAction";
import { fetchBranches } from '../../Redux/Actions/branchAction';
import { permissions } from '../../Utils/permissions';
import api from '../../Api/api';


const Branch = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, selectedLabel, error } = useSelector(state => state.selectedDrawLabel);
  // const { branches } = useSelector(state => state.branchesReducer);
  const [permissions, setPermissions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const loadStaffloginData = async () => {
      const rrr = await loadData("staffPermissions")
      setPermissions(prev => prev = rrr || permissions);
      console.log(permissions)
    };
    loadStaffloginData();
  }, []);

  const hasAddBranchPermission = permissions.some(p => p.name === "branch" && p.add);
  const hasEditBranchPermission = permissions.some(p => p.name === "branch" && p.edit);
  const hasDeleteBranchPermission = permissions.some(p => p.name === "branch" && p.delete);

  useEffect(() => {
    const fetchBranchesAndPercentages = async () => {
      try {
        // Fetch branch names
        const branchResponse = await api.post(
          '/branch/getBranchNamesDropDown'
        );
        if (branchResponse.data.status) {
          setBranches(branchResponse.data.data);
        } else {
          console.error('Failed to fetch branches');
        }

        // Fetch percentages
        const percentageResponse = await api.post(
          '/dashboards/getLast30DaysCreditAndDebitPercentages',
          {
            companyCode: "WAY4TRACK",
            unitCode: "WAY4",
          }
        );

        if (percentageResponse.data.status) {
          setPercentages(percentageResponse.data.data);
        } else {
          console.error('Failed to fetch percentages');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBranchesAndPercentages();
  }, []);

  // Combine branches and percentages
  const combinedBranches = branches.map((branch) => {
    const percentageData = percentages.find((p) => p.id === branch.id) || {};
    return {
      ...branch,
      creditPercentage: percentageData.creditPercentage || 0,
      debitPercentage: percentageData.debitPercentage || 0,
    };
  });

  useEffect(() => {
    const branchesPayload = { companyCode: "WAY4TRACK", unitCode: "WAY4" }
    dispatch(fetchBranches(branchesPayload))
  }, [dispatch])
  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Add Branch Button */}
      {hasAddBranchPermission && <TouchableOpacity style={styles.addBranchButton} onPress={() => {
        dispatch(drawLabel("Branch's"));
        navigation.navigate('AddBranch');
      }}>
        <Text style={styles.addBranchText}>Add Branch</Text>
      </TouchableOpacity>}

      {/* Branch Cards */}
      {combinedBranches.map((branch, index) => {
        console.log("rrr :", branch)
        return (
          <Card key={index} style={styles.branchCard}>
            <View style={styles.cardContent}>
              {/* Branch Icon and Name */}
              <View style={styles.header}>
                <MaterialCommunityIcons name="map-marker" size={30} color="#27AE60" />
                <Text style={styles.branchName}>{branch.branchName}</Text>
              </View>

              {/* Profit and Loss Bars */}
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>Profit - {branch.cradits}%</Text>
                <View style={{ height: 16, borderRadius: 5, marginBottom: 10, backgroundColor: '#27AE6030', width: '100%' }}>
                  <View style={[styles.bar, { backgroundColor: '#27AE60', width: `${branch.creditPercentage}%`, }]} />
                </View>
                <Text style={styles.barLabel}>Loss - {branch.debits}%</Text>
                <View style={{ height: 16, borderRadius: 5, marginBottom: 10, backgroundColor: '#E74C3C30', width: '100%' }}>
                  <View style={[styles.bar, { backgroundColor: '#E74C3C', width: `${branch.debitPercentage}%` }]} />
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                {hasEditBranchPermission && <Button
                  mode="contained"
                  icon="pencil" buttonColor='orange'
                  style={styles.actionButton}
                  onPress={() => {
                    dispatch(drawLabel("Branch's"));
                    navigation.navigate('EditBranch', { branchDetails: branch });
                  }}
                  labelStyle={styles.buttonText}>
                  Edit
                </Button>}
                {hasDeleteBranchPermission && <Button
                  mode="contained"
                  icon="delete" buttonColor='#E74C3C'
                  style={styles.actionButton}
                  onPress={() => {
                    Alert.alert(`Delete ${branch.name} Branch`, "Are you sure you want to delete this branch from the database? Once deleted, you will no longer be able to access any work or perform operations related to this branch.", [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete", onPress: () => {
                          Alert.alert("Yes", `${branch.name} was deleted`);
                        }
                      }
                    ]);
                  }}
                  labelStyle={styles.buttonText}>
                  Delete
                </Button>}
              </View>

              {/* More Details Button */}
              <Button
                mode="contained"
                icon="information" buttonColor='blue'
                style={styles.moreDetailsButton}
                onPress={() => {
                  dispatch(drawLabel("Branch's"));
                  navigation.navigate("Home", {
                    screen: "BranchDetails",
                    params: { branchDetails: branch }
                  });
                }}
                labelStyle={styles.moreDetailsText}>
                For More Details
              </Button>
            </View>
          </Card>
        )
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBranchButton: {
    backgroundColor: '#27AE60',
    borderRadius: 8,
    padding: 12,
    margin: 10, width: "60%",
    alignItems: 'center', alignSelf: "center",
    elevation: 3,
  },
  addBranchText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  branchCard: {
    marginBottom: 15,
    borderRadius: 8, backgroundColor: "#f3f3f3",
    elevation: 3, margin: 8
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  barContainer: {
    marginVertical: 10,
  },
  barLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  bar: {
    height: 15,
    borderRadius: 5,
    marginBottom: 10, justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFF',
  },
  moreDetailsButton: {
    marginTop: 10,
  },
  moreDetailsText: {
    fontSize: 14,
    color: '#F3F3F3',
  },
});

export default Branch;
