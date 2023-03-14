import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'


interface AddressProps {
 id:string
 name: string
 phoneNumber: string
 state: string
 city: string
 district: string
 postalCode: string
}
const AccountAddress = () => {
  const navigation = useNavigation();
  const items:AddressProps[] = [
    {
    id:"1",
    name: "Rifqi",
    phoneNumber:"08128323",
    state:"West Java",
    city: "Bogor",
    district: "Kec. Tanah Sareal",
    postalCode: "16161"
  },
  {
    id:"2",
    name: "Raihan",
    phoneNumber:"08128323",
    state:"West Java",
    city: "Depok",
    district: "Kec. Kelapa Dua",
    postalCode: "16161"
  }
]

  return (
    <View style={{ justifyContent:"center"}}>
      {items.map((item, index) => (
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
        <Text style={{fontWeight:"bold", marginTop:20}}>{item.name}</Text>
        <Text style={{marginTop:15}}>{item.phoneNumber}</Text>
        <Text style={{marginTop:15}}>BUILDING NAME</Text>
        <Text style={{marginBottom:20}}>{item.city}, {item.district}, {item.postalCode}</Text>
      </TouchableOpacity>
      ))}
      
      <TouchableOpacity onPress={()=>navigation.navigate("AddressDetail")} style={{backgroundColor:"green", justifyContent:"center", alignItems:"center", alignSelf:'center', marginTop:25, paddingVertical:10, width:"80%", borderRadius:6}}>
        <Text style={{fontWeight:"bold"}}>BUAT ALAMAT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AccountAddress

const styles = StyleSheet.create({})