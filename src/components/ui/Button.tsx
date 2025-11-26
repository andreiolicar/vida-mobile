import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@/hooks';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    children,
    style,
    ...props
}: ButtonProps) {
    const { theme, colors } = useTheme();

    const buttonStyles = [
        styles.base,
        styles[size],
        variant === 'primary' && { backgroundColor: theme.primary },
        variant === 'secondary' && { backgroundColor: colors.surface },
        variant === 'outline' && {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: theme.primary,
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        (disabled || loading) && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`text_${size}`],
        variant === 'primary' && { color: '#ffffff' },
        variant === 'secondary' && { color: colors.text },
        variant === 'outline' && { color: theme.primary },
        variant === 'ghost' && { color: theme.primary },
        (disabled || loading) && styles.textDisabled,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? '#ffffff' : theme.primary}
                />
            ) : (
                <Text style={textStyles}>{children}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    sm: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    md: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    lg: {
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
    },
    text_sm: {
        fontSize: 14,
    },
    text_md: {
        fontSize: 16,
    },
    text_lg: {
        fontSize: 18,
    },
    textDisabled: {
        opacity: 0.7,
    },
});