import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import FastImage from 'react-native-fast-image'
import { Image } from 'expo-image'

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width;
const SLIDE_HEIGHT = 200;

interface Slide {
  id: number;
  backgroundColor?: string;
  imgUrl?:string;
}

interface Banner {
  ID: string;
  ImagePath: string;
  Name: string;
  Keyword: string;
  URL: string;
}



const Carousel = () => {
  const navigation = useNavigation();

  const [activeSlide, setActiveSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [tokenFetched, setTokenFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);  
  // const timerRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const autoSlideTimeout = useRef<NodeJS.Timeout | null>(null);

  let timerSlide:any;

  const fetchData = async (token: string) => {
    if (banners.length == 0)
    {
      const url = `https://ellafroze.com/api/external/getBanner?_cb=onCompleteFetchBanner&_p=main-banner-slider-wrapper&_s=${token}`;
      const response = await axios.get(url);
      setBanners(response.data.data)
      setLoading(false)
      if (response.data.data.length > 0)
      {
        setActiveSlide(1)
      }
    }
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    setTokenFetched(true);
  };

useEffect(() => {

fetchToken()

const timerSlide = setTimeout(() => {
  let nextSlide = activeSlide + 1;
  if (nextSlide >= banners.length) {
    nextSlide = 0;
  }
  
  setActiveSlide(nextSlide);
  scrollViewRef.current?.scrollTo({
    x: nextSlide * SLIDE_WIDTH,
    animated: true,
  });
}, 3000);

  return () => 
    clearTimeout(timerSlide)
}, [activeSlide]);









  

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };

  return (
    <View style={styles.container}>
      {loading ? (<View style={{height:200, width:390, backgroundColor:"#EAEAEA"}}/>) : (
        <View>
          
          <ScrollView
           ref={scrollViewRef}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const slide = Math.floor(
            event.nativeEvent.contentOffset.x / SLIDE_WIDTH
          );
          setActiveSlide(slide);
        }}
       
        onScrollBeginDrag={() => clearTimeout(timerSlide)}

      >
        {banners.map((banner) => (
          <View key={banner.ID} style={[styles.slide]} >
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/banner/${banner.ImagePath}`}} style={{width:390, height:200}} placeholder={blurhash} transition={1000} contentFit="cover" />
            {/* <FastImage
                style={{ width: 390, height: 200 }}
                source={{
                    uri: `https://ellafroze.com/api/uploaded/banner/${banner.ImagePath}`,
                    priority: FastImage.priority.normal,
                }}
                // resizeMode={FastImage.resizeMode.contain}
            /> */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
    
        {banners.map((banner, index) => (
          <View
            key={banner.ID}
            style={[styles.dot, index === activeSlide ? styles.activeDot : null]}
          />
        ))}
      </View>
        </View>

      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent:"center",
    alignItems:"center"
  },
  slide: {
    width,
    height: 250,
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

export default Carousel;
