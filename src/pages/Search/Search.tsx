import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'
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
    Price: string;
    Stock: string;
    Qty?: string;
  }

  interface SearchScreenProps {
    route: { params: { searchText: string } };
  }

  interface SaveCart {
    ProductID: string;
    Qty: number;
    Notes?: string;
    Source: string;
    _s:string
  }
  
 

const Search = ({route}: SearchScreenProps) => {
    const { searchText } = route.params;
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [tokenID, setToken] = useState<string>('')
    const [loadingSave, setLoadingSave] = useState(false)

    
    

    const fetchData = async (token: string, selectedBranch: string) => {
      const url = `https://ellafroze.com/api/external/getAllProduct?CatID=&BranchID=${selectedBranch}&Keyword=${searchText}&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      setLoading(true)
      const tokenData = await AsyncStorage.getItem('tokenID')
      const selectedBranchData = await AsyncStorage.getItem('selectedBranch')
      setToken(tokenData == null ? "" : tokenData)
      fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData);
      
    };


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

  // const handleButtonPress = (itemId: any) => {
  //   setSelected(itemId);
  //   // alert(`Button clicked for item ${itemId}`);
  // };

  const handleButtonPress = (values: Product, type: string) => {
    const postData: Product = {
      ...values,
      Qty: type == '+' ? (values.Qty == null ? '1' : (parseInt(values.Qty) + 1).toString()) : (values.Qty == null ? '0' : (parseInt(values.Qty) - 1).toString())
      // groupRoleID: role?.id,
      // merchantID: merchant.map((x) => x.id),
      // isActive: isActive?.id
    }
    onConfirm?.(postData)
  };

  const handleNavigate = (itemId: string) => {
    navigation.navigate('ProductDetail', {itemId})
    // alert(`Button clicked for item ${itemId}`);
  };
   
    const navigation = useNavigation();
    
    const numColumns = 2;

    const renderItem = ({item}:any) => {
        const isSelected = item.ProductID === selected;
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            // style: 'currency',
            currency: 'IDR'
          }).format(item.Price);
        return (
            <TouchableOpacity 
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
                onPress={()=>handleNavigate(item.ProductID)}
                >
                   {item.Stock == 0 && (
            <View style={{backgroundColor:"black", padding:10, zIndex:2, width:"50%", alignItems:"center", alignSelf:"center", position:"absolute", marginTop:40, opacity:0.7, borderRadius:8}}>
              <Text style={{color:"white", fontWeight:"bold"}}>HABIS</Text>
            </View>
          )}

        <View style={{alignItems:"center"}}>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:100, height:120}}/>) : (
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:100, height:120}}/>
            )}
        </View>
        {loading? (<View style={{backgroundColor:"#EAEAEA", width:150, height:20, marginTop:5, marginLeft:8}}/>):(
            <Text style={{fontSize:15, marginTop:5, marginLeft:8}}>{item.Product}</Text>
              )}
  {/* {item.DiscountType == 1 && <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>
    {formattedPrice}</Text> 
     }
            {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. {formattedPrice}</Text>

              )} */}

{loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
              <View>
                 {item.DiscountType == 0 &&
              <View> 
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. 
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
              <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
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
          <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp.  {
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
                      <TouchableOpacity onPress={()=>handleButtonPress(item,'+')} style={{backgroundColor: '#148D2E', width:'85%', marginTop:6, alignItems:"center", paddingVertical:3, borderRadius:6}}>
                          <Text style={{color:"white", fontWeight:"bold"}}>BELI</Text>
                      </TouchableOpacity>
                      
                  </View>
                )}
               </View>

              )}
           
            </TouchableOpacity>
        )
    }

  return (
    
    <View style={{}} >
          <Text style={{margin:4, fontWeight:"bold", fontSize:15}}>Produk dengan keyword "{searchText}"</Text>
         <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.ProductID}
        numColumns={numColumns}
      />
     </View>
  )
}

export default Search