import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';

interface XPBarProps {
    currentXP: number;
    maxXP: number;
    level: number;
}

export function XPBar({ currentXP, maxXP, level }: XPBarProps) {
    const { theme, colors } = useTheme();
    const progress = (currentXP / maxXP) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.level, { color: colors.text }]}>
                    Nível {level}
                </Text>
                <Text style={[styles.xpText, { color: colors.textSecondary }]}>
                    {currentXP} / {maxXP} XP
                </Text>
            </View>

            <View style={[styles.barBackground, { backgroundColor: colors.border }]}>
                <View
                    style={[
                        styles.barFill,
                        { backgroundColor: theme.primary, width: `${progress}%` },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    level: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    xpText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
    barBackground: {
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
});