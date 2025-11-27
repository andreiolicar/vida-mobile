import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthStore } from '@/store';

import AuthNavigator from './AuthNavigator';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated, hasCompletedOnboarding } = useAuthStore();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    // Não autenticado → Welcome/Login/Register
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : !hasCompletedOnboarding ? (
                    // Autenticado mas não completou onboarding
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                ) : (
                    // Autenticado e onboarding completo → App principal
                    <Stack.Screen name="Main" component={MainNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}