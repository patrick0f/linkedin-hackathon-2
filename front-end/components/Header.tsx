import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '../styles/headerStyles';
import { ProfileOverlay } from './ProfileOverlay';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  onMessagePress: () => void;
}

export const Header = ({ onMessagePress }: HeaderProps) => {
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser } = useUser();

  return (
    <>
      <View style={headerStyles.container}>
        <TouchableOpacity onPress={() => setShowProfile(true)}>
          <Image
            style={headerStyles.profilePic}
            source={
              currentUser?.profile_pic
                ? { uri: currentUser.profile_pic }
                : require('../assets/default-profile.png')
            }
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
      </View>

      <ProfileOverlay 
        visible={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}; 