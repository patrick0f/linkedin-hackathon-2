import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons , Feather, FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import { postStyles } from '../styles/postStyles';
import { postService } from '../services/api';
import { useUser } from '../contexts/UserContext';

interface PostProps {
  post_id: string;
  name: string;
  title: string;
  timePosted: string;
  content: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  onLikeUpdate?: (newLikeCount: number) => void;
  imageUrl?: string | null;
  profilePicUrl?: string;
}

export const Post = ({ 
  post_id,
  name, 
  title, 
  timePosted, 
  content, 
  likes: initialLikes, 
  comments,
  isLiked: initialIsLiked = false,
  onLikeUpdate,
  imageUrl,
  profilePicUrl 
}: PostProps) => {
  const { currentUser, loading: userLoading } = useUser();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking || userLoading || !currentUser) {
      console.log('Like prevented:', { 
        isLiking, 
        userLoading, 
        hasCurrentUser: !!currentUser 
      });
      return;
    }
    
    setIsLiking(true);
    console.log('Attempting to like post:', { 
      post_id, 
      user_id: currentUser.id,
      currentLikes: likeCount
    });

    try {
      const response = await postService.likePost(post_id, currentUser.id);
      console.log('Like response:', response);
      const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
      onLikeUpdate?.(newLikeCount);
    } catch (error: any) {
      console.error('Error liking post:', {
        error,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <View style={postStyles.container}>
      <View style={postStyles.header}>
        <Image
          style={postStyles.profilePic}
          source={profilePicUrl ? { uri: profilePicUrl } : require('../assets/default-profile.png')}
          defaultSource={require('../assets/default-profile.png')}
        />
        <View style={postStyles.headerText}>
          <Text style={postStyles.name}>{name}</Text>
          <Text style={postStyles.title}>{title}</Text>
          <Text style={postStyles.timePosted}>{timePosted}</Text>
        </View>

        <View style={postStyles.headerConnect}>
          <Ionicons name="person-add-sharp" size={20} color="#0077B5" />
          <Text style={postStyles.actionTextConnect}>Connect</Text>
        </View>

      </View>

      <Text style={postStyles.content}>{content}</Text>

      {imageUrl && !imageError && (
        <View style={postStyles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={postStyles.contentImage}
            resizeMode="contain"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => setImageError(true)}
          />
          {imageLoading && (
            <ActivityIndicator 
              size="large" 
              color="#0077B5"
              style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20 }}
            />
          )}
        </View>
      )}

      <View style={postStyles.stats}>
        <Text style={postStyles.statsText}>{likeCount} likes </Text>
        <Text style={postStyles.statsText}>{comments} comments</Text>
      </View>

      <View style={postStyles.actions}>
        <TouchableOpacity 
          style={[postStyles.actionButton, isLiked && postStyles.actionButtonActive]} 
          onPress={handleLike}
          disabled={isLiking}
        >
          <SimpleLineIcons 
            name={isLiked ? "like" : "like"} 
            size={20} 
            color={isLiked ? "#0077B5" : "#666"} 
          />
          <Text style={[postStyles.actionText, isLiked && postStyles.actionTextActive]}>
            {isLiking ? 'Liking...' : 'Like'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={postStyles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={postStyles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postStyles.actionButton}>
          <FontAwesome name="retweet" size={20} color="#666" />
          <Text style={postStyles.actionText}>Repost</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postStyles.actionButton}>
          <Feather name="send" size={20} color="#666" />
          <Text style={postStyles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 