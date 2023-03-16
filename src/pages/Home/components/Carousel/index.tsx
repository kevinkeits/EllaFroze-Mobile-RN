import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  backgroundColor?: string;
  imgUrl?:string;
}

const slides: Slide[] = [
  { id: 1, backgroundColor: '#5DADE2', imgUrl: "../../../../assets/images/BannerImage.png" },
  { id: 2, backgroundColor: '#F4D03F', imgUrl: "../../../../assets/images/BannerImage.png" },
  { id: 3, backgroundColor: '#58D68D', imgUrl: "../../../../assets/images/BannerImage.png"},
]

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

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
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { backgroundColor: slide.backgroundColor }]} >
            <Image source={{uri:slide.imgUrl}} style={{width:300, height:200}}  />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
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
    height: 200,
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
