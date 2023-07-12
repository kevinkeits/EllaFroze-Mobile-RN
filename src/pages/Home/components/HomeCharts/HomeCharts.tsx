import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import FastImage from 'react-native-fast-image'
import { Image } from 'expo-image'

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';




interface Product {
    ProductID: string;
    Product: string;
    Branch: string;
    BranchID: string;
    Discount: number;
    DiscountType: number;
    ImagePath: string;
    ItemSold: number;
    Price: number;
    Stock: number;
    Qty?: string;
    selected?:string
  }


  interface cardProps {
    item: any
    loading?: boolean
    loadingSave?: boolean
    onConfirm?: (values: Product) => void
  }
  


const HomeCharts = ({item, loadingSave, loading, onConfirm}:cardProps) => {
    const navigation = useNavigation();
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    // const [products, setProducts] = useState<Product[]>([]);
    // const [loading, setLoading] = useState(true);
   




    // const fetchData = async (token: string, selectedBranch: string) => {
    //   const url = `https://ellafroze.com/api/external/getAllProduct?CatID=&BranchID=${selectedBranch}&Keyword=&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
    //   const response = await axios.get(url);
    //   setProducts(response.data.data);
    //   setLoading(false)
    // }

    

    // const fetchToken = async () => {
    //   const tokenData = await AsyncStorage.getItem('tokenID')
    //   const selectedBranchData = await AsyncStorage.getItem('selectedBranch')

      
    //   fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData );
      
    // };

   

    // const handleSelect = async (itemId: string) => {
    //   const itemIndex = products.findIndex((item) => item.ProductID === itemId);
    //   const item = products[itemIndex];
  
    //   try {
       
    //     const response = await axios.put(`https://ellafroze.com/api/external/getProductDetail?_i=${itemId}&_cb=onCompleteFetchProduct&_p=&_s=${token}`, {
    //       ...item,
    //       selected: !item.selected,
    //     });
  
    //     const updatedItem = response.data;
    //     const newData = [...products];
    //     newData[itemIndex] = updatedItem;
    //     setProducts(newData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
  useEffect(() => {
      
    // fetchToken()
    
    
  }, []);

  
  


  const incrementCount = () => {
    setCount(count + 1);
  };


  const decrementCount = () => {
    const newCount = count - 1 >= 0 ? count - 1 : 0;
    setCount(newCount);
  };

  const handleButtonPress = (values: Product, type: string) => {
    const currentQty = parseInt(values.Qty == null ? '0' : values.Qty)
    if (type == '+' && ((currentQty + 1) <= values.Stock)) {
      const postData: Product = {
        ...values,
        Qty: (currentQty + 1).toString(),
      }
      onConfirm?.(postData)
    }
    if (type == '-' && ((currentQty -1) >= 0)) {
      const postData: Product = {
        ...values,
        Qty: (currentQty - 1).toString()
      }
      onConfirm?.(postData)
    }
    
  };

  const handleNavigate = (itemId: string) => {
    navigation.navigate('ProductDetail', {itemId})
    // alert(`Button clicked for item ${itemId}`);
  };
   

  return (
    
    <View style={{ flexDirection:"row" }} >
      {/* <ScrollView horizontal={true} style={{width: '100%', height: '100%'}}>
           {products.map((product, index)=>( */}
              <TouchableOpacity
              key={item.ProductID} 
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
                  margin:5,
                  borderRadius:8
              }} 
                  onPress={()=>handleNavigate(item.ProductID)}
                  >

  {item.Stock == 0 && (
            <View style={{backgroundColor:"black", padding:10, zIndex:2, width:"50%", alignItems:"center", alignSelf:"center", position:"absolute", marginTop:60, opacity:0.7, borderRadius:8}}>
              <Text style={{color:"white", fontWeight:"bold"}}>HABIS</Text>
            </View>
          )}
          <View style={{alignItems:"center"}}>
            {loading ? (<View style={{backgroundColor:"#EAEAEA", width:120, height:155}}/>) : (
              <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:150, height:155}} contentFit="cover"  />
            //   <FastImage
            //     style={{ width: 150, height: 155 }}
            //     source={{
            //         uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`,
            //         priority: FastImage.priority.normal,
            //     }}
            //     resizeMode={FastImage.resizeMode.contain}
            // />
            )}
          </View>

              {loading? (<View style={{backgroundColor:"#EAEAEA", width:150, height:20, marginTop:5, marginLeft:8}}/>):(
               <Text style={{fontSize:13,  marginHorizontal:8}}>{item.Product}</Text>

              )}
          
              {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
              <View>
                 {item.DiscountType == 0 &&
              <View> 
                <Text style={{fontSize:15, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
          </View>  }

              {item.DiscountType == 1 &&
              <View> 
                <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
              <Text style={{fontSize:15, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price - item.Discount)
          }</Text>
          </View>  }

          {item.DiscountType == 2 && 
          <View>
            <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(item.Price)
             }</Text>
          <Text style={{fontSize:15, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price - ((item.Price * item.Discount)/100))
          }</Text>
          </View>  }
          </View>
            )}

            
             
{loading ? (<View style={{backgroundColor:"#EAEAEA", height:14, width:80, marginTop:3, marginLeft:8,}}/>):(
                  <View style={{flexDirection:"row", alignItems:"center", marginLeft:10}}>
                  <Icon  
                      name="map-marker-outline"
                      type="material-community"
                      size={15} color="black" /> 
                  <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>{item.Branch}</Text>
                  </View>
              )}
             
             {loading ? (<View style={{backgroundColor:"#EAEAEA", height:12, width:60, marginTop:3, marginLeft:8,}}/>):(
               <Text style={{fontSize:11, marginTop:3, marginLeft:8}}> Terjual: {item.ItemSold}</Text>

              )}
  
      
              
  {(loading || loadingSave) ? (<View style={{backgroundColor:"#EAEAEA", height:25, width:'85%', marginTop:6, alignSelf:"center"}}/>):(
               <View>
                  {(item.Qty != null && item.Qty != '0')  ? (
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:20}}>
                      <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                      <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={()=>handleButtonPress(item,'-')}>
                          <Text style={{color:"#148D2E"}}>-</Text>
                      </TouchableOpacity>
                      <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{item.Qty}</Text>
                      <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={()=>handleButtonPress(item,'+')}>
                          <Text style={{color:"#148D2E"}}>+</Text>
                      </TouchableOpacity>
                      </View>
              </View>):(
                
                        <View style={{justifyContent:"center", alignItems:"center"}}>
                          {(item.Stock > 0) && (
                        <TouchableOpacity onPress={()=>handleButtonPress(item,'+')} style={{backgroundColor: '#148D2E', width:'85%', marginTop:6, alignItems:"center", paddingVertical:3, borderRadius:6}}>
                            <Text style={{color:"white", fontWeight:"bold"}}>BELI</Text>
                        </TouchableOpacity>
                         )}
                        
                    </View>                   
                  )}
               </View>
               

              )}
             
              </TouchableOpacity>
           
       
      
 </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    marginBottom: 20,
  },
  logo: {
    width: 55,
    height: 58,
    marginRight: 10,
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:300
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerInput: {
    flexDirection: 'row',
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width:290,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 10,
  },
});

export default HomeCharts


