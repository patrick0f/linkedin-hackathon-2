import { StyleSheet } from 'react-native';

export const coffeeChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  matchCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: '#666666',
  },
  interestsSection: {
    marginVertical: 12,
  },
  interestGroup: {
    marginBottom: 8,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  interestText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  availabilitySection: {
    marginTop: 12,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  availabilityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleButton: {
    backgroundColor: '#0A66C2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  messageButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#0A66C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    color: '#0A66C2',
    fontSize: 14,
    fontWeight: '600',
  },
}); 