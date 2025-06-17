import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { chatDetailStyles } from '../styles/chatDetailStyles';
import { useUser } from '../contexts/UserContext';
import { chatgptService } from '../services/api';
import { storageService } from '../lib/storage';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isScheduler?: boolean;
  isVideoCall?: boolean;
}

interface Contact {
  name: string;
  avatar: any;
  status?: string;
  userId: string;
  title?: string;
  company?: string;
  location?: string;
  careerInterests?: string[];
  personalInterests?: string[];
  matchScore?: number;
  meetingReason?: string;
}

interface ChatDetailProps {
  contact: Contact;
  onClose: () => void;
  onScheduleChat: () => void;
  isScheduler?: boolean;
  onNavigateToCoffeeChats: () => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({
  contact,
  onClose,
  onScheduleChat,
  isScheduler = false,
  onNavigateToCoffeeChats
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [generatingMessage, setGeneratingMessage] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    // Add default message when component mounts
    /* Temporarily commented out pre-sent message
    const defaultMessage: Message = {
      id: 'default-1',
      text: `Hi ${contact.name}! I noticed we share a background in software development and both have experience with React Native. I'd love to connect and hear about your journey in mobile app development. Would you be up for a quick video chat to discuss our experiences?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: currentUser?.name || 'You'
    };

    const videoCallMessage: Message = {
      id: 'video-call-1',
      text: `${contact.name}'s meeting`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: currentUser?.name || 'You',
      isVideoCall: true
    };

    setMessages([defaultMessage, videoCallMessage]);
    */
    // Start with empty messages
    setMessages([]);
    generateAIMessage();
  }, [contact.userId]);

  const generateAIMessage = async () => {
    if (!currentUser || !contact) return;
    
    setGeneratingMessage(true);
    try {
      console.log('Generating AI message for DM...');
      console.log('Current user:', currentUser);
      console.log('Contact:', contact);
      
      // Get stored ChatGPT matches for better context
      const storedMatches = await storageService.getChatGPTMatches();
      console.log('Retrieved stored matches:', storedMatches.length, 'matches');
      
      const response = await chatgptService.generateDMStarter(
        currentUser,
        contact,
        storedMatches
      );
      
      console.log('AI DM message response:', response);
      
      if (response.success && response.dmStarter) {
        setNewMessage(response.dmStarter);
      } else {
        // Fallback message
        setNewMessage("Hi! I noticed we have similar interests and would love to connect. Would you be interested in having a coffee chat to discuss our experiences and potential collaboration opportunities?");
      }
    } catch (error) {
      console.error('Error generating AI message:', error);
      // Fallback message
      setNewMessage("Hi! I noticed we have similar interests and would love to connect. Would you be interested in having a coffee chat to discuss our experiences and potential collaboration opportunities?");
    } finally {
      setGeneratingMessage(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || sendingMessage) return;
    
    setSendingMessage(true);
    
    // Simulate sending delay
    setTimeout(() => {
      const messageToSend: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: currentUser?.name || 'You'
      };
      
      setMessages(prev => [...prev, messageToSend]);
      setNewMessage('');
      setSendingMessage(false);
      
      // Show a brief success indicator
      console.log('Message sent successfully!');
    }, 1000);
  };

  const handleRegenerateMessage = () => {
    generateAIMessage();
  };

