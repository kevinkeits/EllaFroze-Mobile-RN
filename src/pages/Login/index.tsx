import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Google from 'expo-google-app-auth';
import * as WebBrowser from 'expo-web-browser';
//import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();


interface LoginCredentials {
  txtUsername: string;
  txtPassword: string;
}


interface Props {
    navigation: any;
  }

const Login: React.FC<Props> = ({ navigation }) => {
    const [txtUsername, setTxtUsername] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [accessToken, setAccessToken] = React.useState<any | null>(null);
    const [user, setUser] = React.useState(null);
    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    //   clientId: "208326548212-g9brb9uhdlgldsq8ij2dha9k7lkt19pv.apps.googleusercontent.com",
    //   // iosClientId: "your cliend id goes here!",
    //   androidClientId: "208326548212-854bfkduu8g4dim685gci717e4fclhbl.apps.googleusercontent.com"
    // });
    
    //const dispatch = useDispatch();

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

    // async function signInWithGoogleAsync() {
    //   try {
    //     const result = await Google.logInAsync({
    //       androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    //       iosClientId: 'YOUR_IOS_CLIENT_ID',
    //       scopes: ['profile', 'email'],
    //     });
    
    //     if (result.type === 'success') {
    //       // user signed in
    //       console.log(result.user);
    //     } else {
    //       console.log('Google sign-in cancelled');
    //     }
    //   } catch (e) {
    //     console.log('Google sign-in error', e);
    //   }
    // }

    // React.useEffect(() => {
    //   if(response?.type === "success") {
    //     setAccessToken(response?.authentication?.accessToken);
    //     accessToken && fetchUserInfo();
    //   }
    // }, [response, accessToken])
  
    async function fetchUserInfo() {
      let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const useInfo = await response.json();
      setUser(useInfo);
    }
  
    // const ShowUserInfo = () => {
    //   if(user) {
    //     return(
    //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //         <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
    //         <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
    //         <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
    //       </View>
    //     )
    //   }
    // }
  

  
    
    
    // const handleLogin = async () => {
    //   try {
    //     const userData = await login(txtUsername, txtPassword);
    //     // do something with userData, e.g. store it in AsyncStorage
    //     if (userData.success) {
    //       navigation.navigate('MainApp');
    //     } else {
    //       // handle invalid username or password
    //       alert("Account not Found")
    //     }
    //   } catch (error) {
    //     // handle login error
    //   }
    // };

    // async function login(loginCredentials: LoginCredentials): Promise<void> {
    //   const apiUrl = 'https://ellafroze.com/api/external/doLogin';
    
    //   try {
    //     const response = await axios.post(apiUrl, loginCredentials);
    //     alert('Login successful!');
    //     navigation.navigate('MainApp')
    //     console.log('User data:', response.data);
    //   } catch (error) {
    //     console.error(error);
    //     throw error;
    //   }
    // }
    


      // const handleLogin = async () => {
      //   try {
      //     await login({ txtUsername, txtPassword });
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

      
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
        <TouchableOpacity style={styles.button} >
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