import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, Modal, FlatList } from 'react-native';
import { BCALogo, DetailProduct1, GopayLogo } from '../../assets';
import { CartIcon, LocationIcon, MessageIcon } from '../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-elements/dist/icons/Icon';





interface Cart {
  ProductID: string;
  Product: string;
  Branch: string;
  BranchID: string;
  Discount: string;
  DiscountType: string;
  ImagePath: string;
  Notes: string;
  Price: number;
  Qty: number;
}

interface Address {
  ID:string
  Name: string
  Phone: string
  StateID: string
  StateName: string
  CityID: string
  CityName: string
  DistrictID: string
  DistrictName: string
  PostalCode: string
  Address: string
  IsDefault?: number
 }

 interface PaymentMethod {
  Category: string;
  ID: string;
  ImagePath: string;
}

interface SaveCart {
  ProductID: string;
  Qty: string;
  Notes?: string;
  Source: string;
  _s:string
}

const Cart = () => {
  const navigation = useNavigation()
const [count, setCount] = useState(0);
const [isSelected, setSelection] = useState(false);
const [selectedPayment, setSelectedPayment] = useState(false);
const [selectedBCA, setSelectedBCA] = useState(false);
const [cart, setCart] = useState<Cart[]>([]);
const [address, setAddress] = useState<Address[]>([]);
const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
const [showAddressPopup, setShowAddressPopup] = useState(false);
const [loading, setLoading] = useState(true);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [ProductID, setProductID] = useState('');
const [Qty, setQty] = useState('');
const [Notes, setNotes] = useState('');
const [Source, setSource] = useState('');
const [_s, setToken] = useState('');

const fetchData = async (token: string) => {
  const url = `https://ellafroze.com/api/external/getCart?_cb=onCompleteFetchCart_new&_p=cartItemWrapper&_s=${token}`;
  const response = await axios.get(url);

  alert(JSON.stringify(response.data.data))
  setCart(response.data.data);
  setLoading(false)
}

const fetchAddresses = async (tokenData: string) => {
  const url = `https://ellafroze.com/api/external/getUserAddress?_cb=onCompleteFetchUserAddress&_p=profile-address-wrapper&_s=${tokenData}`;
  const response = await axios.get(url);
  setAddress(response.data.data);
  setLoading(false)
}

const fetchPaymentMethod = async (token: string) => {
  const url = `https://ellafroze.com/api/external/getPaymentMethod?_cb=onCompleteFetchPaymentMethod&_p=&_s=${token}`;
  const response = await axios.get(url);
  setPaymentMethod(response.data.data);
  setLoading(false)
}

async function deleteItem(cartInput: SaveCart): Promise<void> {
  const apiUrl = 'https://ellafroze.com/api/external/doSaveCart';

  try {
     const response = await axios.post(apiUrl, cartInput);
     
     if (!response.data.status){
      alert(response.data.message);
     } else {
      alert('SUCCESS')
      // else  navigation.navigate("Cart")
    }   
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const handleDeleteItem = async (itemCartId: string) => {
  try {
    setProductID(itemCartId)
    await deleteItem({  ProductID, Qty, Notes, Source, _s });
    
  } catch (error) {
    console.error(error);
  }
};

const fetchToken = async () => {
  const tokenData = await AsyncStorage.getItem('tokenID')
  setToken(tokenData == null ? "" : tokenData);
  setNotes("undefined")
  setQty("undefined")
  setSource("cart")
  fetchData(tokenData == null ? "" : tokenData);
  fetchAddresses(tokenData == null ? "" : tokenData);
  fetchPaymentMethod(tokenData == null ? "" : tokenData);
  
};

const handleSelectAddress = (address: Address) => {
  setSelectedAddress(address);
  setShowAddressPopup(false);
};

const openAddressPopup = async () => {
  // const addresses = await fetchAddresses(tokenData);
  // setAddress(addresses);
  setShowAddressPopup(true);
};

  const incrementCount = () => {
    setCount(count + 1);
  };

  // const decrementCount = () => {
  //   setCount(count - 1);
  // };

  const decrementCount = () => {
    const newCount = count - 1 >= 0 ? count - 1 : 0;
    setCount(newCount);
  };


  const handlePress = () => {
    setSelection(!isSelected);
  };

  const handleSelectBCA = () =>{
    setSelectedBCA(!selectedBCA);
  }

  const handleSelectPayment = (id:string) =>{
    setSelectedPayment(true)
  }



  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  return (
    <View style={styles.container}>
     
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:10, paddingLeft:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", gap:6}}>
        <TouchableOpacity onPress={handlePress}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isSelected ? '#007AFF' : '#C7C7CC',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isSelected && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#007AFF',
                  }}
                />
              )}
            </View>
            <Text style={{fontSize:16, marginLeft:8}}>Pilih Semua</Text>
          </View>
        </TouchableOpacity>  
            </View>
      
    

  {cart?.map((item)=>(   
<View 
  key={item.ProductID}
  style={{
    backgroundColor:"rgba(20, 141, 46, 0.1);", 
    paddingVertical:12, 
    paddingHorizontal:10, 
    marginTop:7, 
    width:370, 
    borderRadius:7}}>
        <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: isSelected ? '#007AFF' : '#C7C7CC',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSelected && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#007AFF',
              }}
            />
          )}
        </View>
        <Text style={{fontSize:16, marginLeft:8}}>Pilih Produk</Text>
      </View>
    </TouchableOpacity>

    <View style={{flexDirection:"row", gap:2, justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:"white", padding:4}}>
              {loading ? (<View style={{backgroundColor:"#EAEAEA", width:100, height:120}}/>) : (
               <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:100, height:120}} />
              )}
        </View>
    <View style={{backgroundColor:"white", borderRadius:6, width:"60%", padding:6,  marginTop:8}}>
      {loading ? (<View style={{backgroundColor:"#EAEAEA", width:150, height:20, marginTop:4}}/>):(
          <Text style={{fontWeight:"bold", marginHorizontal:4,}}>{item.Product}</Text>
      )}   
      {loading ? (<View style={{backgroundColor:"#EAEAEA", width:60, height:15, marginTop:4}}/>):(
        <Text style={{marginTop:4, marginHorizontal:4, fontSize:12}}>Rp. 
                {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price)
          }
                </Text>      )}                
                
                {/* <Text style={{marginTop:4, marginHorizontal:4, fontSize:12}}>Rp. 
                {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price * item.Qty)
          }
                </Text> */}

