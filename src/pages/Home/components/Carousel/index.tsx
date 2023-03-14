import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarouselItems from './components/CarouselItem/CarouselItem'




const items: CarouselItem[] = [
  {
    id: 1,
    image: 'https://picsum.photos/id/1/200/300',
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/2/200/300',
    title: 'Sed do eiusmod tempor incididunt',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/3/200/300',
    title: 'Ut enim ad minim veniam',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'}]
const index = () => {
  return (
    <View>
      <CarouselItems items={items}/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})