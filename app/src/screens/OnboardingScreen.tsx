import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Welcome to the App</Text>
      <Text className="text-gray-600 mb-8 text-center">Begin your spiritual journey.</Text>
      <Pressable
        className="bg-indigo-600 rounded-xl px-6 py-4"
        onPress={() => navigation.navigate('Login')}
      >
        <Text className="text-white font-semibold">Get Started</Text>
      </Pressable>
    </View>
  );
}