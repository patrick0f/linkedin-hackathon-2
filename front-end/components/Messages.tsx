import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { messagesStyles } from '../styles/messagesStyles';
import CoffeeChats from './CoffeeChats';

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
  const [activeFilter, setActiveFilter] = useState('Focused');

  const renderContent = () => {
    if (activeFilter === 'Coffee Chats') {
      return <CoffeeChats />;
    }

    return (
      <ScrollView style={messagesStyles.messagesList}>
        {MESSAGES.map((message) => (
          <TouchableOpacity key={message.id} style={messagesStyles.messageItem}>
            <View style={messagesStyles.avatarContainer}>
              <Image source={message.avatar} style={messagesStyles.avatar} />
              {message.online && <View style={messagesStyles.onlineIndicator} />}
              {message.hiring && (
                <View style={messagesStyles.hiringBadge}>
                  <Text style={messagesStyles.hiringText}>HIRING</Text>
                </View>
              )}
            </View>
            <View style={messagesStyles.messageContent}>
              <View style={messagesStyles.messageHeader}>
                <Text style={messagesStyles.name}>{message.name}</Text>
                <Text style={messagesStyles.time}>{message.time}</Text>
              </View>
              <View style={messagesStyles.messagePreview}>
                {message.isInMail && (
                  <Text style={messagesStyles.inMailBadge}>InMail</Text>
                )}
                <Text
                  style={[
                    messagesStyles.messageText,
                    message.unread && messagesStyles.unreadMessage,
                  ]}
                  numberOfLines={1}
                >
                  {message.message}
                </Text>
                {message.unread && <View style={messagesStyles.unreadDot} />}
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
          >
            <Text
              style={[
                messagesStyles.filterText,
                filter === activeFilter && messagesStyles.activeFilterText,
              ]}
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