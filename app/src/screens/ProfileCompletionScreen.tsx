import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SetupStackParamList } from '../navigation/types';
import { useAuthStore, UserProfile } from '../store/authStore';

type Props = NativeStackScreenProps<SetupStackParamList, 'ProfileCompletion'>;

export default function ProfileCompletionScreen({ navigation }: Props) {
  const setProfile = useAuthStore((s) => s.setProfile);
  const [form, setForm] = useState<UserProfile>({
    name: '',
    language: '',
    caste: '',
    dob: '',
    tob: '',
    pob: '',
  });

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit() {
    setProfile(form);
    navigation.navigate('ChooseGuru');
  }

  return (
    <ScrollView className="flex-1 p-6 bg-white" contentContainerStyle={{ paddingBottom: 24 }}>
      <Text className="text-2xl font-bold mb-4">Complete your profile</Text>
      {([
        ['name', 'Name'],
        ['language', 'Language'],
        ['caste', 'Caste'],
        ['dob', 'Date of birth (YYYY-MM-DD)'],
        ['tob', 'Time of birth (HH:MM)'],
        ['pob', 'Place of birth'],
      ] as const).map(([key, label]) => (
        <View key={key} className="mb-4">
          <Text className="mb-2 text-gray-700">{label}</Text>
          <TextInput
            placeholder={label}
            value={String(form[key])}
            onChangeText={(t) => update(key, t)}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>
      ))}
      <Pressable className="mt-2 bg-indigo-600 rounded-xl px-6 py-4" onPress={submit}>
        <Text className="text-white font-semibold text-center">Continue</Text>
      </Pressable>
    </ScrollView>
  );
}