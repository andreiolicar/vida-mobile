import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Badge } from '@/components/ui';

interface TaskItemProps {
    title: string;
    completed: boolean;
    category: string;
    xp: number;
    priority: 'low' | 'medium' | 'high';
    onToggle: () => void;
}

export function TaskItem({
    title,
    completed,
    category,
    xp,
    priority,
    onToggle,
}: TaskItemProps) {
    const { theme, colors } = useTheme();

    const priorityColor = {
        low: theme.info,
        medium: theme.warning,
        high: theme.error,
    }[priority];

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: colors.card,
                    borderColor: completed ? theme.success : colors.border,
                },
            ]}
            onPress={onToggle}
            activeOpacity={0.7}
        >
            <View
                style={[
                    styles.checkbox,
                    {
                        borderColor: completed ? theme.success : colors.border,
                        backgroundColor: completed ? theme.success : 'transparent',
                    },
                ]}
            >
                {completed && <Ionicons name="checkmark" size={16} color="#ffffff" />}
            </View>

            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        { color: colors.text },
                        completed && styles.titleCompleted,
                    ]}
                >
                    {title}
                </Text>

                <View style={styles.meta}>
                    <Badge variant="info" size="sm">
                        {category}
                    </Badge>
                    <Text style={[styles.xp, { color: theme.primary }]}>
                        +{xp} XP
                    </Text>
                </View>
            </View>

            <View
                style={[styles.priorityIndicator, { backgroundColor: priorityColor }]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 4,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    xp: {
        fontSize: 12,
        fontFamily: 'Nunito_600SemiBold',
    },
    priorityIndicator: {
        width: 4,
        height: 40,
        borderRadius: 2,
        marginLeft: 12,
    },
});