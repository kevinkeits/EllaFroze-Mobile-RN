import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BCALogo } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TransactionCard from './components/TransactionCard/TransactionCard';
import PaidTransactionCard from './components/PaidTransactionCard/PaidTransactionCard';

type Tab = {
  id: string;
  label: string;
  content: JSX.Element;
}

interface UnpaidTransaction {
  ExpiredDate: string;
  GopayDeepLink: string;
  GrossAmount: number;
  ID: string;
  IsExpired: number;
  IsPaid: number;
  OrderID: string;
  PaymentLogo: string;
  PaymentMethod: number;
  PaymentMethodCategory: string;
  ReferenceID: string;
}

interface PaidTransaction {
  CreatedDate: string;
  Branch: string;
  GrossAmount: number;
  ID: string;
  ImagePath: string;
  Status: number;
  Product: string;
  TotalItem: number;
}

const Transaction = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [unpaidTransactions, setUnpaidTransactions] = useState<UnpaidTransaction[]>([]);
  const [onProcess, setOnProcess] = useState<PaidTransaction[]>([]);
  const [sent, setSent] = useState<PaidTransaction[]>([]);
  const [doneTransactions, setDoneTransactions] = useState<PaidTransaction[]>([]);
  const [canceled, setCanceled] = useState<PaidTransaction[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchUnpaidTransaction = async (tokenData: string) => {
    const url = `https://ellafroze.com/api/external/getUnpaidTransaction?_cb=onCompleteFetchUnpaidTransaction&_p=transaction-unpaid-wrapper&_s=${tokenData}`;
    const response = await axios.get(url);
    
    setUnpaidTransactions(response.data.data);
    setLoading(false)
  }

  const fetchPaidTransaction = async (tokenData: string, status: number) => {
    const url = `https://ellafroze.com/api/external/getTransaction?_cb=onCompleteFetchTransaction&Status=${status}&_p=transaction-confirmed-wrapper&_s=${tokenData}`;
    const response = await axios.get(url);
    
    if(status==2) {
    setOnProcess(response.data.data);
    setLoading(false)}
    else if (status==3) {
      setSent(response.data.data);
      setLoading(false)
    }
    else if (status==4) {
      setDoneTransactions(response.data.data);
      setLoading(false)
    } else {
      setCanceled(response.data.data);
      setLoading(false)
    }
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    fetchUnpaidTransaction(tokenData == null ? "" : tokenData);

    fetchPaidTransaction(tokenData == null ? "" : tokenData, 2)
    fetchPaidTransaction(tokenData == null ? "" : tokenData, 3)
    fetchPaidTransaction(tokenData == null ? "" : tokenData, 4)
    fetchPaidTransaction(tokenData == null ? "" : tokenData, 5)
    
  };

  const handleNavigate = async (itemId: string, branchName: string) => {
    
    await AsyncStorage.setItem('branchName', branchName)
    navigation.navigate('ChatRoom', {itemId, branchName})
    // alert(branchName)
    // alert(`Button clicked for item ${itemId}`);
  };

useEffect(() => {
    
  fetchToken()
  
  
}, []);

  const tabs: Tab[] = [
    {
      id: '1',
      label: 'BAYAR',
      content: (
        <TransactionCard unpaidTransactions={unpaidTransactions} statusLabel="Belum Bayar"/>
      ),
    },
    {
      id: '2',
      label: 'DIPROSES',
      content: (
       <PaidTransactionCard Transactions={onProcess} statusLabel="DIPROSES"/>
      ),
    },
    {
      id: '3',
      label: 'DIKIRIM',
      content: (
        <PaidTransactionCard Transactions={sent} statusLabel="DIKIRIM"/>
      ),
    },
    {
      id: '4',
      label: 'SELESAI',
      content: (
        <PaidTransactionCard Transactions={doneTransactions} statusLabel="SELESAI"/>
      ),
    },
    {
      id: '5',
      label: 'BATAL',
      content: (
        <PaidTransactionCard Transactions={canceled} statusLabel={"BATAL"}/>
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

export default Transaction

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