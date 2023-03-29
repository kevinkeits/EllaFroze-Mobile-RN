import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  Name: string;
  Email: string;
  Phone: string;
}

interface UserInput {
  txtFrmName: string;
  txtFrmEmail: string;
  txtFrmPhone: string;
}


const AccountDetail = () => {
  const [users, setUsers] = useState<User>();
  const [formData, setFormData] = useState<UserInput>();
  const [loading, setLoading] = useState(true);

  const [txtFrmName, setTxtFrmName] = useState('');
  const [txtFrmEmail, setTxtFrmEmail] = useState('');
  const [txtFrmPhone, setTxtFrmPhone] = useState('');
    
    

    async function saveEdit(userInput: UserInput): Promise<void> {
      const apiUrl = 'https://ellafroze.com/api/external/doUpdateUser';
    
      try {
         const response = await axios.post(apiUrl, {txtFrmName, txtFrmPhone, txtFrmEmail});
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

    const handleSave = async () => {
      try {
        await saveEdit({ txtFrmName, txtFrmPhone, txtFrmEmail });
      } catch (error) {
        console.error(error);
      }
    };
  

  const fetchData = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/external/getUser?_cb=onCompleteFetchUserDetail&_p=&_s=${tokenData}`;
    const response = await axios.get(url);
    setUsers(response.data.data);

    // alert(JSON.stringify(response.data.data))
    alert(JSON.stringify(users))
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchData(tokenData == null ? "" : tokenData);
    
  };

  useEffect(() => {
    
    fetchToken()
    
    
  }, []);

  return (
    <SafeAreaView>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>Nama Lengkap</Text>
      <TextInput 
      // placeholder='Rifqi Lazuardi'
      value={users?.Name}
      onChangeText={setTxtFrmName}
      style={{borderColor:"black", borderBottomWidth:1, alignItems: "center", justifyContent:"center", padding:8, marginVertical:5, borderRadius:6}}
      />
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>No Handphone</Text>
      <TextInput 
      value={users?.Phone}
      style={{borderColor:"black", borderBottomWidth:1, alignItems: "center", justifyContent:"center", padding:8, marginVertical:5, borderRadius:6}}
      />
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 10}}>
      <Text style={{fontWeight:"bold"}}>Email</Text>
      <TextInput 
      value={users?.Email}
      style={{borderColor:"black", borderBottomWidth:1, alignItems: "center", justifyContent:"center", padding:8, marginVertical:5, borderRadius:6}}
      />
    </View>
    <View style={{ marginHorizontal: 10, marginTop: 13}}>
      {/* <Button title='SIMPAN' onPress={()=> alert("TERSIMPAN")}/> */}
      <TouchableOpacity onPress={handleSave} style={{backgroundColor:"#FA0000", borderRadius:15, alignItems:"center", paddingVertical:10}}>
        <Text style={{color:"white", fontWeight:"bold"}}>SIMPAN</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default AccountDetail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });