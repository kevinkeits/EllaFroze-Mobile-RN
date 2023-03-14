import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../../App';
import Carousel from '../Home/components/Carousel';


export default function Help() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
      
    <View style={styles.container}>
     <Carousel/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
