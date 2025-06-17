import { StyleSheet } from 'react-native';

export const profileOverlayStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f3f2ef',
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePic: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
  },
  nameSection: {
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  icon: {
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  educationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  schoolLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  schoolName: {
    fontSize: 16,
    color: '#000',
  },
  statsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0077B5',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  analyticsButton: {
    marginTop: 8,
  },
  analyticsText: {
    fontSize: 16,
    color: '#0077B5',
  },
  menuSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 500,
  },
  streakSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsNumber: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#0077B5',
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0077B5',
    borderRadius: 2,
  },
  linkedInIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#DAA520',
    borderRadius: 4,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whyPointsButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666',
    alignSelf: 'center',
  },
  whyPointsText: {
    color: '#666',
    fontSize: 14,
  },
  premiumSection: {
    padding: 16,
    backgroundColor: '#FAF3E8',
    margin: 16,
    borderRadius: 8,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#B7801C',
    marginBottom: 8,
  },
  premiumText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  premiumButton: {
    backgroundColor: '#B7801C',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  premiumButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  settingsText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  streakIcon: {
    marginRight: 8,
  },
  streakText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#DAA520',
  },
  streakLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
}); 