import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { coffeeChatStyles } from '../styles/coffeeChatStyles';
import { saveUserAvailability, getUsersWithMatchingTimes, availabilityToContinuousHours } from '../lib/timeUtils';
import { useUser } from '../contexts/UserContext';
import { chatgptService, userService } from '../services/api';
import { storageService } from '../lib/storage';
import CoffeeChatScheduler from './CoffeeChatScheduler';
import ChatDetail from './ChatDetail';
import { Ionicons } from '@expo/vector-icons';

interface MatchProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: any; // Can be require() result or string URL
  careerInterests: string[];
  personalInterests: string[];
  availability: string;
  userId: string;
  matchScore?: number;
  meetingReason?: string;
}

interface TimeSlot {
  time: string;
  selected: boolean;
}

const CoffeeChats: React.FC = () => {
  const { currentUser } = useUser();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [availabilityByDay, setAvailabilityByDay] = useState<{ [key: number]: string[] }>({});
  const [submittedAvailabilities, setSubmittedAvailabilities] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState<MatchProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [chatgptMatches, setChatgptMatches] = useState<any[]>([]);

  useEffect(() => {
    if (submittedAvailabilities.length > 0) {
      console.log('All submitted availabilities:', submittedAvailabilities);
    }
  }, [submittedAvailabilities]);

  // Static weekdays array
  const weekDays = [
    { dayName: 'Mon', dayNumber: 0 },
    { dayName: 'Tue', dayNumber: 1 },
    { dayName: 'Wed', dayNumber: 2 },
    { dayName: 'Thu', dayNumber: 3 },
    { dayName: 'Fri', dayNumber: 4 },
    { dayName: 'Sat', dayNumber: 5 },
    { dayName: 'Sun', dayNumber: 6 },
  ];

  // Generate time slots from 8 AM to 7 PM
  const timeSlots: TimeSlot[] = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    return { time, selected: false };
  });

  const handleDaySelect = (index: number) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  const handleTimeSelect = (time: string) => {
    const currentDaySlots = availabilityByDay[selectedDay!] || [];
    const updatedSlots = currentDaySlots.includes(time)
      ? currentDaySlots.filter(t => t !== time)
      : [...currentDaySlots, time];

    setAvailabilityByDay({
      ...availabilityByDay,
      [selectedDay!]: updatedSlots,
    });
  };

  const handleSubmitAvailability = async () => {
    if (!currentUser) {
      setError('Please log in to submit availability');
      return;
    }

    console.log('=== Starting availability submission process ===');
    console.log('Current user:', currentUser);
    console.log('Availability by day:', availabilityByDay);

    setSaving(true);
    setError(null);

    try {
      // First save the user's availability
      console.log('Step 1: Saving user availability...');
      await saveUserAvailability(currentUser.id, availabilityByDay);
      console.log('✓ User availability saved successfully');
      setSubmittedAvailabilities(prev => [...prev, availabilityByDay]);

      // Convert the availability to continuous hours format
      console.log('Step 2: Converting availability to continuous hours...');
      const myAvailabilityHours = availabilityToContinuousHours(availabilityByDay);
      console.log('My availability hours:', myAvailabilityHours);
      
      // Get users with matching times
      console.log('Step 3: Finding users with matching times...');
      const matchingUserIds = await getUsersWithMatchingTimes(myAvailabilityHours, currentUser.id);
      console.log('Matching user IDs:', matchingUserIds);
      console.log('Number of matching users:', matchingUserIds.length);
      
      // Fetch full user data for matching users
      console.log('Step 4: Fetching full user data...');
      const matchingUsers = [];
      for (const userId of matchingUserIds) {
        try {
          console.log(`Fetching data for user: ${userId}`);
          const userData = await userService.getUserById(userId);
          console.log(`✓ User data for ${userId}:`, userData);
          matchingUsers.push(userData);
        } catch (error) {
          console.error(`✗ Error fetching user data for ${userId}:`, error);
        }
      }
      
      console.log('Total matching users with full data:', matchingUsers.length);
      console.log('Matching users data:', matchingUsers);
      
      // Store matching users in local storage
      console.log('Step 5: Storing matching users in local storage...');
      await AsyncStorage.setItem('matchingUsers', JSON.stringify(matchingUsers));
      console.log('✓ Matching users stored in local storage');
      
      // Call ChatGPT to analyze the matches
      if (matchingUsers.length > 0) {
        console.log('Step 6: Calling ChatGPT for analysis...');
        console.log('Sending to ChatGPT:', { matchingUsers, currentUser });
        
        const chatgptResponse = await chatgptService.processMatchingUsers(matchingUsers, currentUser);
        console.log('✓ ChatGPT response received:', chatgptResponse);
        console.log('ChatGPT analysis:', chatgptResponse.analysis);
        
        // Parse and store the ChatGPT matches
        console.log('Step 7: Parsing ChatGPT matches...');
        const parsedMatches = parseChatGPTMatches(chatgptResponse.analysis, matchingUsers);
        console.log('Parsed matches:', parsedMatches);
        console.log('Number of parsed matches:', parsedMatches.length);
        
        // Limit to 5 matches maximum
        const limitedMatches = parsedMatches.slice(0, 5);
        console.log('Limited to 5 matches:', limitedMatches);
        
        setChatgptMatches(limitedMatches);
        console.log('✓ ChatGPT matches set in state');
        
        // Store the ChatGPT analysis in local storage as well
        await AsyncStorage.setItem('chatgptAnalysis', chatgptResponse.analysis);
        console.log('✓ ChatGPT analysis stored in local storage');
        
        // Store the parsed JSON matches in local storage using our new storage service
        await storageService.storeChatGPTMatches(limitedMatches);
        console.log('✓ ChatGPT matches stored using storage service');
      } else {
        console.log('No matching users found, skipping ChatGPT call');
      }
      
      console.log('Step 8: Hiding calendar...');
      setShowCalendar(false);
      console.log('=== Availability submission process completed successfully ===');
      
    } catch (err) {
      console.error('=== ERROR in availability submission process ===');
      console.error('Error details:', err);
      console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
      setError('Failed to save availability. Please try again.');
    } finally {
      setSaving(false);
      console.log('Saving state set to false');
    }
  };

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

  // Parse ChatGPT response and convert to MatchProfile format
  const parseChatGPTMatches = (chatgptResponse: string, actualMatchingUsers: any[]): any[] => {
    console.log('=== Parsing ChatGPT Response ===');
    console.log('Raw ChatGPT response:', chatgptResponse);
    console.log('Actual matching users:', actualMatchingUsers);
    
    try {
      // Extract JSON from the response (remove markdown code blocks if present)
      const jsonMatch = chatgptResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                       chatgptResponse.match(/\[[\s\S]*\]/);
      
      console.log('JSON match result:', jsonMatch);
      
      if (!jsonMatch) {
        console.error('No JSON found in ChatGPT response');
        return [];
      }

      const jsonStr = jsonMatch[1] || jsonMatch[0];
      console.log('Extracted JSON string:', jsonStr);
      
      const chatgptMatches = JSON.parse(jsonStr);
      console.log('Parsed ChatGPT matches:', chatgptMatches);

      // Map ChatGPT response back to actual users
      const result = chatgptMatches.map((chatgptMatch: any, index: number) => {
        // Find the corresponding actual user by name (or use index as fallback)
        const actualUser = actualMatchingUsers.find(user => 
          user.name === chatgptMatch.name || 
          user.name?.toLowerCase().includes(chatgptMatch.name?.toLowerCase() || '')
        ) || actualMatchingUsers[index] || actualMatchingUsers[0];

        console.log(`Mapping ChatGPT match "${chatgptMatch.name}" to actual user:`, actualUser);

        // Ensure unique ID by combining user ID with index
        const uniqueId = actualUser?.id ? `${actualUser.id}_${index}` : `match_${index}`;

        return {
          id: uniqueId,
          userId: actualUser?.id || `user_${index}`,
          name: actualUser?.name || chatgptMatch.name || 'Unknown',
          title: actualUser?.title || chatgptMatch.job_title || 'Professional',
          company: actualUser?.company || chatgptMatch.company || 'Company',
          location: actualUser?.current_location || chatgptMatch.location || 'Location',
          avatar: getAvatarSource(actualUser?.profile_pic || actualUser?.pfp),
          careerInterests: chatgptMatch.skills || [],
          personalInterests: chatgptMatch.shared_traits || [],
          availability: chatgptMatch.meeting_reason || 'Available for coffee chat',
          matchScore: chatgptMatch.match_score || 0,
          meetingReason: chatgptMatch.meeting_reason || 'Great networking opportunity',
          sharedTraits: chatgptMatch.shared_traits || [],
          timestamp: new Date().toISOString(),
        };
      });
      
      console.log('Final parsed result:', result);
      return result;
    } catch (error) {
      console.error('Error parsing ChatGPT matches:', error);
      console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
      return [];
    }
  };

  const handleMessagePress = (contact: MatchProfile) => {
    setSelectedContact(contact);
    setShowChat(true);
  };

  const handleSchedulePress = (contact: MatchProfile) => {
    setSelectedContact(contact);
    setShowScheduler(true);
  };

  const handleCloseScheduler = () => {
    setShowScheduler(false);
    setSelectedContact(null);
  };

  if (showChat && selectedContact) {
    return (
      <ChatDetail
        contact={selectedContact}
        onClose={() => {
          setShowChat(false);
          setShowScheduler(false);
          setSelectedContact(null);
        }}
        onScheduleChat={() => {
          setShowChat(false);
          setShowScheduler(true);
        }}
        isScheduler={true}
        onNavigateToCoffeeChats={() => setShowScheduler(true)}
      />
    );
  }

  if (showScheduler && selectedContact) {
    return (
      <CoffeeChatScheduler
        contact={selectedContact}
        currentUserAvailability={availabilityByDay}
        onClose={handleCloseScheduler}
        error={error}
        saving={saving}
      />
    );
  }

  if (showCalendar) {
    return (
      <View style={coffeeChatStyles.container}>
        {/* Weekly Calendar */}
        <View style={coffeeChatStyles.calendarContainer}>
          <Text style={coffeeChatStyles.calendarTitle}>Select Your Availability</Text>
          {error && (
            <Text style={coffeeChatStyles.errorText}>{error}</Text>
          )}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={coffeeChatStyles.daysContainer}
          >
            {weekDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  coffeeChatStyles.dayButton,
                  selectedDay === index && coffeeChatStyles.selectedDayButton,
                ]}
                onPress={() => handleDaySelect(index)}
              >
                <Text 
                  style={[
                    coffeeChatStyles.dayNumber,
                    selectedDay === index && coffeeChatStyles.selectedDayText
                  ]}
                >
                  {day.dayName[0]}
                </Text>
                {availabilityByDay[index]?.length > 0 && (
                  <View style={coffeeChatStyles.availabilityDot} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Slots */}
        {selectedDay !== null && (
          <ScrollView 
            style={coffeeChatStyles.timeSlotsContainer}
            contentContainerStyle={coffeeChatStyles.timeSlotsContentContainer}
          >
            <View style={coffeeChatStyles.timeSlotGrid}>
              {timeSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    coffeeChatStyles.timeSlot,
                    availabilityByDay[selectedDay]?.includes(slot.time) && 
                    coffeeChatStyles.selectedTimeSlot,
                  ]}
                  onPress={() => handleTimeSelect(slot.time)}
                >
                  <Text style={[
                    coffeeChatStyles.timeSlotText,
                    availabilityByDay[selectedDay]?.includes(slot.time) && 
                    coffeeChatStyles.selectedTimeSlotText,
                  ]}>
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Submit Button */}
        {Object.keys(availabilityByDay).length > 0 && (
          <TouchableOpacity 
            style={[
              coffeeChatStyles.submitButton,
              saving && coffeeChatStyles.submitButtonDisabled
            ]}
            onPress={handleSubmitAvailability}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={coffeeChatStyles.submitButtonText}>
                Submit Availability
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Show matches list after submission
  return (
    <ScrollView>
      {chatgptMatches.map(match => (
        <View key={match.id} style={coffeeChatStyles.matchCard}>
          <View style={coffeeChatStyles.profileSection}>
            <Image source={getAvatarSource(match.avatar)} style={coffeeChatStyles.profileImage} />
            <View style={coffeeChatStyles.profileInfo}>
              <Text style={coffeeChatStyles.name}>{match.name}</Text>
              <Text style={coffeeChatStyles.title}>{match.title} at {match.company}</Text>
              <Text style={coffeeChatStyles.location}>{match.location}</Text>
              {match.matchScore && (
                <Text style={coffeeChatStyles.matchScore}>Match Score: {match.matchScore}%</Text>
              )}
            </View>
          </View>

          <View style={coffeeChatStyles.interestsSection}>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Career Interests</Text>
              <Text style={coffeeChatStyles.interestText}>
                {Array.isArray(match.careerInterests) ? match.careerInterests.join(', ') : match.careerInterests}
              </Text>
            </View>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Shared Traits</Text>
              <Text style={coffeeChatStyles.interestText}>
                {Array.isArray(match.personalInterests) ? match.personalInterests.join(', ') : match.personalInterests}
              </Text>
            </View>
          </View>

          <View style={coffeeChatStyles.availabilitySection}>
            <Text style={coffeeChatStyles.availabilityLabel}>Why Connect</Text>
            <Text style={coffeeChatStyles.availabilityText}>{match.meetingReason}</Text>
          </View>

          <View style={coffeeChatStyles.buttonContainer}>
            <TouchableOpacity
              style={coffeeChatStyles.scheduleButton}
              onPress={() => handleSchedulePress(match)}
            >
              <Text style={coffeeChatStyles.scheduleButtonText}>Schedule Coffee Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={coffeeChatStyles.messageButton}
              onPress={() => handleMessagePress(match)}
            >
              <Text style={coffeeChatStyles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CoffeeChats; 