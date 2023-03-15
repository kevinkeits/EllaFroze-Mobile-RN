import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RootStackParams } from '../../../App';
import { Logo } from '../../assets';
import Carousel from '../Home/components/Carousel';


export default function Contact() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
      
    <View style={styles.container}>
     <TouchableOpacity 
     onPress={()=>navigation.navigate("ChatRoom")}
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
        <Text style={{fontSize:16}}>Admin Yogyakarta</Text>
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
     </TouchableOpacity>
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
