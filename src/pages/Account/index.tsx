import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../../App';
import { AccountIcon, AddressIcon, ChatIcon, HistoryIcon } from '../../assets/icons';
import axios from 'axios';
import { useState } from 'react';

const API_BASE_URL = 'https://ellafroze.com/api/external/doLogout'; // replace with your API base URL

interface LogoutResponse {
  success: boolean;
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axios.post<LogoutResponse>(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to logout');
  }
};




export default function Account() {
  const navigation =
    useNavigation();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      alert("logged out")
      navigation.navigate("Login")
      // handle successful logout
    } catch (error) {
      // handle error
    } finally {
      setIsLoggingOut(false);
    }
  };


    // const handleLogout = async () => {
    //   const success = await logout(accessToken);
    
    //   if (success) {
    //     // Redirect the user to the login screen or perform other post-logout actions
    //   } else {
    //     // Display an error message or retry the logout
    //   }
    // };
  return (
      
    <View style={{marginHorizontal:10, marginVertical:15}}>
      <Text style={{marginBottom:10, fontWeight:"bold", fontSize:15}}>Pengaturan Akun</Text>
      <View style={{backgroundColor:"#148D2E", marginHorizontal:10, borderRadius:10}}>
        <TouchableOpacity style={{flexDirection:"row", gap:10, paddingVertical:15, marginLeft:30}}
       onPress={()=>{navigation.navigate('AccountDetail')}}
       >
          <AccountIcon/>
          <Text style={{fontWeight:"700"}}>Data Diri</Text>
        </TouchableOpacity>

      </View>
      <View style={{backgroundColor:"#148D2E", marginHorizontal:10, marginTop:10, borderRadius:10}}>
        <TouchableOpacity style={{flexDirection:"row", gap:10, paddingVertical:15, marginLeft:30}}
       onPress={()=>{navigation.navigate('Transaction')}}
       >
          <HistoryIcon/>
          <Text style={{fontWeight:"700"}}>Riwayat Pesanan</Text>
        </TouchableOpacity>

      </View>
      <View style={{backgroundColor:"#148D2E", marginHorizontal:10, marginTop:10, borderRadius:10}}>
        <TouchableOpacity style={{flexDirection:"row", gap:10, paddingVertical:15, marginLeft:30}}
       onPress={()=>{navigation.navigate('Contact')}}
       >
          <ChatIcon/>
          <Text style={{fontWeight:"700"}}>Hubungi Admin</Text>
        </TouchableOpacity>

      </View>
      <View style={{backgroundColor:"#148D2E", marginHorizontal:10, marginVertical:10, borderRadius:10}}>
        <TouchableOpacity style={{flexDirection:"row", gap:10, paddingVertical:15, marginLeft:30}}
       onPress={()=>{navigation.navigate('AccountAddress')}}
       >
          <AddressIcon/>
          <Text style={{fontWeight:"700"}}>Ubah Alamat</Text>
        </TouchableOpacity>

      </View>
      <View style={{backgroundColor:"#148D2E", marginHorizontal:10, borderRadius:10}}>
        <TouchableOpacity style={{flexDirection:"row", gap:10, paddingVertical:15, marginLeft:30}}
       onPress={handleLogout} disabled={isLoggingOut}
       >
          <AccountIcon/>
          <Text style={{fontWeight:"700"}}>Logout</Text>
        </TouchableOpacity>

      </View>
      {/* <Button title='Account Detail' onPress={()=>{navigation.navigate('AccountDetail')}}/>
      <Button title='Account Address' onPress={()=>{navigation.navigate('AccountAddress')}}/> */}
      
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
