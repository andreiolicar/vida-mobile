import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import SettingsScreen from '@/screens/settings/SettingsScreen';
import HelpScreen from '@/screens/help/HelpScreen';
import AchievementsScreen from '@/screens/achievements/AchievementsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="ProfileMain" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Achievements" component={AchievementsScreen} />
        </Stack.Navigator>
    );
}