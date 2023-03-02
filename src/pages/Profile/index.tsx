import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../../App';


export default function Profile() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
      
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title='Go to Profile'  onPress={() => {navigation.navigate('Profile')}}/>
      <StatusBar style="auto" />
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
