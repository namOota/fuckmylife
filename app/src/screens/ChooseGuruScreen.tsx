import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SetupStackParamList } from '../navigation/types';
import ChooseGuruModal from '../components/ChooseGuruModal';
import { useAuthStore } from '../store/authStore';

type Props = NativeStackScreenProps<SetupStackParamList, 'ChooseGuru'>;

export default function ChooseGuruScreen({ navigation }: Props) {
  const setGuru = useAuthStore((s) => s.setGuru);
  const [visible, setVisible] = useState(true);

  function handleSelect(guru: string) {
    setGuru(guru);
    setVisible(false);
    // Move to main app after choosing guru
    navigation.reset({ index: 0, routes: [{ name: 'ProfileCompletion' }] });
  }

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <Text className="text-lg text-gray-600">Final step: choose your Guru</Text>
      <ChooseGuruModal visible={visible} onClose={() => setVisible(false)} onSelect={handleSelect} />
    </View>
  );
}