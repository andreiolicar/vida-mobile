import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Card } from '@/components/ui';
import { TaskCircleIcon } from '@/components/icons';

interface RoutineInfoModalProps {
    visible: boolean;
    onClose: () => void;
}

export function RoutineInfoModal({ visible, onClose }: RoutineInfoModalProps) {
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

    if (!isVisible) return null;

    return (
        <Modal
            visible={isVisible}
            animationType="none"
            transparent
            onRequestClose={onClose}
        >
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
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Sistema de Rotinas
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        <Card style={styles.infoCard}>
                            <View style={[styles.iconCircle, { backgroundColor: `${theme.primary}20` }]}>
                                <Ionicons name="calendar" size={32} color={theme.primary} />
                            </View>

                            <Text style={[styles.description, { color: colors.text }]}>
                                Organize sua rotina diária em três períodos: Manhã, Tarde e
                                Noite. Crie tarefas, acompanhe seu progresso e ganhe XP!
                            </Text>
                        </Card>

                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Status das Tarefas
                        </Text>

                        <Card style={styles.statusCard}>
                            <View style={styles.statusItem}>
                                <TaskCircleIcon size={48} status="available" />
                                <View style={styles.statusInfo}>
                                    <Text style={[styles.statusName, { color: colors.text }]}>
                                        Disponível
                                    </Text>
                                    <Text
                                        style={[styles.statusDesc, { color: colors.textSecondary }]}
                                    >
                                        Tarefa pronta para ser iniciada
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card style={styles.statusCard}>
                            <View style={styles.statusItem}>
                                <TaskCircleIcon size={48} status="in-progress" />
                                <View style={styles.statusInfo}>
                                    <Text style={[styles.statusName, { color: colors.text }]}>
                                        Em Progresso
                                    </Text>
                                    <Text
                                        style={[styles.statusDesc, { color: colors.textSecondary }]}
                                    >
                                        Tarefa que você está executando agora
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card style={styles.statusCard}>
                            <View style={styles.statusItem}>
                                <TaskCircleIcon size={48} status="completed" />
                                <View style={styles.statusInfo}>
                                    <Text style={[styles.statusName, { color: colors.text }]}>
                                        Concluída
                                    </Text>
                                    <Text
                                        style={[styles.statusDesc, { color: colors.textSecondary }]}
                                    >
                                        Tarefa finalizada com sucesso
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Como usar?
                        </Text>

                        <Card style={styles.stepCard}>
                            <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
                                <Text style={styles.stepNumberText}>1</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepTitle, { color: colors.text }]}>
                                    Toque na tarefa
                                </Text>
                                <Text
                                    style={[styles.stepDescription, { color: colors.textSecondary }]}
                                >
                                    Clique no círculo para mudar o status: Disponível → Em
                                    Progresso → Concluída
                                </Text>
                            </View>
                        </Card>

                        <Card style={styles.stepCard}>
                            <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
                                <Text style={styles.stepNumberText}>2</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepTitle, { color: colors.text }]}>
                                    Acompanhe seu progresso
                                </Text>
                                <Text
                                    style={[styles.stepDescription, { color: colors.textSecondary }]}
                                >
                                    Cada período mostra seu progresso em tempo real através do
                                    círculo de porcentagem
                                </Text>
                            </View>
                        </Card>

                        <Card style={styles.stepCard}>
                            <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepTitle, { color: colors.text }]}>
                                    Ganhe XP e suba de nível
                                </Text>
                                <Text
                                    style={[styles.stepDescription, { color: colors.textSecondary }]}
                                >
                                    Cada tarefa concluída te dá XP. Acumule para subir de nível e
                                    desbloquear conquistas!
                                </Text>
                            </View>
                        </Card>

                        <Card
                            style={[styles.tipCard, { backgroundColor: `${theme.success}10` }]}
                        >
                            <View style={styles.tipHeader}>
                                <Ionicons name="bulb" size={24} color={theme.success} />
                                <Text style={[styles.tipTitle, { color: theme.success }]}>
                                    Dica
                                </Text>
                            </View>
                            <Text style={[styles.tipText, { color: colors.text }]}>
                                Crie uma rotina consistente! Complete tarefas todos os dias para
                                manter sua sequência ativa e ganhar bônus de XP.
                            </Text>
                        </Card>
                    </ScrollView>
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
        maxHeight: '85%',
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
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    closeButton: {
        padding: 4,
    },
    content: {
        padding: 20,
    },
    infoCard: {
        padding: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 16,
    },
    statusCard: {
        padding: 16,
        marginBottom: 12,
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    statusInfo: {
        flex: 1,
    },
    statusName: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 4,
    },
    statusDesc: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    stepCard: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 12,
        gap: 16,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNumberText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 4,
    },
    stepDescription: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        lineHeight: 20,
    },
    tipCard: {
        padding: 16,
        marginTop: 12,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    tipText: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        lineHeight: 20,
    },
});