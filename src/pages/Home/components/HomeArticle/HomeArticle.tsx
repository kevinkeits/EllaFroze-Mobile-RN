import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BCALogo } from '../../assets';

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
        <View style={{
          margin:10, 
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
          <View style={{backgroundColor:"red", width:100, alignItems:"center", padding:4, borderRadius:10, alignSelf:"flex-end", marginRight:8, marginBottom:8}}>
            <Text style={{color:"white", fontWeight:"bold"}}>Belum Bayar</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor:"#fff",
    borderBottomColor: '#ccc',
  },
  tabButton: {
    paddingHorizontal: 10,
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