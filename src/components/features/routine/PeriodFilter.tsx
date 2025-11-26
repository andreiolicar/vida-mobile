import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks';

type Period = 'all' | 'morning' | 'afternoon' | 'evening';

interface PeriodFilterProps {
    selected: Period;
    onSelect: (period: Period) => void;
}

export function PeriodFilter({ selected, onSelect }: PeriodFilterProps) {
    const { theme, colors } = useTheme();

    const filters = [
        { id: 'all' as const, label: 'Tudo' },
        { id: 'morning' as const, label: 'Manhã' },
        { id: 'afternoon' as const, label: 'Tarde' },
        { id: 'evening' as const, label: 'Noite' },
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter.id}
                    style={[
                        styles.filter,
                        {
                            backgroundColor:
                                selected === filter.id ? theme.primary : colors.card,
                            borderColor:
                                selected === filter.id ? theme.primary : colors.border,
                        },
                    ]}
                    onPress={() => onSelect(filter.id)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.filterText,
                            {
                                color: selected === filter.id ? '#ffffff' : colors.text,
                            },
                        ]}
                    >
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 50,
    },
    contentContainer: {
        paddingHorizontal: 20,
        gap: 8,
    },
    filter: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
});