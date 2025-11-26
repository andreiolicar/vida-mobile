import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface MindFlowNodeProps {
    title: string;
    status: 'locked' | 'available' | 'in-progress' | 'completed';
    size?: 'small' | 'medium' | 'large';
    onPress: () => void;
}

export function MindFlowNode({
    title,
    status,
    size = 'medium',
    onPress,
}: MindFlowNodeProps) {
    const { theme, colors } = useTheme();
    const breathAnim = new Animated.Value(1);

    useEffect(() => {
        if (status === 'available' || status === 'in-progress') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(breathAnim, {
                        toValue: 1.05,
                        duration: 1800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(breathAnim, {
                        toValue: 1,
                        duration: 1800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [status]);

    const getNodeConfig = () => {
        switch (status) {
            case 'completed':
                return {
                    color: theme.success,
                    icon: 'checkmark-circle' as const,
                    opacity: 0.8,
                };
            case 'in-progress':
                return {
                    color: theme.warning,
                    icon: 'time' as const,
                    opacity: 1,
                };
            case 'available':
                return {
                    color: theme.primary,
                    icon: 'play-circle' as const,
                    opacity: 1,
                };
            default:
                return {
                    color: colors.border,
                    icon: 'lock-closed' as const,
                    opacity: 0.4,
                };
        }
    };

    // Tamanhos padronizados
    const nodeSize = 52;
    const iconSize = 28;
    const fontSize = 11;

    const { color, icon, opacity } = getNodeConfig();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={status === 'locked'}
            activeOpacity={0.8}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.node,
                    {
                        width: nodeSize,
                        height: nodeSize,
                        borderRadius: nodeSize / 2,
                        backgroundColor: color,
                        opacity,
                        transform: [{ scale: breathAnim }],
                    },
                ]}
            >
                <Ionicons name={icon} size={iconSize} color="#ffffff" />
            </Animated.View>

            <Text
                style={[
                    styles.label,
                    {
                        color: status === 'locked' ? colors.textSecondary : colors.text,
                        fontSize,
                    },
                ]}
                numberOfLines={2}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 90, // Largura fixa para alinhamento consistente
    },
    node: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    label: {
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
        lineHeight: 15,
    },
});