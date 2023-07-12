import { View, Text, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'
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
    Discount: string;
    DiscountType: string;
    ImagePath: string;
    ItemSold: string;
    Price: string;
    Stock: string;
    Qty?: string;

  }

  interface SaveCart {
    ProductID: string;
    Qty: number;
    Notes?: string;
    Source: string;
    _s:string
  }

  interface Props {
    route: { params: { searchText: string } };
  }

 

const ProductCards = () => {
    const [count, setCount] = useState(0);
    // const [selected, setSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentCategoryName, setCurrentCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false)
    const [tokenID, setToken] = useState<string>('')



    
    

    const fetchData = async (token: string, selectedBranch: string, selectedCategory: string) => {
      const url = `https://ellafroze.com/api/external/getAllProduct?CatID=${selectedCategory}&BranchID=${selectedBranch}&Keyword=&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      const selectedBranchData = await AsyncStorage.getItem('selectedBranch')
      const selectedCategoryData = await AsyncStorage.getItem('categoryId')
      const selectedCategoryName= await AsyncStorage.getItem('categoryName')

      setToken(tokenData == null ? "" : tokenData)

      fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData, selectedCategoryData == null ? "" : selectedCategoryData);
      setCurrentCategoryName(selectedCategoryName == null? "" : selectedCategoryName)
      
    };

  
  
    //     // const newListProductDiscount = products.map((item) => {
    //     //   if (item.ProductID === values?.ProductID) {
    //     //     const updatedItem = {
    //     //       ...item,
    //     //       Qty: values.Qty,
    //     //     };
    
    //     //     return updatedItem;
    //     //   }
    //     //   return item;
    //     // });
    //     // setProducts(newListProductDiscount)
  
    //     if (values) saveCart({  ProductID: values.ProductID, Qty: parseInt(values.Qty ?? '0'), Notes:'', Source:'cart', _s:tokenID });
  
    //     //setProducts(newList);
    //   } catch (err) {
        
    //   }
    // }




   
    useEffect(() => {
      
      const unsubscribe = navigation.addListener('focus', () => {
        fetchToken()
      })
      
      
      // storedBranch()
      
      return () => {
        unsubscribe
      }
      
      
    }, []);
  

   

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

  async function saveCart(cartInput: SaveCart): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doSaveCart';
  
    try {
      //alert(JSON.stringify(cartInput))
       const response = await axios.post(apiUrl, cartInput);
       
       if (!response.data.status){
        alert(response.data.message);
        setLoadingSave(false)
      } else {
       setLoadingSave(false)
      }
    } catch (error) {
      console.error(error);
      setLoadingSave(false)
      throw error;
    }
  }
  const onConfirm = async (values?: Product) => {
    try {
      setLoadingSave(true)
      //alert(JSON.stringify(values))
      const newList = products.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
          };
  
          return updatedItem;
        }
  
        return item;
      });
      setProducts(newList)

      if (values) await saveCart({  ProductID: values.ProductID, Qty: parseInt(values.Qty ?? '0'), Notes:'', Source:'cart', _s:tokenID });

      //setProducts(newList);
    } catch (err) {
      
    }
  }

  const handleButtonPress = (values: Product, type: string) => {
    const currentQty = parseInt(values.Qty == null ? '0' : values.Qty)
    if (type == '+' && ((currentQty + 1) <= parseInt(values.Stock))) {
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

  // const handleButtonPress = (itemId: any) => {
  //   setSelected(itemId);
  //   // alert(`Button clicked for item ${itemId}`);
  // };

  const handleNavigate = (itemId: string) => {
    navigation.navigate('ProductDetail', {itemId})
    // alert(`Button clicked for item ${itemId}`);
  };
   
    const navigation = useNavigation();
    
    const numColumns = 2;
   

    const renderItem = ({item}:any) => {
        // const isSelected = item.ProductID === selected;
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price);
        return (
              <View style={{alignSelf:"center", justifyContent:"center"}}>
            <TouchableOpacity 
            style={{
                width:160, 
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
                onPress={()=>handleNavigate(item.ProductID)}
                >
          
          {item.Stock == 0 && (
            <View style={{backgroundColor:"black", padding:10, zIndex:2, width:"50%", alignItems:"center", alignSelf:"center", position:"absolute", marginTop:60, opacity:0.7, borderRadius:8}}>
              <Text style={{color:"white", fontWeight:"bold"}}>HABIS</Text>
            </View>
          )}

        <View style={{alignItems:"center"}}>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:120, height:155}}/>) : (
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:155, height:155}} contentFit="cover"/>
            // <FastImage
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
            <Text style={{fontSize:13, marginTop:5, marginHorizontal:8}}>{item.Product}</Text>
              )}

            {/* {item.DiscountType == 1 && <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>{formattedPrice}</Text>  }
            {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. {formattedPrice}</Text>

              )} */}
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

{(loading || loadingSave)? (<View style={{backgroundColor:"#EAEAEA", height:25, width:'85%', marginTop:6, alignSelf:"center"}}/>):(
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
    // useEffect(() => {
    //   if (products.length > 1) {
    //     setNumColumns(2);
    //   } else {
    //     setNumColumns(1);
    //   }
    // }, [products]);

  return (
    
    <View style={{ alignSelf:"flex-start", marginHorizontal:5}} >
       <Text style={{fontWeight:"bold", fontSize:15, margin:4}}>Produk dalam kategori "{currentCategoryName}"</Text>
         <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.ProductID}
        numColumns={numColumns}
      />
     </View>
  )
}

export default ProductCards