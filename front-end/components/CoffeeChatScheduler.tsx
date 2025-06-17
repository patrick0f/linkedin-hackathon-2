import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface TimeSlot {
  date: string;
  slots: string[];
}

interface MatchProfile {
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: any;
  careerInterests: string[];
  personalInterests: string[];
  availableTimes: TimeSlot[];
}

interface CoffeeChatSchedulerProps {
  onClose: () => void;
  onMessage: () => void;
}

const CoffeeChatScheduler: React.FC<CoffeeChatSchedulerProps> = ({ onClose, onMessage }) => {
  // Mock data - replace with actual data later
  const matchProfile: MatchProfile = {
    name: 'Thomas Simmons',
    title: 'Product Designer',
    company: 'Figma',
    location: 'San Francisco, CA',
    avatar: require('../assets/default-profile.png'),
    careerInterests: ['Product Strategy', 'UX Design', 'Agile Methodology'],
    personalInterests: ['Soccer', 'hiking', 'non-fiction books'],
    availableTimes: [
      {
        date: 'Friday June 27, 2025',
        slots: ['4:00 PM - 4:30 PM', '5:30 PM - 6:00 PM']
      },
      {
        date: 'Tuesday July 1, 2025',
        slots: ['1:15 PM - 1:45 PM']
      },
      {
        date: 'Wednesday July 2, 2025',
        slots: ['1:15 PM - 1:45 PM', '5:45 PM - 6:15 PM', '6:15 PM - 6:45 PM']
      },
      {
        date: 'Monday July 7, 2025',
        slots: ['10:00 AM - 10:30 AM']
      }
    ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Coffee Chat Scheduler</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image source={matchProfile.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{matchProfile.name} · <Text style={styles.degree}>1st</Text></Text>
            <Text style={styles.title}>{matchProfile.title} at {matchProfile.company}</Text>
            <Text style={styles.location}>{matchProfile.location}</Text>
          </View>
        </View>

        <View style={styles.interestsSection}>
          <View style={styles.interestGroup}>
            <Text style={styles.interestLabel}>Career Interests:</Text>
            <Text style={styles.interestText}>{matchProfile.careerInterests.join(', ')}</Text>
          </View>
          <View style={styles.interestGroup}>
            <Text style={styles.interestLabel}>Personal Interests:</Text>
            <Text style={styles.interestText}>{matchProfile.personalInterests.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.availabilitySection}>
          <View style={styles.availabilityHeader}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.availabilityTitle}>Available Times</Text>
          </View>
          
          {matchProfile.availableTimes.map((timeSlot, dateIndex) => (
            <View key={dateIndex} style={styles.dateGroup}>
              <Text style={styles.dateText}>{timeSlot.date}</Text>
              {timeSlot.slots.map((slot, slotIndex) => (
                <Text key={slotIndex} style={styles.timeSlot}>{slot}</Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.scheduleButton}>
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.scheduleButtonText}>Schedule Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton} onPress={onMessage}>
          <Ionicons name="chatbubble-outline" size={20} color="#0A66C2" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  degree: {
    color: '#666666',
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  interestsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  interestGroup: {
    marginBottom: 12,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  interestText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  availabilitySection: {
    padding: 16,
  },
  availabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  timeSlot: {
    fontSize: 14,
    color: '#666666',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0A66C2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#0A66C2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  messageButtonText: {
    color: '#0A66C2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CoffeeChatScheduler; 