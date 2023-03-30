import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

type NotificationIconProps = {
  name: string;
  type: string;
  size: number;
  // notificationCount: number;
};

interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  name,
  type,
  size,
  // notificationCount,
}) => {
  const [notifications, setNotifications] = useState<Notification>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getNotification?_cb=onCompleteFetchNotification&_s=${token}`;
    const response = await axios.get(url);
    setNotifications(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    
  };

useEffect(() => {
    
  fetchToken()
  
  
}, []);
  return (
    <View style={styles.container}>
      <Icon name={name} type={type} size={size} color="#FFFF" />
      <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{notifications ? notifications?.cartData : 0}</Text>
      </View>
      {/* {notificationCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{notifications ? notifications?.cartData : 0}</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderWidth:1,
    borderColor:"white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationIcon;
