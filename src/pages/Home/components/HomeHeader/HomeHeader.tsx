import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import NotificationIcon from './components/Icon/Icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image'





interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

interface Branch {
  ID: string;
  Name: string;
}

const HomeHeader = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification>();
  const [branches, setBranches] = useState<Branch[]>([]);


  const selectedBranchLabel = branches.find(item => item.ID === selectedCity);


  const [loading, setLoading] = useState(true);

  const fetchData = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getNotification?_cb=onCompleteFetchNotification&_s=${token}`;
    const response = await axios.get(url);
    setNotifications(response.data.data);
    setLoading(false)
  }

  const fetchBranch = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getBranch?_cb=onCompleteFetchBranch&_p=&_s=${token}`;
    const response = await axios.get(url);
    setBranches(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    fetchBranch(tokenData == null ? "" : tokenData);
    
  };

  const handleSearch = () => {
    navigation.navigate('Search', { searchText });
  };

  const handleCitySelection  = async (cityId: string) => {
    setSelectedCity(cityId);
    setPickerCity(false);
    if (selectedCity !== "") {
      await AsyncStorage.setItem('selectedBranch', selectedCity)
    }
  };
  

useEffect(() => {
    
  fetchToken()
  // storedBranch()
  
  
}, []);




  const handlePickerCity = async () => {
    // await AsyncStorage.setItem('selectedBranch', selectedCity)
    // alert(await AsyncStorage.getItem('selectedBranch'))
    setPickerCity(true);
  };

  const storedBranch = async () => {
    if (selectedCity) {
    await AsyncStorage.setItem('selectedBranch', selectedCity)
    alert(await AsyncStorage.getItem('selectedBranch'))
  }
   
  };


  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />
        <View style={{width:'100%'}}>
          <View style={{flexDirection:'row', marginVertical:2, justifyContent:'space-between', width:293}}>
          <TouchableOpacity onPress={handlePickerCity} style={{flexDirection:"row", gap:8}}>           
           <LocationIcon  />
            <Text style={{color:"white"}}>{selectedCity ? selectedBranchLabel?.Name : 'Pilih Cabang'}</Text>
           </TouchableOpacity>         
           <View style={{flexDirection:'row', gap:20}}>
              <TouchableOpacity onPress={()=>navigation.navigate("Contact")}>
                {/* <MessageIcon/> */}
                <NotificationIcon
                  name="mail"
                  type="material"
                  size={30}
                  notificationCount={notifications ? notifications?.messageData : 0}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                {/* <CartIcon/> */}
                <NotificationIcon
                  name="shopping-cart"
                  type="material"
                  size={30}
                  notificationCount={notifications ? notifications?.cartData : 0}
                />

              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
        />
        <TouchableOpacity onPress={handleSearch} style={{alignItems:"center", marginRight:8}}>
        <Icon
                  name="search"
                  type="material"
                  size={25}
                  color="gray"
                />
      </TouchableOpacity>
      </View>
        </View>
  <Drawer
  isVisible={pickerCity}
  swipeDirection="left"
  onSwipeComplete={() => setPickerCity(false)}
  style={{}}
>
<View style={{paddingBottom:20, backgroundColor:"white"}}>
<TouchableOpacity onPress={() => setPickerCity(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
            <Text style={{fontWeight:"bold", fontSize:16}}>X</Text>
           </TouchableOpacity>
      {branches?.map((item, index)=>(
             <TouchableOpacity
             key={index} 
             onPress={()=>handleCitySelection(item.ID)}
             style={{
                width:"90%", 
                // flexDirection:"row", 
                alignItems:"center",
                alignSelf:"center",
                marginTop:8,
                borderRadius:8, 
                paddingVertical:10,
                backgroundColor: '#fff',
                elevation:3,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                }}>
           
                {/* <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} /> */}
                <Text style={{fontSize:16}}>{item.Name}</Text>
             </TouchableOpacity>
      ))}
    </View>
</Drawer>


      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    marginBottom: 20,
  },
  logo: {
    width: 55,
    height: 58,
    marginRight: 10,
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:300
    
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
    width:290,
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

export default HomeHeader;
