import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import ProfileCompletionScreen from '../screens/ProfileCompletionScreen';
import ChooseGuruScreen from '../screens/ChooseGuruScreen';
import HomeScreen from '../screens/HomeScreen';
import RitualPlannerScreen from '../screens/RitualPlannerScreen';
import InviteScreen from '../screens/InviteScreen';
import RitualKitScreen from '../screens/RitualKitScreen';
import ChatScreen from '../screens/ChatScreen';
import { useAuthStore } from '../store/authStore';
import { Text, View } from 'react-native';
import type { AuthStackParamList } from './types';
import type { SetupStackParamList } from './types';

// Auth stack
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <AuthStack.Screen name="Otp" component={OtpScreen} options={{ title: 'OTP' }} />
    </AuthStack.Navigator>
  );
}

// Post-login setup stack
const SetupStack = createNativeStackNavigator<SetupStackParamList>();
function SetupNavigator() {
  return (
    <SetupStack.Navigator>
      <SetupStack.Screen name="ProfileCompletion" component={ProfileCompletionScreen} options={{ title: 'Complete Profile' }} />
      <SetupStack.Screen name="ChooseGuru" component={ChooseGuruScreen} options={{ title: 'Choose Guru' }} />
    </SetupStack.Navigator>
  );
}

// Main app navigators
const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function EmptyScreen() {
  return (
    <View className="flex-1 items-center justify-center"><Text /></View>
  );
}

function HomeTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Home' }} />
      <Tabs.Screen
        name="RitualPlannerTab"
        component={EmptyScreen}
        options={{ tabBarLabel: 'Ritual Planner' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            // Navigate to the standalone screen in the parent stack
            navigation.getParent()?.navigate('RitualPlanner');
          },
        })}
      />
      <Tabs.Screen
        name="InviteTab"
        component={EmptyScreen}
        options={{ tabBarLabel: 'Invite' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate('Invite');
          },
        })}
      />
      <Tabs.Screen
        name="RitualKitTab"
        component={EmptyScreen}
        options={{ tabBarLabel: 'Ritual Kit' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate('RitualKit');
          },
        })}
      />
      <Tabs.Screen
        name="ChatTab"
        component={EmptyScreen}
        options={{ tabBarLabel: 'Chat' }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.getParent()?.navigate('Chat');
          },
        })}
      />
    </Tabs.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <MainStack.Screen name="RitualPlanner" component={RitualPlannerScreen} options={{ title: 'Ritual Planner' }} />
      <MainStack.Screen name="Invite" component={InviteScreen} options={{ title: 'Invite' }} />
      <MainStack.Screen name="RitualKit" component={RitualKitScreen} options={{ title: 'Ritual Kit' }} />
      <MainStack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
    </MainStack.Navigator>
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Main" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const loggedIn = useAuthStore((s) => s.loggedIn);
  const profile = useAuthStore((s) => s.userProfile);
  const guru = useAuthStore((s) => s.selectedGuru);

  const needsSetup = loggedIn && (!profile || !guru);

  return (
    <NavigationContainer>
      {!loggedIn ? <AuthNavigator /> : needsSetup ? <SetupNavigator /> : <MainDrawerNavigator />}
    </NavigationContainer>
  );
}