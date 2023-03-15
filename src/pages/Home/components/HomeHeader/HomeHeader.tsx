import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../../../assets/icons';
import Drawer  from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';


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

const HomeHeader = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>("Semua");
  const [pickerCity, setPickerCity] = useState<boolean>(false);


    const handlePickerCity = () => {
    setPickerCity(true);
  };


  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />
        <View style={{width:'100%'}}>
          <View style={{flexDirection:'row', marginVertical:2, justifyContent:'space-between', width:293}}>
          <TouchableOpacity onPress={handlePickerCity} style={{flexDirection:"row", gap:8}}>           
           <LocationIcon  />
            <Text style={{color:"white"}}>{selectedCity}</Text>
           </TouchableOpacity>         
           <View style={{flexDirection:'row', gap:20}}>
              <TouchableOpacity onPress={()=>navigation.navigate("Contact")}>
                <MessageIcon/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                <CartIcon />
              </TouchableOpacity>
            </View>
          </View>
        
        <TextInput
          style={styles.searchBar}
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholder="Search"
        />
        </View>
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
          <Picker.Item label="Semua" value="Semua" />
          <Picker.Item label="Bogor" value="Bogor" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Semarang" value="Semarang" />
        </Picker>
      )}
  </View>
</Drawer>
      </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(255, 203, 0, 0.2);',
    alignItems: 'center',
    width:'100%',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:300
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeHeader;
