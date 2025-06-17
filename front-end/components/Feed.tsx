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
      name: 'Sarah Chen',
      title: 'Senior Product Manager at Google',
      timePosted: '1h',
      content: '🎉 Excited to announce that our team just launched a new feature that will help millions of users! Proud of what we\'ve accomplished. #ProductManagement #Innovation',
      likes: 1243,
      comments: 89,
    },
    {
      name: 'Alex Thompson',
      title: 'Tech Recruiter | Helping talents find their dream jobs',
      timePosted: '3h',
      content: '🚨 HIRING ALERT 🚨\n\nMy client, a fast-growing startup in the AI space, is looking for:\n- Senior Frontend Engineers (React)\n- ML Engineers\n- DevOps Engineers\n\nRemote-first, competitive salary + equity. DM me if interested!',
      likes: 156,
      comments: 42,
    },
    {
      name: 'Dr. Emily Rodriguez',
      title: 'AI Research Scientist | PhD in Machine Learning',
      timePosted: '5h',
      content: 'Just published our latest research paper on "Efficient Large Language Models for Mobile Devices" in Nature AI. Link in comments! #AI #MachineLearning #Research',
      likes: 892,
      comments: 134,
    },
    {
      name: 'Vera Drozdova',
      title: 'UI/UX Designer',
      timePosted: '17h',
      content: 'Just finished designing a new Ferry app for Apple Watch! Check out the screens.',
      likes: 45,
      comments: 8,
    },
    {
      name: 'Mike Johnson',
      title: 'Startup Founder & CEO',
      timePosted: '23h',
      content: '💡 Leadership Lesson #42:\n\nHiring for culture fit is important, but hiring for culture ADD is even better.\n\nDiversity of thought leads to innovation.\n\nWhat are your thoughts on this? 🤔',
      likes: 2891,
      comments: 245,
    },
    {
      name: 'Priya Patel',
      title: 'Full Stack Developer | Web3 Enthusiast',
      timePosted: '1d',
      content: '🎓 Just completed the Advanced Ethereum Development course! Excited to build decentralized applications that can make a real impact.\n\nOpen to Web3 opportunities! #Ethereum #Blockchain #Web3',
      likes: 423,
      comments: 37,
    },
    {
      name: 'David Kim',
      title: 'Engineering Manager at Netflix',
      timePosted: '1d',
      content: 'We\'re scaling our platform team! Looking for:\n\n✨ Senior Backend Engineers\n✨ Infrastructure Engineers\n✨ Performance Engineers\n\nNetflix offers:\n- Competitive pay\n- Great benefits\n- Amazing culture\n\nDM me for referrals!',
      likes: 678,
      comments: 92,
    }
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