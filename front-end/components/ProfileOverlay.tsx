import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { profileOverlayStyles } from '../styles/profileOverlayStyles';

interface ProfileOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export const ProfileOverlay = ({ visible, onClose }: ProfileOverlayProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={profileOverlayStyles.overlay}>
        <ScrollView style={profileOverlayStyles.content}>
          <View style={profileOverlayStyles.header}>
            <TouchableOpacity 
              style={profileOverlayStyles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={profileOverlayStyles.profileSection}>
            <Image
              style={profileOverlayStyles.profilePic}
              source={require('../assets/default-profile.png')}
            />
            <View style={profileOverlayStyles.nameSection}>
              <Text style={profileOverlayStyles.name}>Name
                <FontAwesome name="linkedin-square" size={16} color="#0077B5" style={profileOverlayStyles.icon} />
                <FontAwesome name="shield" size={16} color="#DAA520" style={profileOverlayStyles.icon} />
              </Text>
              <Text style={profileOverlayStyles.title}>Sophomore at Stanford University</Text>
              <Text style={profileOverlayStyles.location}>Miami Beach, Florida, United States</Text>
            </View>
          </View>

          <View style={profileOverlayStyles.educationSection}>
            <Image
              style={profileOverlayStyles.schoolLogo}
              source={require('../assets/stanford-logo.png')}
            />
            <Text style={profileOverlayStyles.schoolName}>Stanford University</Text>
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
            <View style={profileOverlayStyles.pointsContainer}>
              <Text style={profileOverlayStyles.pointsNumber}>0</Text>
              <Text style={profileOverlayStyles.pointsLabel}>points</Text>
              <View style={profileOverlayStyles.progressBarContainer}>
                <View style={[profileOverlayStyles.progressBar, { width: '0%' }]} />
                <View style={profileOverlayStyles.linkedInIcon}>
                  <FontAwesome name="linkedin" size={12} color="#fff" />
                </View>
              </View>
              <TouchableOpacity style={profileOverlayStyles.whyPointsButton}>
                <Text style={profileOverlayStyles.whyPointsText}>Why we have points</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={profileOverlayStyles.premiumSection}>
            <Text style={profileOverlayStyles.premiumTitle}>4x</Text>
            <Text style={profileOverlayStyles.premiumText}>
              Premium members get 4x more profile views on average.
            </Text>
            <TouchableOpacity style={profileOverlayStyles.premiumButton}>
              <Text style={profileOverlayStyles.premiumButtonText}>Try Premium for $0</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={profileOverlayStyles.settingsButton}>
            <Ionicons name="settings-outline" size={20} color="#666" />
            <Text style={profileOverlayStyles.settingsText}>Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}; 