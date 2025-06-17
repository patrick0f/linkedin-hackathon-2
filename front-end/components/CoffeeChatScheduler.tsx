import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
<<<<<<< HEAD
import ScheduleConfirmationModal from './ScheduleConfirmationModal';
=======
import { Image as RNImage } from 'react-native';
import MeetingConfirmationModal from './MeetingConfirmationModal';
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6

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
  const [showConfirmation, setShowConfirmation] = useState(false);

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

<<<<<<< HEAD
  const handleTimeSelect = (time: string, date: string) => {
    setSelectedTime({ time, date });
    setShowConfirmation(true);
  };

  const handleMessage = () => {
    onNavigateToChat({
      name: matchProfile.name,
      ...(selectedTime && { time: selectedTime.time, date: selectedTime.date })
    });
=======
  const handleScheduleMeeting = () => {
    setShowMeetingModal(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowConfirmation(true);
    }, 100);
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
<<<<<<< HEAD
    setSelectedTime(null);
    onClose();
=======
    setShowMeetingModal(false);
    setSelectedTime(null);
    setGreeting('Hi Thomas, looking forward to our coffee chat!');
    // Ensure we close everything before going back
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleTimeSlotPress = (slot: string, date: string) => {
    setSelectedTime({ time: slot, date });
    setShowMeetingModal(true);
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
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
<<<<<<< HEAD
                  onPress={() => handleTimeSelect(slot, timeSlot.date)}
=======
                  onPress={() => handleTimeSlotPress(slot, timeSlot.date)}
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
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
<<<<<<< HEAD
        <TouchableOpacity 
          style={[styles.scheduleButton, !selectedTime && styles.scheduleButtonDisabled]}
          disabled={!selectedTime}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.scheduleButtonText}>Schedule Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.messageButton} 
          onPress={handleMessage}
          testID="message-button"
        >
=======
        <TouchableOpacity style={styles.messageButton} onPress={onMessage}>
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
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
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ height: '65%', backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', padding: 24, alignItems: 'center' }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 12 }}>
                  <Image source={matchProfile.avatar} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 16 }} />
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>
                    Coffee chat with{"\n"}
                    <Text style={{ fontWeight: '700' }}>{matchProfile.name}</Text>
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 24, width: '100%' }}>
                  {selectedTime ? `${selectedTime.date.replace(/,? \d{4}/, '')}, ${selectedTime.time}` : 'Select a time slot above'}
                </Text>
                <View style={{ width: '100%', position: 'relative', marginBottom: 24 }}>
                  <TextInput
                    style={{
                      width: '100%',
                      minHeight: 80,
                      borderColor: '#E0E0E0',
                      borderWidth: 1,
                      borderRadius: 12,
                      padding: 16,
                      fontSize: 16,
                      backgroundColor: '#F5F5F5',
                      textAlignVertical: 'top',
                      paddingRight: 40, // space for the icon
                    }}
                    multiline
                    value={greeting}
                    onChangeText={setGreeting}
                  />
                  <RNImage
                    source={require('../assets/ai-generated.png')}
                    style={{
                      position: 'absolute',
                      width: 22,
                      height: 22,
                      right: 12,
                      bottom: 12,
                    }}
                    accessibilityLabel="AI generated"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0A66C2',
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    borderRadius: 24,
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 0,
                  }}
                  onPress={handleScheduleMeeting}
                >
                  <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Schedule meeting</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

<<<<<<< HEAD
      {showConfirmation && selectedTime && (
        <ScheduleConfirmationModal
          scheduledTime={selectedTime.time}
          scheduledDate={selectedTime.date}
          onClose={handleConfirmationClose}
        />
      )}
=======
      <MeetingConfirmationModal
        visible={showConfirmation}
        onClose={handleConfirmationClose}
        matchProfile={matchProfile}
        scheduledTime={selectedTime ? selectedTime.time : ''}
        scheduledDate={selectedTime ? selectedTime.date.replace(/,? \d{4}/, '') : ''}
      />
>>>>>>> 208518f9930c7660e3f120d0108cbcf168194de6
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
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedTimeSlot: {
    backgroundColor: '#0A66C2',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
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