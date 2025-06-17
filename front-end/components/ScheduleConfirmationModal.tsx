import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScheduleConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  time?: string;
  date?: string;
}

const ScheduleConfirmationModal: React.FC<ScheduleConfirmationModalProps> = ({
  visible,
  onClose,
  name,
  time,
  date,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
          </View>
          
          <Text style={styles.title}>Coffee Chat Scheduled!</Text>
          <Text style={styles.details}>
            Your coffee chat with {name} has been scheduled for {time} on {date}
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0A66C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  details: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0A66C2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 120,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ScheduleConfirmationModal; 