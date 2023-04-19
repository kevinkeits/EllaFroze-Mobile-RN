import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button, ScrollView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartIcon, LocationIcon, MessageIcon } from '../../assets/icons';
import Carousel from './components/Carousel';
import HomeArticle from './components/HomeArticle/HomeArticle';
import HomeCategory from './components/HomeCategory/HomeCategory';
import HomeCharts from './components/HomeCharts/HomeCharts';
import NotificationIcon from './components/HomeHeader/components/Icon/Icon';
import ProductCards from './components/ProductCards/ProductCards';
import Drawer  from 'react-native-modal';
import {Dimensions} from 'react-native';
import ListProduct from './components/ListProduct/ListProduct';




const items= [
  {
  id: 1,
  text: "Test"
  },
  {
    id:2,
    text: "Test2"
  }
]


const data = [
  { id: 1, image: 'https://picsum.photos/200/300' },
  { id: 2, image: 'https://picsum.photos/200/301' },
  { id: 3, image: 'https://picsum.photos/200/302' },
  { id: 4, image: 'https://picsum.photos/200/303' },
];

interface Product {
  ProductID: string;
  Product: string;
  Branch: string;
  BranchID: string;
  Discount: number;
  DiscountType: number;
  ImagePath: string;
  ItemSold: number;
  Price: number;
  Stock: number;
  Qty?: string;
  selected?:string
}

interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

interface Branch {
  ID: string;
  Name: string;
}

interface SaveCart {
  ProductID: string;
  Qty: number;
  Notes?: string;
  Source: string;
  _s:string
}

interface Category {
  ID: string;
  ImagePath: string;
  Name: string;
}

