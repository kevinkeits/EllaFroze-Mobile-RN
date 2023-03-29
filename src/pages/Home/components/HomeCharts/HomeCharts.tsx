import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Product {
    ProductID: string;
    Product: string;
    Branch: string;
    BranchID: string;
    Discount: string;
    DiscountType: string;
    ImagePath: string;
    ItemSold: string;
    Price: number;
    Stock: string;
    Qty?: string;
  }

  interface ProductDetail {
    ProductID: string;
    Product: string;
    Branch: string;
    BranchID: string;
    Description: string;
    Discount: string;
    DiscountType: string;
    MinOrder?: number
    ImagePath: string;
    ItemSold: string;
    Price: number;
    Stock: number;
    Qty?: string;
  }

const HomeCharts = () => {
    const navigation = useNavigation();
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [detail, setDetail] = useState<ProductDetail[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getAllProduct?CatID=&BranchID=e0251060-1c70-11ec-9ac9-ca13603aef66&Keyword=&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setLoading(false)
    }

    const fetchDataDetail = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getProductDetail?_i=25c18e2b-439a-11ed-90e4-ca13603aef66&_cb=onCompleteFetchProduct&_p=&_s=${token}`;
      const response = await axios.get(url);
      setDetail(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      fetchData(tokenData == null ? "" : tokenData);
      fetchDataDetail(tokenData == null ? "" : tokenData);
      
    };
  
  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

    // useEffect(() => {
    
    //   const fetchToken = async () => {
    //     const TokenID = await AsyncStorage.getItem('@tokenID');
    //     return TokenID;
    //   }

    //   const TokenID = fetchToken();

    //   fetchData(TokenID);
    // }, []);
  
    if (loading) {
      return <Text>Loading...</Text>;
    }


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const handleButtonPress = (itemId: any) => {
    setSelected(itemId);
    // alert(`Button clicked for item ${itemId}`);
  };

  const handleNavigate = (id: string) => {
    navigation.navigate('ProductDetail', {itemId: id})
    // alert(`Button clicked for item ${itemId}`);
  };
   

  return (
    
    <View style={{ flexDirection:"row" }} >
      <ScrollView horizontal={true}>
           {products.map((product, index)=>(
              <TouchableOpacity
              key={product.ProductID} 
              style={{
                  width:180, 
                  // height:250,
                  paddingBottom:10, 
                  backgroundColor: '#fff',
              elevation:3,
              shadowColor: '#000',
              shadowOffset: {
                  width: 0,
                  height: 1,
                },
              shadowOpacity: 0.22,
              shadowRadius: 2.22, 
                  // borderWidth:5, 
                  // borderColor:"background: rgba(255, 203, 0, 0.2)",  
                  margin:8,
                  borderRadius:8
              }} 
                  onPress={()=>handleNavigate(product.ProductID)}
                  >
  
          <View style={{alignItems:"center"}}>
              <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${product.ImagePath}`}} style={{width:100, height:120}}/>
          </View>
              <Text style={{fontSize:15, marginTop:5, marginLeft:8}}>{product.Product}</Text>
              <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(product.Price)
          }</Text>
              <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
              {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(product.Price)
          }</Text>
              <View style={{flexDirection:"row", alignItems:"center", marginLeft:10}}>
              <Icon  
                  name="map-marker-outline"
                  type="material-community"
                  size={15} color="black" /> 
              <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>{product.Branch}</Text>
  
              </View>
              <Text style={{fontSize:11, marginTop:3, marginLeft:8}}> Terjual: {product.ItemSold}</Text>
  
      
              
         
     
              {selected  ? (
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:20}}>
                      <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                      <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
                          <Text style={{color:"#148D2E"}}>-</Text>
                      </TouchableOpacity>
                      <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{count}</Text>
                      <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
                          <Text style={{color:"#148D2E"}}>+</Text>
                      </TouchableOpacity>
                      </View>
              </View>):(
                        <View style={{justifyContent:"center", alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>handleButtonPress(product.ProductID)} style={{backgroundColor: '#148D2E', width:'85%', marginTop:6, alignItems:"center", paddingVertical:3, borderRadius:6}}>
                            <Text style={{color:"white", fontWeight:"bold"}}>BELI</Text>
                        </TouchableOpacity>
                        
                    </View>
                  )}
             
              </TouchableOpacity>
        ))}
        </ScrollView>
      
 </View>
  )
}

export default HomeCharts