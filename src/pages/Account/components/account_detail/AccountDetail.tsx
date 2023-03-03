import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AccountDetail = () => {
  return (
    <SafeAreaView>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>Nama Lengkap</Text>
      <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>Rifqi Raihan Lazuardi</Text>
      </View>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>No Handphone</Text>
      <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>0812123213</Text>
      </View>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>Email</Text>
      <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>wirosableng@gmail.com</Text>
      </View>
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 13}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={()=> alert("TERSIMPAN")} style={{backgroundColor:"#FA0000", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"white", fontWeight:"bold"}}>SIMPAN</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default AccountDetail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });