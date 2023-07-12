import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import FastImage from 'react-native-fast-image'
import { Image } from 'expo-image'

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  backgroundColor?: string;
  imgUrl?:string;
}

interface ImagePath {
    ID: string;
    ImagePath: string;
  }

  interface Props {
    itemId: string
  }



const CarouselImage = ({itemId}:Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [image, setImage] = useState<ImagePath[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getProductImage?_i=${itemId}&_cb=onCompleteFetchBanner&_p=product-image-slider-wrapper&_s=${token}`;
    const response = await axios.get(url);
    setImage(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    
  };

useEffect(() => {
    
  fetchToken()
  
  
}, []);

  // useEffect(() => {
  //   axios.get('https://ellafroze.com/api/external/getBanner?_cb=onCompleteFetchBanner&_p=main-banner-slider-wrapper&_s=NTk4OFBPSk9IUEc4MTVGT1hFQ0ZXT1pZRTVRREZFUUVMWjkyTE1PMTYzR0xIV0tWR0JGSFI5SzZTUFNKUldVNU1Ea3lZbVkwWVRNNFltUmxZakUzTmpSaFkyRTFNREppTVRoak9EUmxObVV4TmpjNU5qTTROemM1')
  //     .then(response => {
  //       setBanners(response.data.data);
  //       //alert(JSON.stringify(response.data.data))
  //       alert(JSON.stringify(banners))
  //       setLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {image.map((item) => (
          <View key={item.ID} style={[styles.slide]} >
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`}} style={{width:370, height:370, alignSelf:"center"}} contentFit="cover"  />
            {/* <FastImage
                style={{ width: 350, height: 370, alignSelf:"center" }}
                source={{
                    uri: `https://ellafroze.com/api/uploaded/product/${item.ImagePath}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            /> */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {image.map((item, index) => (
          <View
            key={item.ID}
            style={[styles.dot, index === activeSlide ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 370,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    // height: 500,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default CarouselImage;
