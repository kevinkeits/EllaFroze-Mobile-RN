import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import Drawer  from 'react-native-modal';
import { DropdownIcon } from '../../../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


interface AddressInput {
    txtAddressName: string;
    txtFrmPhone: string;
    SelFrmState: string;
    SelFrmCity: string;
    SelFrmDistrict: string;
    txtPostalCode: string;
    txtAddressDetail: string;
    hdnFrmID: string;
    hdnAction: string;
    _s: string;
    chkDefaultAddress?: string;
}

// export const createAddress = async (addressData: AddressInput) => {
//     try {
//       const response = await axios.post(`https://ellafroze.com/api/external/doSaveAddress`, addressData);
//       return response.data;
//       alert(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

interface State {
  ID: string;
  Name: string;
}
interface City {
    ID: string;
    Name: string;
  }
interface District {
    ID: string;
    Name: string;
  }
const NewAddress = () => {
  const navigation = useNavigation()
  // const [selectedState, setSelectedState] = useState<string>("");
  // const [selectedCity, setSelectedCity] = useState<string>("");
  // const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [pickerProvince, setPickerProvince] = useState<boolean>(false);
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [pickerDistrict, setPickerDistrict] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [state, setState] = useState<State[]>([]);
  const [city, setCity] = useState<City[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);  
  const [txtAddressName, setTxtAddressName] = useState('');
  const [txtFrmPhone, setTxtFrmPhone] = useState('');
  const [SelFrmState, setSelFrmState] = useState('');
  const [SelFrmCity, setSelFrmCity] = useState('');
  const [SelFrmDistrict, setSelFrmDistrict] = useState('');
  const [txtPostalCode, setTxtPostalCode] = useState('');
  const [hdnFrmID, setHdnFrmID] = useState('');
  const [hdnAction, setHdnAction] = useState('');
  const [txtAddressDetail, setTxtAddressDetail] = useState('');

  const [_s, setToken] = useState('');
//   const [addressData, setAddressData] = useState<AddressInput>({
//     txtAddressName: '',
//     txtFrmPhone: '',
//     SelFrmState: '',
//     SelFrmCity: '',
//     SelFrmDistrict:'',
//     txtPostalCode:'',
//     txtAddressDetail:'',
//   });

  

  const fetchState = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    const url = `https://ellafroze.com/api/global/getState?_cb=onCompleteFetchAddressState&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setState(response.data.data);
    setLoading(false)
  }

  const fetchCity = async (stateID: string) => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    const url = `https://ellafroze.com/api/global/getCity?stateID=${stateID}&_cb=onCompleteFetchAddressCity&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setCity(response.data.data);
    setLoading(false)
  }

  const fetchDistrict = async (cityID: string) => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    const url = `https://ellafroze.com/api/global/getDistrict?cityID=${cityID}&_cb=onCompleteFetchAddressDistrict&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setDistrict(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    setToken(tokenData == null ? "" : tokenData);
    fetchState();
    // fetchCity(tokenData == null ? "" : tokenData);
    // fetchDistrict(tokenData == null ? "" : tokenData);
    setHdnFrmID('')
    setHdnAction('add')
  };

  async function saveAddress(addressInput: AddressInput): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doSaveAddress';
  
    try {
       const response = await axios.post(apiUrl, addressInput);
       await AsyncStorage.getItem('tokenID')
       //alert(JSON.stringify(response.data.status))
       if (!response.data.status){
        alert(response.data.message);
       } else {
        //navigation.navigate("Login")
        alert(response.data.message)
       }   
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  const handleCreateAddress = async () => {
    try {
      await saveAddress({ txtAddressName, txtFrmPhone, SelFrmState, SelFrmCity, SelFrmDistrict, txtPostalCode, txtAddressDetail, hdnFrmID, hdnAction, _s });
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };



  const handleStateChange = (value: string) => {
    // setSelectedState(value);
    setSelFrmState(value);
    setPickerProvince(false);
    fetchCity(value)
    setDistrict([]);

    //alert(token)
    // fetchCity(token);
  };

  const handleCityChange = (value: string) => {
    // setSelectedCity(value);
    setSelFrmCity(value);
    setPickerCity(false);
    fetchDistrict(value)
  };

  const handleDistrictChange = (value: string) => {
    // setSelectedDistrict(value);
    setSelFrmDistrict(value);
    setPickerDistrict(false);
  };

  const selectedStateLabel = state.find(item => item.ID === SelFrmState);
  const selectedCityLabel = city.find(item => item.ID === SelFrmCity);
  const selectedDistrictLabel = district.find(item => item.ID === SelFrmDistrict);

  const handlePickerProvince = () => {
    setPickerProvince(true);
  };
  const handlePickerCity = () => {
    setPickerCity(true);
  };
  const handlePickerDistrict = () => {
    setPickerDistrict(true);
  };

  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };

  useEffect(() => {
    
    fetchToken()
    
    
  }, []);


  return (
    <ScrollView>
      <Text style={{marginTop:20, marginLeft:8, fontWeight:"bold", fontSize:16}}>Buat Alamat</Text>
      <View style={{
        padding:10, 
        marginTop:20, 
        marginHorizontal:8,
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
          <View style={{margin:15}}>
          <Text style={{fontWeight:"bold", marginBottom:6}}>Label Alamat</Text>
        <TextInput 
        placeholder='Tulis disini ...' 
        style={{paddingVertical:3, borderBottomWidth:1}}
        value={txtAddressName}
        onChangeText={setTxtAddressName}
        />
        </View>
        <View style={{margin:15}}>
          <Text style={{fontWeight:"bold", marginBottom:6}}>No. Telepon</Text>
        <TextInput 
        placeholder='Tulis disini ...' 
        style={{paddingVertical:3, borderBottomWidth:1}}
        value={txtFrmPhone}
        onChangeText={setTxtFrmPhone}
        />
        </View>

        <TouchableOpacity onPress={handlePickerProvince} style={{margin:15, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
        <Text style={{fontWeight:"bold"}}>Provinsi :</Text> {selectedStateLabel?.Name}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerCity} style={{margin:15, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
        <Text style={{fontWeight:"bold"}}>Kota/Kabupaten :</Text> {selectedCityLabel?.Name}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerDistrict} style={{margin:15, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
        <Text style={{fontWeight:"bold"}}>Kecamatan :</Text> {selectedDistrictLabel?.Name}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>


        <View style={{margin:15}}>
          <Text style={{fontWeight:"bold", marginBottom:6}}>Kode Pos</Text>
        <TextInput 
        placeholder='Tulis disini ...' 
        style={{paddingVertical:3, borderBottomWidth:1}}
        value={txtPostalCode}
        onChangeText={setTxtPostalCode}
        />
        </View>
        <View style={{margin:15}}>
          <Text style={{fontWeight:"bold", marginBottom:6}}>Alamat Lengkap</Text>
        <TextInput 
        placeholder='Tulis disini ...' 
        style={{paddingVertical:3, borderBottomWidth:1}}
        value={txtAddressDetail}
        onChangeText={setTxtAddressDetail}
        />
        </View>
      </View>
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10, 
        marginTop:20, 
        marginHorizontal:8,
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
      <Text>Jadikan Alamat Utama</Text>
      <TouchableOpacity activeOpacity={1} onPress={handleToggle}>
      {/* <View style={[styles.switchContainer, toggleValue ? styles.switchOn : styles.switchOff]}> */}
      <View style={{}}>
        <Icon
                  name={toggleValue ? 'toggle-switch-outline' : 'toggle-switch-off-outline'}
                  type="material-community"
                  size={45}
                  color={toggleValue ? 'green' : 'red'}
                />
      </View>
    </TouchableOpacity>
      </View>
      <TouchableOpacity  onPress={handleCreateAddress} style={{ backgroundColor:"#FA0000", padding:10, alignItems:"center", width:"95%", alignSelf:"center", marginTop:20, borderRadius:6}}>
        <Text style={{fontWeight:"bold", color:"white"}}>SIMPAN</Text>
      </TouchableOpacity>


{/* POPUPS */}
  <Drawer
  isVisible={pickerProvince}
  swipeDirection="left"
  onSwipeComplete={() => setPickerProvince(false)}
  style={{}}
>
  <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={() => setPickerProvince(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
      <Text style={{fontWeight:"bold", fontSize:16}}>X</Text>
    </TouchableOpacity>
  {pickerProvince && (
        <Picker
            selectedValue={SelFrmState}
            onValueChange={handleStateChange}
        >
            {state.map((item, index) => (
                 <Picker.Item key={index} label={item.Name} value={item.ID} />
            ))}
         
        </Picker>
      )}
  </View>
</Drawer>
<Drawer
  isVisible={pickerCity}
  swipeDirection="left"
  onSwipeComplete={() => setPickerCity(false)}
  style={{}}
>
  <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={() => setPickerCity(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
      <Text style={{fontWeight:"bold", fontSize:16}}>X</Text>
    </TouchableOpacity>
  {pickerCity && (
        <Picker
          selectedValue={SelFrmCity}
          onValueChange={handleCityChange}
        >
          {city.map((item, index) => (
                 <Picker.Item key={index} label={item.Name} value={item.ID} />
            ))}
        </Picker>
      )}
  </View>
</Drawer>
<Drawer
  isVisible={pickerDistrict}
  swipeDirection="left"
  onSwipeComplete={() => setPickerDistrict(false)}
  style={{}}
>
  <View style={{backgroundColor:"white"}}>
    <TouchableOpacity onPress={() => setPickerDistrict(false)} style={{alignSelf:"flex-end", marginHorizontal:15, marginTop:10}} >
      <Text style={{fontWeight:"bold", fontSize:16}}>X</Text>
    </TouchableOpacity>
  {pickerDistrict && (
        <Picker
          selectedValue={SelFrmDistrict}
          onValueChange={handleDistrictChange}
        >
            {district.map((item, index) => (
                 <Picker.Item key={index} label={item.Name} value={item.ID} />
            ))}
        </Picker>
      )}
  </View>
</Drawer>


     
    </ScrollView>
  )
}

export default NewAddress

const styles = StyleSheet.create({})