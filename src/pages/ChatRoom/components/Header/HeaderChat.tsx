import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Icon, Badge } from 'react-native-elements';
import NotificationIcon from './components/Icon/Icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

interface HeaderChatProps {
  name: string
}

const HeaderChat = ({name}: HeaderChatProps) => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
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

  const handleSearch = () => {
    navigation.navigate('Search', { searchText });
  };

useEffect(() => {
    
  fetchToken()
  
  
}, []);


  return (
      <View style={styles.header}>
      
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{alignItems:"center", marginTop:30, marginLeft:15}} >
               <Icon
                  name="arrow-back"
                  type="material"
                  size={40}
                  color="white"
                />
          </TouchableOpacity>
        
          <View style={styles.containerInput}>
                 <Text>{name}</Text>
        </View>
        <View>
              <TouchableOpacity onPress={()=>navigation.navigate("Cart")} style={{alignItems:"center", marginTop:30, marginLeft:12}}>
                <NotificationIcon
                  name="shopping-cart"
                  type="material"
                  size={30}
                  notificationCount={notifications ? notifications?.cartData : 0}
                />
              </TouchableOpacity>
           
          </View>
          
         
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor:"#FA0000",
    // justifyContent:"space-around",
    alignItems: 'center',
    width:'100%',
    height:100,
   
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:"90%",
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerInput: {
    flexDirection: 'row',
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width:"65%", marginLeft:10, marginTop:30,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 10,
  },
});

export default HeaderChat;
