import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { RootStackParams } from '../../../App';
import { BCALogo, SuccessImage } from '../../assets';
import { AccountIcon, AddressIcon, ChatIcon, HistoryIcon } from '../../assets/icons';


export default function Payment() {
  const navigation =
    useNavigation();




const textToCopy: string = 'Hello World!';

const copyToClipboard = (): void => {
  Clipboard.setString(textToCopy);
  alert('Text copied to clipboard');
};

  return (
      
    <View style={styles.container}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <Image source={SuccessImage} style={{width:80, height:80}} />
            <Text style={{marginTop:15, fontWeight:"bold"}}>Pesanan berhasil dibuat</Text>
            <Text>Mohon selesaikan pembayaran</Text>
        </View>

        <View style={{borderWidth:4, marginTop:25, borderColor:"gray"}} />

        <View style={{marginTop:25, marginLeft:15}}>
            <Text>Batas Akhir Pembayaran</Text>
            <Text style={{fontWeight:"bold"}}>2023-03-14 10:46:53</Text>
        </View>

        <View style={{marginTop:20, marginHorizontal:15, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={{fontWeight:"bold"}}>BCA Virtual Account</Text>
            <Image source={BCALogo} style={{width:50, height:50}}/>
        </View>

        <View style={{marginTop:20, marginLeft:15}}>
            <Text>Nomor Virtual Account</Text>
            <View style={{flexDirection:"row"}}>
            <Text style={{fontWeight:"bold"}}>3333982177123</Text>
            <TouchableOpacity onPress={copyToClipboard}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
            </View>
         
        </View>

        <View style={{marginTop:30, marginLeft:15}}>
            <Text>Total Pembayaran</Text>
            <Text style={{fontWeight:"bold"}}>Rp. 76000</Text>
        </View>

        <View style={{borderWidth:4, marginTop:25, borderColor:"gray"}} />

        <View style={{alignItems:"center", justifyContent:"center", marginTop:20, marginHorizontal:5}}>
            <Text style={{textAlign:"center"}}>
                Pesananmu baru diteruskan ke penjual setelah pembayaran terverifikasi
            </Text>
            <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, width:"94%", borderRadius:7}} onPress={()=>{navigation.navigate('Home')}}>
                <Text style={{color:"white", fontWeight:"bold"}}>BELANJA LAGI</Text>
            </TouchableOpacity>
        </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
   paddingTop:80
  },
});
