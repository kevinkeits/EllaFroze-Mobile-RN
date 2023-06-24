import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Help from './src/pages/Help';
import Home from './src/pages/Home';
import Profile from './src/pages/Account';
import Transaction from './src/pages/Transaction';
import Router from './src/router';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';



export type RootStackParams = {
  Splash: undefined;
  MainApp: undefined;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [tokenID, setToken] = useState<string>('')
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');


  const fetchToken = async () => {


    const tokenData = await AsyncStorage.getItem('tokenID')

    setToken(tokenData == null ? "" : tokenData)
    
  };

  const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Permission not granted to receive notifications');
      return '';
    } else {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem('pushDeviceID', token)
      setExpoPushToken(token)
      return token;
    }
  };

  useEffect(() => {
    //registerForPushNotifications();
  }, []);

  const AppLoading = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading...</Text>
        <StatusBar backgroundColor='#FA0000' />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
