import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Icon } from 'react-native-elements'


interface AddressProps {
 id:string
 name: string
 phoneNumber: string
 state: string
 city: string
 district: string
 postalCode: string
}

interface Address {
  ID:string
  Name: string
  Phone: string
  StateID: string
  StateName: string
  CityID: string
  CityName: string
  DistrictID: string
  DistrictName: string
  PostalCode: string
  Address: string
  IsDefault?: number
 }

const AccountAddress = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);  
  

  const fetchData = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/external/getUserAddress?_cb=onCompleteFetchUserAddress&_p=profile-address-wrapper&_s=${tokenData}`;
    const response = await axios.get(url);
    setAddress(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    
  };

  const handleNavigate = (itemId: string) => {
    navigation.navigate('AddressDetail', {itemId})
  };

useEffect(() => {
    
  fetchToken()
  
  
}, []);

  return (
    <View style={{ justifyContent:"center"}}>
      <ScrollView>
      {address?.map((item, index) => (
        <TouchableOpacity key={index} style={{
          marginTop:10, 
          marginHorizontal:8, 
          padding:8, 
          borderRadius:8,
          backgroundColor: '#fff',
          elevation:3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          }}
          onPress={()=>handleNavigate(item.ID)}
          >
            {loading ? (<View style={{backgroundColor:"#EAEAEA", marginTop:20, width:55, height:20}}/>):(
                      <Text style={{fontWeight:"bold", marginTop:20}}>{item.Name}</Text>
            )}
            {loading ? (<View style={{backgroundColor:"#EAEAEA", marginTop:15, width:80, height:20}}/>):(
             <Text style={{marginTop:15}}>{item.Phone}</Text>
          )}
          {loading ? (<View style={{backgroundColor:"#EAEAEA", marginTop:15, width:90, height:20}}/>):(
          <Text style={{marginTop:15}}>{item.Address}</Text>
        )}
        {loading ? (<View style={{backgroundColor:"#EAEAEA", marginVertical:15, width:200, height:20}}/>):(
        <Text style={{marginBottom:20}}>{item.CityName}, {item.DistrictName}, {item.PostalCode}</Text>
        )}
        {item.IsDefault == 1 && (
          <View style={{width:120, alignSelf:"flex-end"}}>
         <Text style={{fontSize:14, fontWeight:"bold", color:"green"}}>
          [ Alamat Utama ]
         </Text>
          </View>
        )}
          
      </TouchableOpacity>
      ))}
       </ScrollView>

      
      {loading ? (<View style={{backgroundColor:"#EAEAEA", alignSelf:'center', marginTop:25,  width:"80%", height:50}}/>):(
      <TouchableOpacity onPress={()=>navigation.navigate("NewAddress")} style={{backgroundColor:"#148D2E", justifyContent:"center", alignItems:"center", alignSelf:'center', bottom:10, paddingVertical:15, width:"95%", borderRadius:6, position:"absolute"}}>
      <Text style={{fontWeight:"bold", color:"white"}}>BUAT ALAMAT</Text>
      </TouchableOpacity>       
 )}
     
    </View>
  )
}

export default AccountAddress

const styles = StyleSheet.create({})