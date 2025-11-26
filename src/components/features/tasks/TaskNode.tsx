import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface TaskNodeProps {
    title: string;
    status: 'locked' | 'available' | 'completed';
    position: 'left' | 'center' | 'right';
    onPress: () => void;
}

export function TaskNode({ title, status, position, onPress }: TaskNodeProps) {
    const { theme, colors } = useTheme();

    const nodeColor =
        status === 'completed'
            ? theme.success
            : status === 'available'
                ? theme.primary
                : colors.border;

    const iconName =
        status === 'completed'
            ? 'checkmark-circle'
            : status === 'available'
                ? 'play-circle'
                : 'lock-closed';

    const alignStyle =
        position === 'left'
            ? styles.leftAlign
            : position === 'right'
                ? styles.rightAlign
                : styles.centerAlign;

    return (
        <View style={[styles.container, alignStyle]}>
            <TouchableOpacity
                style={[
                    styles.node,
                    {
                        backgroundColor: nodeColor,
                        opacity: status === 'locked' ? 0.4 : 1,
                    },
                ]}
                onPress={onPress}
                disabled={status === 'locked'}
                activeOpacity={0.8}
            >
                <Ionicons name={iconName} size={32} color="#ffffff" />
            </TouchableOpacity>

            <View style={[styles.labelContainer, { backgroundColor: colors.card }]}>
                <Text
                    style={[
                        styles.label,
                        {
                            color: status === 'locked' ? colors.textSecondary : colors.text,
                        },
                    ]}
                    numberOfLines={2}
                >
                    {title}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        alignItems: 'center',
    },
    leftAlign: {
        alignSelf: 'flex-start',
        marginLeft: 40,
    },
    centerAlign: {
        alignSelf: 'center',
    },
    rightAlign: {
        alignSelf: 'flex-end',
        marginRight: 40,
    },
    node: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    labelContainer: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        maxWidth: 120,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 12,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
    },
});