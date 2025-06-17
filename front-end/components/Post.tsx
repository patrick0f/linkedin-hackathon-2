import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons , Feather, FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import { postStyles } from '../styles/postStyles';

interface PostProps {
  name: string;
  title: string;
  timePosted: string;
  content: string;
  likes: number;
  comments: number;
  onLike?: () => void;
  imageUrl?: string | null;
  profilePicUrl?: string;
}

export const Post = ({ 
  name, 
  title, 
  timePosted, 
  content, 
  likes, 
  comments, 
  onLike, 
  imageUrl,
  profilePicUrl 
}: PostProps) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

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
        <Text style={postStyles.statsText}>{likes} likes </Text>
        <Text style={postStyles.statsText}>{comments} comments</Text>
      </View>

      <View style={postStyles.actions}>
        <TouchableOpacity style={postStyles.actionButton} onPress={onLike}>

          <SimpleLineIcons name="like" size={20} color="#666" />
          <Text style={postStyles.actionText}>Like</Text>
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