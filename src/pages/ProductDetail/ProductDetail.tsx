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
  Discount: string;
  DiscountType: string;
  ImagePath: string;
  ItemSold: string;
  Price: number;
  Stock: number;
  Qty?: string;

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
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [image, setImage] = useState<ImagePath[]>([]);
    const [detail, setDetail] = useState<ProductDetail>();
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
      setDetail(response.data.data);
      setLoading(false)
    }

    const fetchImage = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getProductImage?_i=${itemId}&_cb=onCompleteFetchBanner&_p=product-image-slider-wrapper&_s=${token}`;
      const response = await axios.get(url);
      setImage(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      fetchData(tokenData == null ? "" : tokenData);
      fetchDataDetail(tokenData == null ? "" : tokenData);
      fetchImage(tokenData == null ? "" : tokenData);
    };


  const decrementCount = () => {
    const newCount = count - 1 >= 0 ? count - 1 : 0;
    setCount(newCount);
  };

  //   const renderItem = ({ item }: { item: ProductDetail }) => (
  //     <View style={styles.container}>
  //     <View style={{height:400}}>
  //         {/* <Image source={DetailProduct1}/> */}
  //         {/* <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${image?.ImagePath}`}} style={{width:200, height:250}}/> */}
  //         <CarouselImage itemId={itemId}/>
  //     </View>
  //     <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:10, paddingLeft:25, marginTop:8, width:370, borderRadius:7}}>
  //         <Text style={{fontSize:16}}>Rp. {
  //           new Intl.NumberFormat('id-ID', {
  //         // style: 'currency',
  //         currency: 'IDR'
  //       }).format(detail?.Price)
  //       }</Text>
  //       {/* <Text style={{fontSize:16}}>{detail?.Price}</Text> */}
  //     </View>
  //     <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", flexDirection:"row", paddingVertical:12, paddingLeft:15, marginTop:7, width:370, borderRadius:7}}>
  //         <View style={{backgroundColor:"white", borderRadius:6, width:"66%", paddingVertical:12, paddingHorizontal:8}}>
  //             <Text style={{fontWeight:"bold"}}>{detail?.Product}</Text>
  //             <Text style={{marginTop:4}}>Detail :</Text>
  //             <Text style={{marginTop:4, fontSize:10}}>{detail?.Description}</Text>
  //             {/* <Text style={{marginTop:4, fontSize:10}}>Bahan Baku : Daging Merah Ikan Tenggiri Giling</Text> */}
  //         </View>
  //         <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:20}}>
  //             <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
  //             <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
  //                 <Text style={{color:"#148D2E"}}>-</Text>
  //             </TouchableOpacity>
  //             <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{count}</Text>
  //             <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
  //                 <Text style={{color:"#148D2E"}}>+</Text>
  //             </TouchableOpacity>
  //             </View>
  //         </View>
  //     </View>
  //     <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:25, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
  //         <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  {detail?.Branch}</Text>
  //         {/* <TouchableOpacity>
  //             <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
  //         </TouchableOpacity> */}
  //     </View>
      
  //         <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, width:370, borderRadius:7}} onPress={()=>{navigation.navigate('Cart')}}>
  //             <Text style={{color:"white", fontWeight:"bold"}}>MASUKKAN KE KERANJANG</Text>
  //         </TouchableOpacity>
      
  // </View>
  //   );
  
  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  const incrementCount = () => {
    setCount(count + 1);
  };

  // const decrementCount = () => {
  //   setCount(count - 1);
  // };

  return (
        <ScrollView>
    <View style={styles.container}>
        <View style={{height:500}}>
            {/* <Image source={DetailProduct1}/> */}
            {/* <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${image?.ImagePath}`}} style={{width:200, height:250}}/> */}
            <CarouselImage itemId={itemId}/>
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:10, paddingLeft:25, marginTop:8, width:370, borderRadius:7}}>
            <Text style={{fontSize:16}}>Rp. {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(detail?.Price)
          }</Text>
          {/* <Text style={{fontSize:16}}>{detail?.Price}</Text> */}
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", flexDirection:"row", paddingVertical:12, paddingLeft:15, marginTop:7, width:370, borderRadius:7}}>
            <View style={{backgroundColor:"white", borderRadius:6, width:"66%", paddingVertical:12, paddingHorizontal:8}}>
                <Text style={{fontWeight:"bold"}}>{detail?.Product}</Text>
                <Text style={{marginTop:4}}>Detail :</Text>
                <Text style={{marginTop:4, fontSize:10}}>{detail?.Description}</Text>
                {/* <Text style={{marginTop:4, fontSize:10}}>Bahan Baku : Daging Merah Ikan Tenggiri Giling</Text> */}
            </View>
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
            </View>
        </View>
        <View style={{backgroundColor:"rgba(20, 141, 46, 0.1);", paddingVertical:12, paddingHorizontal:25, marginTop:8, width:370, borderRadius:7, flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{fontSize:12}}> <Text style={{fontWeight:"bold"}}>Pengiriman </Text> :  {detail?.Branch}</Text>
            {/* <TouchableOpacity>
                <Text style={{fontSize:12, color:"blue"}}>Ubah</Text>
            </TouchableOpacity> */}
        </View>
        
            <TouchableOpacity style={{backgroundColor:"#148D2E", paddingVertical:14, alignItems:"center", marginTop:8, marginBottom:20, width:370, borderRadius:7}} onPress={()=>{navigation.navigate('Cart')}}>
                <Text style={{color:"white", fontWeight:"bold"}}>MASUKKAN KE KERANJANG</Text>
            </TouchableOpacity>
        
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
