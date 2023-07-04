import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image'


interface PaidTransaction {
    CreatedDate: string;
    Branch: string;
    GrossAmount: number;
    ID: string;
    ImagePath: string;
    Status: number;
    Product: string;
    TotalItem: number;
  }
interface Props{
   Transactions: PaidTransaction[];
   statusLabel: string
}
const PaidTransactionCard = ({Transactions, statusLabel}: Props) => {
    const navigation = useNavigation()

    const handleNavigate = (itemId: string) => {
        navigation.navigate('TransactionDetail', {itemId})
        // alert(`Button clicked for item ${itemId}`);
      };

  return (
    <ScrollView>
          {Transactions?.map((item, index)=>(
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
        <View style={{flexDirection:"row", marginLeft:20}}>
        <View style={{marginVertical:10, alignItems:"center"}}>
          <View>
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:55, height:55}}/>
          </View>
          <View>
          <View style={{marginTop:10}}>
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

        <View style={{marginVertical:10}}>
        <Text style={{fontWeight:"bold", fontSize:16}}>
            {item.Product}
        </Text>
          <View style={{flexDirection:"row"}}>
          <Text style={{color:"grey"}}>
           {item.TotalItem > 1 ? `+ ${item.TotalItem - 1} barang lainya` : `${item.TotalItem} barang`}
          </Text>
          </View>
        </View>
        </View>
            </View>
</TouchableOpacity>
          ))}
        

      
      </ScrollView>
  )
}

export default PaidTransactionCard

const styles = StyleSheet.create({})