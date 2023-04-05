import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native'
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
    Discount: number;
    DiscountType: number;
    ImagePath: string;
    ItemSold: number;
    Price: number;
    Stock: number;
    Qty?: string;
    selected?:string
  }

  interface Props {
    products: Product[]
    loading?: boolean
  }
  


const HomeCharts = ({products, loading}:Props) => {
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

  const handleButtonPress = (itemId: any) => {
    setSelected(itemId);
    alert(`Button clicked for item ${itemId}`);
  };

  const handleNavigate = (itemId: string) => {
    navigation.navigate('ProductDetail', {itemId})
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

  {product.Stock == 0 && (
            <View style={{backgroundColor:"black", padding:10, zIndex:2, width:"50%", alignItems:"center", alignSelf:"center", position:"absolute", marginTop:40, opacity:0.7, borderRadius:8}}>
              <Text style={{color:"white", fontWeight:"bold"}}>HABIS</Text>
            </View>
          )}
          <View style={{alignItems:"center"}}>
            {loading ? (<View style={{backgroundColor:"#EAEAEA", width:100, height:120}}/>) : (
              <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${product.ImagePath}`}} style={{width:100, height:120}}/>
            )}
          </View>

              {loading? (<View style={{backgroundColor:"#EAEAEA", width:150, height:20, marginTop:5, marginLeft:8}}/>):(
               <Text style={{fontSize:15, marginTop:5, marginLeft:8}}>{product.Product}</Text>

              )}
          
              {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
              <View>
                 {product.DiscountType == 0 &&
              <View> 
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(product.Price)
             }</Text>
          </View>  }

              {product.DiscountType == 1 &&
              <View> 
                <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(product.Price)
             }</Text>
              <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(product.Price - product.Discount)
          }</Text>
          </View>  }

          {product.DiscountType == 2 && 
          <View>
            <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. 
                 {
                 new Intl.NumberFormat('id-ID', {
               // style: 'currency',
               currency: 'IDR'
             }).format(product.Price)
             }</Text>
          <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
              new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(product.Price - ((product.Price * product.Discount)/100))
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
                  <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>{product.Branch}</Text>
                  </View>
              )}
             
             {loading ? (<View style={{backgroundColor:"#EAEAEA", height:12, width:60, marginTop:3, marginLeft:8,}}/>):(
               <Text style={{fontSize:11, marginTop:3, marginLeft:8}}> Terjual: {product.ItemSold}</Text>

              )}
  
      
              
  {loading ? (<View style={{backgroundColor:"#EAEAEA", height:25, width:'85%', marginTop:6, alignSelf:"center"}}/>):(
               <View>
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
               </View>

              )}
             
              </TouchableOpacity>
           
        ))}
        </ScrollView>
      
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


