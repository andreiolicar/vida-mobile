import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface TaskActionsModalProps {
    visible: boolean;
    taskTitle: string;
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export function TaskActionsModal({
    visible,
    taskTitle,
    onEdit,
    onDelete,
    onClose,
}: TaskActionsModalProps) {
    const { theme, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(300)).current;
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    damping: 20,
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
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [visible]);

    const handleEdit = () => {
        onClose();
        setTimeout(() => {
            onEdit();
        }, 200);
    };

    const handleDelete = () => {
        onClose();
        setTimeout(() => {
            onDelete();
        }, 200);
    };

    if (!isVisible) return null;

    return (
        <Modal visible={isVisible} transparent animationType="none">
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <Animated.View
                    style={[
                        styles.container,
                        { backgroundColor: colors.background },
                        { transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                            {taskTitle}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.action, { backgroundColor: colors.card }]}
                            onPress={handleEdit}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: `${theme.info}20` },
                                ]}
                            >
                                <Ionicons name="create" size={24} color={theme.info} />
                            </View>
                            <View style={styles.actionText}>
                                <Text style={[styles.actionTitle, { color: colors.text }]}>
                                    Editar Tarefa
                                </Text>
                                <Text
                                    style={[styles.actionSubtitle, { color: colors.textSecondary }]}
                                >
                                    Modificar título, período ou categoria
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.action, { backgroundColor: colors.card }]}
                            onPress={handleDelete}
                            activeOpacity={0.7}
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: `${theme.error}20` },
                                ]}
                            >
                                <Ionicons name="trash" size={24} color={theme.error} />
                            </View>
                            <View style={styles.actionText}>
                                <Text style={[styles.actionTitle, { color: theme.error }]}>
                                    Excluir Tarefa
                                </Text>
                                <Text
                                    style={[styles.actionSubtitle, { color: colors.textSecondary }]}
                                >
                                    Esta ação não pode ser desfeita
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        flex: 1,
        marginRight: 12,
    },
    closeButton: {
        padding: 4,
    },
    actions: {
        padding: 20,
        gap: 12,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 2,
    },
    actionSubtitle: {
        fontSize: 13,
        fontFamily: 'Nunito_400Regular',
    },
});