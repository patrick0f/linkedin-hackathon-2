import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import ScheduleConfirmationModal from './ScheduleConfirmationModal';

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
  onNavigateToChat: (schedulerInfo: {
    name: string;
    time?: string;
    date?: string;
  }) => void;
}

const CoffeeChatScheduler: React.FC<CoffeeChatSchedulerProps> = ({
  onClose,
  onNavigateToChat
}) => {
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    date: string;
  } | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [greeting, setGreeting] = useState('Hi Thomas, looking forward to our coffee chat!');

  // Mock data - replace with actual data later
  const matchProfile: MatchProfile = {
    name: "Thomas Simmons",
    title: "Product Designer",
    company: "Figma",
    location: "San Francisco, CA",
    avatar: require('../assets/default-profile.png'),
    careerInterests: ["Product Strategy", "UX Design", "Agile Methodology"],
    personalInterests: ["Soccer", "hiking", "non-fiction books"],
    availableTimes: [
      {
        date: "Monday, Mar 18",
        slots: ["9:00 AM", "10:00 AM", "2:00 PM"]
      },
      {
        date: "Tuesday, Mar 19",
        slots: ["11:00 AM", "3:00 PM", "4:00 PM"]
      }
    ]
  };

  const handleTimeSlotPress = (slot: string, date: string) => {
    setSelectedTime({ time: slot, date });
    setShowMeetingModal(true);
  };

  const handleScheduleMeeting = () => {
    setShowMeetingModal(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowConfirmation(true);
    }, 100);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setShowMeetingModal(false);
    setSelectedTime(null);
    setGreeting('Hi Thomas, looking forward to our coffee chat!');
    // Ensure we close everything before going back
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleMessage = () => {
    onNavigateToChat({
      name: matchProfile.name,
      ...(selectedTime && { time: selectedTime.time, date: selectedTime.date })
    });
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
                <TouchableOpacity
                  key={slotIndex}
                  style={[
                    styles.timeSlot,
                    selectedTime?.time === slot && selectedTime?.date === timeSlot.date && styles.selectedTimeSlot
                  ]}
                  onPress={() => handleTimeSlotPress(slot, timeSlot.date)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime?.time === slot && selectedTime?.date === timeSlot.date && styles.selectedTimeSlotText
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.scheduleButton, !selectedTime && styles.scheduleButtonDisabled]}
          disabled={!selectedTime}
          onPress={handleScheduleMeeting}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.scheduleButtonText}>Schedule Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.messageButton} 
          onPress={handleMessage}
          testID="message-button"
        >
          <Ionicons name="chatbubble-outline" size={20} color="#0A66C2" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showMeetingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMeetingModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMeetingModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalContent}
              >
                <View style={styles.modalHeader}>
                  <Image source={matchProfile.avatar} style={styles.modalAvatar} />
                  <Text style={styles.modalTitle}>
                    Coffee chat with{"\n"}
                    <Text style={styles.modalTitleBold}>{matchProfile.name}</Text>
                  </Text>
                </View>
                <Text style={styles.modalTime}>
                  {selectedTime ? `${selectedTime.date.replace(/,? \d{4}/, '')}, ${selectedTime.time}` : 'Select a time slot above'}
                </Text>
                <View style={styles.modalInputContainer}>
                  <TextInput
                    style={styles.modalInput}
                    multiline
                    value={greeting}
                    onChangeText={setGreeting}
                  />
                  <Image
                    source={require('../assets/ai-generated.png')}
                    style={styles.aiIcon}
                    accessibilityLabel="AI generated"
                  />
                </View>
                <TouchableOpacity 
                  style={styles.modalScheduleButton}
                  onPress={handleScheduleMeeting}
                >
                  <Text style={styles.modalScheduleButtonText}>Schedule Coffee Chat</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScheduleConfirmationModal
        visible={showConfirmation}
        onClose={handleConfirmationClose}
        name={matchProfile.name}
        time={selectedTime?.time}
        date={selectedTime?.date}
      />
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  degree: {
    color: '#666',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#666',
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
    marginBottom: 4,
  },
  interestText: {
    fontSize: 14,
    color: '#666',
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
    marginLeft: 8,
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeSlot: {
    backgroundColor: '#F3F6F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedTimeSlot: {
    backgroundColor: '#0A66C2',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  scheduleButton: {
    flex: 1,
    backgroundColor: '#0A66C2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  scheduleButtonDisabled: {
    backgroundColor: '#B2B2B2',
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0A66C2',
  },
  messageButtonText: {
    color: '#0A66C2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    height: '65%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    padding: 24,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  modalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalTitleBold: {
    fontWeight: '700',
  },
  modalTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    width: '100%',
  },
  modalInputContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 24,
  },
  modalInput: {
    width: '100%',
    minHeight: 80,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top',
    paddingRight: 40,
  },
  aiIcon: {
    position: 'absolute',
    width: 22,
    height: 22,
    right: 12,
    bottom: 12,
  },
  modalScheduleButton: {
    width: '100%',
    backgroundColor: '#0A66C2',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalScheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CoffeeChatScheduler; 