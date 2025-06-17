import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { coffeeChatStyles } from '../styles/coffeeChatStyles';
import { saveUserAvailability } from '../lib/timeUtils';
import { useUser } from '../contexts/UserContext';
import CoffeeChatScheduler from './CoffeeChatScheduler';
import ChatDetail from './ChatDetail';

interface MatchProfile {
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

    setSaving(true);
    setError(null);

    try {
      await saveUserAvailability(currentUser.id, availabilityByDay);
      setSubmittedAvailabilities(prev => [...prev, availabilityByDay]);
      setShowCalendar(false);
    } catch (err) {
      console.error('Error saving availability:', err);
      setError('Failed to save availability. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNavigateToChat = (contact: MatchProfile) => {
    setSelectedContact(contact);
    setShowScheduler(false);
    setShowChat(true);
  };

  // Mock data - will be used later
  const matches: MatchProfile[] = [
    {
      id: '1',
      userId: '1',
      name: 'Thomas Simmons',
      title: 'Product Designer',
      company: 'Figma',
      location: 'San Francisco, CA',
      avatar: require('../assets/default-profile.png'),
      careerInterests: ['Product Strategy', 'UX Design', 'Agile Methodology'],
      personalInterests: ['Soccer', 'hiking', 'non-fiction books'],
      availability: 'Weekdays 4-6pm',
    },
  ];

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
      />
    );
  }

  if (showScheduler && selectedContact) {
    return (
      <CoffeeChatScheduler
        onClose={() => {
          setShowScheduler(false);
          setSelectedContact(null);
        }}
        onNavigateToChat={(schedulerInfo) => {
          setShowScheduler(false);
          setShowChat(true);
        }}
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
      {matches.map(match => (
        <View key={match.id} style={coffeeChatStyles.matchCard}>
          <View style={coffeeChatStyles.profileSection}>
            <Image source={match.avatar} style={coffeeChatStyles.profileImage} />
            <View style={coffeeChatStyles.profileInfo}>
              <Text style={coffeeChatStyles.name}>{match.name}</Text>
              <Text style={coffeeChatStyles.title}>{match.title} at {match.company}</Text>
              <Text style={coffeeChatStyles.location}>{match.location}</Text>
            </View>
          </View>

          <View style={coffeeChatStyles.interestsSection}>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Career Interests</Text>
              <Text style={coffeeChatStyles.interestText}>
                {match.careerInterests.join(', ')}
              </Text>
            </View>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Personal Interests</Text>
              <Text style={coffeeChatStyles.interestText}>
                {match.personalInterests.join(', ')}
              </Text>
            </View>
          </View>

          <View style={coffeeChatStyles.availabilitySection}>
            <Text style={coffeeChatStyles.availabilityLabel}>Availability</Text>
            <Text style={coffeeChatStyles.availabilityText}>{match.availability}</Text>
          </View>

          <View style={coffeeChatStyles.buttonContainer}>
            <TouchableOpacity
              style={coffeeChatStyles.scheduleButton}
              onPress={() => {
                setSelectedContact(match);
                setShowScheduler(true);
              }}
            >
              <Text style={coffeeChatStyles.scheduleButtonText}>Schedule Coffee Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={coffeeChatStyles.messageButton}
              onPress={() => handleNavigateToChat(match)}
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