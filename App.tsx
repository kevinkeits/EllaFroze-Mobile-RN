import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Help from './src/pages/Help';
import Home from './src/pages/Home';
import Profile from './src/pages/Account';
import Transaction from './src/pages/Transaction';
import Router from './src/router';
import { useState } from 'react';


export type RootStackParams = {
  Splash: undefined;
  MainApp: undefined;
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const AppLoading = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading...</Text>
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
