import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';



interface Article {
    ID: string;
    Type: string;
    Title: string;
    ImageUrl: string; 
    Contents: string;

  }

  interface Props {
    data: Article[]
    loading: boolean
  }
const ArticleCard = ({data, loading}:Props) => {
    const navigation = useNavigation();
    const handleNavigate = async (itemId: string) => {
        //navigation.navigate('ArticleDetail', {itemId})
        // alert(`Button clicked for item ${itemId}`);

        const url = `https://ellafroze.com/api/article?i=${itemId}`;
        let result = await WebBrowser.openBrowserAsync(url);
      };
  return (
    <View>
        {data.map((item, index)=>(
 <TouchableOpacity
 key={index}
 onPress={()=>handleNavigate(item.ID)} 
 style={{
    margin:7, 
    // borderWidth:1, 
    paddingVertical:15,
    backgroundColor: '#fff',
    elevation:3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    }} >
  
    <View style={{flexDirection:"row", gap:4}}>
    <View style={{marginVertical:10, alignItems:"center", width:"40%"}}>
    {loading ? (<View style={{backgroundColor:"#EAEAEA", width:85, height:55}}/>) : (
 <View style={{ width:130, height:80}}>
 <Image source={{ uri: `https://ellafroze.com/api/uploaded/article/${item.ImageUrl}`}} style={{width:130, height:80}} resizeMode="contain"/>
 </View>           
  )}
     
    </View>

    <View style={{marginVertical:10, width:"60%"}}>
    {loading ? (<View style={{backgroundColor:"#EAEAEA", width:120, height:30}}/>) : (
      <Text style={{fontWeight:"bold", fontSize:14, marginBottom:4}}>
    {/* {item.Contents.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "")} */}
    {item.Title}
    </Text>          
  )}
    
    </View>
    </View>

  </TouchableOpacity>
        ))}
     
    </View>
  )
}

export default ArticleCard

const styles = StyleSheet.create({})