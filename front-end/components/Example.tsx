import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import type { User, Post } from '../lib/supabase';

export default function Example() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Example: Fetch user data
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      
      setUser(data);
    };

    // Example: Fetch posts
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts_activity')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      
      setPosts(data || []);
    };

    fetchUser();
    fetchPosts();
  }, []);

  return (
    <View>
      <Text>User: {user?.name}</Text>
      {posts.map((post) => (
        <View key={post.id}>
          <Text>{post.post_text}</Text>
          <Text>Likes: {post.num_of_likes}</Text>
        </View>
      ))}
    </View>
  );
} 