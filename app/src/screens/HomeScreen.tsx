import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.userProfile);
  const selectedGuru = useAuthStore((s) => s.selectedGuru);

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-2">Daily Horoscope</Text>
      <Text className="text-gray-600 mb-6">Auspicious time today: 10:00 - 11:30 AM</Text>
      <View className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6">
        <Text className="text-indigo-900">Namaste{user?.name ? `, ${user.name}` : ''}!</Text>
        {selectedGuru ? (
          <Text className="text-indigo-900">Guided by: {selectedGuru}</Text>
        ) : (
          <Text className="text-indigo-900">No guru selected yet</Text>
        )}
      </View>
      <Text className="text-xl font-semibold mb-3">Quick Actions</Text>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-gray-100 rounded-xl p-4"><Text>Plan Ritual</Text></View>
        <View className="flex-1 bg-gray-100 rounded-xl p-4"><Text>Invite</Text></View>
      </View>
    </View>
  );
}