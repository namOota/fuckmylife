import React from 'react';
import { Modal, View, Text, Pressable, FlatList } from 'react-native';

export type ChooseGuruModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (guruName: string) => void;
  gurus?: string[];
  title?: string;
};

const DEFAULT_GURUS = [
  'Adi Shankaracharya',
  'Ramananda',
  'Vivekananda',
  'Ramakrishna',
  'Aurobindo',
  'Dayananda',
];

export function ChooseGuruModal({ visible, onClose, onSelect, gurus = DEFAULT_GURUS, title = 'Choose your Guru' }: ChooseGuruModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/40 items-center justify-end">
        <View className="w-full bg-white rounded-t-2xl p-6">
          <Text className="text-xl font-semibold mb-4 text-center">{title}</Text>
          <FlatList
            data={gurus}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSelect(item)}
                className="p-4 mb-2 rounded-xl bg-gray-100 active:bg-gray-200"
              >
                <Text className="text-base text-gray-900 text-center">{item}</Text>
              </Pressable>
            )}
          />
          <Pressable onPress={onClose} className="mt-2 p-4 rounded-xl bg-gray-200">
            <Text className="text-center font-medium">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ChooseGuruModal;