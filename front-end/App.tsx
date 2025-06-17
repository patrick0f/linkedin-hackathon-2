
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { BottomNavigation } from './components/BottomNavigation';
import { Messages } from './components/Messages';

export default function App() {
  const [showMessages, setShowMessages] = useState(false);

  if (showMessages) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" />
        <Messages onClose={() => setShowMessages(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <Header onMessagePress={() => setShowMessages(true)} />
      <Feed />
      {/* <UserList /> */}
      <BottomNavigation />
    </SafeAreaView>
  );
} 