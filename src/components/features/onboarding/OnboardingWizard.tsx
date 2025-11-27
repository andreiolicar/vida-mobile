import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';
import { Button, Select, Card } from '@/components/ui';
import { useAuthStore } from '@/store';

const { width } = Dimensions.get('window');

interface OnboardingData {
    workStartTime: string;
    workEndTime: string;
    goals: string[];
    theme: 'light' | 'dark';
}

interface OnboardingWizardProps {
    onComplete: (data: OnboardingData) => void;
}

const GOAL_OPTIONS = [
    { id: 'health', label: 'Saúde e Bem-estar', icon: 'fitness', color: '#10B981' },
    { id: 'work', label: 'Produtividade no Trabalho', icon: 'briefcase', color: '#3B82F6' },
    { id: 'learning', label: 'Aprendizado Contínuo', icon: 'book', color: '#8B5CF6' },
    { id: 'creativity', label: 'Criatividade', icon: 'bulb', color: '#F59E0B' },
    { id: 'social', label: 'Relações Sociais', icon: 'people', color: '#EC4899' },
    { id: 'finance', label: 'Finanças Pessoais', icon: 'cash', color: '#06B6D4' },
];

const TIME_OPTIONS = [
    { label: '06:00', value: '06:00' },
    { label: '07:00', value: '07:00' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
];

const END_TIME_OPTIONS = [
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
];

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const { colors, theme } = useTheme();
    const { completeOnboarding } = useAuthStore();

    const [currentStep, setCurrentStep] = useState(0);
    const [workStartTime, setWorkStartTime] = useState('08:00');
    const [workEndTime, setWorkEndTime] = useState('18:00');
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light');

    // Animações
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateStepChange();
    }, [currentStep]);

    const animateStepChange = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: 20,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        const data: OnboardingData = {
            workStartTime,
            workEndTime,
            goals: selectedGoals,
            theme: selectedTheme,
        };

        completeOnboarding();
        onComplete(data);
    };

    const toggleGoal = (goalId: string) => {
        if (selectedGoals.includes(goalId)) {
            setSelectedGoals(selectedGoals.filter((g) => g !== goalId));
        } else {
            setSelectedGoals([...selectedGoals, goalId]);
        }
    };

    const canProceed = () => {
        if (currentStep === 2 && selectedGoals.length === 0) return false;
        return true;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="sparkles" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Vamos começar!
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Em poucos passos, vamos personalizar o VIDA para você e criar sua
                            primeira rotina inteligente.
                        </Text>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="calendar" size={24} color="#3B82F6" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Rotina Personalizada
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        Baseada nos seus horários e objetivos
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="flash" size={24} color="#F59E0B" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Assistente IA
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        Sugestões inteligentes para seu dia
                                    </Text>
                                </View>
                            </View>
                        </Card>

                        <Card variant="duolingo" style={styles.featureCard}>
                            <View style={styles.featureRow}>
                                <Ionicons name="trophy" size={24} color="#10B981" />
                                <View style={styles.featureText}>
                                    <Text style={[styles.featureTitle, { color: colors.text }]}>
                                        Gamificação
                                    </Text>
                                    <Text
                                        style={[
                                            styles.featureDesc,
                                            { color: colors.textSecondary },
                                        ]}
                                    >
                                        XP, níveis e conquistas
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </Animated.View>
                );

            case 1:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="time" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Seus horários
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Defina seu horário de trabalho ou estudo para organizarmos sua
                            rotina de forma ideal.
                        </Text>

                        <View style={styles.formGroup}>
                            <Select
                                label="Início do dia produtivo"
                                value={workStartTime}
                                options={TIME_OPTIONS}
                                onSelect={setWorkStartTime}
                            />

                            <Select
                                label="Fim do dia produtivo"
                                value={workEndTime}
                                options={END_TIME_OPTIONS}
                                onSelect={setWorkEndTime}
                            />
                        </View>

                        <Card
                            variant="duolingo"
                            style={[styles.tipCard, { backgroundColor: `${theme.info}10` }]}
                        >
                            <View style={styles.tipRow}>
                                <Ionicons name="bulb" size={20} color={theme.info} />
                                <Text style={[styles.tipText, { color: colors.text }]}>
                                    Você poderá ajustar isso depois nas configurações
                                </Text>
                            </View>
                        </Card>
                    </Animated.View>
                );

            case 2:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="flag" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Suas metas
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Selecione as áreas que deseja focar. Isso nos ajudará a criar
                            tarefas mais relevantes para você.
                        </Text>

                        <View style={styles.goalsGrid}>
                            {GOAL_OPTIONS.map((goal) => {
                                const isSelected = selectedGoals.includes(goal.id);
                                return (
                                    <TouchableOpacity
                                        key={goal.id}
                                        style={[
                                            styles.goalCard,
                                            {
                                                backgroundColor: isSelected
                                                    ? `${goal.color}20`
                                                    : colors.card,
                                                borderWidth: 2,
                                                borderColor: isSelected
                                                    ? goal.color
                                                    : colors.border,
                                            },
                                        ]}
                                        onPress={() => toggleGoal(goal.id)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name={goal.icon as any}
                                            size={32}
                                            color={isSelected ? goal.color : colors.textSecondary}
                                        />
                                        <Text
                                            style={[
                                                styles.goalLabel,
                                                {
                                                    color: isSelected
                                                        ? colors.text
                                                        : colors.textSecondary,
                                                },
                                            ]}
                                        >
                                            {goal.label}
                                        </Text>
                                        {isSelected && (
                                            <View
                                                style={[
                                                    styles.checkBadge,
                                                    { backgroundColor: goal.color },
                                                ]}
                                            >
                                                <Ionicons
                                                    name="checkmark"
                                                    size={16}
                                                    color="#ffffff"
                                                />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {selectedGoals.length === 0 && (
                            <Text style={[styles.errorText, { color: theme.error }]}>
                                Selecione pelo menos uma área de foco
                            </Text>
                        )}
                    </Animated.View>
                );

            case 3:
                return (
                    <Animated.View
                        style={[
                            styles.stepContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: `${theme.primary}15` },
                                ]}
                            >
                                <Ionicons name="color-palette" size={64} color={theme.primary} />
                            </View>
                        </View>

                        <Text style={[styles.title, { color: colors.text }]}>
                            Escolha seu tema
                        </Text>
                        <Text style={[styles.description, { color: colors.textSecondary }]}>
                            Selecione o tema que mais combina com você. Você pode mudar a
                            qualquer momento.
                        </Text>

                        <View style={styles.themesContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.themeCard,
                                    {
                                        backgroundColor: '#ffffff',
                                        borderWidth: 3,
                                        borderColor:
                                            selectedTheme === 'light'
                                                ? theme.primary
                                                : '#E5E7EB',
                                    },
                                ]}
                                onPress={() => setSelectedTheme('light')}
                            >
                                <View style={styles.themePreview}>
                                    <View style={[styles.themeHeader, { backgroundColor: '#F3F4F6' }]}>
                                        <View style={[styles.themeDot, { backgroundColor: '#EF4444' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#F59E0B' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#10B981' }]} />
                                    </View>
                                    <View style={styles.themeContent}>
                                        <View style={[styles.themeLine, { backgroundColor: '#E5E7EB' }]} />
                                        <View style={[styles.themeLine, { backgroundColor: '#E5E7EB', width: '60%' }]} />
                                    </View>
                                </View>
                                <Text style={[styles.themeLabel, { color: '#1F2937' }]}>
                                    Claro
                                </Text>
                                {selectedTheme === 'light' && (
                                    <View style={[styles.themeCheck, { backgroundColor: theme.primary }]}>
                                        <Ionicons name="checkmark" size={20} color="#ffffff" />
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.themeCard,
                                    {
                                        backgroundColor: '#0F172A',
                                        borderWidth: 3,
                                        borderColor:
                                            selectedTheme === 'dark' ? theme.primary : '#334155',
                                    },
                                ]}
                                onPress={() => setSelectedTheme('dark')}
                            >
                                <View style={styles.themePreview}>
                                    <View style={[styles.themeHeader, { backgroundColor: '#1E293B' }]}>
                                        <View style={[styles.themeDot, { backgroundColor: '#EF4444' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#F59E0B' }]} />
                                        <View style={[styles.themeDot, { backgroundColor: '#10B981' }]} />
                                    </View>
                                    <View style={styles.themeContent}>
                                        <View style={[styles.themeLine, { backgroundColor: '#334155' }]} />
                                        <View style={[styles.themeLine, { backgroundColor: '#334155', width: '60%' }]} />
                                    </View>
                                </View>
                                <Text style={[styles.themeLabel, { color: '#F1F5F9' }]}>
                                    Escuro
                                </Text>
                                {selectedTheme === 'dark' && (
                                    <View style={[styles.themeCheck, { backgroundColor: theme.primary }]}>
                                        <Ionicons name="checkmark" size={20} color="#ffffff" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressBar,
                            {
                                backgroundColor: theme.primary,
                                width: `${((currentStep + 1) / 4) * 100}%`,
                            },
                        ]}
                    />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    {currentStep + 1} de 4
                </Text>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderStep()}
            </ScrollView>

            {/* Navigation Buttons */}
            <View style={styles.navigation}>
                {currentStep > 0 && (
                    <Button
                        variant="outline"
                        size="lg"
                        onPress={handleBack}
                        style={styles.backButton}
                    >
                        Voltar
                    </Button>
                )}
                <Button
                    variant="primary"
                    size="lg"
                    onPress={handleNext}
                    disabled={!canProceed()}
                    style={[styles.nextButton, currentStep === 0 && styles.fullWidthButton]}
                >
                    {currentStep === 3 ? 'Finalizar' : 'Continuar'}
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    stepContainer: {
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
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
    featureCard: {
        marginBottom: 12,
        padding: 16,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 2,
    },
    featureDesc: {
        fontSize: 14,
        fontFamily: 'Nunito_400Regular',
    },
    formGroup: {
        gap: 0,
        marginBottom: 24,
    },
    tipCard: {
        padding: 16,
    },
    tipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        lineHeight: 20,
    },
    goalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    goalCard: {
        width: (width - 64) / 2,
        aspectRatio: 1,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    goalLabel: {
        fontSize: 13,
        fontFamily: 'Nunito_600SemiBold',
        textAlign: 'center',
        marginTop: 8,
    },
    checkBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 14,
        fontFamily: 'Nunito_500Medium',
        textAlign: 'center',
    },
    themesContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    themeCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        position: 'relative',
    },
    themePreview: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
    },
    themeHeader: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        gap: 4,
    },
    themeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    themeContent: {
        flex: 1,
        padding: 12,
        gap: 8,
    },
    themeLine: {
        height: 8,
        borderRadius: 4,
    },
    themeLabel: {
        fontSize: 16,
        fontFamily: 'Nunito_700Bold',
    },
    themeCheck: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigation: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    backButton: {
        flex: 1,
    },
    nextButton: {
        flex: 1,
    },
    fullWidthButton: {
        flex: 1,
    },
});