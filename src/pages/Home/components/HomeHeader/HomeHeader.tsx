import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { CartIcon, LocationIcon, MessageIcon } from '../../../../assets/icons';


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
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />
        <View style={{width:'100%'}}>
          <View style={{flexDirection:'row', marginVertical:2, justifyContent:'space-between', width:300}}>
            <View style={{flexDirection:'row', gap:8}}>
            <LocationIcon  />
            <Text>Cabang</Text>
            </View>
            <View style={{flexDirection:'row', gap:10}}>
              <TouchableOpacity>
                <MessageIcon/>
              </TouchableOpacity>
              <TouchableOpacity>
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
    paddingLeft: 10,
    width:300
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeHeader;
