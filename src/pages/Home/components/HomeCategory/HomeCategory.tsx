import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Dimensions} from 'react-native';
//import FastImage from 'react-native-fast-image'
import { Image } from 'expo-image'

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';




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

    const renderItem = ({item}) => 
        <TouchableOpacity style={{width:80, height:80, alignItems:"center", marginLeft:7, marginTop:5}} onPress={()=>handleNavigate(item.ID, item.Name)}>
          {loadingCategory ? (<View style={{backgroundColor:"#EAEAEA", width:50, height:10, marginTop:4}}/>):(
            <View>
            {/* <Image source={{ uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`}} style={{width:70, height:50}} resizeMode="contain"/> */}
            {/* <FastImage
                style={{ width: 70, height: 50 }}
                source={{
                    uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            /> */}
            <Image
              style={{width:70, height:50}}
              source={{ uri: `https://ellafroze.com/api/uploaded/category/${item.ImagePath}`}}
              contentFit="cover"
            />
            <Text style={{fontSize:10, marginTop:4, textAlign: 'center'}}>{item.Name}</Text>
           </View>
          )}
        </TouchableOpacity>
    const keyExtractor = (item) => item.ID


  return (
    
    <View style={{backgroundColor:"white", justifyContent:"center", alignItems:"center"}} >
        <FlatList
        scrollEnabled={false}
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
    />
      
    </View>
  )
}

export default HomeCategory