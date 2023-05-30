import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';
import ProductCards from '../Home/components/ProductCards/ProductCards';
import TopCategory from './components/TopCategory/TopCategory';


interface Product {
  ProductID: string;
  Product: string;
  Branch: string;
  BranchID: string;
  Discount: string;
  DiscountType: string;
  ImagePath: string;
  ItemSold: string;
  Price: string;
  Stock: string;
  Qty?: string;
}

const Category = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
    const [tokenID, setToken] = useState<string>('')

    
    

    const fetchData = async (token: string, selectedBranch: string) => {
      const url = `https://ellafroze.com/api/external/getAllProduct?CatID=&BranchID=${selectedBranch}&Keyword=${searchText}&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setLoading(false)
    }

    const fetchToken = async () => {
      setLoading(true)
      const tokenData = await AsyncStorage.getItem('tokenID')
      const selectedBranchData = await AsyncStorage.getItem('selectedBranch')
      setToken(tokenData == null ? "" : tokenData)
      fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData);
      
    };


    useEffect(() => {
      
      const unsubscribe = navigation.addListener('focus', () => {
        fetchToken()
      })
      
      
      // storedBranch()
      
      return () => {
        unsubscribe
      }
      
      
    }, []);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <ProductCards/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FA0000',
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
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '70%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Category;
