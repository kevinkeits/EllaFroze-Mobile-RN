import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const HomeCharts = () => {
    const navigation = useNavigation();
   const data = [{
        id: '1',
        categoryName: "Ikan Satu",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '2',
        categoryName: "Ikan Dua",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '3',
        categoryName: "Ikan Tiga",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '4',
        categoryName: "Ikan Empat",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '5',
        categoryName: "Ikan Lima",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '6',
        categoryName: "Ikan Enam",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '7',
        categoryName: "Ikan Tujuh",
        uri: require("../../../../assets/images/product-1.png")
    },
    {
        id: '8',
        categoryName: "Ikan Delapan",
        uri: require("../../../../assets/images/product-1.png")
    }];

  return (
    
    <View style={{backgroundColor:"white", flexDirection:"row" }} >
      <ScrollView horizontal={true}>
           {data.map((datum, index)=>(
            <TouchableOpacity key={index} style={{width:80, alignItems:"center",  margin:8}}>
            <Image source={datum.uri}/>
            </TouchableOpacity>
        ))}
        </ScrollView>
      
 </View>
  )
}

export default HomeCharts