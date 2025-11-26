import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/hooks';

interface ConnectionLineProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    active?: boolean;
}

export function ConnectionLine({
    startX,
    startY,
    endX,
    endY,
    active = false,
}: ConnectionLineProps) {
    const { theme, colors } = useTheme();

    // Criar curva suave (Bézier)
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX;
    const controlY = startY + (endY - startY) * 0.2;

    const pathData = `M ${startX} ${startY} Q ${controlX} ${controlY} ${midX} ${midY} T ${endX} ${endY}`;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg style={StyleSheet.absoluteFill}>
                <Path
                    d={pathData}
                    stroke={active ? theme.primary : colors.border}
                    strokeWidth={active ? 3 : 2}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={active ? "0" : "5,5"}
                    opacity={active ? 0.8 : 0.3}
                />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({});