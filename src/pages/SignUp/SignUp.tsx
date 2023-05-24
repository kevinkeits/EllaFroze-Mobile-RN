import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'



interface UserInput {
  txtName: string;
  txtUsername: string;
  txtPassword: string;
}




const SignUp = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [txtName, setTxtName] = useState('');
  const [txtUsername, setTxtUsername] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');








    async function createUser(userInput: UserInput): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doRegister';
    
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

    const handleCreateUser = async () => {
      try {
        if (txtName == '') {
          setErrorName('* Nama tidak boleh kosong');
        } else if (txtUsername == '') {
          setErrorEmail('* Email/No.Handphone tidak boleh kosong');
        } else if (txtPassword == '') {
          setErrorPassword('* Password tidak boleh kosong');
        }else if (txtPassword !== confirmPassword) {
          setError('* Passwords do not match');
        } 
        else {
          setError('');
          setErrorName('');
          setErrorEmail('');
          setErrorPassword('');
          alert("berhasil")
          await createUser({ txtName, txtUsername, txtPassword });
          navigation.goBack();

        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleConfirmPasswordChange = (text:string) => {
      setConfirmPassword(text);
    };

   

      
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
      value={txtName}
      onChangeText={setTxtName}
      autoCapitalize="none" 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
            {errorName !== '' && <Text>{errorName}</Text>}

      {/* <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>Rifqi Raihan Lazuardi</Text>
      </View> */}
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Email/No.Handphone</Text>
      <TextInput
      value={txtUsername}
      onChangeText={setTxtUsername}
      autoCapitalize="none" 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
            {errorEmail !== '' && <Text>{errorEmail}</Text>}

      {/* <View style={{borderColor:"black", borderWidth: 1, alignItems: "center", justifyContent:"center", paddingVertical:8, marginVertical:5, backgroundColor:"white", borderRadius:6}}>
        <Text style={{fontWeight:"500"}}>Rifqi Raihan Lazuardi</Text>
      </View> */}
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Password</Text>
      <TextInput
      value={txtPassword}
      onChangeText={setTxtPassword} 
      autoCapitalize="none" 
      secureTextEntry={true} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10, backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
            {errorPassword !== '' && <Text>{errorPassword}</Text>}

    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Konfirmasi Password</Text>
      <TextInput
      value={confirmPassword}
      onChangeText={handleConfirmPasswordChange}
      autoCapitalize="none"  
      secureTextEntry={true} 
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10, backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
      {error !== '' && <Text>{error}</Text>}
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 40}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={handleCreateUser} style={{backgroundColor:"#FFCB00", borderRadius:15, alignItems:"center", paddingVertical:10}}>
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