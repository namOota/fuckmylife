import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export default function OtpScreen({ navigation }: Props) {
  const [otp, setOtp] = useState('');
  const login = useAuthStore((s) => s.login);

  function handleVerify() {
    if (otp.length === 4) {
      login();
      navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
      // AppNavigator will now render Setup flow due to missing profile/guru
    } else {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit OTP.');
    }
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Enter OTP</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        placeholder="4-digit OTP"
        maxLength={4}
        keyboardType="number-pad"
        className="border border-gray-300 rounded-xl px-4 py-3 tracking-widest text-center"
      />
      <Pressable className="mt-6 bg-indigo-600 rounded-xl px-6 py-4" onPress={handleVerify}>
        <Text className="text-white font-semibold text-center">Verify</Text>
      </Pressable>
    </View>
  );
}