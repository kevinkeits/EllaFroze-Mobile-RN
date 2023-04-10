import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';




interface ArticleDetail {
    ID: string;
    Type: string;
    ImageUrl: string;
    Contents: string;

  }

type DetailScreenProps = {
  route: { params: { itemId: string } };
};

const ArticleDetail = ({ route }: DetailScreenProps) => {
  const { itemId } = route.params;

    const [detail, setDetail] = useState<ArticleDetail>();
    const [loading, setLoading] = useState(true);


    const fetchDataDetail = async () => {
      const url = `https://ellafroze.com/api/external/getArticleDetail?ID=${itemId}`;
      const response = await axios.get(url);
      setDetail(response.data.data);
      setLoading(false)
    }


    const fetchToken = async () => {
      fetchDataDetail();
    };





  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  



  return (
        <ScrollView>
    <View style={styles.container}>
    <View style={{width:"100%", height:300, backgroundColor:"grey"}}>
      {/* <Image source={{ uri: `${detail?.ImageUrl}`}} style={{width:"100%", height:300}}/> */}
    </View>
    <View style={{
         width:"95%",
         marginTop:5,
        marginBottom:5, 
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
      
      <View style={{marginHorizontal:10}}>
        <Text>{detail?.Contents.replace(/<\/?b>/g, "").replace(/<br\s*\/?>/g, "")}</Text>
      </View>

    </View> 
                
                
     
    </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    height:'10%',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchBar: {
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    width: '70%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ArticleDetail;
