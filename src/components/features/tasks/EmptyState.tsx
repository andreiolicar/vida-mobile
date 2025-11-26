import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface EmptyStateProps {
    message?: string;
}

export function EmptyState({ message = 'Nenhuma tarefa criada' }: EmptyStateProps) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Ionicons name="calendar-outline" size={64} color={colors.border} />
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    message: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        marginTop: 16,
    },
});