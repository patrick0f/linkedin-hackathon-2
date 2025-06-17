import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavStyles } from '../styles/bottomNavStyles';

export const BottomNavigation = () => {
  return (
    <View style={bottomNavStyles.container}>
      <TouchableOpacity style={bottomNavStyles.tab}>
        <Ionicons name="home" size={24} color="#666" />
        <Text style={bottomNavStyles.tabText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavStyles.tab}>
        <Ionicons name="people" size={24} color="#666" />
        <Text style={bottomNavStyles.tabText}>My Network</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavStyles.tab}>
        <Ionicons name="add-circle" size={24} color="#666" />
        <Text style={bottomNavStyles.tabText}>Post</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavStyles.tab}>
        <Ionicons name="notifications" size={24} color="#666" />
        <Text style={bottomNavStyles.tabText}>Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={bottomNavStyles.tab}>
        <Ionicons name="briefcase" size={24} color="#666" />
        <Text style={bottomNavStyles.tabText}>Jobs</Text>
      </TouchableOpacity>
    </View>
  );
}; 