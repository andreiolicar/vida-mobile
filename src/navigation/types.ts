import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

// Onboarding Stack
export type OnboardingStackParamList = {
    Preferences: undefined;
    RoutineSetup: undefined;
    ThemeSelection: undefined;
};

// Main Bottom Tabs
export type MainTabParamList = {
    Dashboard: undefined;
    Routine: undefined;
    Social: undefined;
    Profile: undefined;
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