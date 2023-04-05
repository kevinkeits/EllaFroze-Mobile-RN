import { StyleSheet, Text,TextInput, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import Contact from '../pages/Contact/Contact';
import ChatRoom from '../pages/ChatRoom/ChatRoom';
import SignUp from '../pages/SignUp/SignUp';
import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';
import { Icon } from 'react-native-elements';
import NotificationIcon from '../components/Icon/Icon';
import NewAddress from '../pages/Account/components/new_address/NewAddress';
import Search from '../pages/Search/Search';
import Header from '../components/Header/Header';
import TransactionDetail from '../pages/Transaction/components/TransactionDetail/TransactionDetail';



  
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();



const AccountApp = () => {
  const navigationAccount = useNavigation();
  

  return(
<AccountStack.Navigator initialRouteName='Account'>
  <AccountStack.Screen name='Account' component={Account} options={{title: "Profile",
  headerTitleStyle:{
    color:"white"
  },
   headerStyle: {
          backgroundColor: '#FA0000',
        },
        }}/>
  
</AccountStack.Navigator>
)
}


const MainApp = () => {
  const navigation = useNavigation();
  return (
  //   <Tab.Navigator
  //   screenOptions={{
  //     tabBarStyle: {
  //       backgroundColor: '#FA0000',
  //     },
  //   tabBarActiveTintColor: '#ffff', 
  //   tabBarInactiveTintColor: 'black',  
  // }}
  //   >
  <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
                backgroundColor: '#FA0000',
              },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          }  if (route.name === 'AccountApp') {
            iconName = 'person';
          }  if (route.name === 'Transaction') {
            iconName = 'sync-alt';
          }  else if (route.name === 'Help') {
            iconName = 'help';
          }

          return (
            <Icon
              name={iconName}
              type="material"
              size={size}
              color={focused ? 'green' : 'white'}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          let labelName;

          if (route.name === 'Home') {
            labelName = 'Home';
          }  if (route.name === 'AccountApp') {
            labelName = 'Profile';
          }  if (route.name === 'Transaction') {
            labelName = 'Transaction';
          }  else if (route.name === 'Help') {
            labelName = 'Help';
          }

          return (
            <Text style={{ color: focused ? 'yellow' : color }}>
              {labelName}
            </Text>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'white',
      }}
    >
        <Tab.Screen name='Home' component={Home} options={{title: "Home", headerShown:false
        }}/>
        <Tab.Screen name='Transaction' component={Transaction} options={{title: "Home", headerTitle: () => <HomeHeader/>, headerStyle: {
          backgroundColor: '#FA0000',
          height: 120,
        },
        }}/>
        <Tab.Screen name='Help' component={Help} options={{title: "Help", headerTitleStyle:{ color:"white" }, headerStyle: {
          backgroundColor: '#FA0000',
        },
        }}/>
      <Tab.Screen name='AccountApp' component={AccountApp} options={{title: "AccountApp", headerShown: false,
        // tabBarIcon: ({color, size}) => (
        //   <ProfileIcon color={color} size={size}  />
        // ),
        // tabBarActiveBackgroundColor: "#BA0000",
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // }
        }}/>
    </Tab.Navigator>
  )
} 

const Router = () => {
  const navigation = useNavigation();

  return (
    <RootStack.Navigator initialRouteName='Splash'>
        <RootStack.Screen name='Splash' component={Splash} options={{title: "Splash", headerShown: false}}/>
        <RootStack.Screen name='Login' component={Login} options={{title: "Login", headerShown: false}}/>
        <RootStack.Screen name='SignUp' component={SignUp} options={{title: "SignUp", headerShown: false}}/>
        <RootStack.Screen name='ForgetPassword' component={ForgetPassword} options={{title: "ForgetPassword", headerShown: false}}/>
        <RootStack.Screen name='MainApp' component={MainApp} options={{title: "Home", headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
          <RootStack.Screen name='Search' component={Search} options={{
              title: "Pencarian",
              headerTitleStyle:{
                color:"white"
              },
              headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>, 
             headerStyle: {
                backgroundColor: '#FA0000',
                height: 120,
                }}}/>
          <RootStack.Screen name='Category' component={Category} options={{
              title: "Pencarian",
              headerTitleStyle:{
                color:"white"
              },
              headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>, 
             headerStyle: {
                backgroundColor: '#FA0000',
                height: 120,
                }}}/>
          <RootStack.Screen name='ProductDetail' component={ProductDetail} options={{
              title: "Detail Produk",
              headerTitleStyle:{
                color:"white"
              },
              headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>, 
             headerStyle: {
                backgroundColor: '#FA0000',
                height: 120,
                }}}/>
             <RootStack.Screen name='Cart' component={Cart} options={{
              title: "Keranjang",
              headerTitleStyle:{
                color:"white"
              },
              headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>, 
             headerStyle: {
                backgroundColor: '#FA0000',
                height: 120,
                }}}/>
            <RootStack.Screen name='Payment' component={Payment} options={{headerShown:false}} />
            <RootStack.Screen name='Contact' component={Contact}
                options={{
                  title: "Hubungi Admin",
                  headerTitleStyle: {
                      color:"white"
                  },
                  headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>, 
                  headerStyle: {
                backgroundColor: '#FA0000',
                height: 120,
                }}} />
            <RootStack.Screen name='ChatRoom' component={ChatRoom} options={{headerShown: false}} />
            <RootStack.Screen name='AccountDetail' component={AccountDetail} options={{
          headerBackTitle: null,
          title:"Data Diri",
          headerTitleStyle:{
            color:"white"
          },
          headerStyle : {
              backgroundColor: '#FA0000',
          },
          headerLeft:()=> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
               <Icon
                  name="chevron-left"
                  type="material"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>,
          // headerRight: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     title="Info"
          //     color="black"
          //   />
          // ),
        }}/>
  <RootStack.Screen name='AccountAddress' component={AccountAddress}
  options={{title: "Alamat",
  headerTitleStyle:{
    color:"white"
  },
  headerLeft:()=> 
  <TouchableOpacity onPress={()=>navigation.goBack()} >
     <Icon
        name="chevron-left"
        type="material"
        size={40}
        color="white"
      />
    </TouchableOpacity>, 
   headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />
  <RootStack.Screen name='AddressDetail' component={AddressDetail} 
  options={{title: "Detail Alamat",
  headerTitleStyle:{
    color:"white"
  },
  headerLeft:()=> 
  <TouchableOpacity onPress={()=>navigation.goBack()} >
     <Icon
        name="chevron-left"
        type="material"
        size={40}
        color="white"
      />
    </TouchableOpacity>, 
   headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />
   <RootStack.Screen name='TransactionDetail' component={TransactionDetail} 
  options={{title: "Detail Pesanan",
  headerTitleStyle:{
    color:"white"
  },
  headerLeft:()=> 
  <TouchableOpacity onPress={()=>navigation.goBack()} >
     <Icon
        name="chevron-left"
        type="material"
        size={40}
        color="white"
      />
    </TouchableOpacity>, 
   headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />
   <RootStack.Screen name='NewAddress' component={NewAddress} 
  options={{title: "Buat Alamat Baru",
  headerTitleStyle:{
    color:"white"
  },
  headerLeft:()=> 
  <TouchableOpacity onPress={()=>navigation.goBack()} >
     <Icon
        name="chevron-left"
        type="material"
        size={40}
        color="white"
      />
    </TouchableOpacity>, 
   headerStyle: {
    backgroundColor: '#FA0000',
    height: 120,
  }}}
  />

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
    width: '75%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});


export default Router

