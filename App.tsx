import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Help from './src/pages/Help';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Transaction from './src/pages/Transaction';
import Router from './src/router';


export type RootStackParams = {
  Splash: undefined;
  MainApp: undefined;
};

export default function App() {
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
});
