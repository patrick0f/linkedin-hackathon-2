import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { coffeeChatStyles } from '../styles/coffeeChatStyles';

interface MatchProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  profileImage: string;
  careerInterests: string[];
  personalInterests: string[];
  availability: string;
}

const CoffeeChats: React.FC = () => {
  // Mock data - replace with actual API call later
  const matches: MatchProfile[] = [
    {
      id: '1',
      name: 'Thomas Simmons',
      title: 'Product Designer at Figma',
      location: 'San Francisco, CA',
      profileImage: require('../assets/default-profile.png'),
      careerInterests: ['Product Strategy', 'UX Design', 'Agile Methodology'],
      personalInterests: ['Soccer', 'hiking', 'non-fiction books'],
      availability: 'Weekdays 4-6pm',
    },
    // Add more mock profiles here
  ];

  return (
    <ScrollView style={coffeeChatStyles.container}>
      {matches.map((match) => (
        <View key={match.id} style={coffeeChatStyles.matchCard}>
          <View style={coffeeChatStyles.profileSection}>
            <Image 
              source={match.profileImage} 
              style={coffeeChatStyles.profileImage}
            />
            <View style={coffeeChatStyles.profileInfo}>
              <Text style={coffeeChatStyles.name}>{match.name}</Text>
              <Text style={coffeeChatStyles.title}>{match.title}</Text>
              <Text style={coffeeChatStyles.location}>{match.location}</Text>
            </View>
          </View>

          <View style={coffeeChatStyles.interestsSection}>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Career Interests:</Text>
              <Text style={coffeeChatStyles.interestText}>
                {match.careerInterests.join(', ')}
              </Text>
            </View>
            <View style={coffeeChatStyles.interestGroup}>
              <Text style={coffeeChatStyles.interestLabel}>Personal Interests:</Text>
              <Text style={coffeeChatStyles.interestText}>
                {match.personalInterests.join(', ')}
              </Text>
            </View>
          </View>

          <View style={coffeeChatStyles.availabilitySection}>
            <View style={coffeeChatStyles.availabilityInfo}>
              <Text style={coffeeChatStyles.availabilityLabel}>Available:</Text>
              <Text style={coffeeChatStyles.availabilityText}>{match.availability}</Text>
            </View>
            <View style={coffeeChatStyles.buttonContainer}>
              <TouchableOpacity style={coffeeChatStyles.scheduleButton}>
                <Text style={coffeeChatStyles.scheduleButtonText}>Schedule Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={coffeeChatStyles.messageButton}>
                <Text style={coffeeChatStyles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CoffeeChats; 