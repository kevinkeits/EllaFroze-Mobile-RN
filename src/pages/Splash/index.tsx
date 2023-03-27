import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../App';
import { Logo } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Splash = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigation.navigate('Login');
    //     }, 3000)
    // })

    useEffect (() => {
      const fetchToken = async () => {
        const TokenID = await AsyncStorage.getItem('@tokenID');
        return TokenID;
      }

      const TokenID = fetchToken();
      if (TokenID != null) navigation.navigate("MainApp")
      else navigation.navigate("Login");
      // return () => {
      //   console.log('Component unmounted');
      // };
    }, []);

  return (
    <View style={{flex: 1, backgroundColor:"#FA0000", margin: 0, alignItems:'center', justifyContent:'center'}}>
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