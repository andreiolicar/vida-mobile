import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks';
import { TaskCircleIcon } from '@/components/icons';

interface MindFlowNodeProps {
    title: string;
    status: 'locked' | 'available' | 'in-progress' | 'completed';
    onPress: () => void;
}

export function MindFlowNode({ title, status, onPress }: MindFlowNodeProps) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={status === 'locked'}
            activeOpacity={0.7}
            style={styles.container}
        >
            <TaskCircleIcon size={64} status={status} />

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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 90,
    },
    label: {
        fontSize: 11,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
        lineHeight: 15,
        marginTop: 8,
    },
});