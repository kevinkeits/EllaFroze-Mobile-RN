import { StyleSheet, Text,TextInput, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../pages/Home';
// import Transaction from '../pages/Transaction';
// import Help from '../pages/Help';
// import Profile from '../pages/Profile';
// import Splash from '../pages/Splash';
import {Home, Transaction, Help, Account, Splash} from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackIcon, CartIcon, HelpIcon, HomeIcon, ProfileIcon, TransactionIcon } from '../assets/icons';
import AccountAddress from '../pages/Account/components/account_address/AccountAddress';
import AccountDetail from '../pages/Account/components/account_detail/AccountDetail';
import Login from '../pages/Login';
import HomeHeader from '../pages/Home/components/HomeHeader/HomeHeader';
import Category from '../pages/Category';
import { useNavigation } from '@react-navigation/native';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Payment from '../pages/Payment/Payment';
import AddressDetail from '../pages/Account/components/address_detail/AddressDetail';


  
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();



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
  <AccountStack.Screen name='AccountAddress' component={AccountAddress}
  options={{title: "Address", headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />
  <AccountStack.Screen name='AddressDetail' component={AddressDetail} 
  options={{title: "Address Detail", headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />
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
      <Tab.Screen name='Home' component={Home} options={{title: "Home", headerTitle: () => <HomeHeader/>, headerStyle: {
          backgroundColor: '#FA0000',
          height: 120,
        },
        tabBarIcon: ({color, size}) => (
          <HomeIcon color={color} size={size}  />
        ),
        tabBarActiveBackgroundColor: "#BA0000",}}/>
        <Tab.Screen name='Transaction' component={Transaction} options={{title: "Transaction", headerTitle: () => <HomeHeader/>, headerStyle: {
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
  const navigation = useNavigation();
  return (
    <RootStack.Navigator initialRouteName='Splash'>
        <RootStack.Screen name='Splash' component={Splash} options={{title: "Splash", headerShown: false}}/>
        <RootStack.Screen name='Login' component={Login} options={{title: "Login", headerShown: false}}/>
        <RootStack.Screen name='MainApp' component={MainApp} options={{title: "Home", headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <HomeIcon color={color} size={size}  />
          // ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
          <RootStack.Screen name='Category' component={Category} options={{
            title: "Category",
            headerTitle:()=>
            <TextInput
          style={styles.searchBar}
          // onChangeText={handleSearchTextChange}
          // value={searchText}
          placeholder="Search"
        />,
            headerRight:()=> <CartIcon/>,
            headerLeft:()=> <TouchableOpacity onPress={()=>navigation.goBack()}><BackIcon /></TouchableOpacity>,
            headerStyle:{
              backgroundColor:"red",
            }
            }}/>
          <RootStack.Screen name='ProductDetail' component={ProductDetail} options={{
            title: "Product Detail",
            headerTitle:()=>
            <TextInput
            style={styles.searchBar}
            // onChangeText={handleSearchTextChange}
            // value={searchText}
            placeholder="Search"
            />,
            headerRight:()=> <CartIcon/>,
            headerLeft:()=> <TouchableOpacity onPress={()=>navigation.goBack()}><BackIcon /></TouchableOpacity>,
            headerStyle:{
              backgroundColor:"red",
            }
            }}/>
             <RootStack.Screen name='Cart' component={Cart} options={{
            title: "Cart",
            headerTitle:()=>
            <TextInput
            style={styles.searchBar}
            // onChangeText={handleSearchTextChange}
            // value={searchText}
            placeholder="Search"
            />,
            headerRight:()=> <CartIcon/>,
            headerLeft:()=> <TouchableOpacity onPress={()=>navigation.goBack()}><BackIcon /></TouchableOpacity>,
            headerStyle:{
              backgroundColor:"red",
            }
            }}/>
            <RootStack.Screen name='Payment' component={Payment} options={{headerShown:false}} />

      </RootStack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    height:'10%',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchBar: {
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: '83%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});


export default Router

