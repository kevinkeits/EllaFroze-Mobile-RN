import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, FlatList } from 'react-native';
import { DetailProduct1 } from '../../assets';
import { CartIcon, LocationIcon, MessageIcon } from '../../assets/icons';
import CarouselImage from './components/CarouselImage/CarouselImage';



interface ProductDetail extends Product {
  // ProductID: string;
  // Product: string;
  // Branch: string;
  // BranchID: string;
  Description: string;
  // Discount: string;
  // DiscountType: string;
  MinOrder?: number
  // ImagePath: string;
  // Price: number;
  // Stock: number;
  // Qty?: string;
}
interface Product {
  ProductID: string;
  Product: string;
  Branch: string;
  BranchID: string;
  Discount: number;
  DiscountType: number;
  ImagePath: string;
  ItemSold: string;
  Price: number;
  Stock: number;
  Qty?: string;

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

const ProductDetail = ({ route }: DetailScreenProps) => {
  const { itemId } = route.params;

    const navigation = useNavigation();
    const [count, setCount] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [image, setImage] = useState<ImagePath[]>([]);
    const [detail, setDetail] = useState<ProductDetail>();
    const [ProductID, setProductID] = useState('');
    const [Qty, setQty] = useState(0);
    const [Notes, setNotes] = useState('');
    const [Source, setSource] = useState('');
    const [_s, setToken] = useState('');
    const [loading, setLoading] = useState(true);


    const fetchData = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getAllProduct?CatID=&BranchID=e0251060-1c70-11ec-9ac9-ca13603aef66&Keyword=&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setLoading(false)
    }

    const fetchDataDetail = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getProductDetail?_i=${itemId}&_cb=onCompleteFetchProduct&_p=&_s=${token}`;
      const response = await axios.get(url);
      //alert(JSON.stringify(response.data.data))
      setCount(response.data.data.Qty == 0 ? 1 : response.data.data.Qty)
      setQty(response.data.data.Qty)
      setDetail(response.data.data);
      setLoading(false)
      //setQty(response.data.data.Qty)
    }

    const fetchImage = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getProductImage?_i=${itemId}&_cb=onCompleteFetchBanner&_p=product-image-slider-wrapper&_s=${token}`;
      const response = await axios.get(url);
      setImage(response.data.data);
      setLoading(false)
    }

    async function saveCart(cartInput: SaveCart): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doSaveCart';
    
      try {
        //(JSON.stringify(cartInput))
         const response = await axios.post(apiUrl, cartInput);
         
         if (!response.data.status){
          alert(response.data.message);
         } else {
          if (response.data.message != '') alert(response.data.message)
          else navigation.goBack()
        }   
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    const handleSaveCart = async () => {
      try {
        await saveCart({  ProductID, Qty, Notes, Source, _s });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      setToken(tokenData == null ? "" : tokenData);
      setNotes("")
      //setQty(count)
      setSource("cart")
      setProductID(itemId)
      //fetchData(tokenData == null ? "" : tokenData);
      fetchDataDetail(tokenData == null ? "" : tokenData);
      fetchImage(tokenData == null ? "" : tokenData);
    };

  const incrementCount = () => {
    const newCount = parseInt(count.toString())
      setCount(newCount + 1);
      setQty(newCount + 1)
    };

  const decrementCount = () => {
    const newCount = parseInt(count.toString())
    if (newCount > 0) {
      setCount(newCount - 1)
      setQty(newCount - 1)
    }
    
  };

  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  



  return (
        <ScrollView>
    <View style={styles.container}>
    {detail?.Stock == 0 && (
            <View style={{backgroundColor:"black", padding:10, zIndex:2, width:"50%", alignItems:"center", alignSelf:"center", position:"absolute", marginTop:250, opacity:0.7, borderRadius:8}}>
              <Text style={{color:"white", fontWeight:"bold"}}>HABIS</Text>
            </View>
          )}
        <View style={{height:500}}>
            {/* <Image source={DetailProduct1}/> */}
            {/* <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${image?.ImagePath}`}} style={{width:200, height:250}}/> */}
            {loading ? (<View style={{backgroundColor:"#EAEAEA", height:500, width:300}}/>) : (
                 <CarouselImage itemId={itemId}/>
            )}
           
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", alignItems:"center", flexDirection:"row", justifyContent:"space-evenly", paddingVertical:10, paddingLeft:25, marginTop:8, width:370, borderRadius:7}}>
          <View>

          {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
              <View>
                 {detail?.DiscountType == 0 &&
              <View> 
                <Text style={{fontSize:16, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(detail?.Price)
             }</Text>
          </View>  }

              {detail?.DiscountType == 1 &&
              <View> 
                <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(detail?.Price)
             }</Text>
              <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(detail?.Price - detail?.Discount)
          }</Text>
          </View>  }

          {detail?.DiscountType == 2 && 
          <View>
            <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(detail?.Price)
             }</Text>
          <Text style={{fontSize:16, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(detail?.Price - ((detail?.Price * detail?.Discount)/100))
          }</Text>
          </View>  }
          </View>
            )}
            
          </View>
        
        
          <View style={{flexDirection:"row", alignItems:"center", marginHorizontal:20}}>
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
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", flexDirection:"row", paddingVertical:12, paddingLeft:15, marginTop:7, width:370, borderRadius:7}}>
            <View style={{backgroundColor:"white", borderRadius:6,  paddingVertical:12, paddingHorizontal:8, marginRight:10}}>
              {loading ? (<View style={{backgroundColor:"#EAEAEA", width:200, height:30}}/>) : (
                 <Text style={{fontWeight:"bold", fontSize:16}}>{detail?.Product}</Text>
              )}
               
               {loading ? (<View style={{backgroundColor:"#EAEAEA", width:300, height:350, marginTop:15}}/>) :(
                 <Text style={{marginTop:10, fontSize:14}}>{detail?.Description}</Text>
               )}
            </View>
           
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:25, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
          {loading ? (<View style={{backgroundColor:"#EAEAEA", width:150, height:25}}/>) : (
             <Text style={{fontSize:14}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  {detail?.Branch}</Text>
          )}
            {/* <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity> */}
        </View>
            {loading ? (<View style={{backgroundColor:"#EAEAEA", width:370, height:50, marginTop:8, marginBottom:20}}/>): (
                 <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, marginBottom:20, width:370, borderRadius:7}} onPress={handleSaveCart}>
                 <Text style={{color:"white", fontWeight:"bold"}}>MASUKKAN KE KERANJANG</Text>
             </TouchableOpacity>
            )}
         
        
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

export default ProductDetail;
