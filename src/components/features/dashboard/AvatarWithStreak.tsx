import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '@/components/ui';
import { StreakIcon } from '@/components/icons';
import { useTheme } from '@/hooks';

interface AvatarWithStreakProps {
    name: string;
    streak: number;
    size?: number;
    onStreakPress?: () => void;
}

export function AvatarWithStreak({
    name,
    streak,
    size = 56,
    onStreakPress,
}: AvatarWithStreakProps) {
    const { colors } = useTheme();

    const getStreakLevel = (streak: number) => {
        if (streak >= 30) return 'platinum';
        if (streak >= 15) return 'gold';
        if (streak >= 7) return 'silver';
        return 'bronze';
    };

    // Ajuste de tamanho do badge baseado no tamanho do avatar
    const isLargeAvatar = size >= 80;
    const badgeScale = isLargeAvatar ? 1.4 : 1;
    const iconSize = isLargeAvatar ? 16 : 14;
    const fontSize = isLargeAvatar ? 12 : 10;

    return (
        <View style={styles.container}>
            <Avatar name={name} size={size} />

            {streak > 0 && (
                <TouchableOpacity
                    style={[
                        styles.streakBadge,
                        {
                            backgroundColor: colors.card,
                            transform: [{ scale: badgeScale }],
                            bottom: isLargeAvatar ? -4 : 0,
                            right: isLargeAvatar ? -12 : -8,
                        }
                    ]}
                    onPress={onStreakPress}
                    activeOpacity={0.7}
                >
                    <StreakIcon size={iconSize} level={getStreakLevel(streak)} />
                    <Text style={[styles.streakText, { color: colors.text, fontSize }]}>
                        {streak}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    streakBadge: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        gap: 3,
    },
    streakText: {
        fontFamily: 'Nunito_700Bold',
    },
});