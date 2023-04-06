import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

interface RemoveAddress {
  hdnFrmID: string;
  _s: string;
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

  interface ToggleButtonProps {
    label: string;
    onPress: (value: boolean) => void;
    initialValue: boolean;
  }

  type DetailScreenProps = {
    route: { params: { itemId: string } };
  };

const NewAddress = ({ route }: DetailScreenProps) => {
  const { itemId } = route.params;
  const navigation = useNavigation()

  // const [selectedState, setSelectedState] = useState<string>("");
  // const [selectedCity, setSelectedCity] = useState<string>("");
  // const [selectedDistrict, setSelectedDistrict] = useState<string>("");
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

  const [selFrmStateName, setSelFrmStateName] = useState('');
  const [selFrmCityName, setSelFrmCityName] = useState('');
  const [selFrmDistictName, setSelFrmDistrictName] = useState('');

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

const fetchData = async () => {
  const tokenData = await AsyncStorage.getItem('tokenID')
  const url = `https://ellafroze.com/api/external/getUserAddress?_cb=onCompleteFetchUserAddressDetail&_p=${itemId}&_s=${tokenData}`;
  const response = await axios.get(url);
  const rawData = response.data.data
  const filteredData = rawData.filter((data:AddressDetail)=>(
    data.ID == itemId
  ))
  setDetail(filteredData[0]);
  setSelFrmState(filteredData[0].StateID)
  setSelFrmStateName(filteredData[0].StateName)
  fetchCity(filteredData[0].StateID)
  setSelFrmCity(filteredData[0].CityID)
  setSelFrmCityName(filteredData[0].CityName)
  fetchDistrict(filteredData[0].CityID)
  setSelFrmDistrict(filteredData[0].DistrictID)
  setSelFrmDistrictName(filteredData[0].DistrictName)
  setTxtAddressName(filteredData[0].Name)
  setTxtAddressDetail(filteredData[0].Address)
  setTxtFrmPhone(filteredData[0].Phone)
  setTxtPostalCode(filteredData[0].PostalCode)
  setHdnFrmID(itemId)
  setHdnAction("edit")

  setToken(tokenData ?? '')

  setLoading(false)
}

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
    // const tokenData = await AsyncStorage.getItem('tokenID')
    set_p(itemId)
    // setToken(tokenData == null ? "" : tokenData);
    await fetchData();
    fetchState();
    // fetchCity(tokenData == null ? "" : tokenData);
    // fetchDistrict(tokenData == null ? "" : tokenData);
   
  };

  async function saveAddress(addressInput: AddressInput): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doSaveAddress';
  
    try {
      alert(JSON.stringify(addressInput))
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

  async function deleteAddress(deleteAddressInput: RemoveAddress): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doRemoveAddress';
  
    try {
      // alert(JSON.stringify(deleteAddressInput))
       const response = await axios.post(apiUrl, deleteAddressInput);
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

  const handleDeletePress = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: handleDeleteConfirm,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAddress({ hdnFrmID, _s });
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
    console.log('Item deleted');
  };




  const handleStateChange = (value: string) => {
    // setSelectedState(value);
    setSelFrmState(value);
    setPickerProvince(false);
    fetchCity(value);
    setDistrict([])
    const filteredData = state.filter((data:State)=>(
      data.ID == value
    ))
    setSelFrmStateName(filteredData[0].Name)

    setSelFrmCity('')
    setSelFrmCityName('')
    setSelFrmDistrict('')
    setSelFrmDistrictName('')

    //alert(token)
    // fetchCity(token);
  };

  const handleCityChange = (value: string) => {
    // setSelectedCity(value);
    setSelFrmCity(value);
    setPickerCity(false);
    fetchDistrict(value);

    const filteredData = city.filter((data:State)=>(
      data.ID == value
    ))
    setSelFrmCityName(filteredData[0].Name)

    setSelFrmDistrict('')
    setSelFrmDistrictName('')
  };

  const handleDistrictChange = (value: string) => {
    // setSelectedDistrict(value);
    setSelFrmDistrict(value);
    setPickerDistrict(false);

    const filteredData = district.filter((data:State)=>(
      data.ID == value
    ))
    setSelFrmDistrictName(filteredData[0].Name)
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

  const [value, setValue] = useState(false);

  const handlePress = () => {
    const newValue = !value;
    setValue(newValue);
    // onPress(newValue);
  };

  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };



  useEffect(() => {
    
    fetchToken()
    
    
  }, []);


  return (
    <View>
      <View style={{}}>
      <Text style={{marginTop:20, marginLeft:8, fontWeight:"bold", fontSize:16}}>Detail Alamat</Text>
      <TouchableOpacity
      onPress={handleDeletePress} 
      style={{backgroundColor:"#FA0000", padding:10,  width:60, alignSelf:"flex-end", marginRight:8, borderRadius:6}}>
      <Icon
                  name="delete"
                  type="material-community"
                  size={25}
                  color="white"
                />
      </TouchableOpacity>
      </View>
      <View style={{
        padding:10, 
        marginTop:10, 
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
          Province : {selFrmStateName}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerCity} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          City : {selFrmCityName}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerDistrict} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          District : {selFrmDistictName}
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


     
    </View>
  )
}

export default NewAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchContainer: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchOn: {
    backgroundColor: '#6fbf73',
  },
  switchOff: {
    backgroundColor: '#ccc',
  },
});