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
import { Button } from '@/components/ui';

interface AlertModalProps {
    visible: boolean;
    type: 'locked-period' | 'multiple-tasks';
    onClose: () => void;
}

export function AlertModal({ visible, type, onClose }: AlertModalProps) {
    const { theme, colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const [isVisible, setIsVisible] = useState(false);
    const [currentType, setCurrentType] = useState(type);
    const isClosing = useRef(false);

    useEffect(() => {
        if (visible && !isClosing.current) {
            setIsVisible(true);
            setCurrentType(type);
            isClosing.current = false;

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
        } else if (!visible && isVisible) {
            isClosing.current = true;

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
                isClosing.current = false;
            });
        }
    }, [visible, type]);

    const handleClose = () => {
        if (isClosing.current) return; // Previne múltiplos cliques
        onClose();
    };

    const getContent = () => {
        if (currentType === 'locked-period') {
            return {
                icon: 'lock-closed' as const,
                iconColor: theme.warning,
                title: 'Período Bloqueado',
                message:
                    'Esta tarefa pertence a um período futuro do dia. Volte quando chegar o horário correto para desbloqueá-la!',
            };
        }
        return {
            icon: 'alert-circle' as const,
            iconColor: theme.info,
            title: 'Atenção',
            message:
                'Você já tem uma tarefa em progresso! Finalize a tarefa atual antes de iniciar outra.',
        };
    };

    if (!isVisible) return null;

    const content = getContent();

    return (
        <Modal visible={isVisible} animationType="none" transparent>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleClose}
                />

                <Animated.View
                    style={[
                        styles.container,
                        { backgroundColor: colors.card },
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <View
                        style={[
                            styles.iconCircle,
                            { backgroundColor: `${content.iconColor}20` },
                        ]}
                    >
                        <Ionicons name={content.icon} size={48} color={content.iconColor} />
                    </View>

                    <Text style={[styles.title, { color: colors.text }]}>
                        {content.title}
                    </Text>

                    <Text style={[styles.message, { color: colors.textSecondary }]}>
                        {content.message}
                    </Text>

                    <Button variant="primary" size="lg" onPress={handleClose} style={styles.button}>
                        Entendi
                    </Button>
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
    button: {
        width: '100%',
    },
});