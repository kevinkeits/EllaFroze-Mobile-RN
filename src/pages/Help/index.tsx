import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../../../App';
import Carousel from '../Home/components/Carousel';
import Accordion from './components/Accordion/Accordion';

interface Help {
  ID: string;
  Title: string;
  Content: string;

}
export default function Help() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

    const [help, setHelp] = useState<Help[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHelp = async (tokenData: string) => {
      const url = `https://ellafroze.com/api/external/getHelpList?_cb=onCompleteFetchHelp&_p=helpListWrapper&_s=${tokenData}`;
      const response = await axios.get(url);
      
      setHelp(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      const tokenData = await AsyncStorage.getItem('tokenID')
      fetchHelp(tokenData == null ? "" : tokenData);
      alert(JSON.stringify(help))

    };
  
  useEffect(() => {
      
    fetchToken()
    
    
  }, []);

  return (
      
    <View style={styles.container}>
     <Accordion data={help}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
  },
});
