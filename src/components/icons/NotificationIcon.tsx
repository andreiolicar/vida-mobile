import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface NotificationIconProps {
    size?: number;
    hasNotifications?: boolean;
    color?: string;
}

export function NotificationIcon({
    size = 24,
    hasNotifications = false,
    color = '#64748B',
}: NotificationIconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2C11.172 2 10.5 2.672 10.5 3.5V4.1C8.53 4.56 7 6.24 7 8.3V14L5 16V17H19V16L17 14V8.3C17 6.24 15.47 4.56 13.5 4.1V3.5C13.5 2.672 12.828 2 12 2Z"
                fill={color}
            />
            <Path
                d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
            {hasNotifications && (
                <Circle cx="17" cy="7" r="4" fill="#EF4444" />
            )}
        </Svg>
    );
}