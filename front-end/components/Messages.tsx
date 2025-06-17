import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { messagesStyles } from '../styles/messagesStyles';

const MESSAGES = [
  {
    id: 1,
    name: 'Stuart Arnold',
    message: 'Of course send your mail',
    time: '10:07 AM',
    unread: true,
    avatar: require('../assets/default-profile.png'),
  },
  {
    id: 2,
    name: 'Thomas Simmons',
    message: 'You: OK',
    time: 'Sat',
    avatar: require('../assets/default-profile.png'),
    hiring: true,
  },
  {
    id: 3,
    name: 'Sandra Hernandez',
    message: 'You: I plunged headlong into QA',
    time: 'Fri',
    avatar: require('../assets/default-profile.png'),
    online: true,
  },
  {
    id: 4,
    name: 'Ray Willis',
    message: "You: I'll be able to read it later",
    time: 'Wed',
    avatar: require('../assets/default-profile.png'),
    online: true,
  },
  {
    id: 5,
    name: 'Mary Newman',
    message: 'Hi, there is a suggestion',
    time: 'Tue',
    isInMail: true,
    avatar: require('../assets/default-profile.png'),
  },
];

const MessageFilters = ['Focused', 'Coffee Chats', 'Jobs', 'Unread'];

export const Messages = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={messagesStyles.container} testID="messages-container">
      <View style={messagesStyles.header} testID="messages-header">
        <TouchableOpacity onPress={onClose} testID="header-back-button">
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <View style={messagesStyles.searchContainer} testID="header-search">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={messagesStyles.searchInput}
            testID="search-input"
            placeholder="Search messages"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity testID="header-menu-button">
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity testID="header-compose-button">
          <Ionicons name="create-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        style={messagesStyles.filtersContainer}
        contentContainerStyle={messagesStyles.filtersContentContainer}
        testID="filters-scroll"
      >
        {MessageFilters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              messagesStyles.filterButton,
              index === 0 && messagesStyles.activeFilter,
            ]}
            testID={`filter-button-${index}`}
          >
            <Text
              style={[
                messagesStyles.filterText,
                index === 0 && messagesStyles.activeFilterText,
              ]}
              testID={`filter-text-${index}`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={messagesStyles.messagesList}
        testID="messages-list"
      >
        {MESSAGES.map((message) => (
          <TouchableOpacity 
            key={message.id} 
            style={messagesStyles.messageItem}
            testID={`message-item-${message.id}`}
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
    </View>
  );
}; 