import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'



const SignUp = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   

      
  return (
    <View style={{flex: 1, backgroundColor:"#FA0000", margin: 0}}>
       <View style={{alignSelf:"center", marginTop:50}}><Image source={Logo} style={styles.logo}/></View>
      <View style={{width:'80%', justifyContent:'center', marginLeft:40}}>
        <View style={{marginHorizontal:10}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Daftar</Text>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Nama Lengkap</Text>
      <TextInput
      value={email}
      onChangeText={setEmail} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
      {/* <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>Rifqi Raihan Lazuardi</Text>
      </View> */}
    </View>
      <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Email</Text>
      <TextInput
      value={email}
      onChangeText={setEmail} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
      {/* <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>Rifqi Raihan Lazuardi</Text>
      </View> */}
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Password</Text>
      <TextInput
      value={password}
      onChangeText={setPassword} 
      secureTextEntry={true} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10, backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Konfirmasi Password</Text>
      <TextInput
      value={password}
      onChangeText={setPassword} 
      secureTextEntry={true} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10, backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 40}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={() => alert("Berhasil Daftar!")} style={{backgroundColor:"#FFCB00", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>DAFTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={{backgroundColor:"#FFFF", borderRadius:15, alignItems:"center", paddingVertical:10, marginTop:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>KEMBALI</Text>
      </TouchableOpacity>
      
      
    </View>
    </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({ 
    logo: {
    width: 154,
    height: 154,
  },})