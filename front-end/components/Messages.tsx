import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { messagesStyles } from '../styles/messagesStyles';
import CoffeeChats from './CoffeeChats';
import ChatDetail from './ChatDetail';

interface MessageItem {
  id: number;
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  avatar: any;
  hiring?: boolean;
  online?: boolean;
  isInMail?: boolean;
  userId: string;
  status?: string;
}

const MESSAGES: MessageItem[] = [
  {
    id: 1,
    userId: '1',
    name: 'Stuart Arnold',
    message: 'Of course send your mail',
    time: '10:07 AM',
    unread: true,
    avatar: require('../assets/default-profile.png'),
    status: 'Online',
  },
  {
    id: 2,
    userId: '2',
    name: 'Thomas Simmons',
    message: 'You: OK',
    time: 'Sat',
    avatar: require('../assets/default-profile.png'),
    hiring: true,
    status: 'Away',
  },
  {
    id: 3,
    userId: '3',
    name: 'Sandra Hernandez',
    message: 'You: I plunged headlong into QA',
    time: 'Fri',
    avatar: require('../assets/default-profile.png'),
    online: true,
    status: 'Online',
  },
  {
    id: 4,
    userId: '4',
    name: 'Ray Willis',
    message: "You: I'll be able to read it later",
    time: 'Wed',
    avatar: require('../assets/default-profile.png'),
    online: true,
    status: 'Online',
  },
  {
    id: 5,
    userId: '5',
    name: 'Mary Newman',
    message: 'Hi, there is a suggestion',
    time: 'Tue',
    isInMail: true,
    avatar: require('../assets/default-profile.png'),
    status: 'Away',
  },
];

const MessageFilters = ['Focused', 'Coffee Chats', 'Jobs', 'Unread', 'Drafts', 'inMail'];

export const Messages = ({ onClose }: { onClose: () => void }) => {
  const [activeFilter, setActiveFilter] = useState('Focused');
  const [selectedChat, setSelectedChat] = useState<MessageItem | null>(null);
  const [showCoffeeChats, setShowCoffeeChats] = useState(false);

  const handleChatPress = (message: MessageItem) => {
    setSelectedChat(message);
  };

  const handleBackToMessages = () => {
    setSelectedChat(null);
    setShowCoffeeChats(false);
  };

  if (showCoffeeChats) {
    return <CoffeeChats />;
  }

  if (selectedChat) {
    return (
      <ChatDetail
        contact={{
          name: selectedChat.name,
          avatar: selectedChat.avatar,
          status: selectedChat.status,
          userId: selectedChat.userId,
        }}
        onClose={handleBackToMessages}
        onScheduleChat={() => setShowCoffeeChats(true)}
        onNavigateToCoffeeChats={() => setShowCoffeeChats(true)}
      />
    );
  }

  const renderContent = () => {
    if (activeFilter === 'Coffee Chats') {
      return <CoffeeChats />;
    }

    return (
      <ScrollView style={messagesStyles.messagesList}>
        {MESSAGES.map((message) => (
          <TouchableOpacity 
            key={message.id} 
            style={messagesStyles.messageItem}
            testID={`message-item-${message.id}`}
            onPress={() => handleChatPress(message)}
          >
            <View style={messagesStyles.avatarContainer} testID="avatar-container">
              <Image 
                source={message.avatar} 
                style={messagesStyles.avatar}
                testID="avatar-image" 
              />
              {message.online && (
                <View 
                  style={messagesStyles.onlineIndicator}
                  testID="online-indicator" 
                />
              )}
              {message.hiring && (
                <View 
                  style={messagesStyles.hiringBadge}
                  testID="hiring-badge"
                >
                  <Text 
                    style={messagesStyles.hiringText}
                    testID="hiring-text"
                  >
                    HIRING
                  </Text>
                </View>
              )}
            </View>
            <View style={messagesStyles.messageContent} testID="message-content">
              <View style={messagesStyles.messageHeader} testID="message-header">
                <Text style={messagesStyles.name} testID="message-name">
                  {message.name}
                </Text>
                <Text style={messagesStyles.time} testID="message-time">
                  {message.time}
                </Text>
              </View>
              <View style={messagesStyles.messagePreview} testID="message-preview">
                {message.isInMail && (
                  <Text 
                    style={messagesStyles.inMailBadge}
                    testID="inmail-badge"
                  >
                    InMail
                  </Text>
                )}
                <Text
                  style={[
                    messagesStyles.messageText,
                    message.unread && messagesStyles.unreadMessage,
                  ]}
                  testID={message.unread ? 'message-text-unread' : 'message-text'}
                  numberOfLines={1}
                >
                  {message.message}
                </Text>
                {message.unread && (
                  <View 
                    style={messagesStyles.unreadDot}
                    testID="unread-dot" 
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={messagesStyles.container}>
      <View style={messagesStyles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <View style={messagesStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={messagesStyles.searchInput}
            placeholder="Search messages"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal style={messagesStyles.filtersContainer}>
        {MessageFilters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              messagesStyles.filterButton,
              filter === activeFilter && messagesStyles.activeFilter,
            ]}
            onPress={() => setActiveFilter(filter)}
            testID={`filter-button-${filter.toLowerCase().replace(' ', '-')}`}
          >
            <Text
              style={[
                messagesStyles.filterText,
                filter === activeFilter && messagesStyles.activeFilterText,
              ]}
              testID={`filter-text-${filter.toLowerCase().replace(' ', '-')}`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {renderContent()}
    </View>
  );
}; 