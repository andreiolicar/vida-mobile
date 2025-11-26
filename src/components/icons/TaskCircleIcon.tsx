import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';

interface TaskCircleIconProps {
    size?: number;
    status: 'locked' | 'available' | 'in-progress' | 'completed';
}

export function TaskCircleIcon({ size = 64, status }: TaskCircleIconProps) {
    const getColors = () => {
        switch (status) {
            case 'completed':
                return {
                    outer: '#10B981',
                    inner: '#D1FAE5',
                    icon: '#10B981',
                };
            case 'in-progress':
                return {
                    outer: '#3B82F6',
                    inner: '#DBEAFE',
                    icon: '#3B82F6',
                };
            case 'available':
                return {
                    outer: '#8B5CF6',
                    inner: '#EDE9FE',
                    icon: '#8B5CF6',
                };
            default:
                return {
                    outer: '#E5E7EB',
                    inner: '#F9FAFB',
                    icon: '#9CA3AF',
                };
        }
    };

    const colors = getColors();

    return (
        <Svg width={size} height={size} viewBox="0 0 64 64">
            {/* Círculo externo com borda grossa */}
            <Circle
                cx="32"
                cy="32"
                r="30"
                fill={colors.outer}
                opacity={0.2}
            />
            <Circle
                cx="32"
                cy="32"
                r="28"
                fill="white"
                stroke={colors.outer}
                strokeWidth="4"
            />

            {/* Círculo interno */}
            <Circle
                cx="32"
                cy="32"
                r="20"
                fill={colors.inner}
            />

            {/* Ícone baseado no status */}
            {status === 'completed' && (
                <Path
                    d="M 24 32 L 28 36 L 40 24"
                    stroke={colors.icon}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            )}

            {status === 'in-progress' && (
                <G>
                    <Circle cx="32" cy="32" r="8" fill={colors.icon} />
                    <Circle cx="32" cy="32" r="4" fill="white" />
                </G>
            )}

            {status === 'available' && (
                <Path
                    d="M 27 26 Q 27 25 28 25 L 37 31 Q 38 32 37 33 L 28 39 Q 27 39 27 38 Z"
                    fill={colors.icon}
                />
            )}

            {status === 'locked' && (
                <G>
                    <Path
                        d="M 26 28 L 26 24 Q 26 20 32 20 Q 38 20 38 24 L 38 28"
                        stroke={colors.icon}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <Path
                        d="M 24 28 L 40 28 L 40 40 L 24 40 Z"
                        fill={colors.icon}
                    />
                    <Circle cx="32" cy="34" r="2" fill="white" />
                </G>
            )}
        </Svg>
    );
}