import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';
import { RootStackParams } from '../../../App';
import { BCALogo, SuccessImage } from '../../assets';
import { AccountIcon, AddressIcon, ChatIcon, HistoryIcon } from '../../assets/icons';
import * as Clipboard from 'expo-clipboard';



export default function Payment() {
  const navigation =
    useNavigation();




const textToCopy: string = 'Hello World!';



// const copyToClipboard = (): void => {
//   Clipboard.setString(textToCopy);
//   alert('Text copied to clipboard');
// };

const [stPayExpDate, setPayExpDate] = useState('');
const [stPayDL, setPayDL] = useState('');
const [stPayAmount, setPayAmount] = useState('');
const [stPayMethodDesc, setPayMethodDesc] = useState('');
const [stPayMethodCat, setPayMethodCat] = useState('');
const [stPayMethodLogo, setPayMethodLogo] = useState('');
const [stPayRefID, setPayRefID] = useState('');

const fetchToken = async () => {
  const payExpDate = await AsyncStorage.getItem('payExpDate')
  const payDL = await AsyncStorage.getItem('payDL')
  const payAmount = await AsyncStorage.getItem('payAmount')
  const payMethodDesc = await AsyncStorage.getItem('payMethodDesc')
  const payMethodCat = await AsyncStorage.getItem('payMethodCat')
  const payMethodLogo = await AsyncStorage.getItem('payMethodLogo')
  const payRefID = await AsyncStorage.getItem('payRefID')

  // alert(payExpDate)
  // alert(payDL)
  // alert(payAmount)
  // alert(payMethodDesc)
  // alert(payMethodCat)
  // alert(payMethodLogo)
  // alert(payRefID)

  setPayExpDate(payExpDate == null ? "" : payExpDate)
  setPayDL(payDL == null ? "" : payDL)
  setPayAmount(payAmount == null ? "" : payAmount)
  setPayMethodDesc(payMethodDesc == null ? "" : payMethodDesc)
  setPayMethodCat(payMethodCat == null ? "" : payMethodCat)
  setPayMethodLogo(payMethodLogo == null ? "" : payMethodLogo)
  setPayRefID(payRefID == null ? "" : payRefID)
};

const handleCopyToClipboard = () => {
  Clipboard.setStringAsync(stPayRefID);
  alert("Copied")
};

useEffect(() => {
      
  fetchToken()

  //alert(JSON.stringify(cart))
  
  
}, []);

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
            <Text style={{fontWeight:"bold"}}>{stPayExpDate}</Text>
        </View>

        <View style={{marginTop:20, marginHorizontal:15, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={{fontWeight:"bold"}}>{stPayMethodDesc}</Text>
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/${stPayMethodLogo}`}} style={{width:50, height:50}}/>
        </View>

        { stPayMethodCat != 'gopay' && (
          <View style={{marginTop:20, marginLeft:15}}>
              <Text>Nomor Virtual Account</Text>
              <View style={{flexDirection:"row", gap:8}}>
                  <Text style={{fontWeight:"bold"}}>{stPayRefID}</Text>
                  <TouchableOpacity onPress={handleCopyToClipboard}>
                <Text style={{color:"green"}}>Copy</Text>
              </TouchableOpacity>
              </View>
          </View>
        )  }
          
        

        <View style={{marginTop:30, marginLeft:15}}>
            <Text>Total Pembayaran</Text>
            <Text style={{fontWeight:"bold"}}>Rp.  {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(parseInt(stPayAmount))
             }</Text>
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
