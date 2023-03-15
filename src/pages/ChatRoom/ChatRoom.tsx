import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';

interface Message {
  user: string;
  message: string;
}

const messages: Message[] = [
  { user: 'User 1', message: 'Hello' },
  { user: 'User 2', message: 'Hi' },
  { user: 'User 1', message: 'How are you?' },
  { user: 'User 2', message: 'I\'m good, thanks' },
];

const ChatRoom = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const [userMessage, setUserMessage] = useState('');

  const addMessage = () => {
    if (userMessage.trim() !== '') {
      setChatMessages([...chatMessages, { user: 'You', message: userMessage }]);
      setUserMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatMessages}>
        {chatMessages.map((message, index) => (
          <View key={index} style={message.user === 'You' ? styles.userMessageContainer : styles.otherMessageContainer}>
            <Text style={message.user === 'You' ? styles.userMessage : styles.otherMessage}>{message.message}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserMessage(text)}
          value={userMessage}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={addMessage} />
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
});

export default ChatRoom;
