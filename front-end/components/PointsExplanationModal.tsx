import React from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';

interface PointsExplanationModalProps {
  visible: boolean;
  onClose: () => void;
}

const PointsExplanationModal = ({ visible, onClose }: PointsExplanationModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <View style={styles.headerLine} />
                <Text style={styles.title}>Points System</Text>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.subtitle}>What are points?</Text>
                <Text style={styles.paragraph}>
                  Points are a way to measure your engagement and activity on LinkedIn. They help you track your progress and encourage meaningful interactions within the community.
                </Text>

                <Text style={styles.subtitle}>How to earn points:</Text>
                <Text style={styles.paragraph}>
                  • Creating posts{'\n'}
                  • Engaging with others' content{'\n'}
                  • Participating in discussions{'\n'}
                  • Maintaining daily activity streaks{'\n'}
                  • Completing your profile{'\n'}
                  • Making new connections
                </Text>

                <Text style={styles.subtitle}>Why points matter:</Text>
                <Text style={styles.paragraph}>
                  Points help increase your visibility and credibility on the platform. Higher points can lead to more profile views, connection requests, and opportunities.
                </Text>

                <Text style={styles.signature}>
                  - The LinkedIn Team
                </Text>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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