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
import { StreakIcon } from '@/components/icons';

interface StreakInfoModalProps {
    visible: boolean;
    currentStreak: number;
    onClose: () => void;
}

export function StreakInfoModal({
    visible,
    currentStreak,
    onClose,
}: StreakInfoModalProps) {
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

    const streakLevels = [
        {
            level: 'bronze',
            name: 'Bronze',
            description: 'Complete 1-6 dias consecutivos',
            range: '1-6 dias',
        },
        {
            level: 'silver',
            name: 'Prata',
            description: 'Complete 7-14 dias consecutivos',
            range: '7-14 dias',
        },
        {
            level: 'gold',
            name: 'Ouro',
            description: 'Complete 15-29 dias consecutivos',
            range: '15-29 dias',
        },
        {
            level: 'platinum',
            name: 'Platina',
            description: 'Complete 30+ dias consecutivos',
            range: '30+ dias',
        },
    ];

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
                            Sequência de Dias
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        <Card
                            variant="elevated"
                            style={[styles.currentCard, { backgroundColor: `${theme.primary}10` }]}
                        >
                            <Text style={[styles.currentLabel, { color: colors.textSecondary }]}>
                                Sua sequência atual
                            </Text>
                            <View style={styles.currentStreak}>
                                <StreakIcon
                                    size={40}
                                    level={
                                        currentStreak >= 30
                                            ? 'platinum'
                                            : currentStreak >= 15
                                                ? 'gold'
                                                : currentStreak >= 7
                                                    ? 'silver'
                                                    : 'bronze'
                                    }
                                />
                                <Text style={[styles.currentValue, { color: theme.primary }]}>
                                    {currentStreak} dias
                                </Text>
                            </View>
                        </Card>

                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Como funciona?
                        </Text>

                        <Card style={styles.infoCard}>
                            <Text style={[styles.infoText, { color: colors.text }]}>
                                Complete pelo menos uma tarefa por dia para manter sua sequência ativa.
                                Quanto mais dias seguidos, maior seu nível!
                            </Text>
                        </Card>

                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Níveis de Sequência
                        </Text>

                        {streakLevels.map((item) => (
                            <Card key={item.level} style={styles.levelCard}>
                                <View style={styles.levelContent}>
                                    <StreakIcon size={32} level={item.level as any} />

                                    <View style={styles.levelInfo}>
                                        <Text style={[styles.levelName, { color: colors.text }]}>
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={[styles.levelDescription, { color: colors.textSecondary }]}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.rangeBadge,
                                            { backgroundColor: `${theme.primary}20` },
                                        ]}
                                    >
                                        <Text style={[styles.rangeText, { color: theme.primary }]}>
                                            {item.range}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        ))}
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
    currentCard: {
        padding: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    currentLabel: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        marginBottom: 12,
    },
    currentStreak: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    currentValue: {
        fontSize: 32,
        fontFamily: 'Nunito_800ExtraBold',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 12,
    },
    infoCard: {
        padding: 16,
        marginBottom: 24,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
        lineHeight: 20,
    },
    levelCard: {
        padding: 16,
        marginBottom: 12,
    },
    levelContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    levelInfo: {
        flex: 1,
    },
    levelName: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 2,
    },
    levelDescription: {
        fontSize: 13,
        fontFamily: 'Nunito_400Regular',
    },
    rangeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    rangeText: {
        fontSize: 11,
        fontFamily: 'Nunito_600SemiBold',
    },
});