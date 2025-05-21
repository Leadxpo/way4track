import React, { useState,useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const LevelCard = ({ level, expanded, onToggle, children }) => {
    const contentRef = useRef(null); // Reference to measure content height
    const [contentHeight, setContentHeight] = useState(0);
  
    const animatedHeight = useSharedValue(expanded ? contentHeight : 0); // Use calculated height
  
    const animatedStyle = useAnimatedStyle(() => ({
      height: withTiming(animatedHeight.value, { duration: 300 }), // Smooth animation
    }));
  
    const handleToggle = () => {
      animatedHeight.value = expanded ? 0 : contentHeight;
      onToggle();
    };

    useEffect(() => {
      if (contentRef.current) {
        contentRef.current.measure((x, y, width, height) => {
          setContentHeight(height);
          // Set initial height if expanded
          if (expanded) {
            animatedHeight.value = height;
          }
        });
      }
    }, [expanded]);
  
    // const measureContent = () => {
    //   contentRef.current?.measure((x, y, width, height) => {
    //     setContentHeight(height); // Update content height
    //   });
    // };
  
    return (
      <View style={styles.levelContainer}>
        <TouchableOpacity style={styles.levelHeader} onPress={handleToggle}>
          <Text style={styles.levelHeaderText}>Level {level}</Text>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Animated.View style={[styles.levelContent, animatedStyle]}>
          {/* Invisible View to measure content height */}
          <View
            style={styles.measureContainer}
            ref={contentRef}
            onLayout={() => {
              contentRef.current.measure((x, y, width, height) => {
                setContentHeight(height);
              });
            }}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,paddingBottom:10,
      backgroundColor: '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    logoText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    notificationContainer: {
      position: 'relative',
      marginRight: 20,
    },
    notificationBadge: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: '#FF0000',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationText: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    hiringDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      margin: 20,
      padding: 20,
      borderRadius: 10,
      elevation: 2,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 20,
    },
    hiringInfo: {
      flex: 1,
    },
    hiringName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
    hiringEmail: {
      fontSize: 14,
      color: '#777777',
    },
    hiringPhone: {
      fontSize: 14,
      color: '#777777',
    },
    hiringLevel: {
      fontSize: 14,
      color: '#4CAF50',
    },
    levelContainer: {
      margin: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      elevation: 2,
    },
    levelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
      padding: 15,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    levelHeaderText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    levelContent: {
      backgroundColor: '#EEEEEE',borderBottomEndRadius:10,
      borderBottomStartRadius:10,
      overflow: 'hidden',
    },
    measureContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      opacity: 1, // Invisible view for measurement
    },
    form: {
      flex: 1,
      padding: 15,
    },
    input: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#EEEEEE',
    },
  });
  
  export default LevelCard;
