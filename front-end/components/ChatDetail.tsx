<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
=======
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
import { chatDetailStyles } from '../styles/chatDetailStyles';
import { useUser } from '../contexts/UserContext';

interface ChatDetailProps {
  onBack: () => void;
  onNavigateToCoffeeChats: () => void;
  schedulerInfo: {
    name: string;
<<<<<<< HEAD
    time?: string;
    date?: string;
=======
    avatar: any;
    status?: string;
    userId: string;
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
  };
}

<<<<<<< HEAD
const ChatDetail: React.FC<ChatDetailProps> = ({
  onBack,
  onNavigateToCoffeeChats,
  schedulerInfo,
}) => {
  const [message, setMessage] = React.useState(
    "Hi! I saw we have similar interests in technology and career development. Would you be interested in having a coffee chat to discuss our experiences and potential collaboration opportunities?"
  );
  const [showOptions, setShowOptions] = useState(false);
=======
// Different conversation starters based on the user's name
const CONVERSATION_TEMPLATES = [
  {
    topic: 'software_engineering' as const,
    messages: [
      "Hi! I noticed you're working in software engineering. I'd love to learn more about your experience.",
      "Thanks for connecting! I'm particularly interested in your work with cloud technologies.",
      "I saw your profile and your background in full-stack development is impressive.",
      "Hello! Your experience in AI/ML caught my attention. Would love to chat about it.",
    ]
  },
  {
    topic: 'data_science' as const,
    messages: [
      "Hi there! Your data science projects look fascinating. Would love to discuss your approach.",
      "I'm interested in your work with big data analytics. Could we connect to discuss?",
      "Your experience in machine learning is impressive. Would you be open to sharing insights?",
      "Hello! I noticed you work with data visualization. I'd love to learn from your experience.",
    ]
  },
  {
    topic: 'product_management' as const,
    messages: [
      "Hi! Your product management experience is exactly what I'm looking to learn about.",
      "I'm fascinated by your approach to product development. Would love to chat.",
      "Your product strategy work looks interesting. Could we discuss your methodology?",
      "Hello! I'd love to learn about how you prioritize product features.",
    ]
  },
  {
    topic: 'design' as const,
    messages: [
      "Your design portfolio is amazing! Would love to hear about your creative process.",
      "Hi! I'm impressed by your UI/UX work. Could we discuss your approach?",
      "Your design solutions are innovative. Would you share some insights?",
      "Hello! I'd love to learn about your experience in product design.",
    ]
  }
] as const;

type Topic = typeof CONVERSATION_TEMPLATES[number]['topic'];

// Follow-up messages for each topic
const FOLLOW_UP_MESSAGES: Record<Topic, string[]> = {
  software_engineering: [
    "What technologies are you currently working with?",
    "How do you approach system design in your projects?",
    "What's your take on microservices vs monolithic architectures?",
    "How do you handle scalability challenges?",
  ],
  data_science: [
    "What tools do you prefer for data analysis?",
    "How do you approach feature engineering?",
    "What's your experience with deep learning?",
    "How do you handle data preprocessing?",
  ],
  product_management: [
    "How do you gather user feedback?",
    "What's your approach to roadmap planning?",
    "How do you measure product success?",
    "What frameworks do you use for decision making?",
  ],
  design: [
    "What's your favorite design tool?",
    "How do you approach user research?",
    "What's your process for design systems?",
    "How do you handle design handoff to developers?",
  ],
};

const ChatDetail: React.FC<ChatDetailProps> = ({ contact, onClose, onScheduleChat }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { currentUser } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Generate a conversation based on the user's name
    const nameSum = contact.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const topicIndex = nameSum % CONVERSATION_TEMPLATES.length;
    const topic = CONVERSATION_TEMPLATES[topicIndex].topic;
    
    // Get conversation template
    const template = CONVERSATION_TEMPLATES[topicIndex];
    const initialMessage = template.messages[nameSum % template.messages.length];
    const followUpMessage = FOLLOW_UP_MESSAGES[topic][nameSum % FOLLOW_UP_MESSAGES[topic].length];

    // Generate timestamps
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Create conversation
    const conversation: Message[] = [
      {
        id: '1',
        text: initialMessage,
        timestamp: `${hour-2}:${minute.toString().padStart(2, '0')}`,
        sender: contact.name,
      },
      {
        id: '2',
        text: "Thanks for reaching out! I'd be happy to chat.",
        timestamp: `${hour-2}:${(minute+5).toString().padStart(2, '0')}`,
        sender: currentUser?.name || 'You',
      },
      {
        id: '3',
        text: followUpMessage,
        timestamp: `${hour-1}:${minute.toString().padStart(2, '0')}`,
        sender: contact.name,
      },
      {
        id: '4',
        isScheduler: true,
        text: `Chat with ${contact.name}`,
        timestamp: `${hour-1}:${(minute+2).toString().padStart(2, '0')}`,
        sender: contact.name,
      },
      {
        id: '5',
        text: "Perfect! Looking forward to our chat.",
        timestamp: `${hour}:${minute.toString().padStart(2, '0')}`,
        sender: currentUser?.name || 'You',
      },
    ];

    setMessages(conversation);
  }, [contact.name, currentUser?.name]);
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6

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

<<<<<<< HEAD
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
=======
      <ScrollView style={chatDetailStyles.messageList}>
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              chatDetailStyles.messageContainer,
              message.sender === (currentUser?.name || 'You') ? chatDetailStyles.sentMessage : chatDetailStyles.receivedMessage
            ]}
          >
            {message.isScheduler ? (
              <TouchableOpacity 
                style={chatDetailStyles.schedulerContainer}
                onPress={onScheduleChat}
              >
                <View style={chatDetailStyles.schedulerContent}>
                  <Ionicons name="calendar" size={20} color="#0A66C2" />
                  <View style={chatDetailStyles.schedulerTextContainer}>
                    <Text style={chatDetailStyles.schedulerTitle}>{message.text}</Text>
                    <Text 
                      style={chatDetailStyles.schedulerLink}
                      onPress={onScheduleChat}
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
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
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