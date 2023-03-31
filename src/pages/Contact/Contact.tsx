import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
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
      
    fetchToken()
    
    
  }, []);
  return (
      
    <View style={styles.container}>
      {contact?.map((item, index)=>(
             <TouchableOpacity
             key={index} 
             onPress={()=>handleNavigate(item.ID, item.Name)}
             style={{
                width:"90%", 
                flexDirection:"row", 
                alignItems:"center",
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
                <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
                <Text style={{fontSize:16}}>Admin {item.Name}</Text>
             </TouchableOpacity>
      ))}

     {/* <TouchableOpacity style={{
        width:"90%", 
        flexDirection:"row", 
        alignItems:"center",
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
        <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
        <Text style={{fontSize:16}}>Admin Jakarta</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
        width:"90%", 
        flexDirection:"row", 
        alignItems:"center",
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
        <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
        <Text style={{fontSize:16}}>Admin Pekalongan</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
        width:"90%", 
        flexDirection:"row", 
        alignItems:"center",
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
        <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
        <Text style={{fontSize:16}}>Admin Semarang</Text>
     </TouchableOpacity>
     <TouchableOpacity style={{
        width:"90%", 
        flexDirection:"row", 
        alignItems:"center",
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
        <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} />
        <Text style={{fontSize:16}}>Admin Cibubur</Text>
     </TouchableOpacity> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
  },
});
