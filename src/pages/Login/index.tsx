import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'

interface Props {
    navigation: any;
  }

const Login: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = () => {
        if (email === '123' && password === '123') {
            alert('Login Success!');
          navigation.navigate('MainApp');
        } else {
          alert('Invalid email or password');
        }
      }

      
  return (
    <View style={{flex: 1, backgroundColor:"#FA0000", margin: 0, justifyContent:'center'}}>
       <View style={{marginLeft:50}}><Image source={Logo} style={styles.logo}/></View>
      <View style={{width:'80%', justifyContent:'center', marginLeft:40}}>
        <View style={{marginHorizontal:10}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Masuk</Text>
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
    <View style={{ marginHorizontal: 10, marginTop: 50}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={handleLoginPress} style={{backgroundColor:"#FFCB00", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>SIMPAN</Text>
      </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({ 
    logo: {
    width: 254,
    height: 254,
  },})