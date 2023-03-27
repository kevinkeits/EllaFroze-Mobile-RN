import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Icon, Badge } from 'react-native-elements';
import NotificationIcon from './components/Icon/Icon';
import axios from 'axios';



const items= [
  {
  id: 1,
  text: "Test"
  },
  {
    id:2,
    text: "Test2"
  }
]
interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

const HomeHeader = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>("Semua");
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ellafroze.com/api/external/getNotification?_cb=onCompleteFetchNotification&_s=OEhXVkhKVTc4M0RDNk5NQjNROFJPT1lCOVZCOTlYVzIxWU1LQ044TklTWFVFRlJSTFRQRDlRVUZKVE5RWEJWWk1Ea3lZbVkwWVRNNFltUmxZakUzTmpSaFkyRTFNREppTVRoak9EUmxObVV4TmpjNU5qVXhNRFl4')
      .then(response => {
        setNotifications(response.data.data);
        //alert(JSON.stringify(response.data.data))
        alert(JSON.stringify(notifications))
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);


    const handlePickerCity = () => {
    setPickerCity(true);
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
            <Text style={{color:"white"}}>{selectedCity}</Text>
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
        
        <TextInput
          style={styles.searchBar}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search"
        />
        </View>
        <Drawer
  isVisible={pickerCity}
  swipeDirection="left"
  onSwipeComplete={() => setPickerCity(false)}
  style={{}}
>
  <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={() => setPickerCity(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
      <Text style={{fontWeight:"bold", fontSize:16}}>X</Text>
    </TouchableOpacity>
  {pickerCity && (
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
            setPickerCity(false);
          }}
        >
          <Picker.Item label="Semua" value="Semua" />
          <Picker.Item label="Bogor" value="Bogor" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Semarang" value="Semarang" />
        </Picker>
      )}
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
    width: 50,
    height: 50,
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
});

export default HomeHeader;
