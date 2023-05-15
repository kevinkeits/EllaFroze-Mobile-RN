import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { RootStackParams } from '../../../App';
import { Logo } from '../../assets';
import Carousel from '../Home/components/Carousel';


interface Contact {
  ID:string
  LastMessage: string
  Name: string
  UnreadMessage: number
 }

export default function Contact() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const navigationChat =
    useNavigation();
    const [contact, setContact] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);  
    
  
    const fetchData = async (tokenData: string) => {
      const url = `https://ellafroze.com/api/external/getChatList?_cb=onCompleteFetchChat&_p=chatListWrapper&_s=${tokenData}`;
      const response = await axios.get(url);
      
      setContact(response.data.data);
      setLoading(false)
    }
  
    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      fetchData(tokenData == null ? "" : tokenData);
      
    };

    const handleNavigate = async (itemId: string, branchName: string) => {
      
      await AsyncStorage.setItem('branchName', branchName)
      navigationChat.navigate('ChatRoom', {itemId, branchName})
      // alert(branchName)
      // alert(`Button clicked for item ${itemId}`);
    };
  
  useEffect(() => {
      
    navigation.addListener(
      'focus',
      payload => {
        fetchToken()
      }
    )
    
    
  }, []);
  return (
      
    <View style={styles.container}>
      {contact?.map((item, index)=>(
             <TouchableOpacity
             key={index} 
             onPress={()=>handleNavigate(item.ID, item.Name)}
             style={{
                width:"90%", 
                // flexDirection:"column", 
                // alignItems:"center",
                alignSelf:"center",
                marginTop:8,
                borderRadius:8, 
                paddingVertical:10,
                backgroundColor: '#fff',
                elevation:3,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                }}>
                   {item.UnreadMessage > 0 &&(
                  <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{item.UnreadMessage}</Text>        
        </View>
        )}
                  <View style={{flexDirection:"row", alignItems:"center"}}>
                <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
                <Text style={{fontSize:16, alignItems:"center"}}>Admin {item.Name}</Text>
                </View>
                <Text
                numberOfLines={1} 
                style={{fontSize:12, color:"grey", alignItems:"center", marginHorizontal:20}}>{item.LastMessage}</Text>
             </TouchableOpacity>
      ))}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderWidth:1,
    borderColor:"white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:14
  },
});
