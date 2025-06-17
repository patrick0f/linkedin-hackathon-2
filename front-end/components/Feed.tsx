import React from 'react';
import { ScrollView, View } from 'react-native';
import { Post } from './Post';
import { feedStyles } from '../styles/feedStyles';

export const Feed = () => {
  const mockPosts = [
    {
      name: 'Stanislav Naida',
      title: 'Java Technical Lead — Ciklum',
      timePosted: '16h',
      content: 'Hello, I am looking for a new career opportunity and would appreciate your support. Thanks in advance for any contact recommendation, advice, or referral.',
      likes: 77,
      comments: 11,
    },
    {
      name: 'Vera Drozdova',
      title: 'UI/UX Designer',
      timePosted: '17h',
      content: 'Just finished designing a new Ferry app for Apple Watch! Check out the screens.',
      likes: 45,
      comments: 8,
    },
  ];

  return (
    <ScrollView style={feedStyles.container}>
      {mockPosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <View style={feedStyles.bottomPadding} />
    </ScrollView>
  );
}; 