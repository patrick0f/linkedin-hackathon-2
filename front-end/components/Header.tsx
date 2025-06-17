import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '../styles/headerStyles';
import { ProfileOverlay } from './ProfileOverlay';

interface HeaderProps {
  onMessagePress: () => void;
}

export const Header = ({ onMessagePress }: HeaderProps) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <View style={headerStyles.container}>
        <TouchableOpacity onPress={() => setShowProfile(true)}>
          <Image
            style={headerStyles.profilePic}
            source={require('../assets/default-profile.png')}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={headerStyles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={headerStyles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMessagePress}>
          <Ionicons name="chatbubbles" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onMessagePress}>
          <Ionicons name="chatbubbles" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ProfileOverlay 
        visible={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}; 