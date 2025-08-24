import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import ChooseGuruModal from '../components/ChooseGuruModal';
import { useAuthStore } from '../store/authStore';

export default function ChatScreen() {
  const selectedGuru = useAuthStore((s) => s.selectedGuru);
  const setGuru = useAuthStore((s) => s.setGuru);
  const [visible, setVisible] = useState(false);

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-2">Chat</Text>
      <Text className="text-gray-700 mb-6">Talking with: {selectedGuru ?? 'No guru selected'}</Text>
      <Pressable className="bg-indigo-600 rounded-xl px-6 py-4" onPress={() => setVisible(true)}>
        <Text className="text-white font-semibold text-center">Switch Guru</Text>
      </Pressable>
      <ChooseGuruModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={(g) => {
          setGuru(g);
          setVisible(false);
        }}
      />
    </View>
  );
}