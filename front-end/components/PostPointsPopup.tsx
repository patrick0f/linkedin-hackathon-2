import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PostPointsPopupProps {
  onFadeOut?: () => void;
}

const PostPointsPopup: React.FC<PostPointsPopupProps> = ({ onFadeOut }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.delay(900),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFadeOut) onFadeOut();
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.popup,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      testID="post-points-popup"
    >
      <View style={styles.iconContainer}>
        <Ionicons name="star" size={24} color="#FFD700" />
      </View>
      <Text style={styles.text}>+ 10 points</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    left: undefined,
    transform: [],
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    zIndex: 1000,
    minWidth: 150,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E7F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A66C2',
  },
});

export default PostPointsPopup; 