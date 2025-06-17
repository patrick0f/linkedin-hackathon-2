import { StyleSheet } from 'react-native';

export const coffeeChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#f3f2ef',
  },
  activeFilter: {
    backgroundColor: '#0A66C2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
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
  calendarContainer: {
    padding: 16,
    alignItems: 'center',
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dayButton: {
    width: 40,
    height: 60,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  selectedDayButton: {
    backgroundColor: '#0A66C2',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#057642',
    position: 'absolute',
    bottom: 8,
  },
  timeSlotsContainer: {
    flex: 1,
  },
  timeSlotsContentContainer: {
    padding: 16,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  timeSlot: {
    width: '30%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#0A66C2',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#0A66C2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 