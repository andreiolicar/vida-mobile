import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';
import Svg, { Circle } from 'react-native-svg';

interface PeriodHubProps {
    period: 'morning' | 'afternoon' | 'evening';
    label: string;
    progress: number;
}

export function PeriodHub({ period, label, progress }: PeriodHubProps) {
    const { theme, colors } = useTheme();

    const periodColor = theme.periods[period];
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={styles.container}>
            <View style={styles.hub}>
                <Svg width={90} height={90}>
                    {/* Background circle */}
                    <Circle
                        cx={45}
                        cy={45}
                        r={radius}
                        stroke={colors.border}
                        strokeWidth={8}
                        fill="none"
                    />
                    {/* Progress circle */}
                    <Circle
                        cx={45}
                        cy={45}
                        r={radius}
                        stroke={periodColor}
                        strokeWidth={8}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        origin="45, 45"
                    />
                </Svg>

                <View style={[styles.inner, { backgroundColor: `${periodColor}15` }]}>
                    <Text style={[styles.percentage, { color: periodColor }]}>
                        {Math.round(progress)}%
                    </Text>
                </View>
            </View>

            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    hub: {
        position: 'relative',
        marginBottom: 8,
    },
    inner: {
        position: 'absolute',
        top: 15,
        left: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        fontSize: 18,
        fontFamily: 'Nunito_800ExtraBold',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
});