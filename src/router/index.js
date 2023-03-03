import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../pages/Home';
// import Transaction from '../pages/Transaction';
// import Help from '../pages/Help';
// import Profile from '../pages/Profile';
// import Splash from '../pages/Splash';
import {Home, Transaction, Help, Account, Splash} from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackIcon, HelpIcon, HomeIcon, ProfileIcon, TransactionIcon } from '../assets/icons';
import AccountAddress from '../pages/Account/components/account_address/AccountAddress';
import AccountDetail from '../pages/Account/components/account_detail/AccountDetail';


  
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();


const AccountApp = () => {
  return(
<AccountStack.Navigator initialRouteName='Account'>
  <AccountStack.Screen name='Account' component={Account}/>
  <AccountStack.Screen name='AccountDetail' component={AccountDetail} options={{
          headerBackTitle: null,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="black"
            />
          ),
        }}/>
  <AccountStack.Screen name='AccountAddress' component={AccountAddress}/>
</AccountStack.Navigator>
)
}


const MainApp = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#FA0000',
      },
    tabBarActiveTintColor: '#ffff', 
    tabBarInactiveTintColor: 'black',  
  }}
    >
      <Tab.Screen name='Home' component={Home} options={{title: "Home", headerShown: false,
        tabBarIcon: ({color, size}) => (
          <HomeIcon color={color} size={size}  />
        ),
        tabBarActiveBackgroundColor: "#BA0000",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/>
        <Tab.Screen name='Transaction' component={Transaction} options={{title: "Transaction", headerStyle: {
          backgroundColor: '#FA0000',
        },
        tabBarIcon: ({color, size}) => (
          <TransactionIcon color={color} size={size}  />
        ),
        tabBarActiveBackgroundColor: "#BA0000",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/>
        <Tab.Screen name='Help' component={Help} options={{title: "Help", headerStyle: {
          backgroundColor: '#FA0000',
        },
        tabBarIcon: ({color, size}) => (
          <HelpIcon color={color} size={size}  />
        ),
        tabBarActiveBackgroundColor: "#BA0000",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}/>
      <Tab.Screen name='AccountApp' component={AccountApp} options={{title: "AccountApp", headerShown: false,
        tabBarIcon: ({color, size}) => (
          <ProfileIcon color={color} size={size}  />
        ),
        tabBarActiveBackgroundColor: "#BA0000",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }}}/>
    </Tab.Navigator>
  )
} 

const Router = () => {
  return (
    <RootStack.Navigator initialRouteName='Splash'>
        <RootStack.Screen name='MainApp' component={MainApp} options={{title: "Home", headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <HomeIcon color={color} size={size}  />
          // ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
           <RootStack.Screen name='Splash' component={Splash} options={{title: "Splash", headerShown: false}}/>
           {/* <RootStack.Screen name='AccountApp' component={AccountApp} options={{title: "AccountApp", headerShown: false}}/> */}
      </RootStack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})