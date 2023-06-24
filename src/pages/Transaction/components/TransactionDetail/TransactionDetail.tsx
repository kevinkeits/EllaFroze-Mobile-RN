import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, ScrollView, FlatList } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import FastImage from 'react-native-fast-image'
// import { Image } from 'expo-image'




interface TransactionDetail {
ID:string;
orderData: orderData[];
paymentData: paymentData;
}

interface orderData {
    ID: string;
    Branch: string;
    BranchID: string;
    CancelledReason?: string;
    DeliveryFee: number;
    Discount: number;
    ImagePath: string;
    ItemPrice: number;
    Notes: string;
    OrderNumber: string;
    Product: string;
    Qty: number;
    ShippingDate: string;
    ShippingMethod: string;
    SourcePrice: number;
    Status: number;
    SubDiscount: number;
    SubTotal: number;
    Tracking: string;
  }

interface paymentData {
  ID: string;
  Address: string;
  CityName: string;
  CreatedDate: string;
  DistrictName: string;
  GrossAmount: number;
  ImagePath: string;
  Name: string;
  PaidDate: string;
  PaymentMethod: string;
  PaymentMethodCategory: string;
  Phone: string;
  PostalCode: string;
  StateName: string;
}

interface SaveCart {
  ProductID: string;
  Qty: number;
  Notes?: string;
  Source: string;
  _s:string
}

interface ImagePath {
  ID: string;
  ImagePath: string;
}

type DetailScreenProps = {
  route: { params: { itemId: string } };
};

