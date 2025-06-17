import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CHATGPT_MATCHES: 'chatgpt_matches',
  USER_AVAILABILITY: 'user_availability',
  USER_PROFILE: 'user_profile'
};

export interface StoredMatch {
  id: string;
  userId: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: any;
  careerInterests: string[];
  personalInterests: string[];
  matchScore: number;
  meetingReason: string;
  sharedTraits: string[];
  timestamp: string;
}

export const storageService = {
  // Store ChatGPT matches
  storeChatGPTMatches: async (matches: StoredMatch[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CHATGPT_MATCHES, JSON.stringify(matches));
      console.log('ChatGPT matches stored successfully:', matches.length, 'matches');
    } catch (error) {
      console.error('Error storing ChatGPT matches:', error);
      throw error;
    }
  },

  // Get stored ChatGPT matches
  getChatGPTMatches: async (): Promise<StoredMatch[]> => {
    try {
      const matches = await AsyncStorage.getItem(STORAGE_KEYS.CHATGPT_MATCHES);
      if (matches) {
        const parsedMatches = JSON.parse(matches);
        console.log('Retrieved stored ChatGPT matches:', parsedMatches.length, 'matches');
        return parsedMatches;
      }
      return [];
    } catch (error) {
      console.error('Error retrieving ChatGPT matches:', error);
      return [];
    }
  },

  // Get a specific match by user ID
  getMatchByUserId: async (userId: string): Promise<StoredMatch | null> => {
    try {
      const matches = await storageService.getChatGPTMatches();
      const match = matches.find(m => m.userId === userId || m.id === userId);
      return match || null;
    } catch (error) {
      console.error('Error getting match by user ID:', error);
      return null;
    }
  },

  // Clear stored matches
  clearChatGPTMatches: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CHATGPT_MATCHES);
      console.log('ChatGPT matches cleared successfully');
    } catch (error) {
      console.error('Error clearing ChatGPT matches:', error);
      throw error;
    }
  },

  // Store user availability
  storeUserAvailability: async (availability: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_AVAILABILITY, JSON.stringify(availability));
    } catch (error) {
      console.error('Error storing user availability:', error);
      throw error;
    }
  },

  // Get stored user availability
  getUserAvailability: async (): Promise<any> => {
    try {
      const availability = await AsyncStorage.getItem(STORAGE_KEYS.USER_AVAILABILITY);
      return availability ? JSON.parse(availability) : null;
    } catch (error) {
      console.error('Error retrieving user availability:', error);
      return null;
    }
  },

  // Store user profile
  storeUserProfile: async (profile: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error storing user profile:', error);
      throw error;
    }
  },

  // Get stored user profile
  getUserProfile: async (): Promise<any> => {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }
}; 