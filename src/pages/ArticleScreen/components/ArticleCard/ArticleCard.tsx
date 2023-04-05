import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


interface Article {
    ID: string;
    Type: string;
    ImageUrl: string;
    Contents: string;

  }

  interface Props {
    data: Article[]
  }
const ArticleCard = ({data}:Props) => {
    const navigation = useNavigation();
    const handleNavigate = (itemId: string) => {
        navigation.navigate('ArticleDetail', {itemId})
        // alert(`Button clicked for item ${itemId}`);
      };
  return (
    <View>
        {data.map((item)=>(
 <TouchableOpacity
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
      <View>
      <Image source={{ uri: `https://ellafroze.com/api/uploaded${item.ImageUrl}`}} style={{width:55, height:55}}/>
        <Text>IMAGE</Text>
      </View>
    </View>

    <View style={{marginVertical:10}}>
    <Text style={{fontWeight:"bold", fontSize:16, marginBottom:4}}>
    {item.Contents}
    </Text>
    </View>
    </View>

  </TouchableOpacity>
        ))}
     
    </View>
  )
}

export default ArticleCard

const styles = StyleSheet.create({})