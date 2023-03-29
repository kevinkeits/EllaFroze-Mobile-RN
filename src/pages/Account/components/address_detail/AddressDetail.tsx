import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import Drawer  from 'react-native-modal';
import { DropdownIcon } from '../../../../assets/icons';



interface Item {
  id: string;
  label: string;
}
const AddressDetail = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [pickerProvince, setPickerProvince] = useState<boolean>(false);
  const [pickerCity, setPickerCity] = useState<boolean>(false);
  const [pickerDistrict, setPickerDistrict] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);




  const handlePickerProvince = () => {
    setPickerProvince(true);
  };
  const handlePickerCity = () => {
    setPickerCity(true);
  };
  const handlePickerDistrict = () => {
    setPickerDistrict(true);
  };


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
        <TextInput placeholder='Label Alamat' style={{margin:20, borderBottomWidth:1}}/>
        <TextInput placeholder='No Telepon' style={{margin:20, borderBottomWidth:1}}/>

        <TouchableOpacity onPress={handlePickerProvince} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          Province : {selectedProvince}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerCity} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          City : {selectedCity}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePickerDistrict} style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderBottomWidth:1, padding:8}}>
        <Text>
          District : {selectedDistrict}
        </Text>
        <DropdownIcon/>
        </TouchableOpacity>
{/* 
        <View style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <Text>
          City : {selectedCity}
        </Text>
        <TouchableOpacity onPress={handlePickerCity} style={{borderWidth:1, padding:5}}>
          <Text>Silahkan Pilih</Text>
        </TouchableOpacity>
        </View> */}

        {/* <View style={{margin:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
        <Text>
          District : {selectedDistrict}
        </Text>
        <TouchableOpacity onPress={handlePickerDistrict} style={{borderWidth:1, padding:5}}>
          <Text>Silahkan Pilih</Text>
        </TouchableOpacity>
        </View> */}


        <TextInput placeholder='Kode Pos' style={{margin:20, borderBottomWidth:1}}/>
        <TextInput placeholder='Detail Alamat' style={{margin:20, borderBottomWidth:1}}/>
      </View>
      <TouchableOpacity style={{backgroundColor:"green", padding:10, alignItems:"center", width:"95%", alignSelf:"center", marginTop:20}}>
        <Text>SIMPAN</Text>
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
          selectedValue={selectedProvince}
          onValueChange={(itemValue) => {
            setSelectedProvince(itemValue);
            setPickerProvince(false);
          }}
        >
          <Picker.Item label="Jawa Barat" value="Jawa Barat" />
          <Picker.Item label="Jawa Tengah" value="Jawa Tengah" />
          <Picker.Item label="Jakarta" value="Jakarta" />
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
          selectedValue={selectedCity}
          onValueChange={(itemValue) => {
            setSelectedCity(itemValue);
            setPickerCity(false);
          }}
        >
          <Picker.Item label="Bogor" value="Bogor" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Semarang" value="Semarang" />
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
          selectedValue={selectedDistrict}
          onValueChange={(itemValue) => {
            setSelectedDistrict(itemValue);
            setPickerDistrict(false);
          }}
        >
          <Picker.Item label="Kec. Tanah Sareal" value="Kec. Tanah Sareal" />
          <Picker.Item label="Kec. Tanah Kusir" value="Kec. Tanah Kusir" />
          <Picker.Item label="Kec. Batang" value="Batang" />
        </Picker>
      )}
  </View>
</Drawer>


     
    </View>
  )
}

export default AddressDetail

const styles = StyleSheet.create({})