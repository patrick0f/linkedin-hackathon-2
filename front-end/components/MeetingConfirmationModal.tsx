import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MeetingConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  matchProfile: {
    name: string;
    avatar: any;
  };
  scheduledTime: string;
  scheduledDate: string;
}

const MeetingConfirmationModal: React.FC<MeetingConfirmationModalProps> = ({
  visible,
  onClose,
  matchProfile,
  scheduledTime,
  scheduledDate,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#666" />
          </TouchableOpacity>
          <View style={styles.headerRow}>
            <Image source={matchProfile.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.boldText}>
                Coffee chat successfully scheduled with {matchProfile.name}
              </Text>
            </View>
          </View>
          <Text style={styles.thankYou}>Thank you for scheduling with LinkedIn!</Text>
          <Text style={styles.scheduledAt}>Coffee chat scheduled at {scheduledDate}, {scheduledTime}</Text>
          <Text style={styles.instructions}>
            Please check your scheduled coffee chat events for the most up to date information about this chat!
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="close-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.actionButtonText}>Cancel Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.actionButtonText}>Reschedule Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#0A66C2" style={{ marginRight: 8 }} />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 48,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    padding: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
    marginTop: 28,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  boldText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    lineHeight: 24,
  },
  thankYou: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
    width: '100%',
    textAlign: 'left',
  },
  scheduledAt: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 18,
    width: '100%',
    textAlign: 'left',
  },
  instructions: {
    fontSize: 15,
    color: '#444',
    marginBottom: 28,
    width: '100%',
    textAlign: 'left',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A66C2',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 14,
    width: 200,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#0A66C2',
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: 200,
    justifyContent: 'center',
  },
  messageButtonText: {
    color: '#0A66C2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MeetingConfirmationModal; 