{loading ? (<View style={{backgroundColor:"#EAEAEA", width:60, height:15, marginTop:4}}/>):(
         <View style={{flexDirection:"row", alignItems:"center"}}>
         <Icon  
             name="map-marker-outline"
             type="material-community"
             size={15} color="black" /> 
         <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>{item.Branch}</Text>
         </View>    
          )}    
               
                <Text style={{marginTop:4, marginHorizontal:4, fontSize:10}}>{item.Notes}</Text>
        <View style={{flexDirection:"row",gap:5, marginHorizontal:4}}>
        <TouchableOpacity
        onPress={()=>handleDeleteItem(item.ProductID)}
                style={{
                  backgroundColor:"#background: rgba(20, 141, 46, 0.1);", 
                  alignItems:"center",
                 justifyContent:"center",
                  padding:5, 
                  borderRadius:6}}
                >
                  <Icon  
                  name="delete"
                  type="material-community"
                  size={15}
                  color="black" /> 
                </TouchableOpacity>
            <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
                    <Text style={{color:"#148D2E"}}>-</Text>
                </TouchableOpacity>
                {loading ? (<View style={{backgroundColor:"#EAEAEA", width:30, height:20, marginTop:4}}/>):(
                  <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{item.Qty}</Text>
          )}   
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
                    <Text style={{color:"#148D2E"}}>+</Text>
                </TouchableOpacity>
            </View>
               
            </View>
    </View>
    </View>
            
