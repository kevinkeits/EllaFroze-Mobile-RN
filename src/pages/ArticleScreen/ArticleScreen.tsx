import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ArticleCard from './components/ArticleCard/ArticleCard';


type Tab = {
  id: string;
  label: string;
  content: JSX.Element;
}

interface Article {
    ID: string;
    Type: string;
    ImageUrl: string;
    Contents: string;

  }



const ArticleScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [Recipe, setRecipe] = useState<Article[]>([]);
  const [Article, setArticle] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticle = async ( type: number) => {
    const url = `https://ellafroze.com/api/external/getArticle?Type=${type}`;
    const response = await axios.get(url);
    if(type==1) {
    setRecipe(response.data.data);
    setLoading(false)}
    else {
      setArticle(response.data.data);
      setLoading(false)
    }
  }

  const fetchToken = async () => {
    fetchArticle(1)
    fetchArticle(2)
    
  };



useEffect(() => {
    
  fetchToken()
  
  
}, []);





  const tabs: Tab[] = [
    {
      id: '1',
      label: 'Resep',
      content: (
       <ArticleCard data={Recipe}/>
      ),
    },
    {
      id: '2',
      label: 'Artikel',
      content: (
        <ArticleCard data={Article}/>
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

export default ArticleScreen

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