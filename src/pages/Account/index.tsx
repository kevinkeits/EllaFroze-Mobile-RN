import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../../App';
import { AccountIcon, AddressIcon, ChatIcon, HistoryIcon } from '../../assets/icons';


export default function Account() {
  const navigation =
    useNavigation();
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
       onPress={()=>{navigation.navigate('AccountAddress')}}
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
