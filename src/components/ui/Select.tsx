import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface SelectOption {
    label: string;
    value: string;
    icon?: string;
    color?: string;
}

interface SelectProps {
    label: string;
    value: string;
    options: SelectOption[];
    onSelect: (value: string) => void;
    placeholder?: string;
    error?: string;
}

export function Select({
    label,
    value,
    options,
    onSelect,
    placeholder = 'Selecione',
    error,
}: SelectProps) {
    const { colors, theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        if (isOpen) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    damping: 15,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.95,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSelect = (optionValue: string) => {
        onSelect(optionValue);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

            <TouchableOpacity
                style={[
                    styles.select,
                    {
                        backgroundColor: colors.card,
                        borderColor: error ? '#EF4444' : colors.border,
                    },
                ]}
                onPress={handleOpen}
                activeOpacity={0.7}
            >
                <View style={styles.selectedContent}>
                    {selectedOption?.icon && (
                        <Ionicons
                            name={selectedOption.icon as any}
                            size={20}
                            color={selectedOption.color || colors.text}
                            style={styles.icon}
                        />
                    )}
                    <Text
                        style={[
                            styles.selectedText,
                            { color: selectedOption ? colors.text : colors.textSecondary },
                        ]}
                    >
                        {selectedOption?.label || placeholder}
                    </Text>
                </View>
                <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}

            <Modal
                visible={isOpen}
                transparent
                animationType="none"
                onRequestClose={handleClose}
            >
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <TouchableOpacity
                        style={StyleSheet.absoluteFill}
                        activeOpacity={1}
                        onPress={handleClose}
                    />

                    <Animated.View
                        style={[
                            styles.dropdown,
                            { backgroundColor: colors.card },
                            {
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    >
                        <View style={styles.dropdownHeader}>
                            <Text style={[styles.dropdownTitle, { color: colors.text }]}>
                                {label}
                            </Text>
                            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        item.value === value && {
                                            backgroundColor: `${theme.primary}15`,
                                        },
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                    activeOpacity={0.7}
                                >
                                    {item.icon && (
                                        <Ionicons
                                            name={item.icon as any}
                                            size={20}
                                            color={item.color || colors.text}
                                            style={styles.icon}
                                        />
                                    )}
                                    <Text style={[styles.optionText, { color: colors.text }]}>
                                        {item.label}
                                    </Text>
                                    {item.value === value && (
                                        <Ionicons name="checkmark" size={20} color={theme.primary} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
    },
    selectedContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    selectedText: {
        fontSize: 15,
        fontFamily: 'Nunito_500Medium',
    },
    error: {
        color: '#EF4444',
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        marginTop: 4,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    dropdown: {
        width: '100%',
        maxWidth: 400,
        maxHeight: '70%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    dropdownTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
    },
    closeButton: {
        padding: 4,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    optionText: {
        fontSize: 15,
        fontFamily: 'Nunito_500Medium',
        flex: 1,
    },
});