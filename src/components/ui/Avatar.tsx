import React from 'react';
import { View, Text, Image, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/hooks';

interface AvatarProps extends ViewProps {
    size?: number;
    source?: string;
    name?: string;
    badge?: boolean;
    badgeColor?: string;
}

export function Avatar({
    size = 48,
    source,
    name,
    badge,
    badgeColor,
    style,
    ...props
}: AvatarProps) {
    const { theme, colors } = useTheme();

    const initials = name
        ? name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : '?';

    return (
        <View style={[{ width: size, height: size }, style]} {...props}>
            <View
                style={[
                    styles.container,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: theme.primary,
                    },
                ]}
            >
                {source ? (
                    <Image
                        source={{ uri: source }}
                        style={[
                            styles.image,
                            { width: size, height: size, borderRadius: size / 2 },
                        ]}
                    />
                ) : (
                    <Text
                        style={[
                            styles.initials,
                            {
                                fontSize: size * 0.4,
                                color: '#ffffff',
                            },
                        ]}
                    >
                        {initials}
                    </Text>
                )}
            </View>

            {badge && (
                <View
                    style={[
                        styles.badge,
                        {
                            width: size * 0.3,
                            height: size * 0.3,
                            borderRadius: size * 0.15,
                            backgroundColor: badgeColor || theme.success,
                            borderColor: colors.background,
                        },
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    initials: {
        fontFamily: 'Nunito_700Bold',
    },
    badge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
    },
});