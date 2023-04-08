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
  Discount: number;
  DiscountType: string;
  ImagePath: string;
  Notes: string;
  Price: number;
  Qty: number;
  Selected?: boolean
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

interface Deliveryfee {
  Branch: string;
  Fee: number;
  IsFound: number;
}

interface SaveCart {
  ProductID: string;
  Qty: string;
  Notes?: string;
  Source: string;
  _s:string
}

interface UpdateCart {
  ProductID: string[];
  Qty: string[];
  Notes?: string[];
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
const [deliveryFee, setDeliveryFee] = useState<Deliveryfee>();

const [address, setAddress] = useState<Address[]>([]);
const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
const [showAddressPopup, setShowAddressPopup] = useState(false);
const [loading, setLoading] = useState(true);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [ProductID, setProductID] = useState<string[]>([]);
const [Qty, setQty] = useState<string[]>([]);
const [notes, setNotes] = useState<string>('');
const [_s, setToken] = useState('');
const forceUpdate = React.useReducer((x) => x + 1, 0)[1]


const [totalPrice, setTotalPrice] = useState(0)

const fetchData = async () => {
  const tokenData = await AsyncStorage.getItem('tokenID')
  const url = `https://ellafroze.com/api/external/getCart?_cb=onCompleteFetchCart_new&_p=cartItemWrapper&_s=${tokenData}`;
  const response = await axios.get(url);


  //alert(JSON.stringify(response.data.data))

  const tempData = response.data.data
  let subTotal = 0
  const newList = tempData.map((item : Cart) => {
      const updatedItem = {
        ...item,
        Selected: true
      };
      const finalPrice = item.Price - (item.DiscountType == '1' ? item.Discount : ((item.Price * item.Discount)/100))

    subTotal += finalPrice * item.Qty

      return updatedItem;

    return item
  });
  setCart(newList)
  setTotalPrice(subTotal)
  setLoading(false)

  
}

const fetchAddresses = async (tokenData: string) => {
  const url = `https://ellafroze.com/api/external/getUserAddress?_cb=onCompleteFetchUserAddress&_p=profile-address-wrapper&_s=${tokenData}`;
  const response = await axios.get(url);
  setAddress(response.data.data);
  setLoading(false)
}
const fetchCalculateDelivery = async (tokenData: string) => {
  const url = `https://ellafroze.com/api/external/doCalculateDelivery?_cb=onCompleteFetchCartCalculateDelivery&_p=23400&_s=${tokenData}`;
  const response = await axios.get(url);
  setDeliveryFee(response.data.data[0]);
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
      fetchData()
    }   
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const handleDeleteItem = async (itemCartId: string) => {
  try {    
    await deleteItem({  ProductID: itemCartId, Qty: '0', Notes: '', Source: 'cart', _s });
  } catch (error) {
    console.error(error);
  }
};

const fetchToken = async () => {
  const tokenData = await AsyncStorage.getItem('tokenID')
  setToken(tokenData == null ? "" : tokenData);
  fetchData();
  fetchAddresses(tokenData == null ? "" : tokenData);
  fetchCalculateDelivery(tokenData == null ? "" : tokenData);
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

  const onConfirm = (values?: Cart) => {
    try {
      let subTotal = 0
      const newList = cart.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
            Selected: values.Selected
          };
          return updatedItem;
        }
        return item;
      });

      const newListAll = newList.map((item) => {
        const finalPrice = item.Price - (item.DiscountType == '1' ? item.Discount : ((item.Price * item.Discount)/100))
        subTotal += finalPrice * item.Qty
        return item;
      });
      
      setTotalPrice(subTotal)

      setCart(newList)

      //if (values) await saveCart({  ProductID: values.ProductID, Qty: parseInt(values.Qty ?? '0'), Notes:'', Source:'cart', _s:tokenID });

      //setProducts(newList);
    } catch (err) {
      
    }
  }
  const handleButtonPress =  (values: Cart, type: string) => {
    const postData: Cart = {
      ...values,
      Qty: type == '+' ? parseInt(values.Qty == null ? '1' : (parseInt(values.Qty.toString()) + 1).toString()) : parseInt(values.Qty == null ? '0' : (parseInt(values.Qty.toString()) - 1).toString())
      // groupRoleID: role?.id,
      // merchantID: merchant.map((x) => x.id),
      // isActive: isActive?.id
    }
     onConfirm(postData)
    
  };

  const handleSelect =  (values: Cart) => {
    const postData: Cart = {
      ...values,
      Selected: values.Selected != null ? (values.Selected ? false : true) : true
    }
     onConfirm(postData)
    
  };

   const handlePayment = () => {
    if (selectedAddress){
    setIsDrawerOpen(true)}
    else {
      alert("Alamat belum dipilih")
    }
   }
  



  useEffect(() => {
      
    fetchToken()

    alert(JSON.stringify(cart))
    
    
  }, []);

  return (
    <View style={styles.container}>
      {cart.length != 0 ? 
      (
        <ScrollView>
     
        {/* <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:10, paddingLeft:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", gap:6}}>
        <TouchableOpacity onPress={handlePress}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isSelected ? '#148D2E' : '#C7C7CC',
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
                    backgroundColor: '#148D2E',
                  }}
                />
              )}
            </View>
            <Text style={{fontSize:16, marginLeft:8}}>Pilih Semua</Text>
          </View>
        </TouchableOpacity>  
            </View> */}
      
    

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
        <TouchableOpacity onPress={()=>handleSelect(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: item.Selected ? 'green' : 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {item.Selected && (
             <Icon  
             name="done"
             type="material"
             size={20} color="green" /> 
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
      
      {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
              <View>
                 {item.DiscountType == '0' &&
              <View> 
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
          </View>  }

              {item.DiscountType == '1' &&
              <View> 
                <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
              <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price - item.Discount)
          }</Text>
          </View>  }

          {item.DiscountType == '2' && 
          <View>
            <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
          <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price - ((item.Price * item.Discount)/100))
          }</Text>
          </View>  }
          </View>
            )}               
                
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
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={()=>handleButtonPress(item,'-')}>
                    <Text style={{color:"#148D2E"}}>-</Text>
                </TouchableOpacity>
                {loading ? (<View style={{backgroundColor:"#EAEAEA", width:30, height:20, marginTop:4}}/>):(
                  <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{item.Qty}</Text>
          )}   
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={()=>handleButtonPress(item,'+')}>
                    <Text style={{color:"#148D2E"}}>+</Text>
                </TouchableOpacity>
            </View>
               
            </View>
    </View>
    
    </View>
    <View style={{marginTop:10}}>
    <Text style={{fontSize:15, color:"black"}}>Catatan</Text>
  <TextInput 
        placeholder='tulis catatan disini ...' 
        style={{borderBottomWidth:1, marginTop:10, width:"90%"}}
        value={notes}
        onChangeText={setNotes}
        />
    </View>
            
</View>

))}

