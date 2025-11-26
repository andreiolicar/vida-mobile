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

    return (
        <View style={styles.container}>
            <Avatar name={name} size={size} />

            {streak > 0 && (
                <TouchableOpacity
                    style={[styles.streakBadge, { backgroundColor: colors.card }]}
                    onPress={onStreakPress}
                    activeOpacity={0.7}
                >
                    <StreakIcon size={14} level={getStreakLevel(streak)} />
                    <Text style={[styles.streakText, { color: colors.text }]}>
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
        bottom: 0,
        right: -8,
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
        fontSize: 10,
        fontFamily: 'Nunito_700Bold',
    },
});