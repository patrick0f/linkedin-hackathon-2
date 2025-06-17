import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Feed } from './components/Feed';
import { BottomNavigation } from './components/BottomNavigation';
import { Header } from './components/Header';
import UserList from './components/UserList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <UserList />
      <Feed />
      <BottomNavigation />
    </SafeAreaView>
  );
} 