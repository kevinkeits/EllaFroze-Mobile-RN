import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../assets/icons';
import Carousel from './components/Carousel';
import HomeCategory from './components/HomeCategory/HomeCategory';
import HomeCharts from './components/HomeCharts/HomeCharts';
import ProductCards from './components/ProductCards/ProductCards';

const items= [
  {
  id: 1,
  text: "Test"
  },
  {
    id:2,
    text: "Test2"
  }
]

const HomePage = () => {
 
  const images = [
    'https://source.unsplash.com/featured/?nature',
    'https://source.unsplash.com/featured/?water',
    'https://source.unsplash.com/featured/?mountain',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{marginTop:10}}>
         <Carousel/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:"bold", marginLeft:3}}>Produk Terlaris</Text>
          <HomeCharts/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:"bold", marginLeft:3}}>Diskon</Text>
          <HomeCharts/>
        </View>
        <View style={{marginTop:10}}>
        <HomeCategory/>
        </View>
      
      <ProductCards/>
      </ScrollView>
    </View>
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

export default HomePage;
