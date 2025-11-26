import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button, Card } from '@/components/ui';

const { width } = Dimensions.get('window');

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

interface OnboardingModalProps {
    visible: boolean;
    onComplete: () => void;
}

export function OnboardingModal({ visible, onComplete }: OnboardingModalProps) {
    const { theme, colors } = useTheme();
    const [currentStep, setCurrentStep] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const [isVisible, setIsVisible] = useState(visible);

    const steps: OnboardingStep[] = [
        {
            id: '1',
            title: 'Bem-vindo ao VIDA',
            description:
                'Seu assistente inteligente de rotina e produtividade. Vamos te mostrar como funciona!',
            icon: 'sparkles',
            color: theme.primary,
        },
        {
            id: '2',
            title: 'Fluxo VIDA',
            description:
                'Visualize suas tarefas organizadas por período do dia. Manhã, Tarde e Noite em um mapa mental interativo.',
            icon: 'git-network',
            color: '#3B82F6',
        },
        {
            id: '3',
            title: 'Sequência de Dias',
            description:
                'Complete tarefas todos os dias para manter sua sequência ativa. Quanto mais dias, maior seu nível de chama!',
            icon: 'flame',
            color: '#F59E0B',
        },
        {
            id: '4',
            title: 'Sistema de XP',
            description:
                'Ganhe experiência completando tarefas. Suba de nível e desbloqueie conquistas enquanto evolui!',
            icon: 'trophy',
            color: '#10B981',
        },
    ];

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
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
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
                setCurrentStep(0);
            });
        }
    }, [visible]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    if (!isVisible) return null;

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    return (
        <Modal visible={isVisible} animationType="none" transparent>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            backgroundColor: colors.background,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    {/* Skip Button */}
                    {!isLastStep && (
                        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                            <Text style={[styles.skipText, { color: colors.textSecondary }]}>
                                Pular
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Icon Circle */}
                    <View
                        style={[styles.iconCircle, { backgroundColor: `${step.color}20` }]}
                    >
                        <Ionicons name={step.icon} size={64} color={step.color} />
                    </View>

                    {/* Content */}
                    <Text style={[styles.title, { color: colors.text }]}>
                        {step.title}
                    </Text>

                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                        {step.description}
                    </Text>

                    {/* Progress Dots */}
                    <View style={styles.dotsContainer}>
                        {steps.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            index === currentStep ? theme.primary : colors.border,
                                        width: index === currentStep ? 24 : 8,
                                    },
                                ]}
                            />
                        ))}
                    </View>

                    {/* Action Button */}
                    <Button
                        variant="primary"
                        size="lg"
                        onPress={handleNext}
                        style={styles.button}
                    >
                        {isLastStep ? 'Começar' : 'Próximo'}
                    </Button>

                    {/* Step Counter */}
                    <Text style={[styles.counter, { color: colors.textSecondary }]}>
                        {currentStep + 1} de {steps.length}
                    </Text>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: Math.min(width - 40, 400),
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 8,
    },
    skipText: {
        fontSize: 14,
        fontFamily: 'Nunito_600SemiBold',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Nunito_800ExtraBold',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    button: {
        width: '100%',
        marginBottom: 16,
    },
    counter: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
    },
});