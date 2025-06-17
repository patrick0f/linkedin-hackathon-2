import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import ScheduleConfirmationModal from './ScheduleConfirmationModal';
import { getOverlappingTimeSlots, formatOverlappingSlotsForScheduler, availabilityToContinuousHours } from '../lib/timeUtils';
import { userService, chatgptService } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { storageService } from '../lib/storage';

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
  contact: Contact;
  currentUserAvailability: { [key: number]: string[] };
  error: string | null;
  saving: boolean;
}

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: any;
  careerInterests: string[];
  personalInterests: string[];
  availability: string;
  userId: string;
  matchScore?: number;
  meetingReason?: string;
}

const CoffeeChatScheduler: React.FC<CoffeeChatSchedulerProps> = ({
  onClose,
  contact,
  currentUserAvailability,
  error,
  saving
}) => {
  const { currentUser } = useUser();
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    date: string;
  } | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [greeting, setGreeting] = useState(`Hi ${contact.name}, looking forward to our coffee chat!`);
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingStarter, setGeneratingStarter] = useState(false);

  // Helper function to get avatar source
  const getAvatarSource = (avatar: any) => {
    if (typeof avatar === 'string' && avatar.startsWith('http')) {
      return { uri: avatar };
    } else if (avatar) {
      return avatar;
    } else {
      return require('../assets/default-profile.png');
    }
  };

  // Fetch the other user's availability and calculate overlapping times
  useEffect(() => {
    const fetchOverlappingTimes = async () => {
      try {
        console.log('Fetching overlapping times for user:', contact.userId);
        
        // Get the other user's data
        const otherUser = await userService.getUserById(contact.userId);
        console.log('Other user data:', otherUser);
        
        if (otherUser.time_avail && Array.isArray(otherUser.time_avail)) {
          // Convert current user's availability to continuous hours
          const currentUserHours = availabilityToContinuousHours(currentUserAvailability);
          console.log('Current user hours:', currentUserHours);
          console.log('Other user hours (from DB):', otherUser.time_avail);
          
          // Get overlapping time slots - both are now in continuous hours format
          const overlappingSlots = getOverlappingTimeSlots(currentUserHours, otherUser.time_avail);
          console.log('Overlapping slots:', overlappingSlots);
          
          // Format for scheduler
          const formattedSlots = formatOverlappingSlotsForScheduler(overlappingSlots);
          console.log('Formatted slots:', formattedSlots);
          
          // Convert to TimeSlot format
          const timeSlots: TimeSlot[] = Object.entries(formattedSlots).map(([day, slots]) => ({
            date: day,
            slots: slots
          }));
          
          console.log('Final time slots:', timeSlots);
          setAvailableTimes(timeSlots);
        } else {
          console.log('No availability data for other user');
          setAvailableTimes([]);
        }
      } catch (error) {
        console.error('Error fetching overlapping times:', error);
        setAvailableTimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOverlappingTimes();
  }, [contact.userId, currentUserAvailability]);

  // Fetch available times when component mounts
  useEffect(() => {
    const fetchOverlappingTimes = async () => {
      try {
        console.log('Fetching available times for contact:', contact.userId);
        const response = await userService.getUserById(contact.userId);
        console.log('Contact availability response:', response);
        
        if (response.success && response.user && response.user.time_avail) {
          // Convert current user availability to continuous hours
          const currentUserContinuousHours = availabilityToContinuousHours(currentUserAvailability);
          
          // Get overlapping slots
          const overlappingSlots = getOverlappingTimeSlots(
            currentUserContinuousHours,
            response.user.time_avail
          );
          console.log('Overlapping slots:', overlappingSlots);
          
          // Convert to scheduler format
          const formattedSlots = formatOverlappingSlotsForScheduler(overlappingSlots);
          console.log('Formatted slots:', formattedSlots);
          
          // Convert to TimeSlot array format
          const timeSlotArray: TimeSlot[] = Object.entries(formattedSlots).map(([date, slots]) => ({
            date,
            slots
          }));
          
          setAvailableTimes(timeSlotArray);
        }
      } catch (error) {
        console.error('Error fetching available times:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverlappingTimes();
  }, [contact.userId, currentUserAvailability]);

  // Generate conversation starter when modal opens
  useEffect(() => {
    if (showMeetingModal && selectedTime && currentUser && contact) {
      generateConversationStarter();
    }
  }, [showMeetingModal, selectedTime, currentUser, contact]);

  // Use the actual contact data instead of mock data
  const matchProfile: MatchProfile = {
    name: contact.name,
    title: contact.title,
    company: contact.company,
    location: contact.location,
    avatar: getAvatarSource(contact.avatar),
    careerInterests: Array.isArray(contact.careerInterests) ? contact.careerInterests : [],
    personalInterests: Array.isArray(contact.personalInterests) ? contact.personalInterests : [],
    availableTimes: availableTimes
  };

  const handleTimeSelect = (time: string, date: string) => {
    setSelectedTime({ time, date });
    setShowMeetingModal(true);
  };

  const generateConversationStarter = async () => {
    if (!currentUser || !contact) return;
    
    setGeneratingStarter(true);
    try {
      console.log('Generating conversation starter...');
      console.log('Current user:', currentUser);
      console.log('Selected contact:', contact);
      console.log('Selected time:', selectedTime);
      
      // Get stored ChatGPT matches for better context
      const storedMatches = await storageService.getChatGPTMatches();
      console.log('Retrieved stored matches:', storedMatches.length, 'matches');
      
      const response = await chatgptService.generateConversationStarter(
        currentUser,
        contact,
        selectedTime?.time,
        selectedTime?.date,
        storedMatches
      );
      
      console.log('Conversation starter response:', response);
      
      if (response.success && response.conversationStarter) {
        setGreeting(response.conversationStarter);
      }
    } catch (error) {
      console.error('Error generating conversation starter:', error);
      // Keep the default greeting if generation fails
    } finally {
      setGeneratingStarter(false);
    }
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
    setGreeting(`Hi ${contact.name}, looking forward to our coffee chat!`);
    // Ensure we close everything before going back
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleMessage = () => {
    // Implement the logic to handle the message
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
          <Image source={getAvatarSource(matchProfile.avatar)} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{matchProfile.name} · <Text style={styles.degree}>1st</Text></Text>
            <Text style={styles.title}>{matchProfile.title} at {matchProfile.company}</Text>
            <Text style={styles.location}>{matchProfile.location}</Text>
            {contact.matchScore && (
              <Text style={styles.matchScore}>Match Score: {contact.matchScore}%</Text>
            )}
          </View>
        </View>

        {contact.meetingReason && (
          <View style={styles.meetingReasonSection}>
            <Text style={styles.meetingReasonLabel}>Why Connect:</Text>
            <Text style={styles.meetingReasonText}>{contact.meetingReason}</Text>
          </View>
        )}

        <View style={styles.interestsSection}>
          <View style={styles.interestGroup}>
            <Text style={styles.interestLabel}>Career Interests:</Text>
            <Text style={styles.interestText}>{matchProfile.careerInterests.join(', ')}</Text>
          </View>
          <View style={styles.interestGroup}>
            <Text style={styles.interestLabel}>Shared Traits:</Text>
            <Text style={styles.interestText}>{matchProfile.personalInterests.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.availabilitySection}>
          <View style={styles.availabilityHeader}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.availabilityTitle}>Available Times</Text>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading available times...</Text>
            </View>
          ) : availableTimes.length > 0 ? (
            availableTimes.map((timeSlot, dateIndex) => (
              <View key={dateIndex} style={styles.dateGroup}>
                <Text style={styles.dateText}>{timeSlot.date}</Text>
                {timeSlot.slots.map((slot, slotIndex) => (
                  <TouchableOpacity
                    key={slotIndex}
                    style={[
                      styles.timeSlot,
                      selectedTime?.time === slot && selectedTime?.date === timeSlot.date && styles.selectedTimeSlot
                    ]}
                    onPress={() => handleTimeSelect(slot, timeSlot.date)}
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
            ))
          ) : (
            <View style={styles.noTimesContainer}>
              <Text style={styles.noTimesText}>No overlapping times available</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
                  <Image source={getAvatarSource(matchProfile.avatar)} style={styles.modalAvatar} />
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
                  disabled={saving}
                >
                  <Text style={styles.modalScheduleButtonText}>Schedule Coffee Chat</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

        {/* Loading overlay */}
        {generatingStarter && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Generating conversation starter...</Text>
            </View>
          </View>
        )}
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
  matchScore: {
    fontSize: 12,
    color: '#0A66C2',
    fontWeight: '500',
    marginTop: 4,
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
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    height: '65%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    marginTop: 'auto',
  },
  modalHeader: {
    alignItems: 'center',
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
    borderRadius: 12,
    alignItems: 'center',
  },
  modalScheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  meetingReasonSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  meetingReasonLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  meetingReasonText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTimesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noTimesText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CoffeeChatScheduler; 