const HomePage = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('');
  //const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedBranchName, setSelectedBranchName] = useState<string>("");
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification>();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [tokenID, setToken] = useState<string>('')
  const [enableScrollView, setEnableScrollView] = useState<boolean>(true)


  const [loadingBranch, setLoadingBranch] = useState(true)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [loadingCategory, setLoadingCategory] = useState(true)

  const [loadingProductDiscount, setLoadingProductDiscount] = useState(true)
  const [loadingNotification, setLoadingNotification] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)

  //const selectedBranchLabel = branches.find(item => item.ID === selectedCity);

  // const fetchCartData = async () => {
  //   const tokenData = await AsyncStorage.getItem('tokenID')
  //   const url = `https://ellafroze.com/api/external/getCart?_cb=onCompleteFetchCart_new&_p=cartItemWrapper&_s=${tokenData}`;
  //   const response = await axios.get(url);
  
  //   //alert(JSON.stringify(response.data.data))
  //   setCartProducts(response.data.data)
  //   setLoading(false)
  // }

  const fetchData = async (token: string, selectedBranch: string) => {
    setLoadingProduct(true)
    if (selectedBranch != "") {
      const url = `https://ellafroze.com/api/external/getHighestSold?CatID=&BranchID=${selectedBranch}&Keyword=&_cb=onCompleteFetchAllProduct&_p=main-product-list&_s=${token}`;
      const response = await axios.get(url)
      setProducts(response.data.data);
      //alert('welcome back')
      setLoadingProduct(false)
    } else {
      handlePickerCity()
      setLoadingProduct(false)
    }
  }

  const fetchCategory = async (token: string) => {
    setLoadingCategory(true)
 
      const url = `https://ellafroze.com/api/external/getCategory?_cb=onCompleteFetchCategory&_p=main-category-slider&_s=${token}`;
      const response = await axios.get(url)
      setCategories(response.data.data);
      //alert('welcome back')
      setLoadingCategory(false)
  }



  async function saveCart(cartInput: SaveCart): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doSaveCart';
  
    try {
       const response = await axios.post(apiUrl, cartInput);
       if (!response.data.status){
        alert(response.data.message);
        setLoadingSave(false)
       } else {
        setLoadingSave(false)
       }
    } catch (error) {
      console.error(error);
      setLoadingSave(false)
      throw error;
    }
  }

  const setSelected = async (values?: Product) => {
    try {
      setLoadingSave(true)
      //alert(JSON.stringify(values))
      const newListProduct = products.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
          };
  
          return updatedItem;
        }
        return item;
      });
      setProducts(newListProduct)

      const newListProductDiscount = discountProducts.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
          };
  
          return updatedItem;
        }
        return item;
      });
      setDiscountProducts(newListProductDiscount)

      if (values) saveCart({  ProductID: values.ProductID, Qty: parseInt(values.Qty ?? '0'), Notes:'', Source:'cart', _s:tokenID });

      //setProducts(newList);
    } catch (err) {
      
    }
  }

  const setSelectedDiscount = async (values?: Product) => {
    try {
      setLoadingSave(true)
      const newListProduct = products.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
          };
  
          return updatedItem;
        }
        return item;
      });
      setProducts(newListProduct)

      const newListProductDiscount = discountProducts.map((item) => {
        if (item.ProductID === values?.ProductID) {
          const updatedItem = {
            ...item,
            Qty: values.Qty,
          };
  
          return updatedItem;
        }
        return item;
      });
      setDiscountProducts(newListProductDiscount)

      if (values) saveCart({  ProductID: values.ProductID, Qty: parseInt(values.Qty ?? '0'), Notes:'', Source:'cart', _s:tokenID });
    } catch (err) {
      
    }
  }

  const fetchDiscount = async (token: string, selectedBranch: string) => {
    setLoadingProductDiscount(true)
    if (selectedBranch != "") {
      const url = `https://ellafroze.com/api/external/getDiscount?BranchID=${selectedBranch}&_cb=onCompleteFetchDiscount&_p=main-discount-slider&_s=${token}`;
      const response = await axios.get(url);
      setDiscountProducts(response.data.data);
      setLoadingProductDiscount(false)
    } else {
      handlePickerCity()
      setLoadingProductDiscount(false)
    }
  }

  const fetchNotification = async (token: string) => {
    setLoadingNotification(true)
    const url = `https://ellafroze.com/api/external/getNotification?_cb=onCompleteFetchNotification&_s=${token}`;
    const response = await axios.get(url);
    setNotifications(response.data.data);
    setLoadingNotification(false)
  }

  const fetchBranch = async (token: string) => {
    setLoadingBranch(true)
    const url = `https://ellafroze.com/api/external/getBranch?_cb=onCompleteFetchBranch&_p=&_s=${token}`;
    const response = await axios.get(url);
    setBranches(response.data.data);
    setLoadingBranch(false)
  }

  const fetchToken = async () => {
    setLoadingProduct(true)
    setLoadingProductDiscount(true)

    const tokenData = await AsyncStorage.getItem('tokenID')

    const selectedBranchData = await AsyncStorage.getItem('selectedBranch')
    setToken(tokenData == null ? "" : tokenData)
      
    fetchData(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData );
    fetchDiscount(tokenData == null ? "" : tokenData, selectedBranchData == null ? "" : selectedBranchData );
    fetchNotification(tokenData == null ? "" : tokenData);
    
  };

  const fetchLimitedContent = async () => {

    const tokenData = await AsyncStorage.getItem('tokenID')
    const selectedBranchName = await AsyncStorage.getItem('selectedBranchName')

    setToken(tokenData == null ? "" : tokenData)
    const selectedBranchData = await AsyncStorage.getItem('selectedBranch')
      
    //fetchCartData()
    fetchBranch(tokenData == null ? "" : tokenData);
    setSelectedBranchName(selectedBranchName == null ? "" : selectedBranchName)
    fetchCategory(tokenData == null ? "" : tokenData);

    
  };

  const handleSearch = () => {
    navigation.navigate('Search', { searchText });
  };

  const handleCitySelection  = async (cityId: string, cityName: string) => {
    //setSelectedCity(cityId);
    setPickerCity(false);
    
    if (cityId !== "") {
      await AsyncStorage.setItem('selectedBranch', cityId)
      await AsyncStorage.setItem('selectedBranchName', cityName)
      setSelectedBranchName(cityName)
      fetchToken()
    }
  };


const handlePickerCity = async () => {
  // await AsyncStorage.setItem('selectedBranch', selectedCity)
  // alert(await AsyncStorage.getItem('selectedBranch'))
  setPickerCity(true);
};

const handleEnableScroll= (value: boolean) => {
    setEnableScrollView(value)
};

const trueEnableScroll= () => {
  setEnableScrollView(true)
};

const falseEnableScroll= () => {
  setEnableScrollView(false)
};


useEffect(() => {
    
  const unsubscribe = navigation.addListener('focus', () => {
    fetchToken()
  })

  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;
  // alert("W:" + windowWidth + " x H:" + windowHeight)

  fetchLimitedContent()
  
  

  
  return () => {
    unsubscribe
  }
  
}, []);
 

  return (
    <View style={styles.container}>
      {/* HEADER */}
       <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <View style={{width:'100%'}}>
          <View style={{flexDirection:'row', marginVertical:2, justifyContent:'space-between', width:"70%"}}>
          <TouchableOpacity onPress={handlePickerCity} style={{flexDirection:"row", gap:8}}>           
           <LocationIcon  />
            <Text style={{color:"white"}}>{selectedBranchName ? selectedBranchName : 'Pilih Cabang'}</Text>
           </TouchableOpacity>         
           <View style={{flexDirection:'row', gap:20}}>
              <TouchableOpacity onPress={()=>navigation.navigate("Contact")}>
                {/* <MessageIcon/> */}
                <NotificationIcon
                  name="mail"
                  type="material"
                  size={30}
                  notificationCount={notifications ? notifications?.messageData : 0}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                {/* <CartIcon/> */}
                <NotificationIcon
                  name="shopping-cart"
                  type="material"
                  size={30}
                  notificationCount={notifications ? notifications?.cartData : 0}
                />

              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={{alignItems:"center", marginRight:8}}>
        <Icon
                  name="search"
                  type="material"
                  size={25}
                  color="gray"
                />
      </TouchableOpacity>
      </View>
        </View>
  <Drawer
  isVisible={pickerCity}
  swipeDirection="left"
  onSwipeComplete={() => setPickerCity(false)}
  style={{}}
>
<View style={{paddingBottom:20, backgroundColor:"white"}}>
<TouchableOpacity onPress={() => setPickerCity(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
            {/* <Text style={{fontWeight:"bold", fontSize:16}}>X</Text> */}
           </TouchableOpacity>
      {branches?.map((item, index)=>(
             <TouchableOpacity
             key={index} 
             onPress={()=>handleCitySelection(item.ID, item.Name)}
             style={{
                width:"90%", 
                // flexDirection:"row", 
                alignItems:"center",
                alignSelf:"center",
                marginTop:8,
                borderRadius:8, 
                paddingVertical:10,
                backgroundColor: '#fff',
                elevation:3,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                }}>
           
                {/* <Image source={require('../../assets/images/logo.png')} style={{width:50, height:50, marginHorizontal:20}} /> */}
                <Text style={{fontSize:16}}>{item.Name}</Text>
             </TouchableOpacity>
      ))}
    </View>
</Drawer>


      </View>
      {/* HEADER */}

      <ScrollView horizontal={false} style={{width: '100%', height: '100%'}}>
      <View style={{marginTop:10}}>
         <Carousel />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:"bold", marginLeft:3}}>Produk Terlaris</Text>
          <ListProduct loadingSave={loadingSave} products={products} loading={loadingProduct} onConfirm={setSelected} />
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontSize:16, fontWeight:"bold", marginLeft:3}}>Diskon hari ini!</Text>
          <ListProduct loadingSave={loadingSave} products={discountProducts} loading={loadingProductDiscount} onConfirm={setSelectedDiscount}/>
        </View>
        <View style={{marginTop:10}}>
        <HomeCategory categories={categories} loadingCategory={loadingCategory}/>
        </View>
      <View style={{marginTop:10}}>
      <HomeArticle/>
      </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    backgroundColor:"#FA0000",
    height:120,
    paddingTop:20,
    // backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    // marginBottom: 20,
  },
  logo: {
    width: 58,
    height: 58,
    margin: 10,
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:"70%"
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerInput: {
    flexDirection: 'row',
    height: 30,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width:"70%",
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 10,
  },
});

export default HomePage;
