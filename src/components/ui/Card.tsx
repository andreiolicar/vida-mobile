import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks';

interface CardProps extends ViewProps {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: number;
    children: React.ReactNode;
}

export function Card({
    variant = 'default',
    padding = 16,
    children,
    style,
    ...props
}: CardProps) {
    const { colors } = useTheme();

    const cardStyles = [
        styles.base,
        { backgroundColor: colors.card, padding },
        variant === 'elevated' && styles.elevated,
        variant === 'outlined' && {
            borderWidth: 1,
            borderColor: colors.border,
        },
        style,
    ];

    return (
        <View style={cardStyles} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 16,
    },
    elevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
});