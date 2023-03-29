import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';


type Tab = {
  id: string;
  label: string;
  content: JSX.Element;
}



const HomeArticle = () => {
  const [activeTab, setActiveTab] = useState(0);


  const tabs: Tab[] = [
    {
      id: '1',
      label: 'Resep',
      content: (
        <TouchableOpacity style={{
          margin:7, 
          // borderWidth:1, 
          paddingVertical:15,
          backgroundColor: '#fff',
          elevation:3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          }} >
        
          <View style={{flexDirection:"row", gap:4}}>
          <View style={{marginVertical:10, alignItems:"center", width:"40%"}}>
            <View>
              {/* <Image source={{ uri: '../../assets/images/BCALogo.png' }}/> */}
              <Text>IMAGE</Text>
            </View>
          </View>

          <View style={{marginVertical:10}}>
          <Text style={{fontWeight:"bold", fontSize:16, marginBottom:4}}>
              Tenggiri Tauco
          </Text>
            <Text>Detail:</Text>
            <Text>Berat: 125 gram</Text>
            <Text>Bahan Baku: Ikan Satu</Text>
          </View>
          </View>

        </TouchableOpacity>
      ),
    },
    {
      id: '2',
      label: 'Artikel',
      content: (
        <View style={{
          margin:10, 
          paddingVertical:15,
          backgroundColor: '#fff',
          elevation:3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          }} >
        <View style={{backgroundColor:"red", width:100, alignItems:"center", padding:4, borderRadius:10, alignSelf:"flex-end", marginRight:8, marginBottom:8}}>
          <Text style={{color:"white", fontWeight:"bold"}}>Di Proses</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-evenly",}}>
        <View style={{marginVertical:10, alignItems:"center"}}>
          <View>
            {/* <Image source={{ uri: '../../assets/images/BCALogo.png' }}/> */}
            <Text>BCA</Text>
          </View>
          <View>
          <View style={{marginTop:40}}>
            <Text>Jumlah Dibayar</Text>
            <Text style={{fontWeight:"bold"}}>Rp.74,000</Text>
          </View>
          </View>
        </View>

        <View style={{marginVertical:10, alignItems:"center"}}>
        <Text style={{fontWeight:"bold"}}>
            BCA Virtual Account
        </Text>
          <View style={{flexDirection:"row"}}>
          <Text>
            3232192139733
          </Text>
          <TouchableOpacity>
            <Text style={{textDecorationLine:"underline", color:"green"}}>Copy</Text>
          </TouchableOpacity>
          </View>
          <View style={{marginTop:22}}>
          <Text >
            Bayar Sebelum
          </Text>
          <Text style={{fontWeight:"bold"}}>
            2023-03-11 10:46:53
          </Text>
          </View>
        </View>
        </View>

      </View>
      ),
    },
  ];

  const handleTabPress = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar1}>
        <Text>Artikel dan Resep</Text>
        <TouchableOpacity>
          <Text style={{color:"blue"}}>Lihat semua</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              index === activeTab && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabButtonText,
                index === activeTab && styles.activeTabButtonText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabs[activeTab].content}
    </View>
  )
}

export default HomeArticle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center",
    // justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor:"#fff",
    borderBottomColor: '#ccc',
  },
  tabBar1: {
    flexDirection: 'row',
    // alignItems:"center",
    // justifyContent:"center",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor:"#fff",
    borderBottomColor: '#ccc',
    marginBottom:5
  },

  tabButton: {
    paddingHorizontal: 10,
    alignItems:"center",
    width:"50%",
    paddingVertical: 5,
    borderRadius: 4,
  },
  activeTabButton: {
    backgroundColor: '#ccc',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeTabButtonText: {
    color: '#fff',
  },
});