const TransactionDetail = ({ route }: DetailScreenProps) => {
  const { itemId } = route.params;

    const navigation = useNavigation();
    const [detail, setDetail] = useState<TransactionDetail>();
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [subdiscount, setSubdiscount] = useState(0);
    const [_s, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    const [openInvoice, setOpenInvoice] = useState(false);



    const total = (parseInt((detail?.orderData[0]?.SubTotal ?? 0).toString()) + parseInt((detail?.orderData[0]?.DeliveryFee ?? 0).toString()) - parseInt((detail?.orderData[0]?.SubDiscount ?? 0).toString()));

    const formattedTotal = new Intl.NumberFormat('id-ID', {
      // style: 'currency',
      currency: 'IDR'
    }).format(total);
    const formattedSubtotal = new Intl.NumberFormat('id-ID', {
      // style: 'currency',
      currency: 'IDR'
    }).format(detail?.orderData[0]?.SubTotal ?? 0);

    const formattedDeliveryFee = new Intl.NumberFormat('id-ID', {
      // style: 'currency',
      currency: 'IDR'
    }).format(detail?.orderData[0]?.DeliveryFee ?? 0);

    const formattedSubDiscount = new Intl.NumberFormat('id-ID', {
      // style: 'currency',
      currency: 'IDR'
    }).format(detail?.orderData[0]?.SubDiscount ?? 0);

  

    const url = `https://ellafroze.com/api/invoice?i=${itemId}`;

    const openWebBrowserAsync = async () => {
      let result = await WebBrowser.openBrowserAsync(url);
      // console.log(result);

      //setOpenInvoice(true)
    };


    const fetchDataDetail = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getTransactionDetail?_cb=onCompleteFetchTransactionDetail&ID=${itemId}&_p=transactionDetailOrderList&_s=${token}`;
      const response = await axios.get(url);
      setDetail(response.data.data);
      setLoading(false)
    }


    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      setToken(tokenData == null ? "" : tokenData);
      fetchDataDetail(tokenData == null ? "" : tokenData);
    };

    const handleNavigateContact  = async (itemId: string, branchName: string) => {
        await AsyncStorage.setItem('branchName', branchName)
        navigation.navigate('ChatRoom', {itemId})

        // alert(`Button clicked for item ${itemId}`);
      };



  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  



  return (
        <ScrollView>
          {openInvoice && (
            <WebView
              style={styles.container}
              source={{ uri: 'https://ellafroze.com/api/invoice?i=' + itemId }}
            />
          )}
          

    <View style={styles.container}>
    <View style={{
         width:"95%",
         marginTop:5,
        marginBottom:5, 
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
      
        <View style={{marginHorizontal:8}}>
          
          <View style={{marginBottom:20,alignSelf:"flex-end"}}>
            <Text style={{fontWeight:"bold"}}> {detail?.ID.replace(/%/g, "/")}</Text>
          </View>
          {detail?.orderData[0].Status != 1 && (
               <TouchableOpacity
               onPress={openWebBrowserAsync} 
               style={{
                elevation:3,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                backgroundColor:"#148D2E", width:100, alignItems:"center", padding:4, borderRadius:10, alignSelf:"flex-end", marginRight:8, marginBottom:20}}>
               <Text style={{color:"white", fontWeight:"bold"}}>Lihat Invoice</Text>
             </TouchableOpacity>
            )}
       
                <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:30}}>
                    <Text style={{fontWeight:"bold"}}>Tanggal Pesanan</Text>
                    <Text> {detail?.paymentData.CreatedDate}</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
                    <Text style={{fontWeight:"bold"}}>Tanggal Pembayaran</Text>
                    <Text> {detail?.paymentData.PaidDate ?? "-"}</Text>
                    </View>
                </View> 
                </View>
      </View>    
      
        <View style={{
            width:"95%",
            marginBottom:5,
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
                <View style={{marginHorizontal:8}}>
                <Text style={{fontWeight:"bold", marginBottom:15}}>Alamat Pengiriman</Text>
                <Text>{detail?.paymentData.Name}</Text>
                <Text>{detail?.paymentData.Phone}</Text>
                <Text>{detail?.paymentData.StateName}, {detail?.paymentData.CityName}, {detail?.paymentData.DistrictName}</Text>
                <Text>{detail?.paymentData.Address}</Text>
                <Text>{detail?.paymentData.PostalCode}</Text>
                </View>
          </View> 
     
      {detail?.orderData?.map((order)=>(
        <View 
        key={order.ID + order.Product}
        style={{
            width:"95%",
            marginBottom:5, 
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
                <View style={{marginRight:8, marginLeft:15, marginTop:10}}>
               <View style={{flexDirection:"row", gap:10, marginBottom:20}}>
                <View>
                {/* <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${order.ImagePath}`}} style={{width:55, height:55}}/> */}
                <FastImage
                  style={{ width: 55, height: 55 }}
                  source={{
                      uri: `https://ellafroze.com/api/uploaded/product/${order.ImagePath}`,
                      priority: FastImage.priority.normal,
                  }}
                  // resizeMode={FastImage.resizeMode.contain}
              />
                </View>
                <View>
                    <Text style={{fontSize:15, fontWeight:"bold", width:"90%", marginBottom:10}}>{order.Product}</Text>
                   
                    <Text style={{marginBottom:10}}>{order.Qty} x <Text style={{textDecorationLine:"line-through", color:"gray"}}>Rp. {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(order.SourcePrice)
             }
             </Text> Rp. {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(order.ItemPrice)
             }  </Text>
                    <Text>Store {order.Branch}</Text>
                </View>
               </View>
               <View style={{marginBottom:20, flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{fontWeight:"bold"}}>Kurir Pengiriman</Text>
                <Text>{order.ShippingMethod ?? "-"}</Text>
               </View>
               <View style={{marginBottom:15, flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{fontWeight:"bold"}}>No. Resi</Text>
                <Text>{order.Tracking ?? "-"}</Text>
               </View>
               <TouchableOpacity 
               onPress={()=>handleNavigateContact(order.BranchID, order.Branch)}
               style={{backgroundColor:"#148D2E", alignItems:"center", padding:8, borderRadius:10, alignSelf:"flex-end", marginRight:8, marginBottom:8 }}>
                    <Text style={{color:"white", fontWeight:"bold"}}>Hubungi Penjual</Text>
                </TouchableOpacity>
                </View>
          </View> 
      ))}   
         
                 <View style={{
                    width:"95%",
                    marginBottom:5, 
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
                        <View style={{marginHorizontal:15}}>
                       <Text style={{fontWeight:"bold", fontSize:15, marginBottom:20}}>Rincian Pembayaran</Text>
                       
                       <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
                        <Text>Metode Pembayaran</Text>
                        <Text>{detail?.paymentData.PaymentMethod.split("|")[1]}</Text>
                       </View>
                <View>
               <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
                <Text>SubTotal</Text>
                <Text>Rp. {formattedSubtotal}</Text>
               </View>
               <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
               <Text>Ongkos Kirim</Text>
               <Text>Rp. {formattedDeliveryFee} </Text>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
               <Text>Diskon total</Text>
               <Text>- Rp. {formattedSubDiscount}</Text>
              </View>
             
              </View>
               <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:20}}>
               <Text style={{fontWeight:"bold"}}>Total</Text>
               {/* <Text>{(order.SubTotal + order.DeliveryFee) - order.SubDiscount}</Text> */}
               <Text>Rp. {formattedTotal}</Text>
              </View>
                </View>
          </View> 
                
                
     
    </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    height:'10%',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchBar: {
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    width: '70%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TransactionDetail;
