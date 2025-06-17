import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bottomNavStyles } from '../styles/bottomNavStyles';

type Screen = 'feed' | 'messages' | 'network' | 'jobs' | 'notifications';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const navigationItems = [
    { name: 'feed', icon: 'home-sharp', label: 'Home' },
    { name: 'messages', icon: 'logo-youtube', label: 'Video' },
    { name: 'network', icon: 'people-sharp', label: 'My Network' },
    { name: 'notifications', icon: 'notifications-sharp', label: 'Notifications' },
    { name: 'jobs', icon: 'briefcase', label: 'Jobs' },
  ] as const;

  return (
    <View style={bottomNavStyles.container}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            bottomNavStyles.navItem,
            currentScreen === item.name && bottomNavStyles.activeNavItem,
          ]}
          onPress={() => onNavigate(item.name)}
          testID={`nav-${item.name}`}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={currentScreen === item.name ? '#0A66C2' : '#666'}
          />
          <Text
            style={[
              bottomNavStyles.navLabel,
              currentScreen === item.name && bottomNavStyles.activeNavLabel,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}; 