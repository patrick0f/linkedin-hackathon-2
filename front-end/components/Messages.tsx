import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { messagesStyles } from '../styles/messagesStyles';
import CoffeeChats from './CoffeeChats';
import ChatDetail from './ChatDetail';
import { userService } from '../services/api';
import { useUser } from '../contexts/UserContext';

interface User {
  id: string;
  name: string;
  current_location: string | null;
  profile_pic?: string | null;
}

// Hardcoded messages for each user
const RANDOM_MESSAGES = [
  "Let's connect and discuss opportunities!",
  "Thanks for reaching out!",
  "Great meeting you at the conference!",
  "Would love to learn more about your work",
  "Excited to connect with you",
  "Looking forward to collaborating",
  "Thanks for accepting my connection request",
  "Interesting profile! Let's chat",
];

const MessageFilters = ['Focused', 'Coffee Chats', 'Jobs', 'Unread', 'Drafts', 'inMail'];

export const Messages = ({ onClose }: { onClose: () => void }) => {
  const { currentUser } = useUser();
  const [activeFilter, setActiveFilter] = useState('Focused');
  const [selectedChat, setSelectedChat] = useState<null | {
    name: string;
    avatar: any;
    status?: string;
    userId: string;
  }>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getAllUsers();
      // Filter out the current user
      const otherUsers = usersData.filter((user: User) => user.id !== currentUser?.id);
      setUsers(otherUsers);
      setError(null);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const handleChatPress = (user: User) => {
    setSelectedChat({
      name: user.name,
      avatar: user.profile_pic ? { uri: user.profile_pic } : require('../assets/default-profile.png'),
      status: 'Online', // Hardcoded for now
      userId: user.id,
    });
  };

  const handleScheduleChat = () => {
    setActiveFilter('Coffee Chats');
    setSelectedChat(null);
  };

  if (selectedChat) {
    return (
      <ChatDetail
        contact={selectedChat}
        onClose={() => setSelectedChat(null)}
        onScheduleChat={handleScheduleChat}
      />
    );
  }

  const renderContent = () => {
    if (activeFilter === 'Coffee Chats') {
      return <CoffeeChats />;
    }

    if (loading) {
      return (
        <View style={messagesStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0077B5" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={messagesStyles.errorContainer}>
          <Text style={messagesStyles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <ScrollView style={messagesStyles.messagesList}>
        {users.map((user, index) => {
          // Get a random message for each user
          const randomMessage = RANDOM_MESSAGES[index % RANDOM_MESSAGES.length];
          const isUnread = index % 3 === 0; // Make every third message unread

          return (
            <TouchableOpacity 
              key={user.id} 
              style={messagesStyles.messageItem}
              testID={`message-item-${user.id}`}
              onPress={() => handleChatPress(user)}
            >
              <View style={messagesStyles.avatarContainer} testID="avatar-container">
                <Image 
                  source={user.profile_pic ? { uri: user.profile_pic } : require('../assets/default-profile.png')} 
                  style={messagesStyles.avatar}
                  testID="avatar-image" 
                />
              </View>
              <View style={messagesStyles.messageContent} testID="message-content">
                <View style={messagesStyles.messageHeader} testID="message-header">
                  <Text style={messagesStyles.name} testID="message-name">
                    {user.name}
                  </Text>
                  <Text style={messagesStyles.time} testID="message-time">
                    {index % 2 === 0 ? 'Just now' : `${index + 1}h`}
                  </Text>
                </View>
                <View style={messagesStyles.messagePreview} testID="message-preview">
                  <Text
                    style={[
                      messagesStyles.messageText,
                      isUnread && messagesStyles.unreadMessage,
                    ]}
                    testID={isUnread ? 'message-text-unread' : 'message-text'}
                    numberOfLines={1}
                  >
                    {randomMessage}
                  </Text>
                  {isUnread && (
                    <View 
                      style={messagesStyles.unreadDot}
                      testID="unread-dot" 
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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