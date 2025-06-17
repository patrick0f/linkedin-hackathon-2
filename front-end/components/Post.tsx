import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
}

export const Post = ({ name, title, timePosted, content, likes, comments, onLike, imageUrl }: PostProps) => {
  return (
    <View style={postStyles.container}>
      <View style={postStyles.header}>
        <Image
          style={postStyles.profilePic}
          source={require('../assets/default-profile.png')}
        />
        <View style={postStyles.headerText}>
          <Text style={postStyles.name}>{name}</Text>
          <Text style={postStyles.title}>{title}</Text>
          <Text style={postStyles.timePosted}>{timePosted}</Text>
        </View>
      </View>

      <Text style={postStyles.content}>{content}</Text>

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={postStyles.contentImage}
          resizeMode="cover"
        />
      )}

      <View style={postStyles.stats}>
        <Text style={postStyles.statsText}>{likes} likes • {comments} comments</Text>
      </View>

      <View style={postStyles.actions}>
        <TouchableOpacity style={postStyles.actionButton} onPress={onLike}>
          <Ionicons name="thumbs-up-outline" size={20} color="#666" />
          <Text style={postStyles.actionText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postStyles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={postStyles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postStyles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#666" />
          <Text style={postStyles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 