import { View, Text, Image, TouchableOpacity, ScrollView, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';



const ProductCards = () => {
    const [count, setCount] = useState(0);

    const [select, setSelect] = useState(false);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };
    const navigation = useNavigation();
   const data = [{
        id: '1',
        categoryName: "Ikan Satu",
        productName:"Satu",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '2',
        categoryName: "Ikan Dua",
        productName:"Dua",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '3',
        categoryName: "Ikan Tiga",
        productName:"Tiga",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '4',
        categoryName: "Ikan Empat",
        productName:"Empat",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '5',
        categoryName: "Ikan Lima",
        productName:"Lima",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '6',
        categoryName: "Ikan Enam",
        productName:"Enam",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '7',
        categoryName: "Ikan Tujuh",
        productName:"Tujuh",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '8',
        categoryName: "Ikan Delapan",
        productName:"Delapan",
        discountedPrice:24000,
        price:26000,
        weight:50,
        uri: require("../../../../assets/images/product-1.png")
    }];
    const numColumns = 2;

  return (
    
    <View style={{backgroundColor:"white"}} >
         <FlatList
        data={data}
        renderItem={({item}) => 
 
        <TouchableOpacity style={{width:180, height:240, backgroundColor:"white", borderWidth:5, borderColor:"background: rgba(255, 203, 0, 0.2)",  margin:8}} onPress={()=>{navigation.navigate('ProductDetail')}}>
            <View style={{alignItems:"center"}}>
            <Image source={item.uri} />
            </View>
        <Text style={{fontSize:15, marginTop:5, marginLeft:8}}>{item.productName}</Text>
        <Text style={{fontSize:11, marginTop:3, marginLeft:8, textDecorationLine:"line-through"}}>Rp. {item.price}</Text>
        <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>Rp. {item.discountedPrice}</Text>
        <Text style={{fontSize:11, marginTop:3, marginLeft:8}}>Berat: {item.weight}gr / Pack</Text>

        {select === true ? 
        (<View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:20}}>
                <View style={{backgroundColor:"#background: rgba(20, 141, 46, 0.1);", flexDirection:"row", padding:5, borderRadius:6}}>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={decrementCount}>
                    <Text style={{color:"#148D2E"}}>-</Text>
                </TouchableOpacity>
                <Text style={{paddingVertical:5, alignItems:"center", textAlign:"center", width:30}}>{count}</Text>
                <TouchableOpacity style={{backgroundColor:"white", padding:5, borderRadius:5}} onPress={incrementCount}>
                    <Text style={{color:"#148D2E"}}>+</Text>
                </TouchableOpacity>
                </View>
            </View>)
            :( <View style={{justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>setSelect(!select)} style={{backgroundColor: '#148D2E', width:'85%', marginTop:6, alignItems:"center", paddingVertical:3, borderRadius:6}}>
            <Text style={{color:"white", fontWeight:"bold"}}>BELI</Text>
        </TouchableOpacity>
        </View>
)}
       
        </TouchableOpacity>
       }
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />
    </View>
  )
}

export default ProductCards