import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <Feed />
      <BottomNavigation />
    </SafeAreaView>
  );
} 