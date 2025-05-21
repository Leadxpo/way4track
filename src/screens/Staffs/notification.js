import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import api from '../../Api/api';
import { Provider } from 'react-native-paper';
import Header from '../../components/userHeader';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [expandedNotification, setExpandedNotification] = useState(null);

  const getAllNotification = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await api.post('/notifications/getAllNotifications', payload);

      if (res.status) {
        setNotifications(res.data.notifications || []);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
    }
  };

  useEffect(()=>{
    getAllNotification()
  },[])

  const markAsRead = async (id) => {
    try {
      await api.post('/notifications/markAllAsRead', {
        ids: [id],
        isRead: true,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: 1 } : n))
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const toggleExpand = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: 1 } : n))
    );
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const markAllAsRead = async () => {
    try {
      const ids = notifications.map((n) => n.id);
      await api.post('/notifications/markAllAsRead', {
        ids,
        isRead: true,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: 1 })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const filteredNotifications =
    selectedBranch === 'All'
      ? notifications
      : notifications.filter((n) => n.branchName === selectedBranch);

  return (
    <Provider style={styles.container}>
      <Header/>
      <TouchableOpacity onPress={markAllAsRead}>
        <Text style={styles.markAllRead}>Mark All as Read</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => {
              markAsRead(item.id)
              toggleExpand(item.id)}}
          >
            <View style={styles.notificationContent}>
              <Text style={styles.notificationUser}>{item.user}</Text>
              <Text style={styles.notificationDate}>{item.createdAt}</Text>
              {expandedNotification === item.id && (
                <Text style={styles.notificationMessage}>{item.message}</Text>
              )}
            </View>
            {!item.isRead && <View style={styles.unreadBadge} />}
          </TouchableOpacity>
        )}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  markAllRead: {
    color: '#007aff',
    fontWeight: '600',padding:10,
    marginBottom: 16,
    textAlign: 'right',
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationContent: {
    flex: 1,
  },
  notificationUser: {
    fontWeight: 'bold',
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  notificationMessage: {
    marginTop: 8,
    color: '#333',
  },
  unreadBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    marginLeft: 8,
    marginTop: 4,
  },
});

export default Notifications;
