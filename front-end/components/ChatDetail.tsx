import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { chatDetailStyles } from '../styles/chatDetailStyles';
import { useUser } from '../contexts/UserContext';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isScheduler?: boolean;
}

interface Contact {
  name: string;
  avatar: any;
  status?: string;
  userId: string;
}

interface ChatDetailProps {
  contact: Contact;
  onClose: () => void;
  onScheduleChat: () => void;
}

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
  const [newMessage, setNewMessage] = useState('');

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
            )}
          </View>
        ))}
      </ScrollView>

      {renderOptionsBar()}

      <View style={chatDetailStyles.inputContainer}>
        <View style={chatDetailStyles.inputWrapper}>
          <TextInput
            style={chatDetailStyles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            placeholder="Write a message..."
            testID="message-input"
          />
          <TouchableOpacity 
            style={chatDetailStyles.attachButton}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={chatDetailStyles.sendButton}>
          <Ionicons name="send" size={24} color="#0A66C2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail; 