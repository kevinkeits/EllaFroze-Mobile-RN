import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Dimensions} from 'react-native';


interface Category {
    ID: string;
    ImagePath: string;
    Name: string;
  }

  interface Props {
    categories: Category[]
    loadingCategory: boolean
  }

const HomeCategory = ({categories, loadingCategory}: Props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // const [sHeight, setSHeight] = useState(0);
    // const [sWidth, setSWidth] = useState(0);

   

    const handleNavigate = async (itemId: string, categoryName: string) => {
      // alert('clicked')
      await AsyncStorage.setItem('categoryId', itemId)
      await AsyncStorage.setItem('categoryName', categoryName)
      navigation.navigate('Category', {itemId, categoryName})
  
    }
  
    const numColumns = 4;

    // useEffect(() => {  
    //   const windowWidth = Dimensions.get('window').width;
    //   const windowHeight = Dimensions.get('window').height;
    //   setSWidth(windowWidth)
    //   setSHeight(windowHeight)      
    // }, []);

  return (
    
    <View style={{backgroundColor:"white", flexDirection:"row" }} >
         <FlatList
         scrollEnabled={false}
        data={categories}
        renderItem={({item}) => 
        <TouchableOpacity style={{width:80, height:80, alignItems:"center",  margin:8}} onPress={()=>handleNavigate(item.ID, item.Name)}>
          {loadingCategory ? (<View style={{backgroundColor:"#EAEAEA", width:50, height:50}}/>): (
              <Image source={{ uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`}} style={{width:50, height:50}}/>
          )}
          {loadingCategory ? (<View style={{backgroundColor:"#EAEAEA", width:50, height:10, marginTop:4}}/>):(
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