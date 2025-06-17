import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PointsPopupProps {
  onFadeOut?: () => void;
}

const PointsPopup: React.FC<PointsPopupProps> = ({ onFadeOut }) => {
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
      testID="points-popup"
    >
      <Ionicons name="star" size={28} color="#FFD700" style={styles.icon} />
      <Text style={styles.text}>+5 points</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    zIndex: 100,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A66C2',
  },
});

export default PointsPopup; 