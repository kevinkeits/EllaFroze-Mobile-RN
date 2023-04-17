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

  interface Props {
    onEnableScrollTrue : any
    onEnableScrollFalse : any

  }

const HomeCategory = ({onEnableScrollTrue, onEnableScrollFalse}: Props) => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (token: string) => {
      const url = `https://ellafroze.com/api/external/getCategory?_cb=onCompleteFetchCategory&_p=main-category-slider&_s=${token}`;
      const response = await axios.get(url);
      setCategories(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')

      fetchData(tokenData == null ? "" : tokenData);
      
    };

    const handleNavigate = async (itemId: string, categoryName: string) => {
      
      await AsyncStorage.setItem('categoryId', itemId)
      await AsyncStorage.setItem('categoryName', categoryName)
      navigation.navigate('Category', {itemId, categoryName})
    };

   

    useEffect(() => {
      
      fetchToken()
      
      
    }, []);
  
  


    const numColumns = 4;

  return (
    
    <View style={{backgroundColor:"white", flexDirection:"row" }} >
         <FlatList
          onTouchStart={() => {
            onEnableScrollFalse
         }}
         onMomentumScrollEnd={() => {
            onEnableScrollTrue
         }}
        data={categories}
        renderItem={({item}) => 
        <TouchableOpacity style={{width:80, height:80, alignItems:"center",  margin:8}} onPress={()=>handleNavigate(item.ID, item.Name)}>
          {loading ? (<View style={{backgroundColor:"#EAEAEA", width:50, height:50}}/>): (
              <Image source={{ uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`}} style={{width:50, height:50}}/>
          )}
          {loading ? (<View style={{backgroundColor:"#EAEAEA", width:50, height:10, marginTop:4}}/>):(
           <Text style={{fontSize:10, marginTop:4}}>{item.Name}</Text>
          )}
        </TouchableOpacity>}
        keyExtractor={item => item.ID}
        numColumns={numColumns}
      />
      
    </View>
  )
}

export default HomeCategory