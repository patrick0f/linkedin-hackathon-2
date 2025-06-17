import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { profileOverlayStyles } from '../styles/profileOverlayStyles';
import PointsExplanationModal from './PointsExplanationModal';
import { useUser } from '../contexts/UserContext';

interface ProfileOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileOverlay = ({ visible, onClose }: ProfileOverlayProps) => {
  const [showPointsModal, setShowPointsModal] = useState(false);
  const { currentUser } = useUser();

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={profileOverlayStyles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={profileOverlayStyles.content}>
              <View style={profileOverlayStyles.header}>
                <TouchableOpacity onPress={onClose} style={profileOverlayStyles.closeButton}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={profileOverlayStyles.profileSection}>
                <Image
                  style={profileOverlayStyles.profilePic}
                  source={
                    currentUser?.profile_pic
                      ? { uri: currentUser.profile_pic }
                      : require('../assets/default-profile.png')
                  }
                />
                <View style={profileOverlayStyles.nameSection}>
                  <Text style={profileOverlayStyles.name}>
                    {currentUser?.name || 'Loading...'}
                    <View style={profileOverlayStyles.linkedInIcon}>
                      <FontAwesome name="linkedin" size={12} color="#fff" />
                    </View>
                  </Text>
                  <Text style={profileOverlayStyles.title}>
                    {currentUser?.current_location || 'No location'}
                  </Text>
                </View>
              </View>

              <View style={profileOverlayStyles.statsSection}>
                <Text style={profileOverlayStyles.statsNumber}>28</Text>
                <Text style={profileOverlayStyles.statsLabel}>profile viewers</Text>
                <TouchableOpacity style={profileOverlayStyles.analyticsButton}>
                  <Text style={profileOverlayStyles.analyticsText}>View all analytics</Text>
                </TouchableOpacity>
              </View>

              <View style={profileOverlayStyles.menuSection}>
                <TouchableOpacity style={profileOverlayStyles.menuItem}>
                  <Text style={profileOverlayStyles.menuText}>Games</Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileOverlayStyles.menuItem}>
                  <Text style={profileOverlayStyles.menuText}>Saved posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileOverlayStyles.menuItem}>
                  <Text style={profileOverlayStyles.menuText}>Groups</Text>
                </TouchableOpacity>
              </View>

              <View style={profileOverlayStyles.streakSection}>
                {currentUser?.streak_count && currentUser.streak_count >= 1000 ? (
                  <View style={profileOverlayStyles.streakCounter}>
                    <MaterialCommunityIcons 
                      name="fire" 
                      size={32} 
                      color="#DAA520" 
                      style={profileOverlayStyles.streakIcon}
                    />
                    <Text style={profileOverlayStyles.streakText}>
                      0
                    </Text>
                    <Text style={profileOverlayStyles.streakLabel}>day streak</Text>
                  </View>
                ) : (
                  <View style={profileOverlayStyles.pointsContainer}>
                    <Text style={profileOverlayStyles.pointsNumber}>
                      {currentUser?.streak_count || 0}
                    </Text>
                    <Text style={profileOverlayStyles.pointsLabel}>points</Text>
                    <View style={profileOverlayStyles.progressBarContainer}>
                      <View 
                        style={[
                          profileOverlayStyles.progressBar, 
                          { width: `${Math.min((currentUser?.streak_count || 0) / 10, 100)}%` }
                        ]} 
                      />
                      <View style={profileOverlayStyles.linkedInIcon}>
                        <FontAwesome name="linkedin" size={12} color="#fff" />
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={profileOverlayStyles.whyPointsButton}
                      onPress={() => setShowPointsModal(true)}
                    >
                      <Text style={profileOverlayStyles.whyPointsText}>Why we have points</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={profileOverlayStyles.premiumSection}>
                <Text style={profileOverlayStyles.premiumTitle}>Try Premium</Text>
                <Text style={profileOverlayStyles.premiumText}>
                  Get exclusive tools & insights
                </Text>
                <TouchableOpacity style={profileOverlayStyles.premiumButton}>
                  <Text style={profileOverlayStyles.premiumButtonText}>
                    Upgrade to Premium
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={profileOverlayStyles.settingsButton}>
                <Ionicons name="settings-outline" size={24} color="#666" />
                <Text style={profileOverlayStyles.settingsText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      <PointsExplanationModal
        visible={showPointsModal}
        onClose={() => setShowPointsModal(false)}
      />
    </Modal>
  );
}; 