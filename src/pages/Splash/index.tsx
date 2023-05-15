import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import { Logo } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Splash = () => {
  const [token, setToken] = useState("");

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigation.navigate('Login');
    //     }, 3000)
    // })

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      setToken(tokenData == null ? "" : tokenData);

      if (tokenData == "") {
        setTimeout(()=>{
            navigation.navigate('Login');
        }, 3000)
      } else {
        navigation.navigate("MainApp")
      }
    };

    useEffect (() => {
      

      fetchToken()

      // if (token == "") {
      //   setTimeout(()=>{
      //       navigation.navigate('Login');
      //   }, 3000)
      // } else {
      //   navigation.navigate("MainApp")
      // }
      

      // setToken(await AsyncStorage.getItem('tokenID'))
      

      //const TokenID = await fetchToken();
      //alert(JSON.stringify(TokenID))
      // if (await fetchToken() != null) navigation.navigate("MainApp")
      // else navigation.navigate("Login");
      // return () => {
      //   console.log('Component unmounted');
      // };
    }, []);

  return (
    <View style={{flex: 1, backgroundColor:"white", margin: 0, alignItems:'center', justifyContent:'center'}}>
      <Image source={Logo} style={styles.logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({ 
  logo: {
  width: 294,
  height: 294,
},})