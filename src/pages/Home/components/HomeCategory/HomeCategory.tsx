import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Category {
    ID: string;
    ImagePath: string;
    Name: string;
  }

const HomeCategory = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getCategory?_cb=onCompleteFetchCategory&_p=main-category-slider&_s=${token}`;
      const response = await axios.get(url);
      setCategories(response.data.data);
      setLoading(false)
    }

    useEffect(() => {
    
      const fetchToken = async () => {
        const TokenID = await AsyncStorage.getItem('@tokenID');
        return TokenID;
      }

      const TokenID = fetchToken();

      fetchData(TokenID);
    }, []);
  
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
   const data = [{
        id: '1',
        categoryName: "Ikan Satu",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '2',
        categoryName: "Ikan Dua",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '3',
        categoryName: "Ikan Tiga",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '4',
        categoryName: "Ikan Empat",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '5',
        categoryName: "Ikan Lima",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '6',
        categoryName: "Ikan Enam",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '7',
        categoryName: "Ikan Tujuh",
        uri: require("../../../../assets/images/fish-1.png")
    },
    {
        id: '8',
        categoryName: "Ikan Delapan",
        uri: require("../../../../assets/images/fish-1.png")
    }];
    const numColumns = 4;

  return (
    
    <View style={{backgroundColor:"white", flexDirection:"row" }} >
         <FlatList
        data={categories}
        renderItem={({item}) => 
       
        <TouchableOpacity style={{width:80, height:80, alignItems:"center",  margin:8}} onPress={()=>{navigation.navigate('Category')}}>
        <Image source={{ uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`}} style={{width:50, height:50}}/>
        <Text style={{fontSize:10, marginTop:4}}>{item.Name}</Text>
        </TouchableOpacity>}
        keyExtractor={item => item.ID}
        numColumns={numColumns}
      />
        {/* {data.map((datum, index)=>(
            <TouchableOpacity key={index} style={{width:70, height:80, alignItems:"center",  marginHorizontal:8}}>
                <Image source={datum.uri}/>
                <Text style={{fontSize:10, marginTop:4}}>{datum.categoryName}</Text>
            </TouchableOpacity>
        ))} */}
      
    </View>
  )
}

export default HomeCategory