import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks';

interface BadgeProps extends ViewProps {
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Badge({
    variant = 'primary',
    size = 'md',
    children,
    style,
    ...props
}: BadgeProps) {
    const { theme } = useTheme();

    const backgroundColor = {
        primary: theme.primary,
        success: theme.success,
        warning: theme.warning,
        error: theme.error,
        info: theme.info,
    }[variant];

    return (
        <View
            style={[
                styles.base,
                styles[size],
                { backgroundColor: `${backgroundColor}20` },
                style,
            ]}
            {...props}
        >
            <Text
                style={[
                    styles.text,
                    styles[`text_${size}`],
                    { color: backgroundColor },
                ]}
            >
                {children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    sm: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    md: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    lg: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    text: {
        fontFamily: 'Nunito_600SemiBold',
    },
    text_sm: {
        fontSize: 12,
    },
    text_md: {
        fontSize: 14,
    },
    text_lg: {
        fontSize: 16,
    },
});