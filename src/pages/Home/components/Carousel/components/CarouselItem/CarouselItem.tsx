import React from 'react';
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';




interface CarouselItemProps {
  items: CarouselItem[];
}

const CarouselItems: React.FC<CarouselItemProps> = ({ items }) => {
  const renderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.image }} style={styles.carouselItemImage} />
        <Text style={styles.carouselItemTitle}>{item.title}</Text>
        <Text style={styles.carouselItemDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={300}
      snapToAlignment="center"
      contentContainerStyle={styles.carouselContainer}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingHorizontal: 20,
  },
  carouselItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  carouselItemImage: {
    height: 150,
    width: 150,
  },
  carouselItemTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  carouselItemDescription: {
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CarouselItems;
