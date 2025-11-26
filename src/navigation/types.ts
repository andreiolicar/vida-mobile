import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

// Onboarding Stack
export type OnboardingStackParamList = {
    Welcome: undefined;
    Preferences: undefined;
    RoutineSetup: undefined;
    ThemeSelection: undefined;
};

// Main Bottom Tabs
export type MainTabParamList = {
    Dashboard: undefined;
    Routine: undefined;
    Focus: undefined;
    Social: undefined;
    Profile: undefined;
    Test: undefined;
};

// Root Navigator
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}