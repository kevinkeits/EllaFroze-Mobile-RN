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

 

const ProductCards = () => {
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentCategoryName, setCurrentCategoryName] = useState('');
    const [loading, setLoading] = useState(true);

    
    

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



      fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData, selectedCategoryData == null ? "" : selectedCategoryData);
      setCurrentCategoryName(selectedCategoryName == null? "" : selectedCategoryName)
      
    };


    useEffect(() => {
      
      fetchToken()
      
      
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

  const handleButtonPress = (itemId: any) => {
    setSelected(itemId);
    // alert(`Button clicked for item ${itemId}`);
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
              <View>
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

        <View style={{alignItems:"center"}}>
        {loading ? (<View style={{backgroundColor:"#EAEAEA", width:100, height:120}}/>) : (
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:100, height:120}}/>
            )}
        </View>

        {loading? (<View style={{backgroundColor:"#EAEAEA", width:150, height:20, marginTop:5, marginLeft:8}}/>):(
            <Text style={{fontSize:15, marginTop:5, marginLeft:8}}>{item.Product}</Text>
              )}

            {item.DiscountType == 1 && <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>{formattedPrice}</Text>  }
            {loading?(<View style={{backgroundColor:"#EAEAEA", height:16, width:80, marginTop:3, marginLeft:8,}}/>):(
                <Text style={{fontSize:12, marginTop:3, marginLeft:8, fontWeight:"bold"}}>Rp. {formattedPrice}</Text>

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

{loading ? (<View style={{backgroundColor:"#EAEAEA", height:25, width:'85%', marginTop:6, alignSelf:"center"}}/>):(
               <View>
                  {isSelected  ? (
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
                      <TouchableOpacity onPress={()=>handleButtonPress(item.id)} style={{backgroundColor: '#148D2E', width:'85%', marginTop:6, alignItems:"center", paddingVertical:3, borderRadius:6}}>
                          <Text style={{color:"white", fontWeight:"bold"}}>BELI</Text>
                      </TouchableOpacity>
                      
                  </View>
                )}
               </View>

              )}
   
            
           
            </TouchableOpacity>
            </View>
        )
    }

  return (
    
    <View style={{}} >
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