import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';


interface ForgetPasswordInput {
  txtEmail: string;
}

const ForgetPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [txtEmail, setTxtEmail] = useState('');


    async function resetPassword(userInput: ForgetPasswordInput): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doReset';
    
      try {
         const response = await axios.post(apiUrl, userInput);
         //alert(JSON.stringify(response.data.status))
         if (!response.data.status){
          alert(response.data.message);
         } else {
          //navigation.navigate("Login")
          alert(response.data.message)
         }   
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    const handleSubmit = async () => {
      try {
        await resetPassword({ txtEmail});
      } catch (error) {
        console.error(error);
      }
    };

   

      
  return (
    <View style={{flex: 1, backgroundColor:"#FA0000", margin: 0}}>
       <View style={{alignSelf:"center", marginTop:50}}><Image source={Logo} style={styles.logo}/></View>
      <View style={{width:'80%', justifyContent:'center', marginLeft:40}}>
        <View style={{marginHorizontal:10}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Lupa Password</Text>
            <Text style={{marginTop:8, color:"white", fontSize:16}}>Masukkan alamat Email kamu. Kami akan mengirimkan instruksi untuk atur ulang kata sandi</Text>
        </View>
    <View style={{ marginHorizontal: 10, marginTop: 20}}>
      <Text style={{fontWeight:"500", color:'white'}}>Email</Text>
      <TextInput
      value={txtEmail}
      onChangeText={setTxtEmail}
      autoCapitalize="none"  
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
    </View>
    
    
    <View style={{ marginHorizontal: 10, marginTop: 40}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:"#FFCB00", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>SUBMIT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={{backgroundColor:"#FFFF", borderRadius:15, alignItems:"center", paddingVertical:10, marginTop:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>KEMBALI</Text>
      </TouchableOpacity>
      
      
    </View>
    </View>
    </View>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({ 
    logo: {
    width: 154,
    height: 154,
  },})