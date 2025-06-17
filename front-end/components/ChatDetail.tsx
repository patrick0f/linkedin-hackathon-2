import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { chatDetailStyles } from '../styles/chatDetailStyles';

interface ChatDetailProps {
  onBack: () => void;
  onNavigateToCoffeeChats: () => void;
  schedulerInfo: {
    name: string;
    time?: string;
    date?: string;
  };
}

const ChatDetail: React.FC<ChatDetailProps> = ({
  onBack,
  onNavigateToCoffeeChats,
  schedulerInfo,
}) => {
  const [message, setMessage] = React.useState(
    "Hi! I saw we have similar interests in technology and career development. Would you be interested in having a coffee chat to discuss our experiences and potential collaboration opportunities?"
  );
  const [showOptions, setShowOptions] = useState(false);

  const renderOptionsBar = () => {
    if (!showOptions) return null;

    const options = [
      {
        icon: <MaterialIcons name="auto-awesome" size={24} color="#666" />,
        label: 'Draft a message with AI',
      },
      {
        icon: <Feather name="file-text" size={24} color="#666" />,
        label: 'Send a document',
      },
      {
        icon: <Feather name="camera" size={24} color="#666" />,
        label: 'Take a photo or video',
      },
      {
        icon: <Feather name="image" size={24} color="#666" />,
        label: 'Select media from library',
      },
      {
        icon: <MaterialIcons name="gif" size={30} color="#666" />,
        label: 'Send a GIF',
      },
      {
        icon: <Feather name="at-sign" size={24} color="#666" />,
        label: 'Mention a person',
      },
      {
        icon: <Ionicons name="cafe-outline" size={24} color="#666" />,
        label: 'Draft a coffee chat message with AI',
      },
    ];

    return (
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={() => setShowOptions(false)}
          >
            {option.icon}
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSchedulerMessage = () => {
    if (!schedulerInfo.time || !schedulerInfo.date) return null;

    return (
      <View style={styles.schedulerMessage}>
        <TouchableOpacity 
          style={styles.schedulerMessageContent}
          onPress={onNavigateToCoffeeChats}
        >
          <View style={styles.schedulerIcon}>
            <Ionicons name="calendar" size={20} color="#0A66C2" />
          </View>
          <View style={styles.schedulerTextContainer}>
            <Text style={styles.schedulerTitle}>{schedulerInfo.name} Meeting</Text>
            <Text style={styles.schedulerLink}>Coffee Chat Scheduler</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <TouchableOpacity
        style={styles.schedulerInfo}
        onPress={onNavigateToCoffeeChats}
        testID="scheduler-info"
      >
        <View style={styles.schedulerContent}>
          <View style={styles.schedulerLeft}>
            <Text style={styles.schedulerTitle}>{schedulerInfo.name} Meeting</Text>
            {schedulerInfo.time && schedulerInfo.date && (
              <Text style={styles.schedulerTime}>
                {schedulerInfo.time} on {schedulerInfo.date}
              </Text>
            )}
          </View>
          <Ionicons name="calendar-outline" size={24} color="#0A66C2" />
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.messageList}>
        {renderSchedulerMessage()}
      </ScrollView>

      {renderOptionsBar()}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholder="Write a message..."
            testID="message-input"
          />
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#0A66C2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...chatDetailStyles,
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  schedulerInfo: {
    backgroundColor: '#F3F6F8',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  schedulerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  schedulerLeft: {
    flex: 1,
  },
  schedulerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  schedulerTime: {
    fontSize: 14,
    color: '#666666',
  },
  messageList: {
    flex: 1,
  },
  schedulerMessage: {
    padding: 12,
    marginBottom: 8,
  },
  schedulerMessageContent: {
    flexDirection: 'row',
    backgroundColor: '#F3F6F8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  schedulerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  schedulerTextContainer: {
    flex: 1,
  },
  schedulerLink: {
    color: '#0A66C2',
    fontSize: 14,
    marginTop: 2,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F3F6F8',
    borderRadius: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  attachButton: {
    padding: 12,
  },
  sendButton: {
    padding: 8,
  },
});

export default ChatDetail; 