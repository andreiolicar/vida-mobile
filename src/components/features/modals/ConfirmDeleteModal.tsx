import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button } from '@/components/ui';

interface ConfirmDeleteModalProps {
    visible: boolean;
    taskTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDeleteModal({
    visible,
    taskTitle,
    onConfirm,
    onCancel,
}: ConfirmDeleteModalProps) {
    const { theme, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
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
                    toValue: 0.9,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [visible]);

    if (!isVisible) return null;

    return (
        <Modal visible={isVisible} transparent animationType="none">
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={onCancel}
                />

                <Animated.View
                    style={[
                        styles.container,
                        { backgroundColor: colors.card },
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <View
                        style={[styles.iconCircle, { backgroundColor: `${theme.error}20` }]}
                    >
                        <Ionicons name="trash" size={48} color={theme.error} />
                    </View>

                    <Text style={[styles.title, { color: colors.text }]}>
                        Excluir Tarefa?
                    </Text>

                    <Text style={[styles.message, { color: colors.textSecondary }]}>
                        Tem certeza que deseja excluir "{taskTitle}"? Esta ação não pode ser
                        desfeita.
                    </Text>

                    <View style={styles.buttons}>
                        <Button variant="secondary" onPress={onCancel} style={styles.button}>
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            onPress={onConfirm}
                            style={[styles.button, { backgroundColor: theme.error }]}
                        >
                            Excluir
                        </Button>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Nunito_800ExtraBold',
        textAlign: 'center',
        marginBottom: 12,
    },
    message: {
        fontSize: 15,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
    },
});