</View>

))}

        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:340, height:30, marginTop:4}}/>):(
<View style={{flexDirection:"row", justifyContent:"space-between", width:340, marginHorizontal:10}}>
<Text style={{fontSize:16}}> <Text style={{fontWeight:"bold"}}>Total Harga </Text> :  </Text>
<Text style={{fontSize:16, color:"black"}}>Rp. 100.000</Text>
</View>   

  )}   
            
        
        </View>
        {/* <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  Store Cibubur</Text>
            <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity>
        </View> */}
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={{fontWeight:"bold"}}>Alamat Tujuan</Text>
            <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}} onPress={openAddressPopup}>Ubah</Text>
            </TouchableOpacity>
        </View>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:200, height:30, marginTop:4}}/>):(
          <View style={{marginTop:4}}>
        <Text>{selectedAddress ? selectedAddress.Name : 'Please select an address'}</Text>
        {selectedAddress && (
          <>
            <Text>{selectedAddress.Address}</Text>
            <Text>{selectedAddress.DistrictName}, {selectedAddress.CityName}, {selectedAddress.StateName} {selectedAddress.PostalCode}</Text>
          </>
        )}
      </View>         
  )}   
        
        </View>
            <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, width:370, borderRadius:7}} onPress={() => setIsDrawerOpen(true)}>
                <Text style={{color:"white", fontWeight:"bold"}}>LANJUT KE PEMBAYARAN</Text>
            </TouchableOpacity>


{/* POPUP ALAMAT */}
  <Drawer
  isVisible={showAddressPopup}
  swipeDirection="left"
  onSwipeComplete={() => setIsDrawerOpen(false)}
  style={{}}
>
  <View style={{backgroundColor:"white", padding:10}}>
  <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:8}}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>Pilih Alamat</Text>
      <TouchableOpacity onPress={() => setShowAddressPopup(false)}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>X</Text>
      </TouchableOpacity>
    </View>
  <FlatList
          data={address}
          keyExtractor={item => item.ID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => handleSelectAddress(item)}
            style={{
              marginVertical:7, 
              marginHorizontal:8, 
              padding:15, 
              borderRadius:8,
              backgroundColor: '#fff',
              elevation:3,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              }}
            >
              <Text style={{fontWeight:"bold"}}>{item.Name}</Text>
              <Text>{item.Address}</Text>
              <Text>{item.CityName}, {item.StateName} {item.PostalCode}</Text>
            </TouchableOpacity>
          )}
        />
  </View>
</Drawer>

{/* PAYMENT POPUP */}
<Drawer
  isVisible={isDrawerOpen}
  swipeDirection="left"
  onSwipeComplete={() => setIsDrawerOpen(false)}
  style={{}}
>
  <View style={{backgroundColor:"white", padding:10}}>
    <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:12, borderBottomWidth:2}}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>Pilih Metode Pembayaran</Text>
      <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>X</Text>
      </TouchableOpacity>
    </View>
    <View style={{marginTop:7}}>

      {paymentMethod?.map((item)=>(
    <View
    key={item.ID} 
    style={{paddingVertical:2, borderBottomWidth:1, borderRadius:8}}>
       <TouchableOpacity onPress={()=>handleSelectPayment(item.ID)}style={{paddingLeft:12}}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedBCA ? '#007AFF' : '#C7C7CC',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedBCA && (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#007AFF',
              }}
            />
          )}
        </View>
      <View style={{marginLeft:15}}>
        <Image source={{ uri: `https://ellafroze.com/api/uploaded/${item.ImagePath}`}} style={{width:50, height:50}}/>
      </View>
        <Text style={{fontSize:14, marginLeft:8, fontWeight:"bold"}}>{item.ID.split("|")[1]}</Text>
      </View>
    </TouchableOpacity>
      </View>

))}

     

      <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, width:"100%", borderRadius:7}} onPress={()=>
      {
        navigation.navigate('Payment')
        setIsDrawerOpen(false)
        }}>
                <Text style={{color:"white", fontWeight:"bold"}}>LANJUTKAN</Text>
            </TouchableOpacity>
    </View>
  </View>
</Drawer>
        
    </View>
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

export default Cart;
