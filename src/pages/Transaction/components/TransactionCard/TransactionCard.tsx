import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';


interface UnpaidTransaction {
    ExpiredDate: string;
    GopayDeepLink: string;
    GrossAmount: number;
    ID: string;
    IsExpired: number;
    IsPaid: number;
    OrderID: string;
    PaymentLogo: string;
    PaymentMethod: number;
    PaymentMethodCategory: string;
    ReferenceID: string;
  }
interface Props{
    unpaidTransactions: UnpaidTransaction[];
    statusLabel: string

}
const TransactionCard = ({unpaidTransactions, statusLabel}: Props) => {
    const navigation = useNavigation();


    const handleNavigate = (itemId: string) => {
        navigation.navigate('TransactionDetail', {itemId})
        // alert(`Button clicked for item ${itemId}`);
      };
  return (
        <ScrollView>
          {unpaidTransactions?.map((item, index)=>(
            <TouchableOpacity
            onPress={()=>handleNavigate(item.ID)}
            key={item.ID}
            style={{
               margin:10, 
               // borderWidth:1, 
               paddingVertical:15,
               backgroundColor: '#fff',
               elevation:3,
               shadowColor: '#000',
               shadowOffset: {
                 width: 0,
                 height: 1,
               },
               shadowOpacity: 0.22,
               shadowRadius: 2.22,
               }} >
            <View key={index}>
              <View style={{backgroundColor:"red", width:100, alignItems:"center", padding:4, borderRadius:10, alignSelf:"flex-end", marginRight:8, marginBottom:8}}>
          <Text style={{color:"white", fontWeight:"bold"}}>{statusLabel}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-evenly",}}>
        <View style={{marginVertical:10, alignItems:"center"}}>
          <View>
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/${item.PaymentLogo}`}} style={{width:35, height:35}}/>
          </View>
          <View>
          <View style={{marginTop:25}}>
            <Text>Jumlah Dibayar</Text>
            <Text style={{fontWeight:"bold"}}>Rp.{
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.GrossAmount)
          }</Text>
          </View>
          </View>
        </View>
{ item.PaymentMethodCategory != 'gopay' && (
  <View style={{marginVertical:10, alignItems:"center"}}>
  <Text style={{fontWeight:"bold"}}>
      Virtual Account
  </Text>
    <View style={{flexDirection:"row"}}>
    <Text>
      {item.ReferenceID}
    </Text>
    <TouchableOpacity onPress={() => Clipboard.setStringAsync(item.ReferenceID)}>
      <Text style={{textDecorationLine:"underline", color:"green"}}>Copy</Text>
    </TouchableOpacity>
    </View>
    <View style={{marginTop:22}}>
          <Text >
            Bayar Sebelum
          </Text>
          <Text style={{fontWeight:"bold"}}>
            {item.ExpiredDate}
          </Text>
          </View>
        </View>
)}
{ item.PaymentMethodCategory == 'gopay' && (
  <View style={{marginVertical:10, alignItems:"center"}}>
    <View style={{marginTop:22}}>
          <Text >
            Bayar Sebelum
          </Text>
          <Text style={{fontWeight:"bold"}}>
            {item.ExpiredDate}
          </Text>
          </View>
        </View>
)}
        
          
        </View>
            </View>
            </TouchableOpacity>

          ))}
          </ScrollView>
        

      
  )
}

export default TransactionCard

const styles = StyleSheet.create({})