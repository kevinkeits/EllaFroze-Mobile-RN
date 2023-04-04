import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import Drawer  from 'react-native-modal';
import { DropdownIcon } from '../../../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  interface AddressDetail {
    ID:string
    Name: string
    Phone: string
    StateID: string
    StateName: string
    CityID: string
    CityName: string
    DistrictID: string
    DistrictName: string
    PostalCode: string
    Address: string
    IsDefault?: number
  }

  type DetailScreenProps = {
    route: { params: { itemId: string } };
  };

const NewAddress = ({ route }: DetailScreenProps) => {
  const { itemId } = route.params;

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [pickerProvince, setPickerProvince] = useState<boolean>(false);
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [pickerDistrict, setPickerDistrict] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [detail, setDetail] = useState<AddressDetail>();
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
  const [_p, set_p] = useState('');

//   const [addressData, setAddressData] = useState<AddressInput>({
//     txtAddressName: '',
//     txtFrmPhone: '',
//     SelFrmState: '',
//     SelFrmCity: '',
//     SelFrmDistrict:'',
//     txtPostalCode:'',
//     txtAddressDetail:'',
//   });

const fetchData = async (tokenData: string) => {
  const url = `https://ellafroze.com/api/external/getUserAddress?_cb=onCompleteFetchUserAddressDetail&_p=${itemId}&_s=${tokenData}`;
  const response = await axios.get(url);
  setDetail(response.data.data);
  setLoading(false)
}

  const fetchState = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/global/getState?_cb=onCompleteFetchAddressState&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setState(response.data.data);
    setLoading(false)
  }

  const fetchCity = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/global/getCity?stateID=${selectedState}&_cb=onCompleteFetchAddressCity&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setCity(response.data.data);
    setLoading(false)
  }

  const fetchDistrict = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/global/getDistrict?cityID=${selectedCity}&_cb=onCompleteFetchAddressDistrict&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setDistrict(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    set_p(itemId)
    setToken(tokenData == null ? "" : tokenData);
    fetchData(tokenData == null ? "" : tokenData);
    fetchState(tokenData == null ? "" : tokenData);
    fetchCity(tokenData == null ? "" : tokenData);
    fetchDistrict(tokenData == null ? "" : tokenData);
    // setHdnFrmID('')
    // setHdnAction('Add')
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
    } catch (error) {
      console.error(error);
    }
  };



  const handleStateChange = (value: string) => {
    // setSelectedState(value);
    setSelFrmState(value);
    setPickerProvince(false);

    //alert(token)
    // fetchCity(token);
  };

  const handleCityChange = (value: string) => {
    // setSelectedCity(value);
    setSelFrmCity(value);
    setPickerCity(false);
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

  useEffect(() => {
    
    fetchToken()
    
    
  }, []);


  return (
    <View>
      <Text style={{marginTop:20, marginLeft:8, fontWeight:"bold", fontSize:16}}>Detail Alamat</Text>
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
        <TextInput 
        placeholder='Label Alamat cth. Rumah/Kantor' 
        style={{margin:20, borderBottomWidth:1}}
        value={txtAddressName !== '' ? txtAddressName : detail?.Name}
        onChangeText={setTxtAddressName}
        />
        <TextInput 
        placeholder='No. Telepon' 
        style={{margin:20, borderBottomWidth:1}}
        value={txtFrmPhone !== '' ? txtFrmPhone : detail?.Phone}
        onChangeText={setTxtFrmPhone}
        />

        <TouchableOpacity onPress={handlePickerProvince} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          Province : {detail?.StateName}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerCity} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          City : {detail?.CityName}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerDistrict} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          District : {detail?.DistrictName}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>


        <TextInput 
        placeholder='Kode Pos' 
        style={{margin:20, borderBottomWidth:1}}
        value={txtPostalCode !== '' ? txtPostalCode : detail?.PostalCode}
        onChangeText={setTxtPostalCode}
        />
        <TextInput 
        placeholder='Detail Alamat' 
        style={{margin:20, borderBottomWidth:1}}
        value={txtAddressDetail !== '' ? txtAddressDetail : detail?.Address}
        onChangeText={setTxtAddressDetail}
        />
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


     
    </View>
  )
}

export default NewAddress

const styles = StyleSheet.create({})