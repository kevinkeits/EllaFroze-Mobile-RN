import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();


interface LoginCredentials {
  txtUsername: string;
  txtPassword: string;
}

interface LoginGoogle {
  ID: string;
  Name: string;
  Email: string;
  TokenID: string;
}


interface Props {
    navigation: any;
  }

const Login: React.FC<Props> = ({ navigation }) => {
    const [txtUsername, setTxtUsername] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [token, setToken] = useState("");
    //const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: '208326548212-pr78pe9v2r64mdd7849jdf644imtqdbs.apps.googleusercontent.com',
      //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    async function loginGoogle(loginInput: LoginGoogle): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doAuthGoogle';
    
      try {
         const response = await axios.post(apiUrl, loginInput);
         if (!response.data.status){
          alert(response.data.message);
         } else {
          navigation.navigate("MainApp")
          await AsyncStorage.setItem('tokenID', response.data.data.Token)
         }   
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function loginUser(loginInput: LoginCredentials): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doLogin';
    
      try {
         const response = await axios.post(apiUrl, loginInput);
         if (!response.data.status){
          alert(response.data.message);
         } else {
          navigation.navigate("MainApp")
          await AsyncStorage.setItem('tokenID', response.data.data.Token)
         }   
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    const handleLoginUser = async () => {
      try {
        await loginUser({  txtUsername, txtPassword });
      } catch (error) {
        console.error(error);
      }
    };

    const getUserInfo = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const user = await response.json();

        await loginGoogle({  ID:user.id, Name:user.name, Email:user.email, TokenID:token })

        //setUserInfo(user);

        
        //alert(JSON.stringify(user))
      } catch (error) {
        // Add your own error handler here
      }
    };
    useEffect(() => {
      if (response?.type === "success") {
        if (response.authentication != null) {
          setToken(response.authentication.accessToken);
          getUserInfo();
        }
        
      }
    }, [response, token]);
      
  return (
    <View style={{flex: 1, backgroundColor:"#FA0000", margin: 0, justifyContent:'center'}}>
       <View style={{alignSelf:'center'}}><Image source={Logo} style={styles.logo}/></View>
      <View style={{width:'80%', justifyContent:'center', marginLeft:40}}>
        <View style={{marginHorizontal:10}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Masuk</Text>
        </View>
      <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"500", color:'white'}}>Email</Text>
      <TextInput
      value={txtUsername}
      onChangeText={setTxtUsername}
      autoCapitalize="none"  
      style={{borderColor:"white", fontWeight:'bold', borderWidth:1, alignItems: "center", justifyContent:"center", padding:10,backgroundColor:'white', marginVertical:5, borderRadius:6}}
      />
    
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
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 40}}>
      <TouchableOpacity onPress={handleLoginUser} style={{backgroundColor:"#FFCB00", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"black", fontWeight:"bold"}}>MASUK</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:8}}> 
      <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
        <Text style={{color:"white", marginTop:8, marginLeft:5}}>Lupa Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
        <Text style={{color:"white", marginTop:8, marginLeft:5}}>Daftar disini</Text>
      </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
            }} 
        >
          <Text>Login Google</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} disabled={!request}
  onPress={() => {
    promptAsync();
  }}>
  <View style={styles.buttonContainer}>
    <View style={{backgroundColor:"white"}}>
    <Image source={require('../../assets/images/google-logo.png')} style={{width:30, height:30}} />
    </View>
    <Text style={styles.buttonText}>Sign in with Google</Text>
  </View>
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
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 8,
    borderRadius: 5,
    width:"80%",
    marginTop:20,
    alignItems:"center",
    alignSelf:"center" 
 },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
})