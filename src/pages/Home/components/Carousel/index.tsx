import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

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

const slides: Slide[] = [
  { id: 1, backgroundColor: '#5DADE2', imgUrl: "../../../../assets/images/BannerImage.png" },
  { id: 2, backgroundColor: '#F4D03F', imgUrl: "../../../../assets/images/BannerImage.png" },
  { id: 3, backgroundColor: '#58D68D', imgUrl: "../../../../assets/images/BannerImage.png"},
]

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getBanner?_cb=onCompleteFetchBanner&_p=main-banner-slider-wrapper&_s=${token}`;
    const response = await axios.get(url);
    setBanners(response.data.data);
    setLoading(false)
  }

  useEffect(() => {
    
    const fetchToken = async () => {
      const TokenID = await AsyncStorage.getItem('@tokenID');
      return TokenID;
    }

    const TokenID = fetchToken();

    fetchData(TokenID);
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
        {banners.map((banner) => (
          <View key={banner.ID} style={[styles.slide]} >
            <Image source={{ uri: `https://ellafroze.com/api/uploaded/banner/${banner.ImagePath}`}} style={{width:390, height:200}}  />
          </View>
        //   <View key={banner.ID} style={[styles.slide, { backgroundColor: slide.backgroundColor }]} >
        //   <Image source={{uri:slide.imgUrl}} style={{width:300, height:200}}  />
        // </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#fff',
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