  const renderSchedulerInfo = () => {
    if (!isScheduler) return null;

    return (
      <TouchableOpacity
        style={chatDetailStyles.schedulerInfo}
        onPress={onScheduleChat}
      >
        <View style={chatDetailStyles.schedulerContent}>
          <View style={chatDetailStyles.schedulerLeft}>
            <Text style={chatDetailStyles.schedulerTitle}>Schedule Coffee Chat</Text>
            <Text style={chatDetailStyles.schedulerSubtitle}>Find a time that works for both of you</Text>
          </View>
          <Ionicons name="calendar-outline" size={24} color="#0A66C2" />
        </View>
      </TouchableOpacity>
    );
  };

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
      <View style={chatDetailStyles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={chatDetailStyles.optionItem}
            onPress={() => setShowOptions(false)}
          >
            {option.icon}
            <Text style={chatDetailStyles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSchedulerMessage = () => {
    if (!isScheduler) return null;
    return (
      <View style={chatDetailStyles.schedulerContainer}>
        <Text style={chatDetailStyles.schedulerTitle}>
          Schedule a coffee chat with {contact.name}
        </Text>
      </View>
    );
  };

  const renderVideoCallMessage = (message: Message) => {
    return (
      <View style={chatDetailStyles.videoCallContainer}>
        <View style={chatDetailStyles.videoCallContent}>
          <View style={chatDetailStyles.videoIcon}>
            <Ionicons name="videocam" size={20} color="#0A66C2" />
          </View>
          <View style={chatDetailStyles.videoTextContainer}>
            <Text style={chatDetailStyles.videoTitle}>Coffee Chat</Text>
            <TouchableOpacity 
              style={chatDetailStyles.joinButton}
            >
              <Ionicons name="videocam" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={chatDetailStyles.joinButtonText}>Join video meeting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={chatDetailStyles.container}>
      <View style={chatDetailStyles.header}>
        <TouchableOpacity onPress={onClose} style={chatDetailStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#666" />
        </TouchableOpacity>
        <View style={chatDetailStyles.headerInfo}>
          <Text style={chatDetailStyles.headerTitle}>{contact.name}</Text>
          {contact.status && (
            <Text style={chatDetailStyles.headerStatus}>{contact.status}</Text>
          )}
        </View>
      </View>

      {renderSchedulerInfo()}

      <ScrollView style={chatDetailStyles.messageList}>
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              chatDetailStyles.messageContainer,
              message.sender === (currentUser?.name || 'You') ? chatDetailStyles.sentMessage : chatDetailStyles.receivedMessage
            ]}
          >
            {message.isVideoCall ? (
              renderVideoCallMessage(message)
            ) : message.isScheduler ? (
              <TouchableOpacity 
                style={chatDetailStyles.schedulerContainer}
                onPress={onNavigateToCoffeeChats}
              >
                <View style={chatDetailStyles.schedulerContent}>
                  <Ionicons name="calendar" size={20} color="#0A66C2" />
                  <View style={chatDetailStyles.schedulerTextContainer}>
                    <Text style={chatDetailStyles.schedulerTitle}>{message.text}</Text>
                    <Text 
                      style={chatDetailStyles.schedulerLink}
                      onPress={onNavigateToCoffeeChats}
                    >
                      Coffee Chat Scheduler
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={chatDetailStyles.messageText}>{message.text}</Text>
                <Text style={chatDetailStyles.timestamp}>{message.timestamp}</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>

      {renderSchedulerMessage()}

      {renderOptionsBar()}

      <View style={chatDetailStyles.inputContainer}>
        <View style={chatDetailStyles.inputWrapper}>
          {generatingMessage ? (
            <View style={chatDetailStyles.loadingInputContainer}>
              <ActivityIndicator size="small" color="#0A66C2" />
              <Text style={chatDetailStyles.loadingInputText}>Generating AI message...</Text>
            </View>
          ) : (
            <TextInput
              style={chatDetailStyles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              placeholder="Write a message..."
              testID="message-input"
              editable={!generatingMessage}
            />
          )}
          <TouchableOpacity 
            style={chatDetailStyles.attachButton}
            onPress={() => setShowOptions(!showOptions)}
            disabled={generatingMessage}
          >
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        {/* Regenerate AI Message Button */}
        {!messages.length && !generatingMessage && (
          <TouchableOpacity 
            style={chatDetailStyles.regenerateButton}
            onPress={handleRegenerateMessage}
            disabled={generatingMessage}
          >
            <Ionicons name="refresh" size={20} color="#0A66C2" />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[chatDetailStyles.sendButton, (!newMessage.trim() || sendingMessage || generatingMessage) && chatDetailStyles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim() || sendingMessage || generatingMessage}
        >
          {sendingMessage ? (
            <ActivityIndicator size="small" color="#0A66C2" />
          ) : (
            <Ionicons name="send" size={24} color="#0A66C2" />
          )}
        </TouchableOpacity>
      </View>

      {/* Video Call Modal - Temporarily commented out */}
      {/*
      <Modal
        visible={showVideoModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowVideoModal(false)}
      >
        <View style={chatDetailStyles.modalOverlay}>
          <View style={chatDetailStyles.videoModalContent}>
            <View style={chatDetailStyles.videoModalHeader}>
              <Text style={chatDetailStyles.videoModalTitle}>{contact.name}'s meeting</Text>
              <TouchableOpacity onPress={() => setShowVideoModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={chatDetailStyles.videoModalBody}>
              <Text style={chatDetailStyles.videoModalText}>The meeting isn't loading for some reason</Text>
              <Text style={chatDetailStyles.videoModalSubtext}>Can we use Zoom or Google Meets?</Text>
            </View>
          </View>
        </View>
      </Modal>
      */}
    </View>
  );
};

export default ChatDetail; 