<View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={{fontWeight:"bold", fontSize:16}}>Alamat Tujuan</Text>
            <TouchableOpacity style={{ padding: 5, backgroundColor:"#FA0000", borderRadius:7}}>
                <Text style={{fontSize:12, color:"white"}} onPress={openAddressPopup}>Ubah Alamat</Text>
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


<View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7}}>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:340, height:30, marginTop:4}}/>):(
<View style={{flexDirection:"row", justifyContent:"space-between", width:340, marginHorizontal:10}}>
<Text style={{fontSize:16}}> <Text style={{fontWeight:"bold"}}>Total Harga </Text> :  </Text>
<Text style={{fontSize:14, color:"black"}}>Rp. { new Intl.NumberFormat('id-ID', {currency: 'IDR'}).format(totalPrice)}</Text>
</View>
  )}    
  {loading ? (<View style={{backgroundColor:"#EAEAEA", width:340, height:30, marginTop:10}}/>):(
<View style={{flexDirection:"row", justifyContent:"space-between", width:340, marginHorizontal:10, marginTop:6}}>
<Text style={{fontSize:16}}> <Text style={{fontWeight:"bold"}}>Biaya Kirim </Text> :  </Text>
{selectedAddress ? (
  <Text style={{fontSize:14, color:"black"}}>Rp. { new Intl.NumberFormat('id-ID', {currency: 'IDR'}).format(deliveryFee?.Fee ?? 0)}</Text>
) : (
  <Text style={{fontSize:14, color:"black"}}>Rp. 0</Text>

)}</View>
  )} 
  <View style={{borderWidth:0.5, marginHorizontal:2, marginVertical:10}}/>
  {loading ? (<View style={{backgroundColor:"#EAEAEA", width:340, height:30, marginTop:5}}/>):(
<View style={{flexDirection:"row", justifyContent:"space-between", width:340, marginHorizontal:10, marginTop:6}}>
<Text style={{fontSize:16}}> <Text style={{fontWeight:"bold"}}>Total Bayar </Text> :  </Text>
{selectedAddress ? (
    <Text style={{fontSize:14, color:"black"}}>Rp. { new Intl.NumberFormat('id-ID', {currency: 'IDR'}).format(totalPrice - deliveryFee?.Fee)}</Text>
):<Text></Text>}
</View>
  )} 
 </View>
 
        {/* <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  Store Cibubur</Text>
            <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity>
        </View> */}
       
            <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, marginBottom:25, width:370, borderRadius:7}} onPress={handlePayment}>
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
</ScrollView>
      ): (
      <View style={{top:150}}>
        <Icon
                  name="shopping-cart"
                  type="material"
                  size={45}
                  color="#FA0000"
                />
        <Text style={{color:"#FA0000", marginTop:10}}>Keranjang Belanja Anda kosong</Text>
      </View>
      )}
     
        
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
