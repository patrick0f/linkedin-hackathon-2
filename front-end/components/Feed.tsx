import React, { useEffect, useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Post } from './Post';
import { feedStyles } from '../styles/feedStyles';
import { postService, userService } from '../services/api';
import { useUser } from '../contexts/UserContext';

interface User {
  id: string;
  name: string;
  current_location: string | null;
  profile_pic?: string | null;
}

interface PostData {
  id: string;
  user_id: string;
  post_text: string | null;
  pic_link: string | null;
  comments: string[] | null;
  num_of_likes: number;
  pfp: string | null;
  created_at?: string;
}

export const Feed = () => {
  const { currentUser, loading: userLoading } = useUser();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsData, usersData] = await Promise.all([
        postService.getAllPosts(),
        userService.getAllUsers()
      ]);

      const usersMap = usersData.reduce((acc: Record<string, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {});

      setPosts(postsData);
      setUsers(usersMap);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim() || !currentUser) return;

    try {
      const newPost = await postService.createPost({
        user_id: currentUser.id,
        post_text: newPostText,
        pfp: currentUser.profile_pic || undefined
      });
      setPosts([newPost, ...posts]);
      setNewPostText('');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    }
  };

  const handleLikePost = async (post: PostData) => {
    try {
      const updatedPost = await postService.updatePost(post.id, {
        num_of_likes: (post.num_of_likes || 0) + 1,
      });
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const formatTimePosted = (created_at?: string) => {
    if (!created_at) return 'Just now';

    const now = new Date();
    const postDate = new Date(created_at);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return postDate.toLocaleDateString();
  };

  if (loading || userLoading) {
    return (
      <View style={feedStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0077B5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={feedStyles.errorContainer}>
        <Text style={feedStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={feedStyles.errorContainer}>
        <Text style={feedStyles.errorText}>Please log in to view the feed</Text>
      </View>
    );
  }

  return (
    <View style={feedStyles.container}>
      <View style={feedStyles.contentContainer}>
        <View style={feedStyles.createPostContainer}>
          <TextInput
            style={feedStyles.input}
            value={newPostText}
            onChangeText={setNewPostText}
            placeholder="What's on your mind?"
            multiline
          />
          <TouchableOpacity
            style={feedStyles.postButton}
            onPress={handleCreatePost}
            disabled={!newPostText.trim()}
          >
            <Text style={feedStyles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={feedStyles.scrollView}>
          {posts.map((post) => {
            const user = users[post.user_id] || { name: 'Unknown User', current_location: null };
            return (
              <Post
                key={post.id}
                name={user.name}
                title={user.current_location || 'No location'}
                timePosted={formatTimePosted(post.created_at)}
                content={post.post_text || ''}
                likes={post.num_of_likes}
                comments={post.comments?.length || 0}
                onLike={() => handleLikePost(post)}
                imageUrl={post.pic_link}
                profilePicUrl={user.profile_pic || undefined}
              />
            );
          })}
          <View style={feedStyles.bottomPadding} />
        </ScrollView>
      </View>
    </View>
  );
}; 