import React from 'react';
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface StreakIconProps {
    size?: number;
    level?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export function StreakIcon({ size = 32, level = 'bronze' }: StreakIconProps) {
    const colors = {
        bronze: ['#F97316', '#EA580C'],
        silver: ['#94A3B8', '#64748B'],
        gold: ['#FBBF24', '#F59E0B'],
        platinum: ['#A78BFA', '#8B5CF6'],
    };

    const [color1, color2] = colors[level];

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Defs>
                <LinearGradient id={`grad-${level}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor={color1} />
                    <Stop offset="100%" stopColor={color2} />
                </LinearGradient>
            </Defs>
            <Path
                d="M12 2C12 2 8 6 8 10C8 13 10 15 12 15C14 15 16 13 16 10C16 6 12 2 12 2Z"
                fill={`url(#grad-${level})`}
            />
            <Path
                d="M9 14C9 14 7 16 7 18C7 20 8.5 21 10 21C11.5 21 13 20 13 18C13 16 11 14 11 14"
                fill={`url(#grad-${level})`}
                opacity="0.7"
            />
            <Path
                d="M13 14C13 14 15 16 15 18C15 20 13.5 21 12 21C10.5 21 9 20 9 18"
                fill={`url(#grad-${level})`}
                opacity="0.5"
            />
        </Svg>
    );
}