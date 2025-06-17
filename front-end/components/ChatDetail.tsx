import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { chatDetailStyles } from '../styles/chatDetailStyles';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isScheduler?: boolean;
}

interface ChatDetailProps {
  contact: {
    name: string;
    avatar: any;
    status?: string;
  };
  onClose: () => void;
  onScheduleChat: () => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ contact, onClose, onScheduleChat }) => {
  // Mock messages - replace with actual messages later
  const messages: Message[] = [
    {
      id: '1',
      text: "Hey there! I'm Yuri, a CS student at Columbia, and I am interested in software engineering and have LinkedIn as a Top Company. We both have matching available times on Thursdays at 5:30. Would you be up to chat more about your role?",
      timestamp: '7:00PM',
      sender: 'Yuri Dud'
    },
    {
      id: '2',
      text: 'Ok, no problem.',
      timestamp: '7:05PM',
      sender: 'Timothy Hodges'
    },
    {
      id: '3',
      isScheduler: true,
      text: 'Yuri meeting',
      timestamp: '7:08PM',
      sender: 'Yuri Dud'
    },
    {
      id: '4',
      text: 'Great! See you Wednesday.',
      timestamp: '7:23PM',
      sender: 'Timothy Hodges'
    },
    {
      id: '5',
      text: 'Sounds good. I am excited to hear about your experinece.',
      timestamp: '7:37PM',
      sender: 'Yuri Dud'
    }
  ];

  return (
    <View style={chatDetailStyles.container}>
      <View style={chatDetailStyles.header}>
        <View style={chatDetailStyles.headerLeft}>
          <TouchableOpacity onPress={onClose} style={chatDetailStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>
          <Image source={contact.avatar} style={chatDetailStyles.avatar} />
          <View style={chatDetailStyles.contactInfo}>
            <Text style={chatDetailStyles.contactName}>{contact.name}</Text>
            {contact.status && (
              <Text style={chatDetailStyles.statusText}>{contact.status}</Text>
            )}
          </View>
        </View>

        <View style={chatDetailStyles.headIcons}>
            <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onScheduleChat}>
            <Ionicons name="calendar-outline" size={24} color="#666" />
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={chatDetailStyles.messageList}>
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              chatDetailStyles.messageContainer,
              message.sender === 'Timothy Hodges' ? chatDetailStyles.sentMessage : chatDetailStyles.receivedMessage
            ]}
          >
            {message.isScheduler ? (
              <TouchableOpacity 
                style={chatDetailStyles.schedulerContainer}
                onPress={onScheduleChat}
              >
                <View style={chatDetailStyles.schedulerContent}>
                  <Ionicons name="calendar" size={20} color="#0A66C2" />
                  <View style={chatDetailStyles.schedulerTextContainer}>
                    <Text style={chatDetailStyles.schedulerTitle}>{message.text}</Text>
                    <Text 
                      style={chatDetailStyles.schedulerLink}
                      onPress={onScheduleChat}
                    >
                      Coffee Chat Scheduler
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={chatDetailStyles.messageText}>{message.text}</Text>
                <Text style={chatDetailStyles.timestamp}>{message.timestamp}</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={chatDetailStyles.inputContainer}>
        <TouchableOpacity style={chatDetailStyles.sendButton}>
            <SimpleLineIcons name="paper-clip" size={24} color="#666" />
        </TouchableOpacity>

        <TextInput
          style={chatDetailStyles.input}
          placeholder="Write a message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity style={chatDetailStyles.sendButton}>
          <Ionicons name="send" size={24} color="#0A66C2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail; 