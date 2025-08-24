import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Login</Text>
      <View className="flex-row gap-3 items-center">
        <TextInput
          value={countryCode}
          onChangeText={setCountryCode}
          placeholder="+91"
          className="w-20 border border-gray-300 rounded-xl px-3 py-3"
          keyboardType="phone-pad"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
          keyboardType="phone-pad"
        />
      </View>
      <Pressable
        className="mt-6 bg-indigo-600 rounded-xl px-6 py-4"
        onPress={() => navigation.navigate('Otp', { phone: `${countryCode}${phone}` })}
      >
        <Text className="text-white font-semibold text-center">Send OTP</Text>
      </Pressable>
    </View>
  );
}