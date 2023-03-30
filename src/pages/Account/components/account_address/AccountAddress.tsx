import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


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

useEffect(() => {
    
  fetchToken()
  
  
}, []);

  return (
    <View style={{ justifyContent:"center"}}>
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
          }}>
        <Text style={{fontWeight:"bold", marginTop:20}}>{item.Name}</Text>
        <Text style={{marginTop:15}}>{item.Phone}</Text>
        <Text style={{marginTop:15}}>{item.Address}</Text>
        <Text style={{marginBottom:20}}>{item.CityName}, {item.DistrictName}, {item.PostalCode}</Text>
      </TouchableOpacity>
      ))}
      
      <TouchableOpacity onPress={()=>navigation.navigate("NewAddress")} style={{backgroundColor:"green", justifyContent:"center", alignItems:"center", alignSelf:'center', marginTop:25, paddingVertical:10, width:"80%", borderRadius:6}}>
        <Text style={{fontWeight:"bold"}}>BUAT ALAMAT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountAddress

const styles = StyleSheet.create({})