import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

interface PointsExplanationModalProps {
  onClose: () => void;
}

const PointsExplanationModal: React.FC<PointsExplanationModalProps> = ({ onClose }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <View style={styles.headerLine} />
          <Text style={styles.title}>Why we have points</Text>
        </View>

        <ScrollView style={styles.contentContainer}>
          <Text style={styles.subtitle}>
            Want to snag a free week of LinkedIn Premium and keep the good times rolling?
          </Text>

          <Text style={styles.paragraph}>
            It's all about consistent and authentic engagement. Start by regularly posting 
            valuable content that resonates with your professional network. Don't just scroll by; 
            comment thoughtfully on others' posts, offering insights or asking relevant 
            questions. Actively connect with people who can genuinely add to your 
            professional sphere.
          </Text>

          <Text style={styles.paragraph}>
            The more you interact and contribute, the more visible and valuable you become on 
            the platform. This consistent activity often catches LinkedIn's eye, leading to 
            promotional offers like that coveted free week of Premium.
          </Text>

          <Text style={styles.paragraph}>
            To maintain this streak, simply keep up your genuine engagement. Continue to 
            share, comment, and connect, making LinkedIn a regular part of your 
            professional routine. Building a strong, active presence is key to both short-term 
            perks and long-term career growth.
          </Text>

          <Text style={styles.signature}>Team LinkedIn</Text>
        </ScrollView>

        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLine: {
    width: 36,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  contentContainer: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  signature: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000000',
    marginTop: 8,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#000000',
    padding: 16,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PointsExplanationModal; 