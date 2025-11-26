export const APP_NAME = 'VIDA Mobile';
export const APP_VERSION = '1.0.0';

// API Configuration (placeholder)
export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
    TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: '@vida:auth_token',
    REFRESH_TOKEN: '@vida:refresh_token',
    USER_DATA: '@vida:user_data',
    THEME_MODE: '@vida:theme_mode',
    ONBOARDING_COMPLETED: '@vida:onboarding_completed',
};

// Pomodoro defaults
export const FOCUS_TIMER = {
    DEFAULT_DURATION: 25 * 60, // 25 minutos em segundos
    SHORT_BREAK: 5 * 60,
    LONG_BREAK: 15 * 60,
};

// Gamification
export const GAMIFICATION = {
    DAILY_XP_GOAL: 100,
    TASK_COMPLETE_XP: 10,
    FOCUS_SESSION_XP: 25,
    MOMENT_POST_XP: 5,
};