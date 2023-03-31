import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import NotificationIcon from '../../components/Header/components/Icon/Icon';
import HeaderChat from './components/Header/HeaderChat';

interface Message {
  user: string;
  message: string;
}

interface MessageInput {
  Message: string;
  BranchID: string;
  _cb: string;
  _p: string;
  _s: string
}

interface MessageProps {
  ID: string;
  IsReadByBranch: number;
  IsReadByCustomer: number;
  IsReply: number;
  Message: string;
}

type ChatScreenProps = {
  route: { params: { itemId: string } };
  branchName: string
};

interface Notification {
  cartData: number;
  messageData: number;
  orderData: number;
}

const messages: Message[] = [
  { user: 'User 1', message: 'Hello' },
  { user: 'User 2', message: 'Hi' },
  { user: 'User 1', message: 'How are you?' },
  { user: 'User 2', message: 'I\'m good, thanks' },
];

const ChatRoom = ({ route, branchName }: ChatScreenProps) => {
  const { itemId } = route.params;
  const navigation = useNavigation();

  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const [userMessage, setUserMessage] = useState('');
  const [currentBranchName, setCurrentBranchName] = useState('');
  const [messagesData, setMessagesData] = useState<MessageProps[]>();
  const [Message, setMessage] = useState('');
  const [BranchID, setBranchID] = useState('');
  const [_s, setToken] = useState('');
  const [_cb, set_cb] = useState('');
  const [_p, set_p] = useState('');





  const [notifications, setNotifications] = useState<Notification>();
  const [loading, setLoading] = useState(true);

  const fetchNotification = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getNotification?_cb=onCompleteFetchNotification&_s=${token}`;
    const response = await axios.get(url);
    setNotifications(response.data.data);
    setLoading(false)
  }


  const fetchDataDetail = async (token: string) => {
    const url = `https://ellafroze.com/api/external/getChatDetail?BranchID=${itemId}&_cb=onCompleteFetchChatDetail&_p=chatMessagesWrapper&_s=${token}`;
    const response = await axios.get(url);
    setMessagesData(response.data.data);
    setLoading(false)
  }

  const fetchToken = async () => {
    const tokenData = await AsyncStorage.getItem('tokenID')
    const branchNameData = await AsyncStorage.getItem('branchName')
    setCurrentBranchName(branchNameData == null ? "" : branchNameData)
    setToken(tokenData == null ? "" : tokenData)
    setBranchID(itemId) 
    fetchDataDetail(tokenData == null ? "" : tokenData);
    
  };

  async function messageUser(messageInput: MessageInput): Promise<void> {
    const apiUrl = 'https://ellafroze.com/api/external/doSaveMessage';
  
    try {
       const response = await axios.post(apiUrl, messageInput);
       if (!response.data.status){
        alert(response.data.message);
       } else {
        // navigation.navigate("MainApp")
        // await AsyncStorage.setItem('tokenID', response.data.data.Token)
        fetchDataDetail(_s);
        setMessage('')
      }   
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleMessageUser = async () => {
    try {
      await messageUser({  Message, BranchID, _cb, _s, _p });
    } catch (error) {
      console.error(error);
    }
  };


  const addMessage = () => {
    if (userMessage.trim() !== '') {
      setChatMessages([...chatMessages, { user: 'You', message: userMessage }]);
      setUserMessage('');
    }
  };

  const sendMessage = () => {
    if (userMessage.trim() !== '') {
      setChatMessages([...chatMessages, { user: 'You', message: userMessage }]);
      setUserMessage('');
    }
  };


  useEffect(() => { 
    
    fetchToken()
  
    
    
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{alignItems:"center", marginTop:30, marginLeft:15}} >
               <Icon
                  name="arrow-back"
                  type="material"
                  size={40}
                  color="white"
                />
          </TouchableOpacity>
        
          <View style={styles.containerInput}>
                 <Text style={{fontWeight:"bold", fontSize:16, color:"white"}}>Admin {currentBranchName}</Text>
        </View>  
      </View>
      
      <ScrollView style={styles.chatMessages}>
        {/* {chatMessages.map((message, index) => (
          <View key={index} style={message.user === 'You' ? styles.userMessageContainer : styles.otherMessageContainer}>
            <Text style={message.user === 'You' ? styles.userMessage : styles.otherMessage}>{message.message}</Text>
          </View>
        ))} */}
        {messagesData?.map((message, index) => (
          <View key={index} style={message.IsReadByCustomer === 1 ? styles.userMessageContainer : styles.otherMessageContainer}>
            <Text style={message.IsReadByCustomer === 1 ? styles.userMessage : styles.otherMessage}>{message.Message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={Message}
          multiline={true}
        numberOfLines={4}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={handleMessageUser} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userMessageContainer: {
    backgroundColor: '#ECEFF1',
    alignSelf: 'flex-end',
    padding: 10,
    marginVertical: 5,
    marginRight: 10,
    maxWidth: '80%',
    borderRadius: 10,
  },
  otherMessageContainer: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    padding: 10,
    marginVertical: 5,
    marginLeft: 10,
    maxWidth: '80%',
    borderRadius: 10,
  },
  userMessage: {
    color: '#000',
  },
  otherMessage: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:150,
    // borderTopWidth:1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
        elevation:3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
          },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
  },
  input: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor:"#FA0000",
    // justifyContent:"space-around",
    alignItems: 'center',
    width:'100%',
    height:100,
   
  },
  searchBar: {
    height: 25,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 13,
    width:"90%",
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerInput: {
    // flexDirection: 'row',
    // height: 30,
    // borderColor: 'gray',
    // backgroundColor: '#fff',
    // borderWidth: 1,
    // borderRadius: 10,
    width:"65%", marginLeft:10, marginTop:30,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 16,
  },
  inputHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 10,
  },
});

export default ChatRoom;
