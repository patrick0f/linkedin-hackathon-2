import { StyleSheet } from 'react-native';

export const postStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profilePicBar: {
   flexDirection: 'row',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  title: {
    fontSize: 14,
    color: '#666',
  },
  timePosted: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  content: {
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  stats: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  actionTextConnect: {
    marginLeft: 4,
    fontSize: 16,
    color: '#0a66c2',
    fontWeight: 'bold',
  },
  headerConnect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 