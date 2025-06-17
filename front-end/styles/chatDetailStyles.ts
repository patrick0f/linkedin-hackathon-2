import { StyleSheet } from 'react-native';

export const chatDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerStatus: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 12,
    marginBottom: 8,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#F3F6F8',
    padding: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  schedulerContainer: {
    backgroundColor: '#F3F6F8',
    padding: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
  schedulerInfo: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  schedulerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schedulerLeft: {
    flex: 1,
    marginRight: 16,
  },
  schedulerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A66C2',
    marginBottom: 4,
  },
  schedulerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  schedulerLink: {
    color: '#0A66C2',
    fontSize: 14,
    marginTop: 2,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F3F6F8',
    borderRadius: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  attachButton: {
    padding: 12,
  },
  sendButton: {
    padding: 8,
  },
  schedulerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
}); 