import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = {
  name: string;
  language: string;
  caste: string;
  dob: string;
  tob: string;
  pob: string;
};

export type AuthState = {
  loggedIn: boolean;
  userProfile: UserProfile | null;
  selectedGuru: string | null;
  login: () => void;
  logout: () => void;
  setProfile: (profile: UserProfile) => void;
  setGuru: (guru: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loggedIn: false,
      userProfile: null,
      selectedGuru: null,
      login: () => set({ loggedIn: true }),
      logout: () => set({ loggedIn: false, userProfile: null, selectedGuru: null }),
      setProfile: (profile) => set({ userProfile: profile }),
      setGuru: (guru) => set({ selectedGuru: guru }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        loggedIn: state.loggedIn,
        userProfile: state.userProfile,
        selectedGuru: state.selectedGuru,
      }),
    }
  )
);