import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const MAX_CONTENT_WIDTH = 600; // Maximum width for content on web
const IMAGE_HEIGHT = 350; // Consistent height for all images

export const postStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 16,
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    width: '100%',
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
    backgroundColor: '#f0f0f0', // Placeholder color while loading
    objectFit: 'cover',
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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  timePosted: {
    fontSize: 12,
    color: '#999',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // This will maintain aspect ratio while fitting within the container
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 8,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
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
    color: '#0077B5',
    fontWeight: 'bold',
  },
  headerConnect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 