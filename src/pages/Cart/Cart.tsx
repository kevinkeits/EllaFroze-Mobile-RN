import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, Modal } from 'react-native';
import { BCALogo, DetailProduct1, GopayLogo } from '../../assets';
import { CartIcon, LocationIcon, MessageIcon } from '../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';





const Cart = () => {
  const navigation = useNavigation()
const [count, setCount] = useState(0);
const [isSelected, setSelection] = useState(false);
const [selectedGopay, setSelectedGopay] = useState(false);
const [selectedBCA, setSelectedBCA] = useState(false);


const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const handlePress = () => {
    setSelection(!isSelected);
  };

  const handleSelectBCA = () =>{
    setSelectedGopay(false);
    setSelectedBCA(!selectedBCA);
  }

  const handleSelectGopay = () =>{
    setSelectedGopay(!selectedGopay);
    setSelectedBCA(false);
  }

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
<View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:7, width:370, borderRadius:7}}>
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
        <Text style={{fontSize:16, marginLeft:8}}>Produk Satu</Text>
      </View>
    </TouchableOpacity>

    <View style={{flexDirection:"row", gap:2, justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:"white", padding:4}}>
            <Image source={DetailProduct1} style={{width:115, height:106}}/>
        </View>
    <View style={{backgroundColor:"white", borderRadius:6, paddingVertical:12, marginTop:8}}>
                <Text style={{fontWeight:"bold", marginHorizontal:4,}}>Nama Produk</Text>
                <Text style={{marginTop:4,marginHorizontal:4,}}>Detail :</Text>
                <Text style={{marginTop:4, marginHorizontal:4, fontSize:10}}>Berat : 500 gr</Text>
                <Text style={{marginTop:4, marginHorizontal:4, fontSize:10}}>Bahan Baku : Daging Merah Ikan Tenggiri Giling</Text>
        <View style={{flexDirection:"row", marginHorizontal:4}}>
            <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
                    <Text style={{color:"#148D2E"}}>-</Text>
                </TouchableOpacity>
                <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{count}</Text>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
                    <Text style={{color:"#148D2E"}}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
    </View>
    </View>
            
</View>

{/* PRODUK 2 */}
<View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:7, width:370, borderRadius:7}}>
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
        <Text style={{fontSize:16, marginLeft:8}}>Produk Dua</Text>
      </View>
    </TouchableOpacity>

    <View style={{flexDirection:"row", gap:2, justifyContent:"center", alignItems:"center"}}>
        <View style={{backgroundColor:"white", padding:4}}>
            <Image source={DetailProduct1} style={{width:115, height:106}}/>
        </View>
    <View style={{backgroundColor:"white", borderRadius:6, paddingVertical:12, marginTop:8}}>
                <Text style={{fontWeight:"bold", marginHorizontal:4,}}>Nama Produk</Text>
                <Text style={{marginTop:4,marginHorizontal:4,}}>Detail :</Text>
                <Text style={{marginTop:4, marginHorizontal:4, fontSize:10}}>Berat : 500 gr</Text>
                <Text style={{marginTop:4, marginHorizontal:4, fontSize:10}}>Bahan Baku : Daging Merah Ikan Tenggiri Giling</Text>
        <View style={{flexDirection:"row", marginHorizontal:4}}>
            <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
                    <Text style={{color:"#148D2E"}}>-</Text>
                </TouchableOpacity>
                <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{count}</Text>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
                    <Text style={{color:"#148D2E"}}>+</Text>
                </TouchableOpacity>
                </View>
            </View>
    </View>
    </View>
            
</View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:16}}> <Text style={{fontWeight:"bold"}}>Total Harga </Text> :  </Text>
            
            <Text style={{fontSize:16, color:"black"}}>Rp. 100.000</Text>
        
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  Store Cibubur</Text>
            <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:10, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Alamat </Text> :  Rumah</Text>
            <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity>
        </View>
        
            <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, width:370, borderRadius:7}} onPress={() => setIsDrawerOpen(true)}>
                <Text style={{color:"white", fontWeight:"bold"}}>LANJUT KE PEMBAYARAN</Text>
            </TouchableOpacity>

<Drawer
  isVisible={isDrawerOpen}
  swipeDirection="left"
  onSwipeComplete={() => setIsDrawerOpen(false)}
  style={{}}
>
  <View style={{backgroundColor:"white", padding:10}}>
    <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:12, borderBottomWidth:2}}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>Payment Method</Text>
      <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
      <Text style={{fontSize:16, fontWeight:"bold"}}>X</Text>
      </TouchableOpacity>
    </View>
    <View style={{marginTop:7}}>
    <View style={{paddingVertical:2, borderBottomWidth:1, borderRadius:8}}>
       <TouchableOpacity onPress={handleSelectBCA}style={{paddingLeft:12}}>
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
        <Image source={BCALogo} style={{width:50, height:50}}/>
      </View>
        <Text style={{fontSize:16, marginLeft:8, fontWeight:"bold"}}>BCA Virtual Account</Text>
      </View>
    </TouchableOpacity>
      </View>

      <View style={{paddingVertical:2, borderBottomWidth:1, borderRadius:8}}>
       <TouchableOpacity onPress={handleSelectGopay} style={{paddingLeft:12}}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedGopay ? '#007AFF' : '#C7C7CC',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedGopay && (
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
      <View style={{marginLeft:20, paddingVertical:7}}>
        <Image source={GopayLogo} style={{width:35, height:35}}/>
      </View>
        <Text style={{fontSize:16, marginLeft:8, fontWeight:"bold"}}>GoPay</Text>
      </View>
    </TouchableOpacity>
      </View>

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
