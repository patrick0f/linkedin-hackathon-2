import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '../styles/headerStyles';

export const Header = () => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity>
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

      <TouchableOpacity>
        <Ionicons name="chatbubbles" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
}; 